import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Image, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { MessageList } from './MessageList';
import { TypingIndicator } from './TypingIndicator';
import { useChatStore } from '../../store/chatStore';
import { generateId } from '../../utils/generateId';
import { Message } from '../../types';
import toast from 'react-hot-toast';

export const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [isThrottled, setIsThrottled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { 
    currentChatroom, 
    setCurrentChatroom, 
    addMessage, 
    isTyping, 
    setTyping,
    messages,
    chatrooms 
  } = useChatStore();

  const currentMessages = currentChatroom ? messages[currentChatroom] || [] : [];
  const currentChatroomData = chatrooms.find(room => room.id === currentChatroom);

  // Keyboard shortcuts for chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to go back to dashboard
      if (e.key === 'Escape') {
        setCurrentChatroom(null);
      }
      
      // Ctrl/Cmd + Enter to send message
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleSendMessage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [message, selectedImage, currentChatroom]);

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if ((!message.trim() && !selectedImage) || !currentChatroom || isThrottled) return;

    const newMessage: Message = {
      id: generateId(),
      content: message.trim(),
      sender: 'user',
      timestamp: Date.now(),
      image: selectedImage || undefined,
    };

    addMessage(currentChatroom, newMessage);
    setMessage('');
    setSelectedImage(null);
    toast.success('Message sent!');

    // Throttle AI responses - prevent rapid consecutive requests
    setIsThrottled(true);
    setTyping(true);
    
    // Simulate AI thinking time with throttling (2-4 seconds)
    const thinkingTime = 2000 + Math.random() * 2000;
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: generateId(),
        content: generateAIResponse(message),
        sender: 'ai',
        timestamp: Date.now(),
      };
      addMessage(currentChatroom, aiResponse);
      setTyping(false);
      
      // Reset throttle after additional cooldown
      setTimeout(() => {
        setIsThrottled(false);
      }, 1000); // 1 second cooldown after response
    }, thinkingTime);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's an interesting question! Let me think about that...",
      "I understand what you're asking. Here's my perspective...",
      "Thanks for sharing that with me. I'd love to help you with...",
      "That's a great point! I think we should consider...",
      "I'm here to help you with that. Based on what you've told me...",
      "Let me provide you with some insights on that topic...",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyMessage = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(messageId);
    toast.success('Message copied to clipboard!');
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentChatroom) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
        Select a chatroom to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-200">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-all duration-200 sticky top-0 z-10">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            title="Go back to dashboard (Escape)"
            onClick={() => setCurrentChatroom(null)}
            className="mr-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {currentChatroomData?.title}
            </h1>
          </div>
          <div className="ml-auto flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>AI Assistant Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <MessageList 
          messages={currentMessages} 
          onCopyMessage={handleCopyMessage}
          copiedMessageId={copiedMessageId}
        />
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 p-6 transition-all duration-200">
        {selectedImage && (
          <div className="mb-6">
            <div className="relative inline-block">
              <img 
                src={selectedImage} 
                alt="Selected" 
                className="max-w-32 max-h-32 rounded-xl object-cover shadow-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
              >
                ×
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex items-end space-x-4">
          <Button
            variant="ghost"
            size="sm"
            title="Upload image"
            aria-label="Upload image"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-xl transition-all duration-200"
          >
            <Image size={20} />
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            aria-label="Select image file"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onKeyDown={(e) => {
                // Ctrl/Cmd + Enter to send
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type a message..."
              aria-label="Type your message"
              className="w-full px-4 py-3 pr-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 resize-none transition-all duration-200 shadow-sm hover:shadow-md"
              rows={1}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
              <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-600 rounded">Ctrl+Enter</kbd>
            </div>
          </div>
          
          <Button
            onClick={handleSendMessage}
          title="Send message (Ctrl+Enter)"
          aria-label="Send message"
            disabled={(!message.trim() && !selectedImage) || isThrottled}
            className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
          >
            {isThrottled ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Send size={20} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};