import React from 'react';
import './JobCard.css';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { getScoreColor } from '../../utils/matchEngine';

const JobCard = ({ job, isSaved, onSave, onView, matchScore = null, status = 'Not Applied', onStatusChange }) => {
    const { id, title, company, location, mode, experience, salaryRange, source, postedDaysAgo, applyUrl } = job;

    const getStatusColor = (s) => {
        switch (s) {
            case 'Applied': return '#3b82f6';
            case 'Rejected': return '#ef4444';
            case 'Selected': return 'var(--success-color)';
            default: return 'var(--border-color)';
        }
    };

    return (
        <div className="job-card">
            <div className="job-card-header">
                <div className="job-card-main-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <h3 className="job-card-title">{title}</h3>
                        {matchScore !== null && (
                            <span className="match-score-badge" style={{
                                backgroundColor: getScoreColor(matchScore),
                                color: '#fff',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: '600'
                            }}>
                                {matchScore}% Match
                            </span>
                        )}
                        <span className="status-badge" style={{
                            backgroundColor: status === 'Not Applied' ? 'transparent' : getStatusColor(status),
                            color: status === 'Not Applied' ? 'rgba(0,0,0,0.4)' : '#fff',
                            border: status === 'Not Applied' ? '1px solid var(--border-color)' : 'none',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600'
                        }}>
                            {status}
                        </span>
                    </div>
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
                <div className="status-controls" style={{ display: 'flex', gap: '4px', background: '#f0f0f0', padding: '4px', borderRadius: '8px' }}>
                    {['Not Applied', 'Applied', 'Rejected', 'Selected'].map(s => (
                        <button
                            key={s}
                            onClick={() => onStatusChange(id, s)}
                            style={{
                                padding: '4px 8px',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                backgroundColor: status === s ? (s === 'Not Applied' ? '#fff' : getStatusColor(s)) : 'transparent',
                                color: status === s ? (s === 'Not Applied' ? '#111' : '#fff') : '#888',
                                transition: 'all 0.2s'
                            }}
                        >
                            {s}
                        </button>
                    ))}
                </div>
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
