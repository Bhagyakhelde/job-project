import React from 'react';
import './Badge.css';

const Badge = ({ children, variant = "neutral" }) => {
    return (
        <span className={`badge ${variant}`}>
            {children}
        </span>
    );
};

export default Badge;
