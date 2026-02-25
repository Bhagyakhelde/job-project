import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { ChevronRight, Calendar, CheckCircle2, ListTodo, HelpCircle, Trophy, ArrowLeft, History } from 'lucide-react';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        // Preference: check location state (from History), then fallback to latest_analysis
        const historyData = location.state?.analysisData;
        const latestData = localStorage.getItem('latest_analysis');

        if (historyData) {
            setData(historyData);
        } else if (latestData) {
            setData(JSON.parse(latestData));
        } else {
            navigate('/analyze');
        }
    }, [location, navigate]);

    if (!data) return null;

    // Readiness Circle constants
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (data.readinessScore / 100) * circumference;

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <button
                        onClick={() => navigate('/history')}
                        className="text-primary text-sm font-bold flex items-center gap-1 mb-4 hover:underline"
                    >
                        <History className="w-4 h-4" /> View History
                    </button>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                        {data.role || 'Role'} at <span className="text-primary italic">{data.company || 'Company'}</span>
                    </h2>
                    <p className="text-slate-500 mt-1">Generated Plan - {new Date(data.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-6 shadow-sm">
                    <div className="relative w-20 h-20">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="40" cy="40" r="34" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                            <circle
                                cx="40" cy="40" r="34" stroke="hsl(245, 58%, 51%)" strokeWidth="6"
                                fill="transparent" strokeDasharray={2 * Math.PI * 34}
                                style={{ strokeDashoffset: (2 * Math.PI * 34) - (data.readinessScore / 100) * (2 * Math.PI * 34) }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                            {data.readinessScore}%
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Match Score</div>
                        <div className="text-xl font-bold text-slate-900">Highly Ready</div>
                    </div>
                </div>
            </header>

            {/* Skills & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            Extracted Skills (Heuristic)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {Object.keys(data.extractedSkills).length > 0 ? (
                                Object.entries(data.extractedSkills).map(([category, skills]) => (
                                    <div key={category}>
                                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{category}</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map(skill => (
                                                <span key={skill} className="bg-indigo-50 text-primary px-3 py-1.5 rounded-lg text-sm font-semibold border border-indigo-100">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-amber-700 flex items-center gap-3">
                                    <Trophy className="w-5 h-5" />
                                    <span className="font-medium text-sm">General fresher stack detected. Focus on Core CS fundamentals.</span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ListTodo className="w-5 h-5 text-primary" />
                            7-Day Fast Track
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {data.plan.map((dayPlan, idx) => (
                            <div key={idx} className="flex gap-4 group">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold border border-slate-200 group-hover:bg-primary group-hover:text-white transition-colors">
                                        {idx + 1}
                                    </div>
                                    {idx !== data.plan.length - 1 && <div className="w-px h-full bg-slate-100"></div>}
                                </div>
                                <div className="pb-6">
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{dayPlan.day}</div>
                                    <div className="font-bold text-slate-800 text-sm mt-0.5">{dayPlan.task}</div>
                                    <div className="text-xs text-slate-500 mt-1 leading-relaxed">{dayPlan.detail}</div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Preparation Checklists */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-primary pl-4">Round-wise Checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.checklist.map((round, idx) => (
                        <Card key={idx}>
                            <CardHeader className="bg-slate-50/50 py-4 px-6 border-b border-slate-100">
                                <CardTitle className="text-sm font-bold text-slate-700">{round.round}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <ul className="space-y-3">
                                    {round.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-4 h-4 rounded border border-slate-300 mt-0.5 shrink-0 group hover:border-primary cursor-pointer"></div>
                                            <span className="text-sm text-slate-600 leading-tight">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Interview Prep */}
            <Card className="border-t-4 border-t-primary shadow-xl shadow-indigo-100/30">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-xl italic">
                        <HelpCircle className="w-6 h-6 text-primary" />
                        Top 10 High-Likelihood Questions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4">
                        {data.questions.map((q, idx) => (
                            <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                                <span className="text-primary font-black opacity-20 text-4xl leading-none group-hover:opacity-40 transition-opacity">{String(idx + 1).padStart(2, '0')}</span>
                                <p className="text-slate-700 font-medium text-sm leading-relaxed">{q}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <footer className="flex justify-center pt-8 pb-12">
                <button
                    onClick={() => navigate('/analyze')}
                    className="flex items-center gap-2 text-slate-400 font-bold hover:text-primary transition-colors text-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Start New Analysis
                </button>
            </footer>
        </div>
    );
};

export default Results;
