import React, { useState } from 'react';
import './ProofFooter.css';

const ProofFooter = () => {
    const [proofs, setProofs] = useState({
        uiBuilt: false,
        logicWorking: false,
        testPassed: false,
        deployed: false
    });

    const toggle = (key) => setProofs(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <footer className="proof-footer">
            <div className="proof-container">
                <label className="proof-item">
                    <input type="checkbox" checked={proofs.uiBuilt} onChange={() => toggle('uiBuilt')} />
                    <span>UI Built</span>
                </label>
                <label className="proof-item">
                    <input type="checkbox" checked={proofs.logicWorking} onChange={() => toggle('logicWorking')} />
                    <span>Logic Working</span>
                </label>
                <label className="proof-item">
                    <input type="checkbox" checked={proofs.testPassed} onChange={() => toggle('testPassed')} />
                    <span>Test Passed</span>
                </label>
                <label className="proof-item">
                    <input type="checkbox" checked={proofs.deployed} onChange={() => toggle('deployed')} />
                    <span>Deployed</span>
                </label>
            </div>
            <div className="proof-input-area">
                <input type="text" placeholder="Enter proof URL or comment..." className="proof-input" />
            </div>
        </footer>
    );
};

export default ProofFooter;
