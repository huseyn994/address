import React, { Component } from 'react';
import './assets/css/App.css';
import Select from './components/select';
import AppInfo from './components/static/AppInfo';
import Header from './components/static/Header';
import Input from './components/input';
import Loading from './components/loading';
import MyAddresses from './components/steps/MyAddresses';
import Error from './components/error';
import AddressAPI from './services/AddressAPI';

class App extends Component {
  state = {
    years: [],
    months: [],
    form: {},
    addresses: [],
    step2: false,
    step3: false,
    my_addresses: [],
    selected_address: {}
  };
  componentDidMount() {
    this.setYears();
    this.setMonths();
  }
  setYears() {
    const maximum_year = 10;
    let years = [];
    for (let i = 1; i < maximum_year; i++) {
      let ob = {
        key: i,
        value: i > 1 ? (i + " years") : (i + " year")
      }
      years.push(ob);
    }
    this.setState({ years })
  }
  setMonths() {
    let months = [];
    for (let i = 1; i <= 12; i++) {
      let ob = {
        key: i,
        value: i > 1 ? (i + " months") : (i + " month")
      }
      months.push(ob);
    }
    this.setState({ months })
  }
  onChange = data => {
    let form = Object.assign({}, this.state.form);
    form[data.name] = data.value;
    this.setState({ form })
  }
  onChangeAddress = data => {
    let selected_address = Object.assign({}, this.state.selected_address);
    selected_address[data.name] = data.value;
    this.setState({ selected_address })
  }
  submit = e => {
    e.preventDefault();

    if (!this.state.step2) {
      this.step2();
    }
    if (!this.state.step3 && this.state.step2) {
      this.setState({ error: "Please, select one of the address." })
    }
    if (this.state.step3 && this.state.step2) {
      this.finish();
    }
  };
  step2() {
    if (!this.state.form.year || !this.state.form.month) {
      this.setState({ error: "Please, fill the length of stay." })
      return false;
    }
    this.setState({
      loading: true
    })
    AddressAPI.getAddressesByPostalCode(this.state.form.postcode).then(data => {
      let addresses = this.parseAddres(data.addresses);
      this.setState({
        addresses,
        error: false,
        step2: true,
        loading: false
      })
    }).catch(error => {
      this.setState({ error, loading: false })
    })
  }
  validationAddress(selected_address) {
    if (!selected_address.line1 || !selected_address.city || !selected_address.county || !selected_address.country) {
      this.setState({ error: "Fill mandatory fields (Line1, Town, County, Country)" });
      return false;
    }
    return true;
  }
  finish() {
    let selected_address = Object.assign({}, this.state.selected_address);
    if (this.validationAddress(selected_address)) {
      let my_addresses = Object.assign([], this.state.my_addresses);
      my_addresses.push(selected_address);
      this.setState({ my_addresses });
      this.resetFlow();
    }
  }
  resetFlow() {
    this.setState({
      error: false,
      step2: false,
      step3: false,
      form: {},
      selected_address: {},
      addresses: []
    });
  }
  parseAddres = data => {
    let parsed = [];
    let index = 0; // I believe it is better rather than lines[0] + lines[1].
    data.forEach(address => {
      index++;
      let lines = address.split(',');
      parsed.push({
        key: index,
        year: this.state.form.year,
        month: this.state.form.month,
        value: lines[0] + lines[1],
        line1: lines[0],
        line2: lines[1].trim(),
        line3: lines[2].trim(),
        line4: lines[3].trim(),
        city: lines[5].trim(),
        county: lines[6].trim(),
        country: "United Kingdom"
      })
    });
    return parsed;
  }

  selectAddress = data => {
    let selected_address = this.state.addresses.find(address => address.key == data.value);
    if (selected_address) {
      this.setState({
        step3: true,
        selected_address,
        error: false
      })
    } else {
      this.setState({
        step3: false,
        error: false
      })
    }

  }
  render() {
    return (
      <div className="App">
        <Loading show={this.state.loading} />
        <Header />
        <AppInfo />

        <form className="main_form" onSubmit={this.submit}>
          {this.state.error && <Error message={this.state.error} />}
          <div className="container">
            {this.state.my_addresses.length > 0 && <MyAddresses my_addresses={this.state.my_addresses} />}
            <fieldset>
              <label>How long did you stay at your <strong>current address</strong>?</label>
              <Select className="left half_width" value={this.state.form.year} onChange={this.onChange} options={this.state.years} name="year" />
              <Select className="right half_width" value={this.state.form.month}  onChange={this.onChange} options={this.state.months} name="month" />
              <div className="clear"></div>
            </fieldset>

            <fieldset>
              <label>Your address</label>
              <Input className="search" onChange={this.onChange} name="postcode" type="text" value={this.state.form.postcode || ''} />
            </fieldset>

            {this.state.step2 && <div className="step2">
              <fieldset>
                <label>Select your address</label>
                <Select onChange={this.selectAddress} options={this.state.addresses} name="address" />
              </fieldset>
            </div>}
          </div>

          {this.state.step3 && <div className="step3 wide_container">
            <div className="left half_width">
              <Input label="Address line1:" onChange={this.onChangeAddress} name="line1" type="text" value={this.state.selected_address.line1} />
              <Input label="Address line2:" onChange={this.onChangeAddress} name="line2" type="text" value={this.state.selected_address.line2} />
              <Input label="Address line3:" onChange={this.onChangeAddress} name="line3" type="text" value={this.state.selected_address.line3} />
            </div>
            <div className="right half_width">
              <Input label="Town" onChange={this.onChangeAddress} name="city" type="text" value={this.state.selected_address.city} />
              <Input label="County" onChange={this.onChangeAddress} name="county" type="text" value={this.state.selected_address.county} />
              <Input label="Country" onChange={this.onChangeAddress} name="country" type="text" value={this.state.selected_address.country} />
            </div>
            <div className="clear"></div>
          </div>}
          <fieldset className="submit_fieldset">
            <input type="submit" value="Confirm and continue" />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default App;
