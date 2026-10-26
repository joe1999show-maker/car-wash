import React from 'react';

export default function KCleanAnimatedBanner() {
  return (
    <svg
      viewBox="120 12 125 56"
      className="h-11 w-auto text-white"
      xmlns="http://w3.org"
    >
      <style>{`
        @keyframes spongeWipe {
          0%, 100% { transform: translateX(0px) translateY(0px) rotate(3deg); }
          50% { transform: translateX(-24px) translateY(-1px) rotate(-3deg); }
        }
        @keyframes foamSquish {
          0%, 100% { transform: skewX(-10deg) scaleY(0.95); opacity: 1; }
          50% { transform: skewX(8deg) scaleY(1.05); opacity: 0.9; }
        }
        @keyframes physicalKDrop {
          0% { transform: translate(0px, 0px) scale(0.5); opacity: 0; }
          15% { opacity: 1; scale: 1; }
          70% { transform: translate(-9px, 24px) scaleY(1.3); opacity: 1; }
          90%, 100% { transform: translate(-10px, 29px) scaleY(0.1); opacity: 0; }
        }
        .animate-sponge { animation: spongeWipe 2.4s ease-in-out infinite; }
        .animate-foam { animation: foamSquish 2.4s ease-in-out infinite; transform-origin: 142px 34px; }
        .animate-drip { animation: physicalKDrop 3.6s cubic-bezier(0.4, 0, 0.6, 1) infinite; animation-delay: 0.6s; transform-origin: center top; }
      `}</style>

      {/* Hardcoded Vector K Shape - Filled with white explicitly */}
      <path d="M 124.5 65 L 137.6 28 L 148.8 28 L 143.1 44.2 L 157.9 28 L 170.8 28 L 151.2 49 L 165.5 65 L 153.2 65 L 142.9 52.8 L 128.7 65 Z" fill="#ffffff" />

      {/* Brand Text Typography - Added fill="#ffffff" to fix the invisibility bug */}
      <text 
        x="166" 
        y="65" 
        fill="#ffffff"
        className="font-sans font-black italic tracking-tight" 
        style={{ fontWeight: 900, fontStyle: 'italic',  fontSize: '40px'  }}
      >
        Clean
      </text>

      {/* Textured Soap Foam Overlay */}
      <g className="animate-foam" fill="#ffffff">
        <circle cx="138" cy="31" r="3" />
        <circle cx="143" cy="29" r="4.5" />
        <circle cx="149" cy="30" r="3.5" />
        <circle cx="135" cy="34" r="2.2" />
        <circle cx="140" cy="35" r="2.8" />
      </g>

      {/* High-Contrast Slanted Surface Droplet */}
      <g className="animate-drip" fill="#c5f0ff" stroke="#4ba3e3" strokeWidth="0.4" style={{ transformOrigin: '136px 36px' }}>
        <path d="M 136,36 c -0.8,0 -1.3,0.6 -1.3,1.4 0,1.2 1.3,2.5 1.3,2.5 s 1.3,-1.3 1.3,-2.5 c 0,-0.8 -0.5,-1.4 -1.3,-1.4 z" />
      </g>

      {/* 3D Wiping Car Wash Sponge Block */}
      <g className="animate-sponge" style={{ transformOrigin: '148px 22px' }}>
        <rect x="136" y="24" width="24" height="4" rx="1.5" fill="rgba(0,0,0,0.2)" filter="blur(0.5px)" />
        <rect x="137" y="19" width="24" height="6" rx="1" fill="#ca8a04" />
        <rect x="137" y="14" width="24" height="6" rx="1.5" fill="#facc15" />
        <circle cx="141" cy="16" r="0.7" fill="#a16207" opacity="0.4" />
        <circle cx="147" cy="18" r="0.5" fill="#a16207" opacity="0.4" />
        <circle cx="153" cy="16" r="0.9" fill="#a16207" opacity="0.4" />
        <circle cx="157" cy="18" r="0.6" fill="#a16207" opacity="0.4" />
        <path d="M 136,25 q 6,1.5 13,0.5 q 6,1 11,-0.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
