import React from 'react';
import MyAddress from './components/MyAddress';

const MyAddresses = props => {
    const setMyAddress = address => {
        return <MyAddress key={address.key} address={address}/>
    }
    return (
        <div className="my_addresses">
            {props.my_addresses.map(setMyAddress)}
        </div>
    )
}
export default MyAddresses;