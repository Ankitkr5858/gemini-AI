export interface User {
  id: string;
  phone: string;
  countryCode: string;
  name?: string;
  avatar?: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: number;
  image?: string;
  isTyping?: boolean;
}

export interface Chatroom {
  id: string;
  title: string;
  lastMessage?: Message;
  createdAt: number;
  messageCount: number;
}

export interface Country {
  name: {
    common: string;
  };
  cca2: string;
  idd: {
    root: string;
    suffixes: string[];
  };
  flag: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export interface ChatState {
  chatrooms: Chatroom[];
  currentChatroom: string | null;
  messages: Record<string, Message[]>;
  isTyping: boolean;
  addChatroom: (chatroom: Chatroom) => void;
  deleteChatroom: (id: string) => void;
  setCurrentChatroom: (id: string | null) => void;
  addMessage: (chatroomId: string, message: Message) => void;
  setTyping: (isTyping: boolean) => void;
  getMessages: (chatroomId: string, page: number) => Message[];
}

export interface UIState {
  darkMode: boolean;
  searchQuery: string;
  toggleDarkMode: () => void;
  setSearchQuery: (query: string) => void;
}