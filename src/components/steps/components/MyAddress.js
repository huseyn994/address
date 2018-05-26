import React from 'react';
const MyAddresses = ({ address }) => {
    return (
        <div className="my_address">
            {address.line1}, {address.line2}, {address.line3}, {address.line4}, {address.city}, {address.county}, {address.country}.
            <p>Time at address: {address.year} years, {address.month} months</p>
        </div>
    )
}
export default MyAddresses;