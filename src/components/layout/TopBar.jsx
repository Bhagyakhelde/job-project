import React from 'react';
import './TopBar.css';

const TopBar = ({ projectName = 'Job Notification Tracker', step = '05', totalSteps = '08', status = 'In Progress' }) => {
    return (
        <div className="top-bar">
            <div className="top-bar-left">
                <span className="project-name">{projectName}</span>
            </div>

            <div className="top-bar-center">
                <span className="progress-indicator">Step {step} / {totalSteps}</span>
            </div>

            <div className="top-bar-right">
                <span className={`status-badge status-${status.toLowerCase().replace(' ', '-')}`}>
                    {status}
                </span>
            </div>
        </div>
    );
};

export default TopBar;
