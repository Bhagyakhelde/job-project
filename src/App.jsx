import React from 'react';
import './index.css';
import TopBar from './components/layout/TopBar';
import ContextHeader from './components/layout/ContextHeader';
import MainLayout from './components/layout/MainLayout';
import ProofFooter from './components/layout/ProofFooter';
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import Input from './components/ui/Input';
import Badge from './components/ui/Badge';

function App() {
  const secondaryContent = (
    <div className="secondary-container">
      <Card title="Step Explanation">
        <p style={{ fontSize: '14px', marginBottom: 'var(--space-16)' }}>
          This system uses a strict 70/30 split to maintain focus. Use the primary workspace for core tasks and this side panel for auxiliary information or configuration.
        </p>
        <Button variant="secondary" style={{ width: '100%' }}>View Documentation</Button>
      </Card>

      <Card title="Copyable Prompt">
        <div style={{
          padding: 'var(--space-16)',
          background: 'rgba(0,0,0,0.03)',
          borderRadius: 'var(--border-radius)',
          fontSize: '13px',
          fontFamily: 'monospace',
          marginBottom: 'var(--space-16)'
        }}>
          system_init --mode calm --accent #880000 --font serif
        </div>
        <Button variant="secondary" style={{ width: '100%' }}>Copy Snippet</Button>
      </Card>
    </div>
  );

  return (
    <div className="app">
      <TopBar step="1/1" status="Not Started" />

      <ContextHeader
        title="Foundation: Design System"
        subtitle="A calm, intentional environment for building the next generation of job notifications."
      />

      <MainLayout secondaryPanel={secondaryContent}>
        <div className="max-width-text">
          <section style={{ marginBottom: 'var(--space-64)' }}>
            <h2 style={{ fontSize: '24px', marginBottom: 'var(--space-24)' }}>Core Components</h2>

            <Card title="Interactive Elements">
              <div style={{ display: 'flex', gap: 'var(--space-16)', marginBottom: 'var(--space-24)' }}>
                <Button>Primary Action</Button>
                <Button variant="secondary">Secondary Action</Button>
              </div>

              <Input
                label="Organization Name"
                placeholder="e.g. Acme Corp"
                helperText="This name will appear on all outgoing job notifications."
              />
            </Card>

            <Card title="Status & Indicators">
              <div style={{ display: 'flex', gap: 'var(--space-16)' }}>
                <Badge variant="neutral">Not Started</Badge>
                <Badge variant="success">Shipped</Badge>
              </div>
            </Card>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: 'var(--space-24)' }}>Design Philosophy</h2>
            <p style={{ marginBottom: 'var(--space-16)' }}>
              Our design system is built on the principles of confidence and clarity. We avoid the "noise" typical of modern SaaS by eliminating unnecessary animations, gradients, and shadows.
            </p>
            <p>
              By adhering to a strict spacing scale and limited color palette, we ensure every interface feels cohesive and high-end.
            </p>
          </section>
        </div>
      </MainLayout >

      <ProofFooter />
    </div >
  );
}

export default App;
