import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false
}) => {
  return (
    <motion.div
      initial={hoverable ? { scale: 1 } : false}
      whileHover={hoverable ? { scale: 1.02, y: -2 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        bg-[#1A1A1A] rounded-xl p-4 shadow-md border border-[#222222]
        ${hoverable ? 'hover:shadow-lg transition-all duration-200' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};