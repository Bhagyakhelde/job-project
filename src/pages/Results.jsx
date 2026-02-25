import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { updateHistoryEntry } from '../utils/analysis';
import {
    ChevronRight, Calendar, CheckCircle2, ListTodo, HelpCircle,
    Trophy, ArrowLeft, History, Copy, Download, Sparkles,
    Check, AlertCircle, TrendingUp
} from 'lucide-react';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [skillConfidenceMap, setSkillConfidenceMap] = useState({});
    const [currentScore, setCurrentScore] = useState(0);
    const [copyStatus, setCopyStatus] = useState('');

    useEffect(() => {
        const historyData = location.state?.analysisData;
        const latestData = localStorage.getItem('latest_analysis');

        let targetData = null;
        if (historyData) {
            targetData = historyData;
        } else if (latestData) {
            targetData = JSON.parse(latestData);
        } else {
            navigate('/analyze');
            return;
        }

        setData(targetData);
        setSkillConfidenceMap(targetData.skillConfidenceMap || {});
        setCurrentScore(targetData.readinessScore || 0);
    }, [location, navigate]);

    useEffect(() => {
        if (!data) return;

        // Calculate live score: baseScore + 2 per "know", -2 per "practice"
        // But we need to define which skills were "detected"
        const allDetectedSkills = Object.values(data.extractedSkills).flat();
        let scoreModifier = 0;

        allDetectedSkills.forEach(skill => {
            const status = skillConfidenceMap[skill];
            if (status === 'know') scoreModifier += 2;
            else if (status === 'practice') scoreModifier -= 2;
        });

        const newScore = Math.min(100, Math.max(0, data.readinessScore + scoreModifier));
        setCurrentScore(newScore);

        // Update history and latest_analysis
        const updatedEntry = {
            ...data,
            skillConfidenceMap,
            // We don't overwrite the original base readinessScore, 
            // but we could store the adjusted one for the History view list
            adjustedScore: newScore
        };
        updateHistoryEntry(updatedEntry);
    }, [skillConfidenceMap, data]);

    if (!data) return null;

    const toggleSkill = (skill) => {
        setSkillConfidenceMap(prev => {
            const current = prev[skill];
            const next = current === 'know' ? 'practice' : 'know';
            return { ...prev, [skill]: next };
        });
    };

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopyStatus(type);
        setTimeout(() => setCopyStatus(''), 2000);
    };

    const downloadAsTxt = () => {
        const sections = [
            `PREPARATION PLAN: ${data.role} at ${data.company}`,
            `Generated: ${new Date(data.createdAt).toLocaleString()}`,
            `Readiness Score: ${currentScore}%`,
            '\n--- EXTRACTED SKILLS ---',
            ...Object.entries(data.extractedSkills).map(([cat, skills]) =>
                `${cat}: ${skills.join(', ')}`
            ),
            '\n--- 7-DAY PLAN ---',
            ...data.plan.map(p => `${p.day}: ${p.task} - ${p.detail}`),
            '\n--- ROUND CHECKLIST ---',
            ...data.checklist.map(r => `${r.round}:\n${r.items.map(i => `  - ${i}`).join('\n')}`),
            '\n--- TOP 10 QUESTIONS ---',
            ...data.questions.map((q, i) => `${i + 1}. ${q}`)
        ];

        const element = document.createElement("a");
        const file = new Blob([sections.join('\n')], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `PrepPlan_${data.company}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const weakSkills = Object.values(data.extractedSkills)
        .flat()
        .filter(s => skillConfidenceMap[s] === 'practice' || !skillConfidenceMap[s])
        .slice(0, 3);

    const getPlanText = () => data.plan.map(p => `${p.day}: ${p.task} - ${p.detail}`).join('\n');
    const getChecklistText = () => data.checklist.map(r => `${r.round}:\n${r.items.join('\n')}`).join('\n\n');
    const getQuestionsText = () => data.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/history')}
                        className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
                    >
                        <History className="w-4 h-4" /> View History
                    </button>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                            {data.role || 'Role'} at <span className="text-primary italic">{data.company || 'Company'}</span>
                        </h2>
                        <p className="text-slate-500 mt-1">Preparation Intelligence Report • {new Date(data.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                        <button
                            onClick={() => handleCopy(getPlanText(), 'plan')}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition-all"
                        >
                            {copyStatus === 'plan' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            Copy 7-Day Plan
                        </button>
                        <button
                            onClick={() => handleCopy(getChecklistText(), 'list')}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition-all"
                        >
                            {copyStatus === 'list' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            Copy Checklist
                        </button>
                        <button
                            onClick={() => handleCopy(getQuestionsText(), 'q')}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition-all"
                        >
                            {copyStatus === 'q' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            Copy Questions
                        </button>
                        <button
                            onClick={downloadAsTxt}
                            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                        >
                            <Download className="w-3 h-3" />
                            Download TXT
                        </button>
                    </div>
                </div>

                <div className="bg-white border-2 border-primary/10 rounded-3xl p-6 flex items-center gap-8 shadow-xl shadow-indigo-50/50">
                    <div className="relative w-24 h-24">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="48" cy="48" r="42" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                            <circle
                                cx="48" cy="48" r="42" stroke="hsl(245, 58%, 51%)" strokeWidth="8"
                                fill="transparent" strokeDasharray={2 * Math.PI * 42}
                                className="transition-all duration-1000 ease-out"
                                style={{ strokeDashoffset: (2 * Math.PI * 42) - (currentScore / 100) * (2 * Math.PI * 42) }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-slate-900">
                            {currentScore}%
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-1">Live Readiness</div>
                        <div className="text-2xl font-bold text-slate-900">
                            {currentScore > 80 ? 'Elite Match' : currentScore > 60 ? 'Strong Match' : 'Growing Match'}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            Dynamic based on your input
                        </div>
                    </div>
                </div>
            </header>

            {/* Skills grid with toggles */}
            <Card className="border-l-4 border-l-primary shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            Skill Self-Assessment
                        </CardTitle>
                        <div className="text-xs text-slate-400 font-medium flex gap-4">
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> I Know This</span>
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-200"></div> Need Practice</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Object.entries(data.extractedSkills).map(([category, skills]) => (
                            <div key={category} className="space-y-4">
                                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{category}</h5>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(skill => {
                                        const isKnown = skillConfidenceMap[skill] === 'know';
                                        return (
                                            <button
                                                key={skill}
                                                onClick={() => toggleSkill(skill)}
                                                className={`
                                                    group relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all
                                                    ${isKnown
                                                        ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-100'
                                                        : 'bg-white text-slate-600 border-slate-100 hover:border-slate-200'}
                                                `}
                                            >
                                                {skill}
                                                <div className={`
                                                    w-4 h-4 rounded-full flex items-center justify-center transition-all
                                                    ${isKnown ? 'bg-white text-indigo-500' : 'bg-slate-100 text-transparent group-hover:bg-slate-200'}
                                                `}>
                                                    <Check className="w-2.5 h-2.5" />
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 7-Day Plan */}
                <Card className="lg:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Fast-Track Roadmap
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {data.plan.map((dayPlan, idx) => (
                            <div key={idx} className="flex gap-4 group">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold border border-slate-200 group-hover:bg-primary group-hover:text-white transition-colors">
                                        D{idx + 1}
                                    </div>
                                    {idx !== data.plan.length - 1 && <div className="w-px h-full bg-slate-100 flex-1 my-1"></div>}
                                </div>
                                <div className="pb-4">
                                    <div className="font-bold text-slate-800 text-sm">{dayPlan.task}</div>
                                    <div className="text-xs text-slate-500 mt-1 leading-relaxed">{dayPlan.detail}</div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Question Bank */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-primary" />
                            Likely Interview Questions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.questions.map((q, idx) => (
                                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all group">
                                    <div className="flex gap-3">
                                        <span className="text-xs font-black text-primary/30 mt-1">{String(idx + 1).padStart(2, '0')}</span>
                                        <p className="text-sm text-slate-700 font-semibold leading-relaxed group-hover:text-slate-900">{q}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Round Checklists */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <ListTodo className="w-6 h-6 text-primary" />
                    Round-wise Preparation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.checklist.map((round, idx) => (
                        <Card key={idx} className="group hover:-translate-y-1 transition-transform">
                            <CardHeader className="py-4 px-5 border-b border-slate-50 bg-slate-50/30">
                                <CardTitle className="text-[10px] uppercase font-black tracking-widest text-slate-400 group-hover:text-primary transition-colors">
                                    {round.round.split(':')[0]}
                                </CardTitle>
                                <div className="text-xs font-bold text-slate-800 mt-1">{round.round.split(':')[1]?.trim() || round.round}</div>
                            </CardHeader>
                            <CardContent className="p-5">
                                <ul className="space-y-3">
                                    {round.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <div className="w-3.5 h-3.5 rounded border border-slate-200 mt-0.5 shrink-0 hover:border-primary transition-colors cursor-pointer"></div>
                                            <span className="text-[11px] font-medium text-slate-600 leading-tight">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Action Next Box */}
            <div className="pt-4">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 max-w-lg">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary rounded-full text-[10px] font-black uppercase tracking-widest">Action Required</div>
                            <h3 className="text-3xl font-bold">What's Next?</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                You have <span className="text-white font-bold">{weakSkills.length} priorities</span> to address. Suggestion: Start with your Day 1 plan to build core confidence.
                            </p>
                            {weakSkills.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {weakSkills.map(s => (
                                        <div key={s} className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold flex items-center gap-2">
                                            <AlertCircle className="w-3 h-3 text-amber-400" />
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={downloadAsTxt}
                            className="bg-white text-slate-900 px-10 py-5 rounded-[1.25rem] font-black text-sm hover:bg-slate-100 transition-all flex items-center gap-3 shrink-0"
                        >
                            Start Day 1 Plan Now
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                </div>
            </div>

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
