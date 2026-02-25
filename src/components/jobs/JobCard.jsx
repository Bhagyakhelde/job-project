import React from 'react';
import './JobCard.css';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const JobCard = ({ job, isSaved, onSave, onView }) => {
    const { title, company, location, mode, experience, salaryRange, source, postedDaysAgo, applyUrl } = job;

    return (
        <div className="job-card">
            <div className="job-card-header">
                <div className="job-card-main-info">
                    <h3 className="job-card-title">{title}</h3>
                    <p className="job-card-company">{company}</p>
                </div>
                <Badge variant={source === 'LinkedIn' ? 'neutral' : 'success'}>{source}</Badge>
            </div>

            <div className="job-card-details">
                <div className="detail-item">
                    <span className="detail-label">Location:</span> {location} ({mode})
                </div>
                <div className="detail-item">
                    <span className="detail-label">Experience:</span> {experience}
                </div>
                <div className="detail-item">
                    <span className="detail-label">Salary:</span> {salaryRange}
                </div>
            </div>

            <div className="job-card-footer">
                <span className="job-posted-time">
                    {postedDaysAgo === 0 ? 'Posted today' : `Posted ${postedDaysAgo} days ago`}
                </span>
                <div className="job-card-actions">
                    <Button variant="secondary" onClick={() => onView(job)}>View</Button>
                    <Button variant="secondary" onClick={() => onSave(job.id)}>
                        {isSaved ? 'Unsave' : 'Save'}
                    </Button>
                    <a href={applyUrl} target="_blank" rel="noopener noreferrer">
                        <Button>Apply</Button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
