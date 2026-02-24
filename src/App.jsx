import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import NavBar from './components/layout/NavBar';
import Page from './components/layout/Page';

const App = () => {
  return (
    <Router>
      <div className="app-shell">
        <NavBar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Page title="Dashboard" />} />
            <Route path="/settings" element={<Page title="Settings" />} />
            <Route path="/saved" element={<Page title="Saved" />} />
            <Route path="/digest" element={<Page title="Digest" />} />
            <Route path="/proof" element={<Page title="Proof" />} />

            {/* 404 Page */}
            <Route
              path="*"
              element={
                <div className="max-width-text" style={{ padding: 'var(--space-64) var(--space-24)' }}>
                  <h1 style={{ fontSize: '40px', marginBottom: 'var(--space-16)' }}>Page Not Found</h1>
                  <p style={{ opacity: 0.6, fontSize: '18px' }}>
                    The page you are looking for does not exist.
                  </p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
