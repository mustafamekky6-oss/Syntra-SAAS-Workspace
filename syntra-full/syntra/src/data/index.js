export const users = [
  { id: 1, name: 'Mustafa Ali', role: 'Product Lead' },
  { id: 2, name: 'Sara Hassan', role: 'Designer' },
  { id: 3, name: 'Omar Khaled', role: 'Engineer' },
  { id: 4, name: 'Nour Adel', role: 'Engineer' },
  { id: 5, name: 'Layla Samir', role: 'Marketing' },
]
export const initialProjects = [
  { id: 1, name: 'Website Redesign', status: 'Active', progress: 72, due: '2026-10-28', owner: 2 },
  { id: 2, name: 'Mobile App v2', status: 'Active', progress: 45, due: '2026-12-05', owner: 3 },
  { id: 3, name: 'Q4 Campaign', status: 'Planning', progress: 15, due: '2026-11-20', owner: 5 },
  { id: 4, name: 'Billing Revamp', status: 'On hold', progress: 60, due: '2026-11-12', owner: 4 },
  { id: 5, name: 'Onboarding Flow', status: 'Completed', progress: 100, due: '2026-09-30', owner: 1 },
]
export const initialTasks = [
  { id: 1, title: 'Design hero section', status: 'done', priority: 'High', assignee: 2, project: 1, due: '2026-10-08' },
  { id: 2, title: 'Build pricing page', status: 'doing', priority: 'High', assignee: 3, project: 1, due: '2026-10-14' },
  { id: 3, title: 'Set up push notifications', status: 'doing', priority: 'Medium', assignee: 4, project: 2, due: '2026-10-19' },
  { id: 4, title: 'Write campaign brief', status: 'todo', priority: 'Medium', assignee: 5, project: 3, due: '2026-10-12' },
  { id: 5, title: 'Review invoice flow', status: 'review', priority: 'High', assignee: 4, project: 4, due: '2026-10-09' },
  { id: 6, title: 'User testing round 2', status: 'todo', priority: 'Low', assignee: 1, project: 2, due: '2026-10-26' },
  { id: 7, title: 'Fix checkout bug', status: 'review', priority: 'High', assignee: 3, project: 4, due: '2026-10-07' },
  { id: 8, title: 'Landing copy pass', status: 'todo', priority: 'Low', assignee: 5, project: 3, due: '2026-10-21' },
]
export const initialNotifications = [
  { id: 1, text: 'Sara moved "Design hero section" to Done', time: '2h ago', read: false },
  { id: 2, text: 'Omar commented on "Fix checkout bug"', time: '5h ago', read: false },
  { id: 3, text: 'Billing Revamp is due in 5 weeks', time: 'Yesterday', read: true },
]
export const documents = [
  { id: 1, name: 'Brand Guidelines.pdf', type: 'PDF', owner: 2, updated: 'Oct 2' },
  { id: 2, name: 'Product Roadmap', type: 'Doc', owner: 1, updated: 'Oct 4' },
  { id: 3, name: 'Q4 Budget.xlsx', type: 'Sheet', owner: 5, updated: 'Sep 28' },
  { id: 4, name: 'API Notes', type: 'Doc', owner: 3, updated: 'Oct 1' },
]
export const initialGoals = [
  { id: 1, title: 'Reach 10k active users', progress: 58 },
  { id: 2, title: 'Reduce bug backlog by 40%', progress: 35 },
  { id: 3, title: 'Launch mobile app v2', progress: 45 },
]
export const activity = [
  'Sara uploaded Brand Guidelines.pdf', 'Omar merged Fix checkout bug', 'Layla created Q4 Campaign',
  'Nour updated Billing Revamp', 'Mustafa completed Onboarding Flow',
]
