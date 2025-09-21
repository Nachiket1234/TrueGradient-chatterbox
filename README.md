# TrueGradient Chatterbox

A modern, pixel-perfect AI chat application built with React, TypeScript, Redux Toolkit, and styled-components. Features real authentication, state management, and a beautiful UI based on Figma designs.

## 🚀 Features

- **Real Authentication**: Username/password login and signup with JWT tokens
- **Redux State Management**: Centralized state for auth, chat, notifications, and UI
- **Pixel-Perfect UI**: Styled-components implementation matching Figma designs
- **Real-time Chat**: Message sending and receiving with conversation management
- **Notification System**: Expandable notification panel with unread counts
- **Credits System**: Display and management of user credits
- **Responsive Design**: Mobile-first approach with breakpoints
- **TypeScript**: Full type safety throughout the application
- **Testing Ready**: Vitest setup for unit and integration tests

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **State Management**: Redux Toolkit, React Redux
- **Styling**: Styled Components, Framer Motion
- **Forms**: React Hook Form
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Testing**: Vitest, Testing Library
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication forms
│   ├── Chat/           # Chat-related components
│   └── Layout/         # Layout components (Header, Sidebar, etc.)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services and HTTP client
├── store/              # Redux store and slices
│   └── slices/         # Redux slices for different features
├── styles/             # Global styles and styled-components
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd truegradient-chatterbox
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

For testing purposes, use these demo credentials:
- **Username**: demo
- **Password**: password

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

Run tests with UI:
```bash
npm run test:ui
```

## 🏗️ Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📱 Features Overview

### Authentication Flow
- **Login Page**: Username/password authentication with form validation
- **Signup Page**: User registration with email verification
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Management**: JWT token storage and automatic refresh

### Chat Interface
- **Two-Panel Layout**: Conversation list on the left, chat area on the right
- **Message Bubbles**: Styled message bubbles with timestamps
- **Real-time Updates**: Live message sending and receiving
- **Conversation Management**: Create, select, and manage conversations

### Notification System
- **Notification Panel**: Slide-down panel with notification history
- **Unread Badges**: Visual indicators for unread notifications
- **Multiple Types**: Support for message, system, and warning notifications
- **Mark as Read**: Individual and bulk mark-as-read functionality

### UI/UX Features
- **Credits Display**: Real-time credits counter in the header
- **Responsive Design**: Mobile-first responsive layout
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: User-friendly error messages and recovery
- **Accessibility**: WCAG compliant with keyboard navigation

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api.truegradient-chat.com/v1
VITE_APP_NAME=TrueGradient Chatterbox
```

### API Integration

The application is designed to work with a REST API. Update the API service in `src/services/api.ts` to point to your backend:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'your-api-url';
```

## 🎨 Design System

The application follows a consistent design system:

- **Colors**: Primary blue (#3b82f6), secondary grays, semantic colors
- **Typography**: System fonts with consistent sizing scale
- **Spacing**: 8px grid system for consistent spacing
- **Components**: Reusable styled-components with variants
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Vercel
1. Connect your GitHub repository to Vercel
2. Configure build settings (auto-detected for Vite)
3. Set environment variables in Vercel dashboard

### Manual Deployment
1. Build: `npm run build`
2. Upload `dist` folder to your hosting provider
3. Configure server to serve `index.html` for all routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern chat applications
- Icons by Lucide React
- Images from Pexels
- Built with love using React and TypeScript