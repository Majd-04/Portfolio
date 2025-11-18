import React from 'react';

export const IslamicStar: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0L14.5 9H24L16.5 14.5L19 23.5L12 18.5L5 23.5L7.5 14.5L0 9H9.5L12 0Z" transform="scale(0.5) translate(12,12)" />
    <rect x="11" y="0" width="2" height="24" className="opacity-20" />
    <rect x="0" y="11" width="24" height="2" className="opacity-20" />
    <rect x="4" y="4" width="16" height="16" transform="rotate(45 12 12)" className="opacity-20" />
  </svg>
);

export const Divider: React.FC = () => (
  <div className="flex items-center justify-center my-8 opacity-60 text-primary-800">
    <div className="h-px bg-primary-800 w-16"></div>
    <div className="w-3 h-3 rotate-45 border border-primary-800 bg-primary-50 mx-2"></div>
    <div className="h-px bg-primary-800 w-16"></div>
  </div>
);
