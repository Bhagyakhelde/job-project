import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { ChevronRight, Calendar, Clock } from 'lucide-react';

const Dashboard = () => {
    // Skills Radar Data
    const skillData = [
        { subject: 'DSA', A: 75, fullMark: 100 },
        { subject: 'System Design', A: 60, fullMark: 100 },
        { subject: 'Communication', A: 80, fullMark: 100 },
        { subject: 'Resume', A: 85, fullMark: 100 },
        { subject: 'Aptitude', A: 70, fullMark: 100 },
    ];

    // Readiness Circle constants
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const score = 72;
    const offset = circumference - (score / 100) * circumference;

    const assessments = [
        { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", type: "Test" },
        { title: "System Design Review", time: "Wed, 2:00 PM", type: "Review" },
        { title: "HR Interview Prep", time: "Friday, 11:00 AM", type: "Prep" }
    ];

    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const activeDays = [true, true, true, false, false, false, false];

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900">Placement Dashboard</h2>

            {/* Top Grid: Readiness and Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. Overall Readiness */}
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Readiness</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                        <div className="relative">
                            <svg className="w-48 h-48 transform -rotate-90">
                                {/* Background Circle */}
                                <circle
                                    cx="96"
                                    cy="96"
                                    r={radius}
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-slate-100"
                                />
                                {/* Progress Circle */}
                                <circle
                                    cx="96"
                                    cy="96"
                                    r={radius}
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference} // Start at full offset for animation
                                    className="text-primary transition-all duration-1000 ease-out"
                                    style={{ strokeDashoffset: offset }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-extrabold text-slate-900">{score}</span>
                                <span className="text-sm text-slate-500 font-semibold mt-1">/ 100</span>
                            </div>
                        </div>
                        <p className="mt-6 text-slate-600 font-medium">Readiness Score</p>
                        <p className="text-xs text-slate-400 mt-1">Based on recent performance</p>
                    </CardContent>
                </Card>

                {/* 2. Skill Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skill Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Readiness"
                                    dataKey="A"
                                    stroke="#3f51b5"
                                    fill="#3f51b5"
                                    fillOpacity={0.5}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Grid: Activity and Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 3. Continue Practice */}
                <Card className="lg:col-span-1 border-l-4 border-l-primary">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            Continue Practice
                            <span className="text-xs bg-indigo-50 text-primary px-2 py-1 rounded-full uppercase tracking-wider">In Progress</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h4 className="text-xl font-bold text-slate-800 mb-2">Dynamic Programming</h4>
                        <div className="flex justify-between items-center text-sm text-slate-500 mb-2">
                            <span>Topic Completion</span>
                            <span className="font-bold text-slate-700">3/10</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full mb-6 overflow-hidden">
                            <div className="bg-primary h-full rounded-full w-[30%]"></div>
                        </div>
                        <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                            Continue
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </CardContent>
                </Card>

                {/* 4. Weekly Goals */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Weekly Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <p className="text-3xl font-extrabold text-slate-900">12/20</p>
                                <p className="text-sm text-slate-500">Problems Solved</p>
                            </div>
                            <span className="text-xs text-primary font-bold">Goal: 20/week</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
                            <div className="bg-primary h-full rounded-full w-[60%]"></div>
                        </div>

                        <div className="flex justify-between">
                            {weekDays.map((day, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${activeDays[idx]
                                            ? 'bg-primary text-white scale-110 shadow-lg shadow-indigo-100'
                                            : 'bg-slate-100 text-slate-400'
                                        }`}>
                                        {day}
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{day}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 5. Upcoming Assessments */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Upcoming Assessments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {assessments.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-3 rounded-lg border border-slate-50 hover:bg-slate-50 transition-colors group">
                                    <div className="bg-slate-100 p-2 rounded-lg text-slate-600 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-slate-800 leading-tight">{item.title}</h5>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                            <Clock className="w-3 h-3" />
                                            {item.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 text-sm text-primary font-bold hover:underline">View All Assessments</button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
