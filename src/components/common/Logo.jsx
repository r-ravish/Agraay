import React from 'react';

const Logo = ({ className = '', width = 150 }) => {
    // Calculate scale based on default width of 150
    const scale = typeof width === 'number' ? width / 150 : 1;

    return (
        <div className={`logo-container ${className}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: width }}>
            <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
                <defs>
                    <linearGradient id="arrowGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0a1f3c" />
                        <stop offset="50%" stopColor="#2c527e" />
                        <stop offset="100%" stopColor="#a3e1e5" />
                    </linearGradient>
                    <linearGradient id="lightGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#e0f7f9" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#52c2c9" stopOpacity="0.9" />
                    </linearGradient>
                </defs>

                {/* Abstract 'A' Arrow Shape */}
                <polygon points="100,20 160,110 130,110 85,50 40,110 10,110" fill="url(#arrowGradient)" />
                <polygon points="100,20 180,20 150,60" fill="url(#lightGradient)" />
                <path d="M40,110 Q85,100 130,50 L160,110 Q100,120 70,80 Z" fill="#0a1f3c" opacity="0.8" />

                {/* Network dots & lines */}
                <circle cx="30" cy="50" r="4" fill="#0a1f3c" />
                <line x1="30" y1="50" x2="60" y2="90" stroke="#0a1f3c" strokeWidth="2" />
                <circle cx="120" cy="80" r="3" fill="#0a1f3c" />
                <line x1="120" y1="80" x2="140" y2="40" stroke="#52c2c9" strokeWidth="2" />

            </svg>
        </div>
    );
};

export default Logo;
