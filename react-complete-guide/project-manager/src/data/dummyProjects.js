import { v4 as randomUUID } from 'uuid';

const dummyProjects = [
  {
    id: randomUUID(),
    title: 'E-Commerce Platform Redesign',
    description:
      'Redesign the existing e-commerce platform with a modern UI, improved navigation, and a streamlined checkout process to boost conversion rates.',
    dueDate: '2026-04-15',
    tasks: [
      {
        id: randomUUID(),
        description: 'Conduct UX audit of the existing platform.',
      },
      {
        id: randomUUID(),
        description: 'Design new wireframes and prototypes in Figma.',
      },
      {
        id: randomUUID(),
        description: 'Implement responsive product listing pages.',
      },
      {
        id: randomUUID(),
        description: 'Rebuild the checkout flow with fewer steps.',
      },
      {
        id: randomUUID(),
        description: 'Perform usability testing with real users.',
      },
    ],
  },
  {
    id: randomUUID(),
    title: 'Mobile Banking App',
    description:
      'Develop a cross-platform mobile banking app that allows users to manage accounts, transfer funds, and pay bills securely from their smartphones.',
    dueDate: '2026-05-30',
    tasks: [
      {
        id: randomUUID(),
        description: 'Set up React Native project with authentication flow.',
      },
      {
        id: randomUUID(),
        description: 'Integrate bank API for account balance and transactions.',
      },
      {
        id: randomUUID(),
        description: 'Build fund transfer screen with validation.',
      },
      {
        id: randomUUID(),
        description: 'Implement biometric login (fingerprint/face ID).',
      },
      {
        id: randomUUID(),
        description: 'Conduct security audit and penetration testing.',
      },
    ],
  },
  {
    id: randomUUID(),
    title: 'HR Management System',
    description:
      'Build an internal HR system to handle employee onboarding, payroll, leave requests, and performance reviews in a single unified dashboard.',
    dueDate: '2026-06-10',
    tasks: [
      {
        id: randomUUID(),
        description: 'Design database schema for employees and roles.',
      },
      {
        id: randomUUID(),
        description: 'Build onboarding workflow with document uploads.',
      },
      {
        id: randomUUID(),
        description: 'Implement payroll calculation and export to PDF.',
      },
      {
        id: randomUUID(),
        description: 'Create leave request and approval system.',
      },
      {
        id: randomUUID(),
        description: 'Build performance review forms and history tracking.',
      },
    ],
  },
  {
    id: randomUUID(),
    title: 'Real-Time Chat Application',
    description:
      'Create a real-time messaging app with support for group chats, file sharing, and end-to-end encryption using WebSockets.',
    dueDate: '2026-04-28',
    tasks: [
      {
        id: randomUUID(),
        description: 'Set up WebSocket server with Node.js and Socket.io.',
      },
      {
        id: randomUUID(),
        description: 'Build private and group chat UI components.',
      },
      {
        id: randomUUID(),
        description: 'Implement file and image sharing with preview.',
      },
      {
        id: randomUUID(),
        description: 'Add end-to-end encryption for messages.',
      },
      {
        id: randomUUID(),
        description: 'Implement online/offline presence indicators.',
      },
    ],
  },
  {
    id: randomUUID(),
    title: 'Inventory Tracking System',
    description:
      'Develop a warehouse inventory system that tracks stock levels, generates low-stock alerts, and produces automated reorder requests.',
    dueDate: '2026-07-01',
    tasks: [
      {
        id: randomUUID(),
        description: 'Design inventory database with categories and SKUs.',
      },
      {
        id: randomUUID(),
        description: 'Build dashboard with real-time stock level charts.',
      },
      {
        id: randomUUID(),
        description: 'Implement low-stock threshold alert system.',
      },
      {
        id: randomUUID(),
        description: 'Create automated reorder request generator.',
      },
      {
        id: randomUUID(),
        description: 'Add barcode scanner integration for stock updates.',
      },
    ],
  },
  {
    id: randomUUID(),
    title: 'Portfolio Website Builder',
    description:
      'Create a drag-and-drop portfolio website builder targeted at freelancers and creatives, with customizable templates and one-click publishing.',
    dueDate: '2026-05-15',
    tasks: [
      {
        id: randomUUID(),
        description: 'Build drag-and-drop editor with resizable blocks.',
      },
      {
        id: randomUUID(),
        description: 'Design 5 starter templates for different industries.',
      },
      {
        id: randomUUID(),
        description: 'Implement custom domain and one-click publishing.',
      },
      {
        id: randomUUID(),
        description: 'Add image upload and media library management.',
      },
      {
        id: randomUUID(),
        description: 'Build SEO settings panel for each page.',
      },
    ],
  },
  {
    id: randomUUID(),
    title: 'AI Customer Support Chatbot',
    description:
      'Integrate an AI-powered chatbot into the company website to handle common customer queries, reducing support ticket volume by 40%.',
    dueDate: '2026-08-20',
    tasks: [
      {
        id: randomUUID(),
        description: 'Define intents and train the NLP model on past tickets.',
      },
      {
        id: randomUUID(),
        description: 'Build chat widget embeddable on any webpage.',
      },
      {
        id: randomUUID(),
        description: 'Integrate with CRM to fetch customer order history.',
      },
      {
        id: randomUUID(),
        description: 'Implement handoff to human agent when needed.',
      },
      {
        id: randomUUID(),
        description: 'Set up analytics dashboard for chatbot performance.',
      },
    ],
  },
  {
    id: randomUUID(),
    title: 'Online Learning Platform',
    description:
      'Build a platform for hosting video courses, quizzes, and certifications, with progress tracking and instructor dashboards.',
    dueDate: '2026-09-05',
    tasks: [
      {
        id: randomUUID(),
        description: 'Build video upload and streaming pipeline.',
      },
      {
        id: randomUUID(),
        description: 'Create quiz builder with multiple question types.',
      },
      {
        id: randomUUID(),
        description: 'Implement student progress tracking per course.',
      },
      {
        id: randomUUID(),
        description: 'Design and generate PDF certificates on completion.',
      },
      {
        id: randomUUID(),
        description: 'Build instructor dashboard with enrollment analytics.',
      },
    ],
  },
  {
    id: randomUUID(),
    title: 'Restaurant Booking System',
    description:
      'Develop an online reservation system for restaurants that handles table bookings, waitlists, and automated reminder notifications via SMS and email.',
    dueDate: '2026-04-20',
    tasks: [
      {
        id: randomUUID(),
        description: 'Build table availability calendar and booking form.',
      },
      {
        id: randomUUID(),
        description: 'Implement waitlist management with auto-promotion.',
      },
      {
        id: randomUUID(),
        description: 'Set up SMS and email reminder notifications.',
      },
      {
        id: randomUUID(),
        description: 'Create admin panel for managing reservations.',
      },
      {
        id: randomUUID(),
        description: 'Add guest feedback and rating collection post-visit.',
      },
    ],
  },
  {
    id: randomUUID(),
    title: 'Fitness Tracker Dashboard',
    description:
      'Design a web dashboard that syncs with wearable devices to display workout history, calories burned, sleep patterns, and personal fitness goals.',
    dueDate: '2026-06-30',
    tasks: [
      {
        id: randomUUID(),
        description: 'Integrate wearable device API for data syncing.',
      },
      {
        id: randomUUID(),
        description: 'Build workout history timeline with filtering.',
      },
      {
        id: randomUUID(),
        description: 'Create calories and macros tracking charts.',
      },
      {
        id: randomUUID(),
        description: 'Implement sleep pattern analysis and insights.',
      },
      {
        id: randomUUID(),
        description: 'Build goal-setting module with progress indicators.',
      },
    ],
  },
];

export default dummyProjects;