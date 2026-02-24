import React from 'react';
import './MainLayout.css';

const MainLayout = ({ children, secondaryPanel }) => {
    return (
        <main className="main-layout">
            <div className="primary-workspace">
                {children}
            </div>
            <aside className="secondary-panel">
                {secondaryPanel}
            </aside>
        </main>
    );
};

export default MainLayout;
