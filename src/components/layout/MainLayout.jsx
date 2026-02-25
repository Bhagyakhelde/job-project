import React from 'react';
import TopBar from './TopBar';
import ContextHeader from './ContextHeader';
import ProofFooter from './ProofFooter';
import './MainLayout.css';

const MainLayout = ({ children, title, subtext, step = '05', status = 'In Progress' }) => {
    return (
        <div className="app-container">
            <TopBar step={step} status={status} />
            <ContextHeader title={title} subtext={subtext} />

            <main className="workspace-container">
                <div className="primary-workspace">
                    {children}
                </div>

                <aside className="secondary-panel">
                    <div className="panel-content">
                        <h4 style={{ marginBottom: 'var(--space-24)' }}>Build Steps</h4>
                        <div className="prompt-box">
                            <code>Upgrade job listing with match scoring logic.</code>
                            <button className="copy-btn">Copy</button>
                        </div>

                        <div className="panel-actions" style={{ marginTop: 'var(--space-40)', display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
                            <button className="panel-btn">Build in Lovable</button>
                            <button className="panel-btn success">It Worked</button>
                            <button className="panel-btn error">Error</button>
                        </div>
                    </div>
                </aside>
            </main>

            <ProofFooter />
        </div >
    );
};

export default MainLayout;
