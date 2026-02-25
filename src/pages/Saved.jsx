import React, { useState, useEffect, useMemo } from 'react';
import { jobsData } from '../data/jobsData';
import JobCard from '../components/jobs/JobCard';
import JobModal from '../components/jobs/JobModal';
import { calculateMatchScore } from '../utils/matchEngine';
import Toast from '../components/ui/Toast';
import MainLayout from '../components/layout/MainLayout';

const Saved = () => {
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [preferences, setPreferences] = useState(null);
    const [statuses, setStatuses] = useState({});
    const [toast, setToast] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        // Load preferences
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }

        // Load statuses
        const savedStatuses = JSON.parse(localStorage.getItem('jobTrackerStatuses') || '{}');
        setStatuses(savedStatuses);

        // Load saved jobs from localStorage
        const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setSavedJobIds(savedIds);
    }, []);

    const handleStatusChange = (jobId, newStatus) => {
        const updatedStatuses = { ...statuses, [jobId]: newStatus };
        setStatuses(updatedStatuses);
        localStorage.setItem('jobTrackerStatuses', JSON.stringify(updatedStatuses));

        // Log history for digest
        const history = JSON.parse(localStorage.getItem('jobTrackerStatusHistory') || '[]');
        const job = jobsData.find(j => j.id === jobId);
        history.unshift({
            jobId,
            title: job.title,
            company: job.company,
            status: newStatus,
            date: new Date().toLocaleString()
        });
        localStorage.setItem('jobTrackerStatusHistory', JSON.stringify(history.slice(0, 50)));

        setToast({ message: `Status updated: ${newStatus}`, type: 'info' });
    };

    const savedJobsWithScores = useMemo(() => {
        return jobsData
            .filter(job => savedJobIds.includes(job.id))
            .map(job => ({
                ...job,
                matchScore: preferences ? calculateMatchScore(job, preferences) : null,
                status: statuses[job.id] || 'Not Applied'
            }));
    }, [savedJobIds, preferences, statuses]);

    const handleSaveToggle = (jobId) => {
        const updatedIds = savedJobIds.filter(id => id !== jobId);
        setSavedJobIds(updatedIds);
        localStorage.setItem('savedJobs', JSON.stringify(updatedIds));
    };

    return (
        <MainLayout
            title="Saved Jobs"
            subtext="Your personal collection of high-matched opportunities."
            step="05"
            status="In Progress"
        >
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
                            status={job.status}
                            onStatusChange={handleStatusChange}
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

            {toast && <Toast message={toast.message} type={toast.type} onClear={() => setToast(null)} />}
        </MainLayout>
    );
};

export default Saved;
