import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import MainLayout from '../components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';

const Ship = () => {
    const navigate = useNavigate();
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        const savedStatus = JSON.parse(localStorage.getItem('jobTrackerTestStatus') || '{}');
        const passedCount = Object.values(savedStatus).filter(Boolean).length;
        setIsUnlocked(passedCount === 10);
    }, []);

    return (
        <MainLayout
            title="Status: Ship Readiness"
            subtext="Final gateway for project delivery."
            step="08"
            status={isUnlocked ? 'Shipped' : 'In Progress'}
        >
            <div className="max-width-text" style={{
                height: 'calc(100vh - 400px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: 'var(--space-24)'
            }}>
                {!isUnlocked ? (
                    <div style={{ maxWidth: '400px' }}>
                        <div style={{ fontSize: '64px', marginBottom: 'var(--space-24)' }}>🔒</div>
                        <h1 style={{ fontSize: '32px', marginBottom: 'var(--space-16)' }}>Ship Lock Active</h1>
                        <p style={{ opacity: 0.6, fontSize: '18px', marginBottom: 'var(--space-32)' }}>
                            Complete all tests before shipping. Your verification checklist is not yet full.
                        </p>
                        <Button onClick={() => navigate('/jt/07-test')}>Return to Checklist</Button>
                    </div>
                ) : (
                    <div style={{ maxWidth: '600px' }}>
                        <div style={{ fontSize: '64px', marginBottom: 'var(--space-24)' }}>🚀</div>
                        <h1 style={{ fontSize: '40px', marginBottom: 'var(--space-16)', fontFamily: 'var(--font-serif)' }}>
                            Vessel Ready for Deployment
                        </h1>
                        <p style={{ opacity: 0.7, fontSize: '20px', marginBottom: 'var(--space-40)', lineHeight: '1.6' }}>
                            All systems verified. The Job Notification Tracker has passed all 10 premium quality tests.
                            You are clear to launch.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <Button style={{ padding: '16px 48px' }} onClick={() => alert('Launching Production Build...')}>
                                Launch Now
                            </Button>
                            <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                                Back to Dashboard
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Ship;
