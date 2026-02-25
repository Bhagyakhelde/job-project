import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="h-4 w-1/2 bg-slate-100 rounded mb-4 animate-pulse"></div>
                        <div className="h-8 w-3/4 bg-slate-50 rounded mb-2"></div>
                        <div className="h-4 w-full bg-slate-50 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
