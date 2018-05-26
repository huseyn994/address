import React from 'react';

class Select extends React.PureComponent {
    state = {
        selected: {
            
        }
    };
    componentWillReceiveProps(nextProps){
        //console.log(nextProps);return;
        if(nextProps.value===undefined){
            this.setState({
                selected: {
                    value: ""
                }
            })
        }
    }
    onChange = e => {
        let selected = {
            name: this.props.name,
            value: e.target.value
        };
        
        this.setState({selected});
        this.props.onChange(selected);
    };
    setOptions(option){
        return <option key={option.key} value={option.key}>{option.value}</option>
    }
    render() {

        return (
            <select {...this.props} onChange={this.onChange} value={this.state.selected.value}>
                <option value="">Select</option>
                {this.props.options.map(this.setOptions)}
            </select>
        );

    }
}
export default Select;