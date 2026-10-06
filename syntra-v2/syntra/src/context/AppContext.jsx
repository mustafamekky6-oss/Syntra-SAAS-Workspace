import { createContext, useContext, useState, useCallback } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { initialProjects, initialTasks, initialNotifications, initialGoals } from '@/data'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

export function AppProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects)
  const [tasks, setTasks] = useState(initialTasks)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [goals, setGoals] = useState(initialGoals)
  const [toasts, setToasts] = useState([])
  const [theme, setTheme] = useTheme()

  const toast = useCallback((msg) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, msg }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800)
  }, [])

  const value = {
    projects, tasks, notifications, goals, toasts, toast, theme, setTheme,
    addProject: (p) => { setProjects((s) => [{ id: Date.now(), progress: 0, ...p }, ...s]); toast('Project created') },
    addTask: (t) => { setTasks((s) => [{ id: Date.now(), status: 'todo', ...t }, ...s]); toast('Task added') },
    moveTask: (id, status) => setTasks((s) => s.map((t) => (t.id === id ? { ...t, status } : t))),
    toggleRead: (id) => setNotifications((s) => s.map((n) => (n.id === id ? { ...n, read: !n.read } : n))),
    readAll: () => { setNotifications((s) => s.map((n) => ({ ...n, read: true }))); toast('All marked as read') },
    bumpGoal: (id) => setGoals((s) => s.map((g) => (g.id === id ? { ...g, progress: Math.min(100, g.progress + 10) } : g))),
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
