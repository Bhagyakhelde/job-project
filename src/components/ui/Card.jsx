import React from 'react';

const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children, className = "" }) => (
    <div className={`p-6 pb-4 ${className}`}>
        {children}
    </div>
);

const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-bold text-slate-900 ${className}`}>
        {children}
    </h3>
);

const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
);

export { Card, CardHeader, CardTitle, CardContent };
export default Card;
