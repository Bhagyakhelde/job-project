export const calculateMatchScore = (job, preferences) => {
    if (!preferences) return 0;

    let score = 0;
    const {
        roleKeywords = "",
        preferredLocations = "",
        preferredMode = [],
        experienceLevel = "Fresher",
        skills = ""
    } = preferences;

    // 1. Role Keywords Match (+25 title, +15 description)
    const keywords = roleKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k);
    let keywordFoundInTitle = false;
    let keywordFoundInDesc = false;

    keywords.forEach(kw => {
        if (job.title.toLowerCase().includes(kw)) keywordFoundInTitle = true;
        if (job.description.toLowerCase().includes(kw)) keywordFoundInDesc = true;
    });

    if (keywordFoundInTitle) score += 25;
    if (keywordFoundInDesc) score += 15;

    // 2. Location Match (+15)
    if (Array.isArray(preferredLocations) && preferredLocations.length > 0) {
        if (preferredLocations.some(loc => loc.toLowerCase() === job.location.toLowerCase())) {
            score += 15;
        }
    } else if (typeof preferredLocations === 'string' && preferredLocations && job.location.toLowerCase() === preferredLocations.toLowerCase()) {
        score += 15;
    }

    // 3. Mode Match (+10)
    if (preferredMode.includes(job.mode)) {
        score += 10;
    }

    // 4. Experience Match (+10)
    if (job.experience === experienceLevel) {
        score += 10;
    }

    // 5. Skills Overlap (+15)
    const userSkills = skills.split(',').map(s => s.trim().toLowerCase()).filter(s => s);
    const jobSkills = job.skills.map(s => s.toLowerCase());
    const skillOverlap = userSkills.some(s => jobSkills.includes(s));
    if (skillOverlap) score += 15;

    // 6. Recency Match (+5 if postedDaysAgo <= 2)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 7. Source Match (+5 if source is LinkedIn)
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    return Math.min(score, 100);
};

export const getScoreColor = (score) => {
    if (score >= 80) return '#4A6741'; // Green (Success variant)
    if (score >= 60) return '#D97706'; // Amber
    if (score >= 40) return '#6B7280'; // Neutral
    return '#9CA3AF'; // Subtle Grey
};
