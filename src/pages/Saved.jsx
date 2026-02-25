import React, { useState, useEffect } from 'react';
import { jobsData } from '../data/jobsData';
import JobCard from '../components/jobs/JobCard';
import JobModal from '../components/jobs/JobModal';

const Saved = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [savedJobIds, setSavedJobIds] = useState([]);

    useEffect(() => {
        // Load saved jobs from localStorage
        const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setSavedJobIds(savedIds);

        const filtered = jobsData.filter(job => savedIds.includes(job.id));
        setSavedJobs(filtered);
    }, []);

    const handleSaveToggle = (jobId) => {
        // Since we are on the saved page, "toggling" usually means removing
        const updatedIds = savedJobIds.filter(id => id !== jobId);
        setSavedJobIds(updatedIds);
        localStorage.setItem('savedJobs', JSON.stringify(updatedIds));

        const updatedJobs = savedJobs.filter(job => job.id !== jobId);
        setSavedJobs(updatedJobs);
    };

    return (
        <div className="max-width-text" style={{ padding: 'var(--space-64) var(--space-24)' }}>
            <h1 style={{ fontSize: '40px', marginBottom: 'var(--space-40)' }}>Saved Jobs</h1>

            {savedJobs.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
                    {savedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isSaved={true}
                            onSave={handleSaveToggle}
                            onView={setSelectedJob}
                        />
                    ))}
                </div>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: 'var(--space-64) 0',
                    opacity: 0.7
                }}>
                    <p style={{ fontSize: '20px', marginBottom: 'var(--space-16)' }}>
                        Your saved collection is empty.
                    </p>
                    <p style={{ fontSize: '16px', maxWidth: '400px', margin: '0 auto' }}>
                        When you find interesting opportunities on your dashboard, save them here for quick access later.
                    </p>
                </div>
            )}

            {selectedJob && (
                <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
        </div>
    );
};

export default Saved;
