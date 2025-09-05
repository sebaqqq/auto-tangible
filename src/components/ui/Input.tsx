import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-white">
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        className={`
          w-full bg-[#0D0D0D] border border-[#222222] rounded-lg px-3 py-2
          text-white placeholder:text-gray-500
          focus:outline-none focus:ring-2 focus:ring-[#42E2E8]/20 focus:border-[#42E2E8]
          transition-colors duration-200
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-xs">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-gray-400 text-xs">{helperText}</p>
      )}
    </div>
  );
};