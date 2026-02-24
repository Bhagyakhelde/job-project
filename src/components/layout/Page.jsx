import React from 'react';

const Page = ({ title }) => {
    return (
        <div className="max-width-text" style={{ padding: 'var(--space-64) var(--space-24)' }}>
            <h1 style={{ fontSize: '40px', marginBottom: 'var(--space-16)' }}>{title}</h1>
            <p style={{ opacity: 0.6, fontSize: '18px' }}>
                This section will be built in the next step.
            </p>
        </div>
    );
};

export default Page;
