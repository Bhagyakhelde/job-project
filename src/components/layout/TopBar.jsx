import React from 'react';
import './TopBar.css';

const TopBar = ({ step = "1/3", status = "Not Started" }) => {
    return (
        <div className="top-bar">
            <div className="top-bar-left">
                <span className="app-name">Job Notification App</span>
            </div>
            <div className="top-bar-center">
                <span className="progress-indicator">Step {step}</span>
            </div>
            <div className="top-bar-right">
                <div className={`status-badge ${status.toLowerCase().replace(' ', '-')}`}>
                    {status}
                </div>
            </div>
        </div>
    );
};

export default TopBar;
