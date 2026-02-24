import React from 'react';
import './ContextHeader.css';

const ContextHeader = ({ title, subtitle }) => {
    return (
        <header className="context-header">
            <h1 className="context-title">{title}</h1>
            <p className="context-subtitle">{subtitle}</p>
        </header>
    );
};

export default ContextHeader;
