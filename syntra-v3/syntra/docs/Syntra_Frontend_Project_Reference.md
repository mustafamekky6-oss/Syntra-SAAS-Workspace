# Syntra — Professional SaaS Front-End Portfolio Project

> **Project Type:** Front-End Portfolio Project  
> **Primary Goal:** Demonstrate advanced Front-End development, UI/UX implementation, reusable component architecture, responsive design, data visualization, state management, and complex user interactions.  
> **Current Scope:** Front-End only.  
> **AI:** Out of scope for the current version.  
> **Backend:** Out of scope.  
> **Database:** Out of scope. Optional Supabase may be introduced later only if explicitly requested and only as lightweight persistence.  
> **Production Security / Testing:** Out of scope for this portfolio/demo project.  
> **Development Method:** Professional AI-assisted / Vibe Coding, implemented phase-by-phase.

---

## 1. Product Overview

**Syntra** is a premium modern SaaS workspace that brings project management, task management, analytics, calendar planning, documents, team collaboration, goals, notifications, search, and workspace settings into one coherent interface.

The purpose is not to create a production SaaS backend. The purpose is to build a **large, polished, believable SaaS product interface** that demonstrates strong Front-End skills.

### Suggested tagline

> **One workspace. Total clarity.**

### Product positioning

> A unified workspace for planning, organizing, tracking, and understanding work.

---

# 2. Main Portfolio Objective

The finished project should make a recruiter or developer think:

> **“This is much more than a simple Front-End exercise.”**

It should demonstrate:

- Advanced responsive UI
- Professional SaaS layout
- Multi-page application architecture
- Reusable components
- Complex UI states
- Interactive dashboards
- Data visualization
- Tables and filters
- Forms and validation UI
- Modals and drawers
- Tabs and dropdowns
- Search and sorting
- Drag and drop
- Kanban boards
- Calendar interfaces
- Notifications
- Command palette
- Dark/light themes
- Local/demo state
- Realistic mock data
- Loading states
- Empty states
- Error-like states
- Toast feedback
- Micro-interactions
- Strong visual hierarchy
- Consistent design system

---

# 3. Strict Scope Rules

## 3.1 Front-End Only

The current project is evaluated primarily as a Front-End portfolio project.

Priorities:

1. Visual quality
2. UX quality
3. Feature richness
4. Interactivity
5. Responsive behavior
6. Component architecture
7. Maintainable Front-End structure

Do not spend project time on unnecessary backend infrastructure.

## 3.2 No AI in Current Version

Do **not** implement:

- AI chatbot
- LLM integration
- AI agents
- RAG
- AI document analysis
- AI-generated reports
- AI automation
- OpenAI/Gemini/other AI APIs

AI may exist only as a future roadmap item.

## 3.3 No Custom Backend

Do not build:

- Node/Express backend
- REST/GraphQL server
- Server-side business logic
- Production authentication server
- Complex database architecture
- Production API infrastructure

Use realistic local/mock data.

## 3.4 Optional Supabase

Supabase is **not required**. If later used, keep it lightweight and optional.

Rules:

- Do not turn the project into a backend project.
- Do not build complex backend architecture.
- The Front-End should remain demonstrable with mock/local data.
- Use Supabase only if it materially improves the demo.

## 3.5 No Production Hardening

This is a portfolio demonstration, not a client production system.

Do not prioritize:

- Security architecture
- Penetration testing
- Enterprise authorization
- Compliance
- Production monitoring
- Advanced automated testing
- DevOps infrastructure

---

# 4. Recommended Technology Stack

### Core

- React
- Vite
- JavaScript
- Tailwind CSS

### Recommended supporting libraries

- React Router
- Lucide React
- Recharts
- dnd-kit
- React Hook Form
- Zod
- date-fns

### State

Start with React state/context and localStorage where appropriate. Introduce Zustand only if the project becomes difficult to manage with simpler state.

Do not add libraries without a clear reason.

---

# 5. Design Direction

Syntra should look like a premium modern SaaS product.

### Style

- Clean
- Minimal
- Professional
- Modern
- Premium
- Product-focused
- Strong typography
- Generous spacing
- Clear hierarchy
- Subtle shadows
- Consistent borders
- Refined cards
- Restrained animations

### Avoid

- Excessive gradients
- Excessive glassmorphism
- Random animations
- Template-like appearance
- Generic dashboard aesthetics
- Overloaded screens
- Decorative effects with no UX purpose

---

# 6. Design System

Create reusable primitives before building large pages.

### Typography

Define consistent styles for:

- Display
- Page title
- Section title
- Body
- Small text
- Labels
- Captions

### Components

Create reusable:

- Button
- Input
- Select
- Checkbox
- Radio
- Switch
- Badge
- Avatar
- Tooltip
- Dropdown
- Modal
- Drawer
- Tabs
- Card
- Table
- Progress bar
- Toast
- Skeleton
- Empty state

Do not create multiple slightly different versions of the same component without a reason.

---

# 7. Application Map

```text
Landing Page
    ↓
Authentication Screens
    ↓
Onboarding
    ↓
Main Application
    │
    ├── Overview
    ├── Projects
    ├── Tasks
    ├── Calendar
    ├── Analytics
    ├── Documents
    ├── Team
    ├── Goals
    ├── Notifications
    ├── Activity
    ├── Global Search
    ├── Profile
    └── Settings
```

---

# 8. Landing Page

Build a real SaaS marketing website.

### Sections

- Navbar
- Hero
- Product preview
- Feature grid
- Workflow section
- Analytics preview
- Collaboration preview
- Testimonials (fictional demo data)
- Pricing preview (visual only)
- FAQ accordion
- Final CTA
- Footer

### Hero

> **One workspace. Total clarity.**

Buttons:

- Get Started
- Explore Demo

The product preview should feel interactive rather than like a dead screenshot.

---

# 9. Authentication UI

Front-End screens only.

### Login

- Email
- Password
- Remember me
- Forgot password
- Social login visual buttons
- Validation states

### Register

- Full name
- Email
- Password
- Confirm password
- Workspace name

### Forgot Password

Complete visual flow.

### Reset Password

Polished reset-password screen.

---

# 10. Onboarding

Create a multi-step onboarding flow.

### Steps

1. Welcome
2. Workspace purpose
3. Goals
4. Workspace setup
5. Completion

Include:

- Progress indicator
- Back/Next controls
- Selection states
- Validation UI
- Smooth transitions

---

# 11. Main Application Shell

### Sidebar

- Overview
- Projects
- Tasks
- Calendar
- Analytics
- Documents
- Team
- Goals
- Activity

### Top bar

- Global search
- Command palette trigger
- Notifications
- Profile menu
- Theme toggle

### Responsive behavior

- Expanded sidebar on desktop
- Collapsible sidebar
- Mobile navigation drawer/bottom navigation

---

# 12. Overview Dashboard

This should be the strongest page visually.

### KPI cards

- Total Projects
- Active Tasks
- Completed Tasks
- Productivity
- Team Members
- Upcoming Deadlines

Each can show:

- Current value
- Percentage change
- Trend indicator
- Supporting text

### Charts

- Productivity over time
- Task completion
- Project progress
- Team activity
- Work distribution

### Additional sections

- Recent projects
- Upcoming tasks
- Recent activity
- Quick actions

Quick actions:

- New Project
- New Task
- Add Member
- Upload Document
- Create Goal

---

# 13. Projects Module

### Projects overview

Features:

- Search
- Filter
- Sort
- Grid view
- List view
- Status tabs
- Create project

Statuses:

- Planning
- Active
- Completed
- Archived

### Project card

Include:

- Name
- Description
- Progress
- Status
- Priority
- Deadline
- Members
- Task count

### Create project modal

Fields:

- Name
- Description
- Status
- Priority
- Start date
- Deadline
- Team members
- Tags

---

# 14. Project Details

Each project has:

- Overview
- Tasks
- Board
- Calendar
- Files
- Team
- Activity

### Overview

- Progress
- Deadline
- Status
- Priority
- Team
- Statistics

---

# 15. Tasks Module

Create a full task-management interface.

### List view

Columns:

- Task
- Project
- Assignee
- Priority
- Status
- Due date

### Kanban view

Columns:

- Backlog
- To Do
- In Progress
- Review
- Done

Implement drag-and-drop.

### Filters

- Status
- Priority
- Project
- Assignee
- Due date
- Tags

### Search

Search task titles and descriptions.

---

# 16. Task Details

Use a drawer or modal.

Include:

- Title
- Description
- Status
- Priority
- Assignee
- Project
- Due date
- Tags
- Subtasks
- Checklist
- Comments
- Activity

Interactions should feel realistic even with mock data.

---

# 17. Calendar

Create a full calendar UI.

### Views

- Month
- Week
- Day

Show:

- Task deadlines
- Project milestones
- Meetings
- Events

Interactions:

- Change date
- Open event
- Create event UI
- Filter event types

---

# 18. Analytics

Create a dedicated analytics page.

### KPIs

- Completion rate
- Productivity
- Active projects
- Completed tasks
- Overdue tasks

### Charts

- Productivity trend
- Tasks completed
- Tasks by status
- Projects by status
- Workload
- Team activity

### Filters

- 7 days
- 30 days
- 90 days
- Custom range
- Project
- Team member
- Status

---

# 19. Documents

Front-End document management interface.

### Library

Display:

- File name
- Type
- Size
- Owner
- Date
- Related project
- Tags

### Features

- Upload UI
- Search
- Filter
- Sort
- Grid/list toggle
- Preview modal
- Rename
- Delete
- Download visual action

Use mock documents.

---

# 20. Team

### Team overview

Show:

- Total members
- Active members
- Teams
- Projects

### Member cards/table

Include:

- Avatar
- Name
- Role
- Status
- Projects
- Tasks
- Activity
- Last active

---

# 21. Goals

Create personal/team goal management.

### Goal card

- Goal name
- Description
- Progress
- Deadline
- Category
- Status

Examples:

- Complete product design
- Finish website
- Launch project
- Improve productivity

Progress should be interactive.

---

# 22. Notifications

Create a notification center.

Types:

- Task assigned
- Task completed
- Deadline approaching
- Comment
- Mention
- Project update
- System notification

Features:

- Read/unread
- Mark as read
- Mark all as read
- Filter

---

# 23. Activity

Create a timeline with realistic mock events.

Example:

```text
Mostafa completed “Build dashboard”
2 minutes ago

Ahmed created “API documentation”
18 minutes ago

Omar updated Project Alpha
1 hour ago
```

Filters:

- All
- Projects
- Tasks
- Team
- Documents

---

# 24. Global Search

Search across:

- Projects
- Tasks
- Team members
- Documents
- Goals

Group results by category.

---

# 25. Command Palette

Keyboard shortcut:

```text
Ctrl + K
```

Commands:

- Go to Dashboard
- Go to Projects
- Create Project
- Create Task
- Open Calendar
- Open Analytics
- Open Settings
- Toggle Theme

It should feel fast and polished.

---

# 26. Profile

Include:

- Avatar
- Name
- Email
- Role
- Bio
- Statistics
- Projects
- Activity

---

# 27. Settings

### Account

- Name
- Email
- Avatar
- Bio

### Appearance

- Light
- Dark
- System
- Density

### Notifications

- Task notifications
- Project notifications
- Mentions
- Reminders

### Workspace

- Workspace name
- Workspace icon
- Default settings

---

# 28. Theme System

Implement:

- Light mode
- Dark mode
- System mode

Persist the selected theme locally.

Both themes must be fully designed, not simply inverted.

---

# 29. Interaction Requirements

The application must not be a collection of static screens.

Important interactions:

- Buttons perform meaningful UI actions.
- Modals open/close correctly.
- Forms update state.
- Filters affect displayed data.
- Search works against mock data.
- Tabs switch content.
- Kanban cards move via drag-and-drop.
- Theme changes persist.
- Notifications change read state.
- Tasks can change status.
- Progress updates visually.
- Sidebar collapses.
- Mobile navigation works.
- Toasts provide feedback.
- Dialogs have realistic states.

---

# 30. Data Strategy

Use local mock data.

Recommended files:

```text
src/data/
  projects.js
  tasks.js
  users.js
  notifications.js
  documents.js
  goals.js
  activities.js
  analytics.js
```

Use believable data with varied statuses, priorities, names, dates, and progress values.

---

# 31. Suggested Project Structure

```text
src/
├── assets/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── charts/
│   ├── forms/
│   ├── tables/
│   └── common/
├── pages/
│   ├── landing/
│   ├── auth/
│   ├── onboarding/
│   ├── dashboard/
│   ├── projects/
│   ├── tasks/
│   ├── calendar/
│   ├── analytics/
│   ├── documents/
│   ├── team/
│   ├── goals/
│   ├── notifications/
│   ├── activity/
│   ├── profile/
│   └── settings/
├── data/
├── hooks/
├── context/
├── utils/
├── routes/
└── App.jsx
```

Adapt the structure if the actual implementation benefits from another organization. Do not create architecture for the sake of architecture.

---

# 32. Professional Vibe-Coding Rules

The application must be built in **small controlled phases**.

Never ask the coding AI to generate the entire application at once.

For every phase:

1. Inspect the current project.
2. Understand the existing architecture.
3. Reuse existing components.
4. Implement only the requested scope.
5. Avoid unnecessary dependencies.
6. Do not rewrite unrelated code.
7. Preserve existing functionality.
8. Run/build the project when possible.
9. Fix obvious errors.
10. Summarize what changed.
11. Stop and wait for the next phase.

The AI must not independently expand scope.

---

# 33. Phase-by-Phase Development Plan

## Phase 00 — Project Setup

- Create React/Vite project
- Install required dependencies only
- Configure Tailwind
- Establish base folders
- Establish global styles
- Establish initial design tokens

## Phase 01 — Design System

Build reusable primitives:

- Buttons
- Inputs
- Cards
- Badges
- Avatars
- Dropdowns
- Modals
- Tabs
- Toasts
- Tooltips

## Phase 02 — Landing Page

Build:

- Navbar
- Hero
- Product preview
- Features
- Workflow
- Testimonials
- FAQ
- CTA
- Footer

## Phase 03 — Authentication UI

Build:

- Login
- Register
- Forgot password
- Reset password

Front-End only.

## Phase 04 — Onboarding

Build the multi-step onboarding flow.

## Phase 05 — Application Shell

Build:

- Sidebar
- Topbar
- Mobile navigation
- Profile menu
- Theme switcher

## Phase 06 — Dashboard

Build:

- KPI cards
- Charts
- Recent projects
- Upcoming tasks
- Activity
- Quick actions

## Phase 07 — Projects

Build:

- Project list
- Grid/list views
- Search
- Filters
- Sorting
- Create project modal

## Phase 08 — Project Details

Build:

- Overview
- Tasks
- Board
- Calendar
- Files
- Team
- Activity

## Phase 09 — Tasks & Kanban

Build:

- List
- Kanban
- Drag/drop
- Filters
- Search
- Task details drawer

## Phase 10 — Calendar

Build:

- Month
- Week
- Day
- Events
- Task deadlines

## Phase 11 — Analytics

Build:

- KPIs
- Charts
- Filters
- Date ranges

## Phase 12 — Documents

Build:

- Document library
- Upload UI
- Search
- Filters
- Preview
- Grid/list

## Phase 13 — Team

Build:

- Team dashboard
- Member cards
- Member table
- Member details

## Phase 14 — Goals

Build:

- Goals
- Progress
- Deadlines
- Categories
- Goal creation

## Phase 15 — Notifications & Activity

Build:

- Notification center
- Read/unread
- Activity timeline
- Filters

## Phase 16 — Global Search

Build cross-application search.

## Phase 17 — Command Palette

Build:

- Ctrl + K
- Commands
- Navigation
- Quick actions

## Phase 18 — Profile & Settings

Build:

- Profile
- Account
- Appearance
- Notifications
- Workspace

## Phase 19 — Responsive Pass

Review every major page on:

- Desktop
- Laptop
- Tablet
- Mobile

Fix layouts systematically.

## Phase 20 — UX Polish

Add/refine:

- Loading states
- Skeletons
- Empty states
- Toasts
- Hover states
- Transitions
- Micro-interactions
- Error-like states

## Phase 21 — Final Visual Polish

Review:

- Typography
- Spacing
- Alignment
- Component consistency
- Icons
- Charts
- Colors
- Dark mode
- Mobile layouts

## Phase 22 — Portfolio Preparation

Prepare:

- Final screenshots
- Demo data
- README
- Project description
- Feature list
- Tech stack
- Live demo
- GitHub presentation

---

# 34. Phase Execution Contract

Every phase must be completed independently.

At the end of each phase, the coding AI must return:

### Completed

List implemented features.

### Files Changed

List important files.

### Notes

Mention important implementation decisions or limitations.

### Next Phase

State the next phase, but **do not implement it**.

This is specifically intended to control context/token limits and prevent uncontrolled code generation.

---

# 35. Definition of Done

The project is complete when:

- All major pages exist.
- Navigation works.
- Main interactions work.
- Mock data feels realistic.
- Dashboard is visually strong.
- Projects and Tasks are highly interactive.
- Kanban drag/drop works.
- Analytics are functional.
- Calendar is usable.
- Documents UI works.
- Team UI works.
- Goals work.
- Notifications work.
- Search works.
- Command palette works.
- Dark/light mode works.
- Responsive layouts work.
- Components are reusable.
- The UI feels like one coherent product.

---

# 36. Explicitly Out of Scope

Do not add during the current project:

- AI
- AI assistant
- AI automation
- LLM
- RAG
- AI agents
- Custom backend
- Complex database
- Production authentication
- Payment processing
- Real-time infrastructure
- Advanced testing systems
- DevOps infrastructure
- Enterprise security

These can be considered future versions only.

---

# 37. Future Roadmap — Not Current Scope

Potential future versions may add:

- Supabase persistence
- Real authentication
- Backend APIs
- AI Assistant
- AI insights
- RAG
- AI document analysis
- Automation
- Integrations

Nothing in this section should be implemented unless explicitly requested later.

---

# 38. Portfolio Positioning

Present the project as:

> **Syntra — A professional SaaS workspace interface built to demonstrate advanced Front-End development, complex UI interactions, responsive design, data visualization, and scalable component architecture.**

Do not claim production backend infrastructure, AI functionality, or database features that are not actually implemented.

---

# 39. Final Product Vision

The final experience should feel inspired by the quality and usability of modern products such as Linear, Notion, Jira, and Asana, while maintaining an original visual identity.

The objective is not to copy an existing product.

The objective is to demonstrate that a Junior Front-End Developer can use modern development tools and AI-assisted coding to build a **large, polished, coherent SaaS product interface**.

---

# 40. MASTER VIBE-CODING PROMPT

Copy the following prompt into the AI coding assistant at the beginning of the implementation.

---

## Prompt

You are my senior Front-End engineering partner.

We are building a portfolio project called **Syntra**, a premium modern SaaS workspace.

The project is intentionally a **Front-End-only portfolio project**.

### Main Objective

Build a highly polished, feature-rich SaaS web application that demonstrates advanced Front-End skills.

The final result should look and behave like a real modern SaaS product, not like a tutorial project.

### Scope Rules

Current version = Front-End only.

Do NOT build:

- AI features
- AI chatbot
- LLM integration
- AI agents
- RAG
- AI automation
- Custom backend
- Complex database architecture
- Production authentication
- Security architecture
- Enterprise infrastructure
- Testing infrastructure
- DevOps infrastructure

Use realistic mock/local data.

Supabase is optional only if explicitly requested later. Do not make the project dependent on a backend.

This is a portfolio/demo project, not a production client system.

### Product

Name: **Syntra**

Tagline: **One workspace. Total clarity.**

The product combines:

- Project management
- Task management
- Kanban
- Calendar
- Analytics
- Documents
- Team management
- Goals
- Notifications
- Activity
- Search
- Command palette
- Profile
- Settings

### Technology

Use:

- React
- Vite
- JavaScript
- Tailwind CSS

Recommended libraries where useful:

- React Router
- Lucide React
- Recharts
- dnd-kit
- React Hook Form
- Zod
- date-fns

Do not add dependencies without a clear reason.

### Design

Create a premium, modern SaaS visual system.

The UI should be:

- Clean
- Professional
- Modern
- Minimal
- Premium
- Responsive
- Consistent

Avoid excessive gradients, glassmorphism, animations, or decorative effects.

Prioritize usability and visual hierarchy.

### Architecture

Use reusable components and a scalable structure.

Avoid putting the entire application into a few huge files.

Create reusable components for:

- Buttons
- Cards
- Inputs
- Modals
- Drawers
- Tabs
- Tables
- Badges
- Avatars
- Dropdowns
- Toasts
- Skeletons
- Empty states

Use realistic mock data separately from UI components.

### Critical Vibe-Coding Rule

DO NOT build the entire application in one response.

We will build it phase-by-phase.

For the current request, implement ONLY the requested phase.

Before changing code:

1. Inspect the existing project.
2. Understand the current architecture.
3. Reuse existing components.
4. Identify what already exists.
5. Avoid duplicating components.

While coding:

1. Implement only the current phase.
2. Do not modify unrelated functionality.
3. Do not introduce unnecessary dependencies.
4. Keep the code organized.
5. Keep the UI consistent with the design system.
6. Use realistic demo data.
7. Make interactions functional rather than decorative.

After implementation:

1. Run/build the project if possible.
2. Fix obvious errors.
3. Check that existing features still work.
4. Summarize what was implemented.
5. List important files changed.
6. Mention assumptions.
7. Stop.

DO NOT automatically start the next phase.

### Development Phases

Follow this exact sequence:

00. Project Setup  
01. Design System  
02. Landing Page  
03. Authentication UI  
04. Onboarding  
05. Application Shell  
06. Dashboard  
07. Projects  
08. Project Details  
09. Tasks & Kanban  
10. Calendar  
11. Analytics  
12. Documents  
13. Team  
14. Goals  
15. Notifications & Activity  
16. Global Search  
17. Command Palette  
18. Profile & Settings  
19. Responsive Pass  
20. UX Polish  
21. Final Visual Polish  
22. Portfolio Preparation

### First Task

Start with **Phase 00 — Project Setup only**.

Do not implement the dashboard, projects, tasks, landing page, authentication, or any later feature yet.

First establish a clean foundation for the project.

When Phase 00 is complete, stop and wait for my next instruction.

Remember:

> **Small phase → implement → inspect → fix → summarize → stop.**

The goal is not maximum code generation. The goal is a professional, coherent, high-quality Front-End product built incrementally.

---

# 41. Working Rule for Future Sessions

If the coding AI reaches a context/token limit, start a new session using:

1. This reference file.
2. The current project files.
3. The exact phase currently being implemented.
4. A short summary of completed phases.

Never ask the new session to rebuild the project from scratch.

Always continue from the existing codebase.
