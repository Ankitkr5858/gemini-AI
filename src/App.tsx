import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthPage } from './components/auth/AuthPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { ChatInterface } from './components/chat/ChatInterface';
import { useAuthStore } from './store/authStore';
import { useChatStore } from './store/chatStore';
import { useUIStore } from './store/uiStore';

function App() {
  const { isAuthenticated } = useAuthStore();
  const { currentChatroom } = useChatStore();
  const { darkMode, toggleDarkMode } = useUIStore();

  useEffect(() => {
    console.log('Dark mode state changed:', darkMode); // Debug log
    
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initialize dark mode on mount
  useEffect(() => {
    // Check if there's a stored preference, otherwise use system preference
    const stored = localStorage.getItem('ui-storage');
    if (!stored) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark !== darkMode) {
        toggleDarkMode();
      }
    }
  }, []);

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {currentChatroom ? <ChatInterface /> : <Dashboard />}
      </div>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: darkMode ? '#1f2937' : '#ffffff',
            color: darkMode ? '#f3f4f6' : '#1f2937',
            border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
          },
        }}
      />
    </>
  );
}

export default App;