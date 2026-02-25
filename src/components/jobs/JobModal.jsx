import React from 'react';
import './JobModal.css';
import Button from '../ui/Button';

const JobModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title-group">
                        <h2 className="modal-title">{job.title}</h2>
                        <p className="modal-company">{job.company}</p>
                    </div>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div className="modal-section">
                        <h4 className="section-label">Description</h4>
                        <p className="description-text">{job.description}</p>
                    </div>

                    <div className="modal-section">
                        <h4 className="section-label">Required Skills</h4>
                        <div className="skills-list">
                            {job.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className="modal-details-grid">
                        <div className="modal-detail-item">
                            <span className="detail-label">Location:</span> {job.location} ({job.mode})
                        </div>
                        <div className="modal-detail-item">
                            <span className="detail-label">Experience:</span> {job.experience}
                        </div>
                        <div className="modal-detail-item">
                            <span className="detail-label">Salary:</span> {job.salaryRange}
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <Button>Apply Now</Button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobModal;
