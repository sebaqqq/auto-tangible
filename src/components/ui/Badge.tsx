import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

const variants = {
  success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  error: 'bg-red-500/20 text-red-400 border-red-500/30',
  info: 'bg-[#42E2E8]/20 text-[#42E2E8] border-[#42E2E8]/30',
  neutral: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2 py-1 text-sm'
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = ''
}) => {
  return (
    <span className={`
      inline-flex items-center rounded-full font-medium border
      ${variants[variant]}
      ${sizes[size]}
      ${className}
    `}>
      {children}
    </span>
  );
};