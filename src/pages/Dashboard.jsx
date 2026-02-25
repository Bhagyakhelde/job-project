import React from 'react';
import Card from '../components/ui/Card';

const Dashboard = () => {
    return (
        <div className="max-width-text" style={{ padding: 'var(--space-64) var(--space-24)' }}>
            <h1 style={{ fontSize: '40px', marginBottom: 'var(--space-40)' }}>Dashboard</h1>

            <Card>
                <div style={{
                    textAlign: 'center',
                    padding: 'var(--space-64) 0',
                    opacity: 0.7
                }}>
                    <p style={{ fontSize: '20px', marginBottom: 'var(--space-16)' }}>
                        No jobs yet.
                    </p>
                    <p style={{ fontSize: '16px' }}>
                        In the next step, you will load a realistic dataset.
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;
