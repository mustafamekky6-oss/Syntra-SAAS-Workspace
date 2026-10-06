import { createBrowserRouter } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import Dashboard from '@/pages/Dashboard'
import Projects from '@/pages/Projects'
import Tasks from '@/pages/Tasks'
import { Calendar, Analytics, Documents, Team, Goals, Notifications, ActivityPage, Settings } from '@/pages/Modules'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/projects', element: <Projects /> },
      { path: '/tasks', element: <Tasks /> },
      { path: '/calendar', element: <Calendar /> },
      { path: '/analytics', element: <Analytics /> },
      { path: '/documents', element: <Documents /> },
      { path: '/team', element: <Team /> },
      { path: '/goals', element: <Goals /> },
      { path: '/notifications', element: <Notifications /> },
      { path: '/activity', element: <ActivityPage /> },
      { path: '/settings', element: <Settings /> },
    ],
  },
])
