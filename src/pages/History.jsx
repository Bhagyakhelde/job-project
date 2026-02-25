import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { getHistory } from '../utils/analysis';
import { Search, History as HistoryIcon, Building2, BriefcaseText, ArrowRight, Trash2, Calendar } from 'lucide-react';

const History = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const filteredHistory = history.filter(item =>
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (item) => {
        navigate('/results', { state: { analysisData: item } });
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        const updated = history.filter(item => item.id !== id);
        setHistory(updated);
        localStorage.setItem('prep_history', JSON.stringify(updated));
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <HistoryIcon className="w-8 h-8 text-primary" />
                        Analysis History
                    </h2>
                    <p className="text-slate-500 mt-1">Review your past prep plans and track your readiness over time.</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search company or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none w-full md:w-64"
                    />
                </div>
            </header>

            {filteredHistory.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {filteredHistory.map((item) => (
                        <Card
                            key={item.id}
                            className="group hover:border-primary/50 cursor-pointer transition-all active:scale-[0.99]"
                        >
                            <div className="p-1" onClick={() => handleSelect(item)}>
                                <div className="p-5 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        {/* Score Badge */}
                                        <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 flex flex-col items-center justify-center">
                                            <span className="text-lg font-black text-primary leading-none">{item.readinessScore}</span>
                                            <span className="text-[8px] font-bold text-primary/60 uppercase">Score</span>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-primary transition-colors">
                                                {item.company}
                                                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                                <span className="font-semibold text-slate-500 text-sm">{item.role}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <BriefcaseText className="w-3 h-3" />
                                                    {Object.keys(item.extractedSkills).flat().length || 0} Skills Detected
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={(e) => handleDelete(item.id, e)}
                                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-white border border-dashed border-slate-200 rounded-3xl">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HistoryIcon className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">No analysis found</h3>
                    <p className="text-slate-500 max-w-xs mx-auto mt-2">Start your preparation by analyzing a job description.</p>
                    <button
                        onClick={() => navigate('/analyze')}
                        className="mt-6 bg-primary text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
                    >
                        Go to Analyze
                    </button>
                </div>
            )}
        </div>
    );
};

export default History;
