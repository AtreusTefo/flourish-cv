# CVCraft - Project Requirements Document

## 1. Project Overview

### 1.1 Project Name
**CVCraft** - Professional Resume Builder

### 1.2 Project Description
CVCraft is a modern, web-based resume builder application that enables users to create professional, ATS-friendly resumes with AI-powered suggestions. The platform offers multiple templates, real-time preview, and PDF export functionality.

### 1.3 Project Goals
- Provide an intuitive interface for creating professional resumes
- Offer multiple professionally designed templates
- Enable real-time preview and editing
- Support PDF export functionality
- Implement secure user authentication and data storage
- Ensure mobile-responsive design

## 2. Technical Architecture

### 2.1 Technology Stack

#### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **UI Library**: Radix UI components with shadcn/ui
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 6.30.1
- **State Management**: React hooks and context
- **Form Handling**: React Hook Form 7.61.1 with Zod validation

#### Backend & Database
- **Backend-as-a-Service**: Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime

#### Additional Libraries
- **PDF Generation**: jsPDF 3.0.3, html2canvas 1.4.1
- **Icons**: Lucide React 0.462.0
- **Notifications**: Sonner 1.7.4
- **Date Handling**: date-fns 3.6.0

### 2.2 Deployment
- **Platform**: Netlify
- **Build Command**: `npm run build`
- **Node Version**: 18
- **Environment**: Single Page Application (SPA)

## 3. Core Features

### 3.1 User Authentication
- **Sign Up**: Email/password registration with email verification
- **Sign In**: Email/password authentication
- **Session Management**: Persistent sessions with automatic refresh
- **Profile Management**: User profile creation and updates
- **Logout**: Secure session termination

### 3.2 Resume Builder
- **Form-based Input**: Tabbed interface for different resume sections
  - Personal Information
  - Professional Summary
  - Work Experience
  - Education
  - Skills
- **Real-time Preview**: Live preview of resume as user types
- **Template Selection**: Multiple professional templates
- **Auto-save**: Automatic saving of resume data
- **Multiple Resumes**: Users can create and manage multiple resumes

### 3.3 Template System
- **Modern Blue Template**: Professional blue-themed design
- **Minimal Classic Template**: Clean, traditional layout
- **Creative Edge Template**: Modern, creative design
- **Executive Formal Template**: Corporate, executive-level design
- **Tech Developer Template**: Technology-focused layout
- **Simple Elegant Template**: Minimalist, elegant design
- **Academic Template**: Academic and research-focused
- **Bold Modern Template**: Contemporary, bold design
- **Compact Pro Template**: Space-efficient professional layout

### 3.4 Data Management
- **Resume Storage**: JSONB storage for flexible resume data
- **CRUD Operations**: Create, read, update, delete resumes
- **User Profiles**: Extended user information storage
- **Data Validation**: Client and server-side validation

### 3.5 Export Functionality
- **PDF Export**: High-quality PDF generation
- **Template Preservation**: Maintains design in exported files
- **Download Management**: Direct download to user device

## 4. Database Schema

### 4.1 Tables

#### Profiles Table
```sql
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Resumes Table
```sql
CREATE TABLE resumes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Untitled Resume',
    cv_data JSONB NOT NULL,
    template TEXT NOT NULL DEFAULT 'modern',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4.2 Security
- **Row Level Security (RLS)**: Enabled on all tables
- **User Isolation**: Users can only access their own data
- **Authentication Required**: All operations require valid authentication

## 5. User Interface

### 5.1 Pages
- **Landing Page** (`/`): Marketing page with features and call-to-action
- **Authentication** (`/auth`): Login/signup forms
- **Resume Builder** (`/builder`): Main resume creation interface
- **Templates** (`/templates`): Template selection and preview
- **Dashboard** (`/dashboard`): User's resume management
- **Profile** (`/profile`): User profile management

### 5.2 Components
- **Navigation**: Responsive navigation with authentication state
- **Protected Routes**: Authentication-required page protection
- **CV Form**: Multi-tab form for resume data input
- **CV Preview**: Real-time resume preview
- **Template Components**: Individual template implementations

### 5.3 Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Tablet Support**: Responsive design for tablet screens
- **Desktop**: Full-featured desktop experience
- **Touch-friendly**: Optimized for touch interactions

## 6. Data Models

### 6.1 CV Data Structure
```typescript
interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa: string;
  }>;
  skills: string[];
  template: "modern" | "classic" | "minimal";
}
```

## 7. Security Requirements

### 7.1 Authentication Security
- **Password Requirements**: Minimum 6 characters
- **Email Verification**: Required for account activation
- **Session Security**: Secure token management
- **HTTPS**: All communications encrypted

### 7.2 Data Security
- **Row Level Security**: Database-level access control
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Content security headers
- **CSRF Protection**: Built-in framework protection

### 7.3 Environment Security
- **Environment Variables**: Sensitive data in environment variables
- **API Key Management**: Secure API key storage
- **Production Secrets**: Separate production credentials

## 8. Performance Requirements

### 8.1 Frontend Performance
- **Bundle Optimization**: Code splitting and lazy loading
- **Asset Optimization**: Optimized images and fonts
- **Caching**: Static asset caching
- **Responsive Loading**: Progressive loading states

### 8.2 Backend Performance
- **Database Indexing**: Optimized database queries
- **Connection Pooling**: Efficient database connections
- **CDN**: Content delivery network for static assets

## 9. Browser Support

### 9.1 Supported Browsers
- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

### 9.2 Mobile Support
- **iOS Safari**: Latest 2 versions
- **Android Chrome**: Latest 2 versions
- **Progressive Web App**: PWA capabilities

## 10. Development Workflow

### 10.1 Development Environment
- **Local Development**: Vite dev server
- **Hot Module Replacement**: Real-time code updates
- **TypeScript**: Type checking and IntelliSense
- **ESLint**: Code linting and formatting

### 10.2 Build Process
- **Production Build**: Optimized production bundle
- **Environment Configuration**: Environment-specific builds
- **Deployment**: Automated Netlify deployment

## 11. Future Enhancements

### 11.1 Planned Features
- **AI-Powered Suggestions**: Content recommendations
- **Advanced Templates**: Additional template designs
- **Collaboration**: Team resume review features
- **Analytics**: Resume performance tracking
- **Integration**: Job board integrations

### 11.2 Technical Improvements
- **Offline Support**: Service worker implementation
- **Advanced PDF**: Enhanced PDF generation
- **Performance**: Further optimization
- **Accessibility**: Enhanced accessibility features

## 12. Maintenance and Support

### 12.1 Monitoring
- **Error Tracking**: Application error monitoring
- **Performance Monitoring**: Application performance tracking
- **User Analytics**: Usage pattern analysis

### 12.2 Updates
- **Security Updates**: Regular security patches
- **Feature Updates**: Continuous feature development
- **Bug Fixes**: Regular bug fix releases
- **Dependency Updates**: Library and framework updates

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Project Status**: Active Development