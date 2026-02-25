import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Settings = () => {
    const [preferences, setPreferences] = useState({
        roleKeywords: '',
        preferredLocations: [],
        preferredMode: [],
        experienceLevel: 'Fresher',
        skills: '',
        minMatchScore: 40
    });
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            try {
                const parsed = JSON.parse(savedPrefs);
                setPreferences(prev => ({
                    ...prev,
                    ...parsed,
                    // Ensure arrays are handled correctly
                    preferredMode: Array.isArray(parsed.preferredMode) ? parsed.preferredMode : [],
                    preferredLocations: Array.isArray(parsed.preferredLocations) ? parsed.preferredLocations : []
                }));
            } catch (e) {
                console.error("Failed to parse preferences", e);
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            const currentValues = [...preferences[name]];
            if (checked) {
                setPreferences({ ...preferences, [name]: [...currentValues, value] });
            } else {
                setPreferences({ ...preferences, [name]: currentValues.filter(v => v !== value) });
            }
        } else if (name === 'preferredLocations') {
            // For multi-select, value is the selected option's value
            // But we want to toggle it in an array for better UI if we use checkboxes or a multi-select
            // Let's use a similar UI to work mode for consistency and premium feel
        } else {
            setPreferences({ ...preferences, [name]: type === 'range' ? parseInt(value) : value });
        }
    };

    const toggleLocation = (loc) => {
        const currentLocs = [...preferences.preferredLocations];
        if (currentLocs.includes(loc)) {
            setPreferences({ ...preferences, preferredLocations: currentLocs.filter(l => l !== loc) });
        } else {
            setPreferences({ ...preferences, preferredLocations: [...currentLocs, loc] });
        }
    };

    const handleSave = () => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(preferences));
        setSaveStatus('Preferences saved successfully.');
        setTimeout(() => setSaveStatus(''), 3000);
    };

    const locations = [
        "Bangalore", "Chennai", "Noida", "Gurgaon", "Mumbai",
        "Pune", "Hyderabad", "Delhi", "Mysore", "Kochi", "Coimbatore"
    ];

    return (
        <div className="max-width-text" style={{ padding: 'var(--space-64) var(--space-24)' }}>
            <h1 style={{ fontSize: '40px', marginBottom: 'var(--space-40)' }}>Settings</h1>

            <Card title="Detailed Preferences">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>

                    <Input
                        label="Role Keywords"
                        name="roleKeywords"
                        value={preferences.roleKeywords}
                        onChange={handleChange}
                        placeholder="e.g. SDE Intern, Backend, Frontend"
                        helperText="Comma separated. Used for titles and descriptions."
                    />

                    <div className="input-group">
                        <label className="input-label">Preferred Locations</label>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                            gap: '12px',
                            marginTop: 'var(--space-8)',
                            maxHeight: '150px',
                            overflowY: 'auto',
                            padding: '8px',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--border-radius)'
                        }}>
                            {locations.map(loc => (
                                <label key={loc} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                                    <input
                                        type="checkbox"
                                        checked={preferences.preferredLocations.includes(loc)}
                                        onChange={() => toggleLocation(loc)}
                                    />
                                    {loc}
                                </label>
                            ))}
                        </div>
                        <p style={{ fontSize: '12px', opacity: 0.5, marginTop: '4px' }}>Select all that apply.</p>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Work Mode</label>
                        <div style={{ display: 'flex', gap: 'var(--space-24)', marginTop: 'var(--space-8)' }}>
                            {['Remote', 'Hybrid', 'Onsite'].map(mode => (
                                <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '15px' }}>
                                    <input
                                        type="checkbox"
                                        name="preferredMode"
                                        value={mode}
                                        checked={preferences.preferredMode.includes(mode)}
                                        onChange={handleChange}
                                    />
                                    {mode}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Experience Level</label>
                        <select
                            className="input-control"
                            name="experienceLevel"
                            value={preferences.experienceLevel}
                            onChange={handleChange}
                            style={{ width: '100%', padding: 'var(--space-16)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)' }}
                        >
                            <option value="Fresher">Fresher</option>
                            <option value="0-1">0-1 year</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                        </select>
                    </div>

                    <Input
                        label="Skills"
                        name="skills"
                        value={preferences.skills}
                        onChange={handleChange}
                        placeholder="e.g. React, Node.js, Python"
                        helperText="Comma separated. We match these against job requirements."
                    />

                    <div className="input-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
                            <label className="input-label">Minimum Match Score Threshold</label>
                            <span style={{ fontWeight: '600', color: 'var(--accent-color)' }}>{preferences.minMatchScore}%</span>
                        </div>
                        <input
                            type="range"
                            name="minMatchScore"
                            min="0"
                            max="100"
                            value={preferences.minMatchScore}
                            onChange={handleChange}
                            style={{ width: '100%', accentColor: 'var(--accent-color)' }}
                        />
                        <p style={{ fontSize: '12px', opacity: 0.5, marginTop: '4px' }}>
                            Jobs below this score will be hidden when the threshold filter is active.
                        </p>
                    </div>

                    <div style={{ marginTop: 'var(--space-16)', display: 'flex', alignItems: 'center', gap: 'var(--space-16)' }}>
                        <Button onClick={handleSave}>Save Preferences</Button>
                        {saveStatus && <span style={{ fontSize: '14px', color: 'var(--success-color)' }}>{saveStatus}</span>}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Settings;
