import React, { useState, useEffect, useMemo } from 'react';
import { jobsData } from '../data/jobsData';
import JobCard from '../components/jobs/JobCard';
import JobModal from '../components/jobs/JobModal';
import { calculateMatchScore } from '../utils/matchEngine';

const Saved = () => {
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [preferences, setPreferences] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        // Load preferences
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }

        // Load saved jobs from localStorage
        const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setSavedJobIds(savedIds);
    }, []);

    const savedJobsWithScores = useMemo(() => {
        return jobsData
            .filter(job => savedJobIds.includes(job.id))
            .map(job => ({
                ...job,
                matchScore: preferences ? calculateMatchScore(job, preferences) : null
            }));
    }, [savedJobIds, preferences]);

    const handleSaveToggle = (jobId) => {
        const updatedIds = savedJobIds.filter(id => id !== jobId);
        setSavedJobIds(updatedIds);
        localStorage.setItem('savedJobs', JSON.stringify(updatedIds));
    };

    return (
        <div className="max-width-text" style={{ padding: 'var(--space-64) var(--space-24)' }}>
            <h1 style={{ fontSize: '40px', marginBottom: 'var(--space-40)' }}>Saved Jobs</h1>

            {savedJobsWithScores.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
                    {savedJobsWithScores.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isSaved={true}
                            onSave={handleSaveToggle}
                            onView={setSelectedJob}
                            matchScore={job.matchScore}
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
