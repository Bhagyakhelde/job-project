import React from 'react';
import Card from '../components/ui/Card';

const Saved = () => {
    return (
        <div className="max-width-text" style={{ padding: 'var(--space-64) var(--space-24)' }}>
            <h1 style={{ fontSize: '40px', marginBottom: 'var(--space-40)' }}>Saved Jobs</h1>

            <Card>
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
            </Card>
        </div>
    );
};

export default Saved;
