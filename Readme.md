# 🚀 Gemini Chat Application

A modern, intuitive chat application built with React, TypeScript, and Tailwind CSS. Experience seamless conversations with AI in a beautiful, responsive interface.

![Gemini Chat](https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### 🎨 **Beautiful UI/UX**
- Modern gradient design with smooth animations
- Dark/Light theme toggle with system preference detection
- Responsive design that works on all devices
- Intuitive hover effects and micro-interactions
- Apple-level design aesthetics

### 💬 **Chat Features**
- Real-time messaging with AI responses
- Image upload and sharing capabilities
- Message copying functionality
- Typing indicators
- Infinite scroll for message history
- Message timestamps and status indicators

### 🔐 **Authentication**
- Phone number-based authentication
- OTP verification system
- Country code selection with flags
- Secure session management

### ⚡ **Performance**
- Fast loading with Vite
- Optimized bundle size
- Smooth animations and transitions
- Efficient state management with Zustand

### ♿ **Accessibility**
- Full keyboard navigation support
- Screen reader friendly
- High contrast ratios
- ARIA labels and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Notifications**: React Hot Toast

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd gemini-chat-app
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
```

### 4. Open in Browser
Navigate to `http://localhost:5173` in your web browser.

## 📱 How to Use the Application

### 🔑 **Step 1: Authentication**

1. **Launch the App**: Open the application in your browser
2. **Select Country**: Choose your country from the dropdown (defaults to India +91)
3. **Enter Phone Number**: Input your phone number (minimum 6 digits)
4. **Send OTP**: Click "Send OTP" button
5. **Enter OTP**: Use `123456` as the demo OTP code
6. **Verify**: Click "Verify OTP" to log in

> 💡 **Demo Credentials**: Use any phone number and `123456` as OTP for testing

### 🏠 **Step 2: Dashboard Overview**

Once logged in, you'll see the main dashboard with:

#### **Header Section**
- **App Logo**: Gemini Chat branding
- **Theme Toggle**: Switch between light/dark modes
- **Logout Button**: Sign out of your account

#### **Main Content**
- **Welcome Message**: Personalized greeting
- **Search Bar**: Find chatrooms quickly (Ctrl+K to focus)
- **New Chat Button**: Create new conversations (Ctrl+N)
- **Chatroom Grid**: Visual cards showing your conversations

#### **Keyboard Shortcuts**
- `Ctrl + N`: Create new chatroom
- `Ctrl + K`: Focus search bar
- `Arrow Keys`: Navigate between chatroom cards
- `Enter/Space`: Open selected chatroom
- `Escape`: Close modals

### 💬 **Step 3: Creating Your First Chat**

1. **Click "New Chat"** or press `Ctrl + N`
2. **Enter Title**: Give your chatroom a descriptive name
3. **Create**: Click "Create Chatroom" button
4. **Start Chatting**: Your new chatroom appears in the grid

### 🗨️ **Step 4: Chatting Experience**

#### **Entering a Chatroom**
- Click any chatroom card to enter
- See the chat interface with message history

#### **Sending Messages**
1. **Type Message**: Use the text area at the bottom
2. **Add Images**: Click the image icon to upload photos
3. **Send**: Press `Enter` or click the send button
4. **Quick Send**: Use `Ctrl + Enter` for instant sending

#### **Message Features**
- **Copy Messages**: Hover over messages to see copy button
- **View Timestamps**: See when each message was sent
- **User Avatars**: Distinguish between you and AI responses
- **Typing Indicators**: See when AI is responding

#### **Navigation**
- **Back to Dashboard**: Click arrow or press `Escape`
- **Scroll History**: Infinite scroll loads older messages
- **Real-time Updates**: Messages appear instantly

### 🎨 **Step 5: Customization**

#### **Theme Switching**
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes for low-light use
- **Auto-Detection**: Follows your system preference
- **Toggle**: Click sun/moon icon anytime

#### **Search & Organization**
- **Search Chatrooms**: Type in search bar to filter
- **Clear Search**: Click X button to reset
- **Sort by Recent**: Newest conversations appear first

### 🗑️ **Step 6: Managing Chatrooms**

#### **Deleting Chatrooms**
1. **Hover over Card**: Trash icon appears
2. **Click Delete**: Confirm deletion in popup
3. **Permanent**: Action cannot be undone

#### **Chatroom Information**
- **Message Count**: See total messages in each room
- **Creation Date**: When the chatroom was created
- **Last Activity**: Recent message timestamps

## ⌨️ Keyboard Shortcuts Reference

### **Global Shortcuts**
| Shortcut | Action |
|----------|--------|
| `Ctrl + N` | Create new chatroom |
| `Ctrl + K` | Focus search bar |
| `Escape` | Close modals/Go back |

### **Dashboard Navigation**
| Shortcut | Action |
|----------|--------|
| `Arrow Keys` | Navigate chatroom cards |
| `Enter/Space` | Open selected chatroom |
| `Tab` | Move between interactive elements |

### **Chat Interface**
| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Ctrl + Enter` | Quick send |
| `Escape` | Return to dashboard |
| `Arrow Up/Down` | Navigate message copy buttons |

## 🎯 Tips for Best Experience

### **Performance Tips**
- Use modern browsers for best performance
- Enable hardware acceleration
- Close unused tabs to free memory

### **Usage Tips**
- **Descriptive Names**: Use clear chatroom titles
- **Regular Cleanup**: Delete unused chatrooms
- **Image Optimization**: Compress large images before upload
- **Keyboard Navigation**: Learn shortcuts for faster usage

### **Accessibility Tips**
- **High Contrast**: Use dark mode for better contrast
- **Screen Readers**: All elements have proper labels
- **Keyboard Only**: Full functionality without mouse
- **Focus Indicators**: Clear visual focus states

## 🔧 Development

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### **Project Structure**
```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── chat/           # Chat interface components
│   ├── dashboard/      # Dashboard components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### **Key Technologies**
- **React 18**: Latest React with concurrent features
- **TypeScript**: Type safety and better DX
- **Tailwind CSS**: Utility-first styling
- **Zustand**: Lightweight state management
- **React Hook Form**: Efficient form handling
- **Zod**: Runtime type validation

## 🔧 Technical Implementation Details

### **Form Validation**
Our application uses a robust form validation system:

```typescript
// Using React Hook Form + Zod for type-safe validation
const schema = z.object({
  phone: z.string().min(6, 'Phone number must be at least 6 digits'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

**Implementation Details:**
- **Real-time validation** with immediate feedback
- **Type-safe schemas** using Zod for runtime validation
- **Accessible error messages** with proper ARIA attributes
- **Custom validation rules** for phone numbers and OTP
- **Form state management** with React Hook Form

### **Infinite Scroll Implementation**
Messages load progressively as users scroll up:

```typescript
// Infinite scroll hook in MessageList component
useEffect(() => {
  const handleScroll = (e: Event) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollTop === 0 && messages.length >= messagesPerPage) {
      loadMoreMessages();
    }
  };

  const messagesContainer = document.querySelector('.messages-container');
  messagesContainer?.addEventListener('scroll', handleScroll);
}, [messages.length, page]);
```

**Key Features:**
- **Scroll-triggered loading** when reaching the top
- **Pagination system** with 20 messages per page
- **Loading states** with skeleton components
- **Performance optimization** to prevent excessive API calls
- **Smooth UX** with loading indicators

### **Search Throttling/Debouncing**
Search input is debounced to improve performance:

```typescript
// Custom debounce hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Usage in Dashboard
const debouncedSearch = useDebounce(searchQuery, 300);
```

**Benefits:**
- **Reduced API calls** by waiting 300ms after user stops typing
- **Better performance** by preventing excessive re-renders
- **Smooth user experience** without lag during typing
- **Memory efficient** with proper cleanup

### **State Management Architecture**
Using Zustand for efficient state management:

```typescript
// Persistent store with middleware
export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chatrooms: [],
      messages: {},
      // ... state and actions
    }),
    {
      name: 'chat-storage', // localStorage key
    }
  )
);
```

**Architecture Benefits:**
- **Persistent storage** with automatic localStorage sync
- **Type-safe state** with TypeScript interfaces
- **Minimal boilerplate** compared to Redux
- **Selective subscriptions** for optimal re-renders
- **Middleware support** for persistence and dev tools

### **Performance Optimizations**

#### **Component Optimization**
- **React.memo** for preventing unnecessary re-renders
- **useCallback** for stable function references
- **useMemo** for expensive calculations
- **Lazy loading** for code splitting

#### **Bundle Optimization**
- **Tree shaking** with ES modules
- **Dynamic imports** for route-based splitting
- **Optimized dependencies** with minimal bundle size
- **Vite's fast HMR** for development speed

#### **Memory Management**
- **Cleanup functions** in useEffect hooks
- **Event listener removal** to prevent memory leaks
- **Proper dependency arrays** to avoid stale closures
- **Efficient data structures** for message storage

### **Accessibility Implementation**

#### **Keyboard Navigation**
```typescript
// Custom keyboard navigation hook
const useKeyboardNavigation = (items: any[], onSelect: (id: string) => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          // Navigate to next item
          break;
        case 'Enter':
          // Select current item
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [items, onSelect]);
};
```

#### **ARIA Implementation**
- **Semantic HTML** with proper roles and labels
- **Screen reader announcements** for dynamic content
- **Focus management** for modal dialogs
- **High contrast support** with proper color ratios
- **Keyboard shortcuts** with visual indicators

### **Error Handling Strategy**

#### **Form Errors**
- **Field-level validation** with immediate feedback
- **Server error handling** with user-friendly messages
- **Retry mechanisms** for failed submissions
- **Loading states** to prevent double submissions

#### **Runtime Errors**
- **Error boundaries** to catch component errors
- **Graceful degradation** when features fail
- **User notifications** with toast messages
- **Console logging** for debugging in development

## 🐛 Troubleshooting

### **Common Issues**

#### **App Won't Load**
- Check if Node.js is installed (`node --version`)
- Ensure port 5173 is available
- Clear browser cache and reload

#### **Dark Mode Not Working**
- Refresh the page
- Check browser console for errors
- Try toggling theme multiple times

#### **OTP Not Working**
- Use `123456` as the demo OTP
- Check phone number format
- Ensure JavaScript is enabled

#### **Images Not Uploading**
- Check file size (keep under 5MB)
- Use supported formats (JPG, PNG, GIF)
- Ensure stable internet connection

### **Performance Issues**
- Close other browser tabs
- Disable browser extensions
- Check system resources
- Use latest browser version

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write accessible components
- Add proper error handling
- Include JSDoc comments



## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Lucide** for beautiful icons
- **Zustand** for simple state management
- **Vite** for lightning-fast development

## 📞 Support

If you encounter any issues or have questions:

1. Check this README first
2. Look at the troubleshooting section
3. Search existing issues on GitHub
4. Create a new issue with detailed description

---

**Made with ❤️ using React, TypeScript, and Tailwind CSS**

*Enjoy chatting with Gemini! 🚀*