import { create } from 'zustand';
import { Toast } from '../types';

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  addToast: (toastData) => {
    const id = Date.now().toString();
    const toast: Toast = {
      ...toastData,
      id,
      duration: toastData.duration || 5000
    };

    set({ toasts: [...get().toasts, toast] });

    // Auto remove after duration
    setTimeout(() => {
      get().removeToast(id);
    }, toast.duration);
  },

  removeToast: (id) => {
    set({ toasts: get().toasts.filter(t => t.id !== id) });
  }
}));