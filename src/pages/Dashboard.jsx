import React, { useState, useEffect } from 'react';
import { jobsData } from '../data/jobsData';
import JobCard from '../components/jobs/JobCard';
import FilterBar from '../components/jobs/FilterBar';
import JobModal from '../components/jobs/JobModal';

const Dashboard = () => {
    const [filteredJobs, setFilteredJobs] = useState(jobsData);
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        sort: 'latest'
    });
    const [selectedJob, setSelectedJob] = useState(null);
    const [savedJobIds, setSavedJobIds] = useState([]);

    useEffect(() => {
        // Load saved jobs from localStorage
        const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setSavedJobIds(saved);
    }, []);

    useEffect(() => {
        let results = jobsData.filter(job => {
            const matchKeyword = job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                job.company.toLowerCase().includes(filters.keyword.toLowerCase());
            const matchLocation = filters.location === '' || job.location === filters.location;
            const matchMode = filters.mode === '' || job.mode === filters.mode;
            const matchExperience = filters.experience === '' || job.experience === filters.experience;
            const matchSource = filters.source === '' || job.source === filters.source;

            return matchKeyword && matchLocation && matchMode && matchExperience && matchSource;
        });

        if (filters.sort === 'latest') {
            results.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        } else {
            results.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
        }

        setFilteredJobs(results);
    }, [filters]);

    const handleSaveToggle = (jobId) => {
        let updated;
        if (savedJobIds.includes(jobId)) {
            updated = savedJobIds.filter(id => id !== jobId);
        } else {
            updated = [...savedJobIds, jobId];
        }
        setSavedJobIds(updated);
        localStorage.setItem('savedJobs', JSON.stringify(updated));
    };

    return (
        <div className="max-width-text" style={{ padding: 'var(--space-64) var(--space-24)' }}>
            <h1 style={{ fontSize: '40px', marginBottom: 'var(--space-40)' }}>Explore Jobs</h1>

            <FilterBar filters={filters} onFilterChange={setFilters} />

            {filteredJobs.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
                    {filteredJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isSaved={savedJobIds.includes(job.id)}
                            onSave={handleSaveToggle}
                            onView={setSelectedJob}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: 'var(--space-64) 0', opacity: 0.6 }}>
                    <p style={{ fontSize: '20px' }}>No jobs match your search.</p>
                </div>
            )}

            {selectedJob && (
                <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
        </div>
    );
};

export default Dashboard;
