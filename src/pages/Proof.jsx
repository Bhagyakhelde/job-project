import React from 'react';
import Card from '../components/ui/Card';
import MainLayout from '../components/layout/MainLayout';

const Proof = () => {
    return (
        <MainLayout
            title="Evidence of Work"
            subtext="Proof of implementation for all project phases."
            step="08"
            status="In Progress"
        >
            <Card title="Implementation Proof">
                <p>All phases from 1 to 8 have been implemented following the premium KodNest design system.</p>
            </Card>
        </MainLayout>
    );
};

export default Proof;
