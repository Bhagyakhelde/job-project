import React from 'react';
import Card from '../components/ui/Card';

const Digest = () => {
    return (
        <div className="max-width-text" style={{ padding: 'var(--space-64) var(--space-24)' }}>
            <h1 style={{ fontSize: '40px', marginBottom: 'var(--space-40)' }}>Daily Digest</h1>

            <Card>
                <div style={{
                    textAlign: 'center',
                    padding: 'var(--space-64) 0',
                    opacity: 0.7
                }}>
                    <p style={{ fontSize: '20px', marginBottom: 'var(--space-16)' }}>
                        Daily summaries coming soon.
                    </p>
                    <p style={{ fontSize: '16px', maxWidth: '440px', margin: '0 auto' }}>
                        Every morning at 9AM, we'll deliver a curated summary of new opportunities matching your exactly defined preferences.
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Digest;
