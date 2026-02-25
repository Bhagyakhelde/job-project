import React, { useState, useEffect, useMemo } from 'react';
import { jobsData } from '../data/jobsData';
import JobCard from '../components/jobs/JobCard';
import FilterBar from '../components/jobs/FilterBar';
import JobModal from '../components/jobs/JobModal';
import { calculateMatchScore } from '../utils/matchEngine';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [preferences, setPreferences] = useState(null);
    const [showOnlyMatches, setShowOnlyMatches] = useState(false);
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
        // Load preferences
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            try {
                setPreferences(JSON.parse(savedPrefs));
            } catch (e) {
                console.error("Failed to parse preferences", e);
            }
        }

        // Load saved jobs
        const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setSavedJobIds(saved);
    }, []);

    const jobsWithScores = useMemo(() => {
        return jobsData.map(job => ({
            ...job,
            matchScore: preferences ? calculateMatchScore(job, preferences) : null,
            // Extract numeric salary for sorting (e.g., "12–18 LPA" -> 18)
            numericSalary: (() => {
                const match = job.salaryRange.match(/(\d+)/g);
                return match ? parseInt(match[match.length - 1]) : 0;
            })()
        }));
    }, [preferences]);

    const filteredJobs = useMemo(() => {
        let results = jobsWithScores.filter(job => {
            const matchKeyword = job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                job.company.toLowerCase().includes(filters.keyword.toLowerCase());
            const matchLocation = filters.location === '' || job.location === filters.location;
            const matchMode = filters.mode === '' || job.mode === filters.mode;
            const matchExperience = filters.experience === '' || job.experience === filters.experience;
            const matchSource = filters.source === '' || job.source === filters.source;

            // Match score threshold logic
            const matchThreshold = !showOnlyMatches ||
                (job.matchScore !== null && job.matchScore >= (preferences?.minMatchScore || 0));

            return matchKeyword && matchLocation && matchMode && matchExperience && matchSource && matchThreshold;
        });

        // Sorting Logic
        if (filters.sort === 'latest') {
            results.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        } else if (filters.sort === 'match') {
            results.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        } else if (filters.sort === 'salary') {
            results.sort((a, b) => b.numericSalary - a.numericSalary);
        } else if (filters.sort === 'oldest') {
            results.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
        }

        return results;
    }, [jobsWithScores, filters, showOnlyMatches, preferences]);

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-40)' }}>
                <h1 style={{ fontSize: '40px', margin: 0 }}>Explore Jobs</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500', opacity: 0.7 }}>Threshold Filter</span>
                    <button
                        onClick={() => setShowOnlyMatches(!showOnlyMatches)}
                        style={{
                            width: '40px',
                            height: '24px',
                            borderRadius: '12px',
                            backgroundColor: showOnlyMatches ? 'var(--accent-color)' : '#ddd',
                            border: 'none',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            position: 'absolute',
                            top: '2px',
                            left: showOnlyMatches ? '18px' : '2px',
                            transition: 'left 0.2s'
                        }} />
                    </button>
                    <span style={{ fontSize: '14px', fontWeight: '500', opacity: showOnlyMatches ? 1 : 0.5 }}>
                        Only {preferences?.minMatchScore || 40}%+
                    </span>
                </div>
            </div>

            {!preferences && (
                <div style={{
                    backgroundColor: 'rgba(139, 0, 0, 0.05)',
                    border: '1px solid rgba(139, 0, 0, 0.2)',
                    padding: 'var(--space-24)',
                    borderRadius: 'var(--border-radius)',
                    marginBottom: 'var(--space-40)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <p style={{ margin: 0, fontWeight: '500', color: 'var(--accent-color)' }}>
                        Set your preferences to activate intelligent matching.
                    </p>
                    <Button variant="secondary" onClick={() => navigate('/settings')}>Set Preferences</Button>
                </div>
            )}

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
                            matchScore={job.matchScore}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: 'var(--space-64) 0' }}>
                    <p style={{ fontSize: '20px', opacity: 0.7 }}>
                        {preferences ? "No roles match your criteria. Adjust filters or lower threshold." : "No jobs match your search."}
                    </p>
                </div>
            )}

            {selectedJob && (
                <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
        </div>
    );
};

export default Dashboard;
