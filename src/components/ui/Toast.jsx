import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'info', onClear }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClear, 300); // Wait for fade-out animation
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClear]);

    if (!message) return null;

    return (
        <div className={`toast-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <div className={`toast toast-${type}`}>
                {message}
            </div>
        </div>
    );
};

export default Toast;
