import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { extractSkills, calculateReadinessScore, generateChecklist, generatePlan, generateQuestions, saveToHistory } from '../utils/analysis';
import { Search, Building2, BriefcaseText, Sparkles, Loader2 } from 'lucide-react';

const Analyze = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        jdText: ''
    });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleAnalyze = async (e) => {
        e.preventDefault();

        if (!formData.jdText || formData.jdText.trim().length < 50) {
            setError('Please provide a job description (at least 50 characters) for a meaningful analysis.');
            return;
        }

        setIsAnalyzing(true);

        // Simulate a small delay for "AI feel"
        setTimeout(() => {
            const extractedSkills = extractSkills(formData.jdText);
            const readinessScore = calculateReadinessScore(formData.jdText, formData.company, formData.role, extractedSkills);
            const checklist = generateChecklist(extractedSkills);
            const plan = generatePlan(extractedSkills);
            const questions = generateQuestions(extractedSkills);

            const resultEntry = {
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                ...formData,
                extractedSkills,
                readinessScore,
                checklist,
                plan,
                questions
            };

            saveToHistory(resultEntry);
            localStorage.setItem('latest_analysis', JSON.stringify(resultEntry));

            setIsAnalyzing(false);
            navigate('/results');
        }, 1500);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            <header>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">AI Preparation Lab</h2>
                <p className="text-slate-500 mt-2">Paste a job description to generate a personalized 7-day prep plan and mock questions.</p>
            </header>

            <form onSubmit={handleAnalyze} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Search className="w-5 h-5 text-primary" />
                            Job Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Building2 className="w-4 h-4" /> Company Name
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="e.g. Google, Microsoft"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <BriefcaseText className="w-4 h-4" /> Role Title
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    placeholder="e.g. SDE-1, Software Engineer"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Job Description (JD)</label>
                            <textarea
                                name="jdText"
                                rows="12"
                                placeholder="Paste the full job requirements here..."
                                value={formData.jdText}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none font-mono text-sm leading-relaxed"
                            ></textarea>
                            {error && <p className="text-red-500 text-xs font-medium mt-1">{error}</p>}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={isAnalyzing}
                        className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-indigo-100 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center gap-3"
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Running Heuristic Engine...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5 border-white" />
                                Start Analysis
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Analyze;
