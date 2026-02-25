import React, { useState, useEffect, useMemo } from 'react';
import { jobsData } from '../data/jobsData';
import { calculateMatchScore, getScoreColor } from '../utils/matchEngine';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Digest = () => {
    const navigate = useNavigate();
    const [preferences, setPreferences] = useState(null);
    const [digest, setDigest] = useState(null);
    const [statusHistory, setStatusHistory] = useState([]);
    const [dateString] = useState(new Date().toISOString().split('T')[0]);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        // Load preferences
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }

        // Load existing digest for today
        const existingDigest = localStorage.getItem(`jobTrackerDigest_${dateString}`);
        if (existingDigest) {
            setDigest(JSON.parse(existingDigest));
        }

        // Load status history
        const savedHistory = JSON.parse(localStorage.getItem('jobTrackerStatusHistory') || '[]');
        setStatusHistory(savedHistory);
    }, [dateString]);

    const generateDigest = () => {
        if (!preferences) return;
        setIsGenerating(true);

        // Simulate 9AM trigger logic
        setTimeout(() => {
            const scoredJobs = jobsData.map(job => ({
                ...job,
                matchScore: calculateMatchScore(job, preferences)
            }));

            // Sort by matchScore desc, then postedDaysAgo asc
            const topJobs = scoredJobs
                .sort((a, b) => {
                    if (b.matchScore !== a.matchScore) {
                        return b.matchScore - a.matchScore;
                    }
                    return a.postedDaysAgo - b.postedDaysAgo;
                })
                .slice(0, 10);

            setDigest(topJobs);
            localStorage.setItem(`jobTrackerDigest_${dateString}`, JSON.stringify(topJobs));
            setIsGenerating(false);
        }, 1200);
    };

    const copyToClipboard = () => {
        if (!digest) return;
        const text = digest.map((job, i) =>
            `${i + 1}. ${job.title} @ ${job.company}\n   Location: ${job.location}\n   Match: ${job.matchScore}%\n   Apply: ${job.applyUrl}`
        ).join('\n\n');

        navigator.clipboard.writeText(`My 9AM Job Digest - ${dateString}\n\n${text}`);
        alert('Digest copied to clipboard!');
    };

    const createEmailDraft = () => {
        if (!digest) return;
        const subject = encodeURIComponent(`My 9AM Job Digest - ${dateString}`);
        const body = encodeURIComponent(
            digest.map(job =>
                `${job.title} at ${job.company}\nMatch Score: ${job.matchScore}%\nApply: ${job.applyUrl}`
            ).join('\n\n')
        );
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    return (
        <div className="max-width-text" style={{ padding: 'var(--space-64) var(--space-24)' }}>
            <h1 style={{ fontSize: '40px', marginBottom: 'var(--space-16)' }}>Daily Digest</h1>
            <p style={{ opacity: 0.6, marginBottom: 'var(--space-40)', fontSize: '18px' }}>
                Your personalized 9AM roundup of the best-matched opportunities.
            </p>

            {!preferences ? (
                <div style={{
                    textAlign: 'center',
                    padding: 'var(--space-64) 0',
                    backgroundColor: '#fff',
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid var(--border-color)'
                }}>
                    <p style={{ fontSize: '20px', marginBottom: 'var(--space-16)', fontWeight: '500' }}>
                        Set preferences to generate a personalized digest.
                    </p>
                    <Button variant="secondary" onClick={() => navigate('/settings')}>Go to Settings</Button>
                </div>
            ) : !digest ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-64) 0' }}>
                    <Button
                        onClick={generateDigest}
                        style={{ padding: 'var(--space-16) var(--space-40)' }}
                        disabled={isGenerating}
                    >
                        {isGenerating ? 'Analyzing Opportunities...' : "Generate Today's 9AM Digest (Simulated)"}
                    </Button>
                    <p style={{ marginTop: 'var(--space-24)', fontSize: '14px', opacity: 0.5, fontStyle: 'italic' }}>
                        Demo Mode: Daily 9AM trigger simulated manually.
                    </p>
                </div>
            ) : (
                <div className="digest-container" style={{ margin: '0 auto', maxWidth: '720px' }}>

                    <div className="digest-actions" style={{ marginBottom: 'var(--space-24)', display: 'flex', gap: 'var(--space-16)' }}>
                        <Button variant="secondary" onClick={copyToClipboard}>Copy Digest to Clipboard</Button>
                        <Button variant="secondary" onClick={createEmailDraft}>Create Email Draft</Button>
                        <Button variant="secondary" onClick={() => { localStorage.removeItem(`jobTrackerDigest_${dateString}`); setDigest(null); }}>Reset</Button>
                    </div>

                    <div className="email-newsletter" style={{
                        backgroundColor: '#fff',
                        padding: 'var(--space-64) var(--space-40)',
                        borderRadius: 'var(--border-radius)',
                        border: '1px solid var(--border-color)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                    }}>
                        <header style={{ textAlign: 'center', marginBottom: 'var(--space-64)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-40)' }}>
                            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', marginBottom: '8px' }}>
                                Top 10 Jobs For You — 9AM Digest
                            </h2>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '14px', opacity: 0.5 }}>
                                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                        </header>

                        {digest.length > 0 ? (
                            <div className="digest-jobs-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-40)' }}>
                                {digest.map((job, index) => (
                                    <div key={job.id} style={{
                                        paddingBottom: 'var(--space-40)',
                                        borderBottom: index === digest.length - 1 ? 'none' : '1px solid #f0f0f0'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-8)' }}>
                                            <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '20px' }}>
                                                {index + 1}. {job.title}
                                            </h3>
                                            <span style={{
                                                color: getScoreColor(job.matchScore),
                                                fontWeight: '600',
                                                fontSize: '14px'
                                            }}>
                                                {job.matchScore}% Match
                                            </span>
                                        </div>
                                        <p style={{ margin: '0 0 var(--space-16) 0', fontSize: '16px', opacity: 0.7 }}>
                                            {job.company} • {job.location} • {job.experience}
                                        </p>
                                        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                            <Button variant="secondary" style={{ padding: '8px 24px', fontSize: '14px' }}>Apply</Button>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: 'var(--space-40) 0' }}>
                                <p style={{ fontSize: '18px', opacity: 0.7 }}>No matching roles today. Check again tomorrow.</p>
                            </div>
                        )}

                        {statusHistory.length > 0 && (
                            <div className="status-history-section" style={{ marginTop: 'var(--space-64)', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-40)' }}>
                                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', marginBottom: 'var(--space-24)' }}>
                                    Recent Status Updates
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {statusHistory.slice(0, 5).map((log, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                                            <div>
                                                <span style={{ fontWeight: '600' }}>{log.title}</span>
                                                <span style={{ opacity: 0.5 }}> @ {log.company}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{
                                                    padding: '2px 8px',
                                                    borderRadius: '10px',
                                                    backgroundColor: log.status === 'Applied' ? '#3b82f6' : (log.status === 'Rejected' ? '#ef4444' : (log.status === 'Selected' ? 'var(--success-color)' : '#888')),
                                                    color: '#fff',
                                                    fontSize: '11px',
                                                    fontWeight: '600'
                                                }}>
                                                    {log.status}
                                                </span>
                                                <span style={{ opacity: 0.4, fontSize: '12px' }}>{log.date.split(',')[0]}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <footer style={{ marginTop: 'var(--space-64)', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-40)', textAlign: 'center' }}>
                            <p style={{ fontSize: '14px', opacity: 0.5, fontStyle: 'italic', maxWidth: '400px', margin: '0 auto' }}>
                                This digest was generated based on your preferences. To update your criteria, visit the settings page.
                            </p>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Digest;
