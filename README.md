# Facebook Ads Library Browser

A comprehensive full-stack web application for exploring and analyzing Facebook's Ad Library data. This tool provides an enhanced interface for searching, filtering, and analyzing Facebook ads with advanced features like AI-powered categorization and detailed analytics.

## 🎯 Project Overview

This application serves as an advanced interface to the Facebook Ad Library API, offering features that go beyond the standard Facebook Ad Library interface:

- **Smart Categorization**: AI-powered ad categorization using Google's Gemini AI
- **Advanced Filtering**: Multi-dimensional filtering including categories, countries, and ad status
- **Detailed Analytics**: In-depth analysis of ad performance and trends
- **Search History**: Track and analyze search patterns
- **Modern UI**: Responsive and intuitive interface built with modern web technologies

## 🚀 Features

### Core Features
- **Advanced Search**
  - Multi-keyword search with support for exact phrases
  - Category-based filtering (e.g., "free shipping" in "pets" category)
  - Country-specific ad targeting
  - Date range filtering
  - Active/Inactive ad status filtering

### AI-Powered Categorization
- Automatic categorization of ads into predefined categories:
  - E-Commerce & Online Shopping
  - Health & Wellness
  - Beauty & Personal Care
  - Fashion & Accessories
  - Home & Living
  - Parenting & Baby Products
  - Pets & Animal Care
  - Technology & Gadgets
  - And more...

### Analytics & Insights
- **Ad Performance Metrics**
  - Impression ranges
  - Spend analytics
  - Demographic distribution
  - Geographic reach
- **Search Analytics**
  - Search history tracking
  - Popular search terms
  - Category distribution

### Technical Features
- **API Integration**
  - Full Facebook Ad Library API integration
  - Rate limiting and error handling
  - Response caching
- **Logging System**
  - Detailed API request/response logging
  - Error tracking
  - Performance monitoring

## 🛠 Tech Stack

### Frontend
- **Core**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS
  - Shadcn/UI components
  - Framer Motion for animations
- **State Management**: 
  - React Query for server state
  - Context API for local state
- **Routing**: Wouter
- **Data Visualization**: 
  - Chart.js for analytics
  - React Table for data grids

### Backend
- **Server**: Express.js
- **Database**: 
  - PostgreSQL
  - Drizzle ORM for type-safe queries
- **AI Integration**: Google Gemini AI
- **Caching**: Redis (optional)
- **API**: RESTful architecture

## 📋 Prerequisites

- Node.js (v20 or later)
- PostgreSQL 14+
- NPM or Yarn
- Facebook Ad Library API access
- Google Cloud API key (for Gemini AI)

## 🔧 Setup & Installation

1. **Clone the Repository**
```bash
git clone [repository-url]
cd FacebookAdLibrary
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file based on `.env.example`:
```env
# Facebook API
FB_ACCESS_TOKEN=your_facebook_api_token
FB_API_VERSION=v22.0

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/fb_ads

# AI Service
GEMINI_API_KEY=your_gemini_api_key

# Optional
REDIS_URL=redis://localhost:6379
```

4. **Database Setup**
```bash
npm run db:push
```

5. **Start Development Server**
```bash
npm run dev
```

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   └── types/        # TypeScript types
├── server/                # Backend Express application
│   ├── services/         # Business logic
│   ├── routes/           # API routes
│   └── types/           # TypeScript types
├── docs/                 # Documentation
│   └── architecture.md   # System architecture
├── logs/                 # API logs
└── shared/               # Shared types and utilities
```

## 📚 API Documentation

The application integrates with the [Facebook Ad Library API](https://www.facebook.com/ads/library/api) and follows the [Graph API](https://developers.facebook.com/docs/graph-api) specifications. For detailed API documentation, refer to the official Facebook documentation.

## 🔒 Security

- Environment variables for sensitive data
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- API token validation

## 🚀 Deployment

1. **Build the Application**
```bash
npm run build
```

2. **Start Production Server**
```bash
npm run start
```

The application will be available at `http://localhost:5000` (or your configured port).

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Acknowledgments

- Facebook Ad Library API
- Google Gemini AI
- All open-source libraries used in this project
