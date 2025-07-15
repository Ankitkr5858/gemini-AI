import React from 'react';
import { MessageCircle, Trash2, Clock, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';
import { useChatStore } from '../../store/chatStore';
import { Chatroom } from '../../types';
import { formatDistanceToNow } from '../../utils/dateUtils';
import toast from 'react-hot-toast';

// Hook for keyboard navigation
const useKeyboardNavigation = (chatrooms: Chatroom[], onSelect: (id: string) => void) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const focusedElement = document.activeElement as HTMLElement;
      const chatroomCards = Array.from(document.querySelectorAll('[data-chatroom-id]')) as HTMLElement[];
      const currentIndex = chatroomCards.findIndex(card => card === focusedElement);
      
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % chatroomCards.length;
          chatroomCards[nextIndex]?.focus();
          break;
          
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          const prevIndex = currentIndex <= 0 ? chatroomCards.length - 1 : currentIndex - 1;
          chatroomCards[prevIndex]?.focus();
          break;
          
        case 'Enter':
        case ' ':
          if (focusedElement.dataset.chatroomId) {
            e.preventDefault();
            onSelect(focusedElement.dataset.chatroomId);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [chatrooms, onSelect]);
};

interface ChatroomListProps {
  chatrooms: Chatroom[];
  onSelect: (chatroomId: string) => void;
}

export const ChatroomList: React.FC<ChatroomListProps> = ({ chatrooms, onSelect }) => {
  const { deleteChatroom } = useChatStore();

  useKeyboardNavigation(chatrooms, onSelect);

  const handleDelete = (e: React.MouseEvent, chatroomId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this chatroom?')) {
      deleteChatroom(chatroomId);
      toast.success('Chatroom deleted successfully');
    }
  };

  if (chatrooms.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="h-12 w-12 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No chatrooms
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
          Create your first chatroom to start having conversations with AI
        </p>
        <Button
          onClick={() => {
            const createButton = document.querySelector('[title*="Create new chatroom"]') as HTMLButtonElement;
            createButton?.click();
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <Plus size={20} className="mr-2" />
          Create Your First Chat
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {chatrooms.map((chatroom) => (
        <div
          key={chatroom.id}
          data-chatroom-id={chatroom.id}
          tabIndex={0}
          role="button"
          aria-label={`Open chatroom ${chatroom.title} with ${chatroom.messageCount} messages`}
          onClick={() => onSelect(chatroom.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(chatroom.id);
            }
          }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl focus:shadow-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 p-6 group hover:scale-105 hover:border-blue-300 dark:hover:border-blue-600"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                {chatroom.title}
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MessageCircle size={14} className="text-blue-500" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {chatroom.messageCount} messages
                  </p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center space-x-1">
                  <Clock size={12} />
                  <span>Created {formatDistanceToNow(chatroom.createdAt)}</span>
              </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              tabIndex={-1}
              aria-label={`Delete chatroom ${chatroom.title}`}
              onClick={(e) => handleDelete(e, chatroom.id)}
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 rounded-lg hover:scale-110"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};