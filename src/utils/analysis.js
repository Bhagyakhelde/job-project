export const SKILL_CATEGORIES = {
    "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    "Web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    "Data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    "Testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

export const extractSkills = (text) => {
    const detected = {};
    const lowerText = text.toLowerCase();

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const matches = skills.filter(skill => {
            // Use regex for word boundaries to avoid partial matches (e.g., "C" in "Category")
            const escapedSkill = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            // Special handling for C++ and C#
            const pattern = new RegExp(`\\b${escapedSkill}\\b`, 'i');
            return pattern.test(lowerText);
        });
        if (matches.length > 0) {
            detected[category] = matches;
        }
    });

    return detected;
};

export const calculateReadinessScore = (jdText, company, role, extractedSkills) => {
    let score = 35;

    // +5 per detected category present (max 30)
    const categoryCount = Object.keys(extractedSkills).length;
    score += Math.min(30, categoryCount * 5);

    // +10 if company name provided
    if (company && company.trim().length > 0) score += 10;

    // +10 if role provided
    if (role && role.trim().length > 0) score += 10;

    // +10 if JD length > 800 chars
    if (jdText && jdText.length > 800) score += 10;

    return Math.min(100, score);
};

export const generateChecklist = (extractedSkills) => {
    const hasWeb = extractedSkills["Web"]?.some(s => ["React", "Next.js", "JavaScript"].includes(s));

    return [
        {
            round: "Round 1: Aptitude / Basics",
            items: [
                "Numerical Ability (Profit/Loss, Time & Work)",
                "Logical Reasoning (Syllogisms, Puzzles)",
                "Verbal Ability (Comprehension, Grammar)",
                "Basic Programming Syntax in your primary language",
                "Data Interpretation (Charts, Tables)"
            ]
        },
        {
            round: "Round 2: DSA + Core CS",
            items: [
                "Time & Space Complexity analysis",
                "Array and String manipulation algorithms",
                "Linked List, Stack, and Queue implementations",
                "Core CS concepts: OOPs, DBMS (Normalization)",
                "Basic Operating System concepts (Processes, Threads)"
            ]
        },
        {
            round: "Round 3: Tech interview (projects + stack)",
            items: [
                "In-depth explanation of primary project architecture",
                "Live coding / Problem solving on detected skills",
                hasWeb ? "Frontend concepts (DOM, State Management, Hooks)" : "Backend logic / System design basics",
                "Database design and Query optimization",
                "Discussion on cloud or deployment if AWS/DevOps detected"
            ]
        },
        {
            round: "Round 4: Managerial / HR",
            items: [
                "Tell me about yourself (Pitch)",
                "Why this company and this specific role?",
                "Handling conflict in team projects",
                "Strength, Weaknesses, and Career Goals",
                "Scenario-based behavioral questions"
            ]
        }
    ];
};

export const generatePlan = (extractedSkills) => {
    const hasWeb = extractedSkills["Web"]?.includes("React");
    const hasDB = extractedSkills["Data"] ? true : false;

    return [
        { day: "Day 1–2", task: "Basics + core CS", detail: "Review OOPs, OS, and Networking fundamentals." },
        { day: "Day 3–4", task: "DSA + coding practice", detail: "Focus on Arrays, Strings, and most asked interview problems." },
        { day: "Day 5", task: "Project + resume alignment", detail: `Deep dive into your ${hasWeb ? 'React/Web' : 'Technical'} projects.` },
        { day: "Day 6", task: "Mock interview questions", detail: `Prepare ${hasDB ? 'SQL/DB' : 'Logical'} queries and HR pitch.` },
        { day: "Day 7", task: "Revision + weak areas", detail: "Quick review of all concepts and mock assessment." }
    ];
};

export const generateQuestions = (extractedSkills) => {
    const questions = [];

    if (extractedSkills["Data"]?.includes("SQL")) {
        questions.push("Explain indexing and when it helps.");
    }
    if (extractedSkills["Web"]?.includes("React")) {
        questions.push("Explain state management options in React.");
    }
    if (extractedSkills["Core CS"]?.includes("DSA")) {
        questions.push("How would you optimize search in sorted data?");
    }
    if (extractedSkills["Core CS"]?.includes("OOP")) {
        questions.push("What are the 4 pillars of OOPs with real-world examples?");
    }
    if (extractedSkills["Web"]?.includes("Node.js")) {
        questions.push("Explain event loop in Node.js.");
    }
    if (extractedSkills["Cloud/DevOps"]?.includes("AWS")) {
        questions.push("Explain S3 vs EBS and when to use which.");
    }
    if (extractedSkills["Web"]?.includes("REST")) {
        questions.push("What are the HTTP methods and their status codes?");
    }
    if (extractedSkills["Data"]?.includes("Redis")) {
        questions.push("Explain caching strategies and how Redis helps.");
    }
    if (extractedSkills["Languages"]?.includes("Java")) {
        questions.push("Explain JVM, JRE, and JDK differences.");
    }
    if (extractedSkills["Web"]?.includes("Next.js")) {
        questions.push("Client side vs Server side rendering in Next.js?");
    }

    // Fill to 10 if needed
    const fallbacks = [
        "How do you handle deadlines and pressure?",
        "Explain a difficult situation you solved in a project.",
        "What is your approach to learning new technologies?",
        "How do you ensure code quality in your projects?"
    ];

    while (questions.length < 10) {
        questions.push(fallbacks[questions.length % fallbacks.length]);
    }

    return questions.slice(0, 10);
};

export const getHistory = () => {
    const history = localStorage.getItem('prep_history');
    return history ? JSON.parse(history) : [];
};

export const saveToHistory = (entry) => {
    const history = getHistory();
    history.unshift(entry); // Newest first
    localStorage.setItem('prep_history', JSON.stringify(history));
    return entry;
};
