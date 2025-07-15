import React, { useState, useEffect } from 'react';
import { Copy, Check, User, Bot } from 'lucide-react';
import { Button } from '../ui/Button';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';
import { Message } from '../../types';
import { formatTime } from '../../utils/dateUtils';

// Hook for keyboard navigation in messages
const useMessageKeyboardNavigation = () => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const focusedElement = document.activeElement as HTMLElement;
      const messageButtons = Array.from(document.querySelectorAll('[data-message-copy]')) as HTMLElement[];
      const currentIndex = messageButtons.findIndex(btn => btn === focusedElement);
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % messageButtons.length;
          messageButtons[nextIndex]?.focus();
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = currentIndex <= 0 ? messageButtons.length - 1 : currentIndex - 1;
          messageButtons[prevIndex]?.focus();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
};

interface MessageListProps {
  messages: Message[];
  onCopyMessage: (messageId: string, content: string) => void;
  copiedMessageId: string | null;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  onCopyMessage,
  copiedMessageId,
}) => {
  useMessageKeyboardNavigation();
  
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const messagesPerPage = 20;

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      if (target.scrollTop === 0 && messages.length >= messagesPerPage) {
        loadMoreMessages();
      }
    };

    const messagesContainer = document.querySelector('.messages-container');
    messagesContainer?.addEventListener('scroll', handleScroll);

    return () => {
      messagesContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [messages.length, page]);

  const loadMoreMessages = async () => {
    setLoading(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setPage(prev => prev + 1);
    setLoading(false);
  };

  const visibleMessages = messages.slice(Math.max(0, messages.length - (page * messagesPerPage)));

  return (
    <div className="messages-container">
      {loading && (
        <div className="mb-4">
          <LoadingSkeleton lines={3} />
        </div>
      )}
      
      {visibleMessages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-6 group`}
          role="article"
          aria-label={`Message from ${message.sender === 'user' ? 'you' : 'AI'} at ${formatTime(message.timestamp)}`}
        >
          <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
            <div
              className={`rounded-2xl px-5 py-4 relative shadow-sm hover:shadow-md transition-all duration-200 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-white/20' 
                      : 'bg-gradient-to-br from-blue-500 to-purple-600'
                  }`}>
                  {message.sender === 'user' ? (
                      <User size={14} className="text-white" />
                  ) : (
                      <Bot size={14} className="text-white" />
                  )}
                  </div>
                </div>
                
                <div className="flex-1">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Uploaded"
                      className="max-w-full max-h-64 rounded-xl mb-3 object-cover shadow-md"
                    />
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                data-message-copy={message.id}
                tabIndex={0}
                aria-label={`Copy message: ${message.content.substring(0, 50)}...`}
                onClick={() => onCopyMessage(message.id, message.content)}
                className={`absolute -top-2 -right-2 p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg rounded-full ${
                  message.sender === 'user'
                    ? 'bg-blue-500 hover:bg-blue-400 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
              >
                {copiedMessageId === message.id ? (
                  <Check size={12} />
                ) : (
                  <Copy size={12} />
                )}
              </Button>
            </div>
            
            <p className={`text-xs text-gray-500 dark:text-gray-400 mt-2 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}>
              {formatTime(message.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};