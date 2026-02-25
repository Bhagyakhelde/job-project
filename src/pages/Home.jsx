import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="max-width-text" style={{
            padding: 'var(--space-64) var(--space-24)',
            textAlign: 'center',
            marginTop: 'var(--space-64)'
        }}>
            <h1 style={{
                fontSize: '64px',
                marginBottom: 'var(--space-24)',
                lineHeight: '1.1'
            }}>
                Stop Missing The Right Jobs.
            </h1>
            <p style={{
                fontSize: '20px',
                opacity: 0.7,
                marginBottom: 'var(--space-40)',
                maxWidth: '600px',
                margin: '0 auto var(--space-40)'
            }}>
                Precision-matched job discovery delivered daily at 9AM.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => navigate('/settings')} style={{ padding: 'var(--space-16) var(--space-40)' }}>
                    Start Tracking
                </Button>
            </div>
        </div>
    );
};

export default Home;
