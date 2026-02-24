import React from 'react';
import './ProofFooter.css';

const ProofFooter = ({ items = [] }) => {
    const defaultItems = [
        { label: 'UI Built', completed: true },
        { label: 'Logic Working', completed: false },
        { label: 'Test Passed', completed: false },
        { label: 'Deployed', completed: false }
    ];

    const displayItems = items.length > 0 ? items : defaultItems;

    return (
        <footer className="proof-footer">
            <div className="proof-container">
                {displayItems.map((item, index) => (
                    <div key={index} className="proof-item">
                        <span className={`status-dot ${item.completed ? 'completed' : ''}`}></span>
                        <span className="proof-label">{item.label}</span>
                    </div>
                ))}
            </div>
        </footer>
    );
};

export default ProofFooter;
