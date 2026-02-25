import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart, GraduationCap, ChevronRight } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: "Practice Problems",
            description: "Master algorithms and data structures with our curated coding challenges.",
            icon: Code,
            color: "bg-blue-50 text-blue-600"
        },
        {
            title: "Mock Interviews",
            description: "Face real-world questions in simulated interview environments.",
            icon: Video,
            color: "bg-purple-50 text-purple-600"
        },
        {
            title: "Track Progress",
            description: "Analytic insights to help you identify and bridge skill gaps.",
            icon: BarChart,
            color: "bg-indigo-50 text-indigo-600"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navigation */}
            <nav className="py-6 px-8 border-b border-slate-50 flex items-center justify-between max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    <span className="text-xl font-bold tracking-tight">Placement Prep</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
                    <a href="#" className="hover:text-primary transition-colors">Curriculum</a>
                    <a href="#" className="hover:text-primary transition-colors">Pricing</a>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-primary text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity"
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-linear-to-b from-indigo-50/50 to-white">
                <div className="mb-6 inline-flex items-center gap-2 bg-indigo-50 text-primary px-4 py-1.5 rounded-full text-sm font-bold">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    Join 10,000+ Students
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight max-w-4xl">
                    Ace Your <span className="text-primary italic">Placement</span>
                </h1>
                <p className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
                    Practice, assess, and prepare for your dream job with our comprehensive technical readiness platform.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
                >
                    Get Started
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </header>

            {/* Features Grid */}
            <section className="py-24 px-8 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, idx) => (
                        <div key={idx} className="group p-8 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50/50 transition-all">
                            <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8 border-t border-slate-100 mt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        Placement Readiness Platform
                    </div>
                    <div>&copy; 2026 Readiness. Practice, Assess, Succeed.</div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-primary">Terms</a>
                        <a href="#" className="hover:text-primary">Privacy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
