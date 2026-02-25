import React from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Settings = () => {
    return (
        <div className="max-width-text" style={{ padding: 'var(--space-64) var(--space-24)' }}>
            <h1 style={{ fontSize: '40px', marginBottom: 'var(--space-40)' }}>Settings</h1>

            <Card title="Job Preferences">
                <Input
                    label="Role Keywords"
                    placeholder="e.g. Senior Frontend Engineer, Product Designer"
                    helperText="Comma separated values used for matching."
                />

                <Input
                    label="Preferred Locations"
                    placeholder="e.g. London, Remote, New York"
                />

                <div style={{ marginBottom: 'var(--space-24)' }}>
                    <label style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        opacity: 0.8,
                        display: 'block',
                        marginBottom: 'var(--space-8)'
                    }}>
                        Work Mode
                    </label>
                    <div style={{ display: 'flex', gap: 'var(--space-16)' }}>
                        <label style={{ fontSize: '15px' }}><input type="checkbox" /> Remote</label>
                        <label style={{ fontSize: '15px' }}><input type="checkbox" /> Hybrid</label>
                        <label style={{ fontSize: '15px' }}><input type="checkbox" /> Onsite</label>
                    </div>
                </div>

                <div style={{ marginBottom: 'var(--space-40)' }}>
                    <label style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        opacity: 0.8,
                        display: 'block',
                        marginBottom: 'var(--space-8)'
                    }}>
                        Experience Level
                    </label>
                    <select className="input-control" style={{ width: '100%', padding: 'var(--space-16)', background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)' }}>
                        <option>Junior (0-2 years)</option>
                        <option>Mid-level (2-5 years)</option>
                        <option>Senior (5+ years)</option>
                        <option>Lead / Principal</option>
                    </select>
                </div>

                <Button>Save Preferences</Button>
            </Card>
        </div>
    );
};

export default Settings;
