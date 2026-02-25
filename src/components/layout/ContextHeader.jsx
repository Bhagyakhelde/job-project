import React from 'react';
import './ContextHeader.css';

const ContextHeader = ({ title, subtext }) => {
    return (
        <header className="context-header">
            <h1 className="context-headline">{title}</h1>
            {subtext && <p className="context-subtext">{subtext}</p>}
        </header>
    );
};

export default ContextHeader;
