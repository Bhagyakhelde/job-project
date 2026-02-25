import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import NavBar from './components/layout/NavBar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Saved from './pages/Saved';
import Digest from './pages/Digest';
import Proof from './pages/Proof';
import TestChecklist from './pages/TestChecklist';
import Ship from './pages/Ship';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/digest" element={<Digest />} />
        <Route path="/proof" element={<Proof />} />
        <Route path="/jt/07-test" element={<TestChecklist />} />
        <Route path="/jt/08-ship" element={<Ship />} />

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
    </Router>
  );
};

export default App;
