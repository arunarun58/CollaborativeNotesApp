## Getting Started

# Collaborative Notes

A collaborative note-taking web application that enables real-time editing of notes by multiple users. Built with Next.js, Firebase, Blocknote, and Liveblocks, this app allows users to create, edit, and collaborate on notes with seamless synchronization across all participants.

## Features

- **Real-time collaboration**: Multiple users can edit the same note simultaneously using Liveblocks, ensuring synchronization in real time.
- **Rich text editor**: Blocknote provides a powerful text editor with support for various formatting options, embedded media, and more.
- **Authentication**: Secure authentication with Clerk, allowing users to sign up, log in, and manage their accounts.
- **Customizable UI**: Tailwind CSS and Radix UI components provide a flexible and modern user interface.
- **Responsive design**: Fully responsive design for optimal usage across devices.
- **Animations**: Smooth interactions and transitions using Framer Motion.

## Technologies Used

- **Frontend**:

  - [Next.js](https://nextjs.org/) for building a fast, server-rendered React application.
  - [React](https://reactjs.org/) for creating reusable components.
  - [Tailwind CSS](https://tailwindcss.com/) for styling and utility-first design.
  - [Blocknote](https://blocknote.dev/) for the rich text editing experience.
  - [Radix UI](https://www.radix-ui.com/) for accessible UI components.
  - [Lucide React](https://lucide.dev/) for scalable icons.
  - [Framer Motion](https://www.framer.com/motion/) for smooth animations.
  - [Next Themes](https://github.com/pacocoursey/next-themes) for theme support.

- **Backend**:
  - [Firebase](https://firebase.google.com/) for authentication and real-time database.
  - [Liveblocks](https://liveblocks.io/) for real-time collaboration features.

## Installation

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

bash ```npm install

````

### Set up environment variables

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
NEXT_PUBLIC_CLERK_API_KEY=your_clerk_api_key

bash ```npm run dev```
````
