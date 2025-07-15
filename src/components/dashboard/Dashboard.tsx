import React, { useState } from 'react';
import { Plus, Search, Moon, Sun, LogOut, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { useAuthStore } from '../../store/authStore';
import { useChatStore } from '../../store/chatStore';
import { useUIStore } from '../../store/uiStore';
import { useDebounce } from '../../hooks/useDebounce';
import { ChatroomList } from './ChatroomList';
import { CreateChatroomModal } from './CreateChatroomModal';
import { MessageCircle, X } from 'lucide-react';
import { useEffect } from 'react';

export const Dashboard: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user, logout } = useAuthStore();
  const { chatrooms, setCurrentChatroom } = useChatStore();
  const { darkMode, toggleDarkMode, searchQuery, setSearchQuery } = useUIStore();
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + N to create new chatroom
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        setShowCreateModal(true);
      }
      
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        searchInput?.focus();
      }
      
      // Escape to close modal
      if (e.key === 'Escape' && showCreateModal) {
        setShowCreateModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showCreateModal, setShowCreateModal]);

  const filteredChatrooms = chatrooms.filter(room =>
    room.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleChatroomSelect = (chatroomId: string) => {
    setCurrentChatroom(chatroomId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Gemini Chat
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+N</kbd>
                <span>New Chat</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                onClick={toggleDarkMode}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
              >
                {darkMode ? (
                  <Sun size={20} className="text-yellow-500" />
                ) : (
                  <Moon size={20} className="text-gray-600" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="p-3 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-xl transition-all duration-200"
              >
                <LogOut size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        <div className="mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Your Chatrooms
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {chatrooms.length === 0 
                  ? "Create your first chatroom to get started" 
                  : `${chatrooms.length} chatroom${chatrooms.length !== 1 ? 's' : ''} available`
                }
              </p>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              title="Create new chatroom (Ctrl+N)"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Plus size={20} className="mr-2" />
              New Chat
            </Button>
          </div>
          
          <div className="relative max-w-md">
            <Input
            placeholder="Search chatrooms..."
            title="Search chatrooms (Ctrl+K to focus)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={16} />}
              className="pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 shadow-sm hover:shadow-md transition-all duration-200"
          />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X size={16} />
              </Button>
            )}
          </div>
        </div>

        <ChatroomList 
          chatrooms={filteredChatrooms} 
          onSelect={handleChatroomSelect}
        />

        <CreateChatroomModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      </main>
    </div>
  );
};