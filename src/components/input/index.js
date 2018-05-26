import React from 'react';
const Input = props => {
    const onChange = e => {
        let value = e.target.value;
        props.onChange({ name: props.name, value });
    };

    return (
        <fieldset>
            <label>{props.label}</label>
            <input  {...props} onChange={onChange} />
        </fieldset>
    );
}
export default Input;