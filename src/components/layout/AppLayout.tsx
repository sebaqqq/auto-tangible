import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { ToastContainer } from '../ui/Toast';
import { useToastStore } from '../../store/toastStore';

export const AppLayout: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="h-screen bg-[#0D0D0D] flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
};