'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { ToastContainer } from '@/components/Toast';
import { Toast } from '@/lib/types';
import { isAuthenticated, clearAuth } from '@/lib/utils';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto animate-fadeIn">
          {children}
        </div>
      </main>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <button
        onClick={handleLogout}
        className="fixed top-6 right-6 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground hover:bg-muted transition-all duration-300 hover:scale-105 shadow-md"
      >
        Logout
      </button>
    </div>
  );
}
