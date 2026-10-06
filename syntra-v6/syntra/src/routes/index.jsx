import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import LandingPage from '@/pages/landing/LandingPage'
import { SignIn, SignUp, Forgot, Reset } from '@/pages/auth/AuthPages'
import Onboarding from '@/pages/auth/Onboarding'
import Dashboard from '@/pages/Dashboard'
import Projects from '@/pages/Projects'
import ProjectDetails from '@/pages/ProjectDetails'
import Profile from '@/pages/Profile'
import Tasks from '@/pages/Tasks'
import Calendar from '@/pages/Calendar'
import Documents from '@/pages/Documents'
import { Analytics, Team, Goals, Notifications, ActivityPage, Settings } from '@/pages/Modules'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/forgot-password', element: <Forgot /> },
  { path: '/reset-password', element: <Reset /> },
  { path: '/onboarding', element: <Onboarding /> },
  {
    path: '/app',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:id', element: <ProjectDetails /> },
      { path: 'profile', element: <Profile /> },
      { path: 'tasks', element: <Tasks /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'documents', element: <Documents /> },
      { path: 'team', element: <Team /> },
      { path: 'goals', element: <Goals /> },
      { path: 'notifications', element: <Notifications /> },
      { path: 'activity', element: <ActivityPage /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
])
