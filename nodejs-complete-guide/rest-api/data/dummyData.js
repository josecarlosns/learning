const DUMMY_USERS = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "hashed_password_1",
    status: "active",
  },
  {
    name: "Carlos Mendes",
    email: "carlos@example.com",
    password: "hashed_password_2",
    status: "active",
  },
  {
    name: "Sarah Kim",
    email: "sarah@example.com",
    password: "hashed_password_3",
    status: "active",
  },
  {
    name: "Daniel Ferreira",
    email: "daniel@example.com",
    password: "hashed_password_4",
    status: "inactive",
  },
  {
    name: "Lucas Oliveira",
    email: "lucas@example.com",
    password: "hashed_password_5",
    status: "active",
  },
  {
    name: "Noah Pereira",
    email: "noah@example.com",
    password: "hashed_password_6",
    status: "active",
  },
];

const DUMMY_POSTS = [
  {
    title: "Getting Started with React Hooks",
    author: "Alice Johnson",
    date: "2026-01-05",
    content:
      "A beginner-friendly introduction to React Hooks, covering useState, useEffect, and useCallback with practical examples.",
  },
  {
    title: "Building REST APIs with Node.js and Express",
    author: "Carlos Mendes",
    date: "2026-01-12",
    content:
      "Learn how to build a fully functional REST API from scratch using Node.js and Express, including routing, middleware, and error handling.",
  },
  {
    title: "Tailwind CSS: Tips and Tricks for Beginners",
    author: "Sarah Kim",
    date: "2026-01-20",
    content:
      "A practical guide covering the most useful Tailwind CSS utility classes, responsive design patterns, and common pitfalls to avoid.",
  },
  {
    title: "Understanding JavaScript Promises and Async/Await",
    author: "Daniel Ferreira",
    date: "2026-01-28",
    content:
      "A deep dive into asynchronous JavaScript, explaining how Promises work under the hood and how async/await simplifies async code.",
  },
  {
    title: "Git Flow: A Practical Branching Strategy",
    author: "Alice Johnson",
    date: "2026-02-03",
    content:
      "An overview of the Git Flow branching model, including how to manage features, releases, and hotfixes in a team environment.",
  },
  {
    title: "Introduction to Redis: Caching and Session Storage",
    author: "Lucas Oliveira",
    date: "2026-02-10",
    content:
      "Explore the most common Redis use cases including caching, session storage, rate limiting, and job queues with hands-on examples.",
  },
  {
    title: "Setting Up ESLint and Prettier in a Vite React Project",
    author: "Carlos Mendes",
    date: "2026-02-18",
    content:
      "A step-by-step guide to configuring ESLint and Prettier together in a Vite-powered React project for consistent code quality.",
  },
  {
    title: "CSS Grid vs Flexbox: When to Use Which",
    author: "Noah Pereira",
    date: "2026-02-25",
    content:
      "A comparison of CSS Grid and Flexbox, explaining the strengths of each layout system and when to choose one over the other.",
  },
  {
    title: "TypeScript for JavaScript Developers",
    author: "Sarah Kim",
    date: "2026-03-04",
    content:
      "A practical introduction to TypeScript for developers already familiar with JavaScript, covering types, interfaces, generics, and tooling.",
  },
  {
    title: "Docker for Node.js Applications",
    author: "Lucas Oliveira",
    date: "2026-03-11",
    content:
      "Learn how to containerize a Node.js application using Docker, including writing a Dockerfile, managing environment variables, and using Docker Compose.",
  },
  {
    title: "React Performance Optimization Techniques",
    author: "Alice Johnson",
    date: "2026-03-15",
    content:
      "An in-depth look at React performance patterns including memoization, lazy loading, code splitting, and avoiding unnecessary re-renders.",
  },
  {
    title: "Building a GraphQL API from Scratch",
    author: "Daniel Ferreira",
    date: "2026-03-18",
    content:
      "A hands-on guide to building a GraphQL API using Node.js and Apollo Server, covering schemas, resolvers, mutations, and subscriptions.",
  },
  {
    title: "Mastering the CSS Box Model",
    author: "Noah Pereira",
    date: "2026-03-21",
    content:
      "A thorough explanation of the CSS box model, covering margin, padding, border, and how box-sizing affects layout calculations.",
  },
  {
    title: "Introduction to PostgreSQL for Node Developers",
    author: "Carlos Mendes",
    date: "2026-03-24",
    content:
      "Learn how to connect a Node.js application to a PostgreSQL database using pg and Knex.js, with examples for common CRUD operations.",
  },
  {
    title: "State Management with Zustand",
    author: "Sarah Kim",
    date: "2026-03-27",
    content:
      "An introduction to Zustand as a lightweight alternative to Redux for managing global state in React applications, with practical examples.",
  },
  {
    title: "Web Accessibility: Building Inclusive UIs",
    author: "Noah Pereira",
    date: "2026-03-30",
    content:
      "A practical guide to web accessibility best practices, covering ARIA roles, keyboard navigation, color contrast, and screen reader compatibility.",
  },
  {
    title: "Deploying a Node.js App to a VPS",
    author: "Lucas Oliveira",
    date: "2026-04-02",
    content:
      "A step-by-step walkthrough for deploying a Node.js application to a Linux VPS using Nginx as a reverse proxy and PM2 as a process manager.",
  },
  {
    title: "Understanding the JavaScript Event Loop",
    author: "Daniel Ferreira",
    date: "2026-04-05",
    content:
      "A visual and practical explanation of the JavaScript event loop, call stack, microtasks, and macrotasks, and how they affect async code execution.",
  },
  {
    title: "Building Custom React Hooks",
    author: "Alice Johnson",
    date: "2026-04-08",
    content:
      "Learn how to extract reusable logic from React components into custom hooks, with real-world examples like useFetch, useDebounce, and useLocalStorage.",
  },
  {
    title: "Monorepo Setup with npm Workspaces",
    author: "Carlos Mendes",
    date: "2026-04-11",
    content:
      "A guide to setting up a JavaScript monorepo using npm workspaces, sharing code between packages, and managing dependencies across projects.",
  },
];

export { DUMMY_POSTS, DUMMY_USERS };
