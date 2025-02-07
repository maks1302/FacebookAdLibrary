
# Facebook Ads Library Browser

A full-stack web application for browsing Facebook Ads Library with a modern UI.

## Tech Stack

### Frontend
- React with Vite
- TypeScript
- Tailwind CSS for styling
- Wouter for routing
- Shadcn/UI components
- React Query for data fetching

### Backend
- Express.js
- PostgreSQL with Drizzle ORM
- Node.js

## Prerequisites

- Node.js (v20 or later)
- PostgreSQL database
- NPM or Yarn package manager

## Setup & Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Use the Secrets tool to set up your environment variables
   - Required variables:
     - DATABASE_URL: Your PostgreSQL connection string
     - FB_ACCESS_TOKEN: Facebook API access token

4. Start the development server:
```bash
npm run dev
```

The application will start on port 5000. You can access it at `http://0.0.0.0:5000`

## Project Structure

```
├── client/          # Frontend React application
├── server/          # Express.js backend
└── shared/          # Shared types and schemas
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check TypeScript
- `npm run db:push` - Push database schema changes

## Features

- Search Facebook ads by various criteria
- Filter by media type and date range
- Country-specific ad searching
- Responsive design for mobile and desktop
- Real-time search results

## Deployment

Use Replit's deployment feature to deploy your application. The project is already configured for deployment with the necessary build and start commands.
