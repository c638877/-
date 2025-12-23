
import React from 'react';

interface LycheeProps {
  isWorking: boolean;
}

const LycheeCharacter: React.FC<LycheeProps> = ({ isWorking }) => {
  return (
    <div className={`relative w-48 h-48 mx-auto transition-all duration-500 ${isWorking ? 'animate-bounce' : 'hover:scale-110'}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        <defs>
          {/* Body Gradient */}
          <radialGradient id="lycheeBody" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ff5f5f" />
            <stop offset="70%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </radialGradient>

          {/* Scale Pattern for realistic texture */}
          <pattern id="scales" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
             <path d="M 8 0 L 16 8 L 8 16 L 0 8 Z" fill="none" stroke="#991b1b" strokeWidth="0.5" opacity="0.4" />
          </pattern>
          
          {/* Shine highlight */}
          <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Mouth Inside Gradient */}
          <radialGradient id="mouthInside" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="100%" stopColor="#450a0a" />
          </radialGradient>
        </defs>
        
        {/* Stem and Leaves */}
        <g transform="translate(100, 45)">
          {/* Small Stem */}
          <rect x="-4" y="-10" width="8" height="15" fill="#5c3d2e" rx="2" />
          
          {/* Leaves */}
          <path d="M 0 0 C 20 -25 60 -15 50 15 C 40 35 10 15 0 0" fill="#22c55e" stroke="#166534" strokeWidth="1" />
          <path d="M 0 0 C -20 -25 -60 -15 -50 15 C -40 35 -10 15 0 0" fill="#4ade80" stroke="#166534" strokeWidth="1" />
          {/* Leaf veins */}
          <path d="M 5 0 Q 25 -10 40 5" fill="none" stroke="#166534" strokeWidth="0.5" opacity="0.3" />
          <path d="M -5 0 Q -25 -10 -40 5" fill="none" stroke="#166534" strokeWidth="0.5" opacity="0.3" />
        </g>
        
        {/* Lychee Body */}
        <circle cx="100" cy="115" r="75" fill="url(#lycheeBody)" />
        <circle cx="100" cy="115" r="75" fill="url(#scales)" />
        
        {/* Highlights */}
        <ellipse cx="75" cy="85" rx="20" ry="10" fill="url(#shine)" transform="rotate(-30, 75, 85)" />
        
        {/* Super Cute Eyes */}
        <g className={isWorking ? 'animate-pulse' : ''}>
          {/* Left Eye */}
          <g transform="translate(70, 110)">
            <circle r="12" fill="black" />
            <circle cx="-3" cy="-4" r="4" fill="white" /> {/* Reflection */}
            <circle cx="3" cy="3" r="1.5" fill="white" /> {/* Small reflection */}
          </g>
          {/* Right Eye */}
          <g transform="translate(130, 110)">
            <circle r="12" fill="black" />
            <circle cx="-3" cy="-4" r="4" fill="white" />
            <circle cx="3" cy="3" r="1.5" fill="white" />
          </g>
        </g>
        
        {/* Rosy Cheeks */}
        <circle cx="60" cy="135" r="10" fill="#fca5a5" opacity="0.7">
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="135" r="10" fill="#fca5a5" opacity="0.7">
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        
        {/* Open Laughing Mouth */}
        <g>
          {/* Mouth Shape */}
          <path 
            d={isWorking 
              ? "M 75 140 Q 100 185 125 140 C 115 135 85 135 75 140 Z" // Working: Extra wide open
              : "M 82 145 Q 100 175 118 145 C 110 142 90 142 82 145 Z" // Idle: Big smile open
            } 
            fill="url(#mouthInside)"
            stroke="#991b1b"
            strokeWidth="1"
          />
          {/* Tongue */}
          <path 
            d={isWorking
              ? "M 88 165 Q 100 178 112 165 Q 100 160 88 165 Z"
              : "M 92 162 Q 100 170 108 162 Q 100 158 92 162 Z"
            }
            fill="#fca5a5"
          />
        </g>
        
        {/* Blush lines under eyes */}
        <line x1="60" y1="125" x2="65" y2="120" stroke="#fca5a5" strokeWidth="1" />
        <line x1="55" y1="128" x2="60" y2="123" stroke="#fca5a5" strokeWidth="1" />
        <line x1="135" y1="125" x2="140" y2="120" stroke="#fca5a5" strokeWidth="1" />
        <line x1="140" y1="128" x2="145" y2="123" stroke="#fca5a5" strokeWidth="1" />
      </svg>
    </div>
  );
};

export default LycheeCharacter;
