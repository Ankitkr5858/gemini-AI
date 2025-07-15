import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatState, Chatroom, Message } from '../types';

// Generate dummy messages for infinite scroll demo
const generateDummyMessages = (chatroomId: string, count: number = 50): Message[] => {
  const messages: Message[] = [];
  const now = Date.now();
  
  for (let i = 0; i < count; i++) {
    const isUser = Math.random() > 0.6;
    const timeAgo = now - (i * 60000 * Math.random() * 30); // Random time in past 30 mins
    
    messages.unshift({
      id: `msg-${chatroomId}-${i}`,
      content: isUser 
        ? `User message ${i + 1}: ${['Hello!', 'How are you?', 'Can you help me?', 'Thanks!'][Math.floor(Math.random() * 4)]}`
        : `AI response ${i + 1}: ${['Hello! How can I help you today?', 'I\'m doing well, thank you!', 'Of course! What do you need help with?', 'You\'re welcome!'][Math.floor(Math.random() * 4)]}`,
      sender: isUser ? 'user' : 'ai',
      timestamp: timeAgo,
    });
  }
  
  return messages;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chatrooms: [],
      currentChatroom: null,
      messages: {},
      isTyping: false,
      
      addChatroom: (chatroom: Chatroom) => {
        const dummyMessages = generateDummyMessages(chatroom.id, 50);
        set((state) => ({
          chatrooms: [...state.chatrooms, { ...chatroom, messageCount: dummyMessages.length }],
          messages: {
            ...state.messages,
            [chatroom.id]: dummyMessages,
          },
        }));
      },
      
      deleteChatroom: (id: string) => {
        set((state) => {
          const newMessages = { ...state.messages };
          delete newMessages[id];
          return {
            chatrooms: state.chatrooms.filter((room) => room.id !== id),
            messages: newMessages,
            currentChatroom: state.currentChatroom === id ? null : state.currentChatroom,
          };
        });
      },
      
      setCurrentChatroom: (id: string | null) => {
        set({ currentChatroom: id });
      },
      
      addMessage: (chatroomId: string, message: Message) => {
        set((state) => ({
          messages: {
            ...state.messages,
            [chatroomId]: [...(state.messages[chatroomId] || []), message],
          },
        }));
      },
      
      setTyping: (isTyping: boolean) => {
        set({ isTyping });
      },
      
      getMessages: (chatroomId: string, page: number) => {
        const messages = get().messages[chatroomId] || [];
        const perPage = 20;
        const startIndex = Math.max(0, messages.length - (page * perPage));
        const endIndex = messages.length - ((page - 1) * perPage);
        return messages.slice(startIndex, endIndex);
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);