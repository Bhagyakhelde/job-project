import React from 'react';
import './FilterBar.css';
import Input from '../ui/Input';

const FilterBar = ({ filters, onFilterChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    return (
        <div className="filter-bar">
            <div className="filter-row">
                <div className="filter-item-search">
                    <input
                        type="text"
                        name="keyword"
                        className="filter-input-text"
                        placeholder="Search by role or company..."
                        value={filters.keyword}
                        onChange={handleChange}
                    />
                </div>

                <div className="filter-group">
                    <select name="location" className="filter-select" value={filters.location} onChange={handleChange}>
                        <option value="">All Locations</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Noida">Noida</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Pune">Pune</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mysore">Mysore</option>
                        <option value="Kochi">Kochi</option>
                        <option value="Coimbatore">Coimbatore</option>
                    </select>

                    <select name="mode" className="filter-select" value={filters.mode} onChange={handleChange}>
                        <option value="">All Modes</option>
                        <option value="Onsite">Onsite</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>

                    <select name="experience" className="filter-select" value={filters.experience} onChange={handleChange}>
                        <option value="">All Exp</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0-1">0-1 Year</option>
                        <option value="1-3">1-3 Years</option>
                        <option value="3-5">3-5 Years</option>
                    </select>

                    <select name="source" className="filter-select" value={filters.source} onChange={handleChange}>
                        <option value="">All Sources</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Naukri">Naukri</option>
                        <option value="Indeed">Indeed</option>
                    </select>

                    <select name="sort" className="filter-select" value={filters.sort} onChange={handleChange}>
                        <option value="latest">Latest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
