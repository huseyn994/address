import React from 'react';
import './style.css'
const Loading = ({ show }) => {
    let loading = show ? <div className="loading_container">
        <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>
    </div> : null;
    return loading
}
export default Loading;