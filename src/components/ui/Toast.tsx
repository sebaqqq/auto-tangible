import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { Toast as ToastType } from '../../types';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

const icons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info
};

const variants = {
  success: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
  warning: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
  error: 'bg-red-500/20 border-red-500/30 text-red-400',
  info: 'bg-[#42E2E8]/20 border-[#42E2E8]/30 text-[#42E2E8]'
};

export const ToastComponent: React.FC<ToastProps> = ({ toast, onClose }) => {
  const Icon = icons[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`
        flex items-start space-x-3 p-4 rounded-lg border backdrop-blur-sm
        ${variants[toast.type]}
      `}
    >
      <Icon size={20} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="font-medium">{toast.title}</p>
        {toast.message && (
          <p className="text-sm opacity-90 mt-1">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

export const ToastContainer: React.FC<{ toasts: ToastType[]; onClose: (id: string) => void }> = ({
  toasts,
  onClose
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} toast={toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
};