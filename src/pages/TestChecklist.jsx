import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const checklistItems = [
    { id: 1, label: 'Preferences persist after refresh', tooltip: 'Set skills in Settings, refresh, check if they are still there.' },
    { id: 2, label: 'Match score calculates correctly', tooltip: 'Card should show % based on keywords/skills/loc.' },
    { id: 3, label: '"Show only matches" toggle works', tooltip: 'Enable "Show only matches" on Dashboard; list should shrink.' },
    { id: 4, label: 'Save job persists after refresh', tooltip: 'Save a job, refresh, check "Saved" page.' },
    { id: 5, label: 'Apply opens in new tab', tooltip: 'Click Apply, verify new tab with target URL.' },
    { id: 6, label: 'Status update persists after refresh', tooltip: 'Change to "Applied", refresh, check if preserved.' },
    { id: 7, label: 'Status filter works correctly', tooltip: 'Filter by "Applied", ensure only those show.' },
    { id: 8, label: 'Digest generates top 10 by score', tooltip: 'Generate digest, check if top score is first.' },
    { id: 9, label: 'Digest persists for the day', tooltip: 'Generate digest, refresh, ensure it\'s the same list.' },
    { id: 10, label: 'No console errors on main pages', tooltip: 'Open DevTools (F12), check for red error logs.' }
];

const TestChecklist = () => {
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        const savedStatus = JSON.parse(localStorage.getItem('jobTrackerTestStatus') || '{}');
        setCheckedItems(savedStatus);
    }, []);

    const handleToggle = (id) => {
        const newStatus = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newStatus);
        localStorage.setItem('jobTrackerTestStatus', JSON.stringify(newStatus));
    };

    const resetStatus = () => {
        setCheckedItems({});
        localStorage.removeItem('jobTrackerTestStatus');
    };

    const passedCount = Object.values(checkedItems).filter(Boolean).length;
    const isReady = passedCount === 10;

    return (
        <div className="max-width-text" style={{ padding: 'var(--space-64) var(--space-24)' }}>
            <div style={{ marginBottom: 'var(--space-40)' }}>
                <h1 style={{ fontSize: '40px', marginBottom: 'var(--space-8)' }}>Test Verification</h1>
                <p style={{ opacity: 0.6, fontSize: '18px' }}>Ensure all features meet the premium quality standard before ship.</p>
            </div>

            <div style={{
                backgroundColor: isReady ? '#ecfdf5' : '#fff7ed',
                padding: 'var(--space-24)',
                borderRadius: 'var(--border-radius)',
                border: `1px solid ${isReady ? '#10b981' : '#f59e0b'}`,
                marginBottom: 'var(--space-40)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h2 style={{ fontSize: '24px', margin: 0, color: isReady ? '#065f46' : '#92400e' }}>
                        Tests Passed: {passedCount} / 10
                    </h2>
                    {!isReady && (
                        <p style={{ margin: '8px 0 0 0', opacity: 0.7, fontSize: '14px' }}>
                            Resolve all issues before shipping.
                        </p>
                    )}
                </div>
                <Button variant="secondary" onClick={resetStatus} style={{ fontSize: '13px' }}>Reset Test Status</Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {checklistItems.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: 'var(--space-16) var(--space-24)',
                            backgroundColor: '#fff',
                            borderRadius: 'var(--border-radius)',
                            border: '1px solid var(--border-color)',
                            transition: 'all 0.2s',
                            opacity: checkedItems[item.id] ? 0.6 : 1
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={!!checkedItems[item.id]}
                            onChange={() => handleToggle(item.id)}
                            style={{
                                width: '20px',
                                height: '20px',
                                marginRight: '16px',
                                cursor: 'pointer',
                                accentColor: 'var(--accent-color)'
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            <span style={{
                                fontSize: '16px',
                                fontWeight: '500',
                                textDecoration: checkedItems[item.id] ? 'line-through' : 'none'
                            }}>
                                {item.label}
                            </span>
                        </div>
                        <div
                            title={item.tooltip}
                            style={{
                                cursor: 'help',
                                opacity: 0.4,
                                fontSize: '12px',
                                border: '1px solid #000',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '900'
                            }}
                        >
                            ?
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 'var(--space-64)', textAlign: 'center' }}>
                <a href="/jt/08-ship" style={{ textDecoration: 'none' }}>
                    <Button disabled={!isReady} style={{ padding: 'var(--space-16) var(--space-40)' }}>
                        Proceed to Ship Launch
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default TestChecklist;
