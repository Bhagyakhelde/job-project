import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Code, ClipboardCheck, BookOpen, User, GraduationCap, Menu, X } from 'lucide-react';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Practice', path: '/practice', icon: Code },
        { name: 'Assessments', path: '/assessments', icon: ClipboardCheck },
        { name: 'Resources', path: '/resources', icon: BookOpen },
        { name: 'Profile', path: '/profile', icon: User },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset - y - 0 left - 0 z - 50 w - 64 bg - white border - r border - slate - 200 flex flex - col transition - transform duration - 300 lg: translate - x - 0 lg:static lg: inset - 0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
`}>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="font-bold text-xl tracking-tight">Prep Platform</h1>
                    </div>
                    <button onClick={toggleSidebar} className="lg:hidden p-1 hover:bg-slate-50 rounded">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items - center gap - 3 px - 4 py - 2.5 rounded - lg transition - colors ${isActive
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-slate-600 hover:bg-slate-50'
                                } `
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 px-4 py-2 text-slate-500 text-sm">
                        <span>© 2026 Readiness</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col w-full min-w-0">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-slate-50 rounded-lg">
                            <Menu className="w-6 h-6 text-slate-600" />
                        </button>
                        <h2 className="text-lg font-semibold text-slate-800">Placement Prep</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden sm:inline text-slate-500 text-sm font-medium">Candidate Profile</span>
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                            <User className="w-6 h-6 text-slate-400" />
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto scroll-smooth">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

