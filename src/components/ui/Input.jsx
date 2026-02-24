import React from 'react';
import './Input.css';

const Input = ({ label, helperText, ...props }) => {
    return (
        <div className="input-field">
            {label && <label className="input-label">{label}</label>}
            <input className="input-control" {...props} />
            {helperText && <p className="input-helper">{helperText}</p>}
        </div>
    );
};

export default Input;
