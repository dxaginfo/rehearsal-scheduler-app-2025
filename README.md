# Rehearsal Scheduler

A web application for scheduling band rehearsals, sending reminders, tracking attendance, and suggesting optimal rehearsal times.

## 🎵 Overview

Rehearsal Scheduler is designed to streamline the process of coordinating music rehearsals for bands, ensembles, and musical groups. It provides a centralized platform for scheduling, communication, and organization to solve common challenges faced by musicians.

## ✨ Features

- **User Authentication and Profile Management**
  - Secure account creation and login
  - Personalized profiles with instrument details
  - Role-based access control (band leader, member)

- **Band/Group Management**
  - Create and manage multiple bands/ensembles
  - Invite members via email
  - Dashboard view of all your bands

- **Rehearsal Scheduling**
  - Create rehearsal events with detailed information
  - Interactive calendar interface
  - Availability collection from members

- **Optimal Time Suggestion**
  - Algorithm to analyze members' availability
  - Suggest best rehearsal times to maximize attendance
  - Support for recurring rehearsal patterns

- **Attendance Tracking**
  - Track who attended each rehearsal
  - Members can mark their attendance status
  - Follow-up system for absent members

- **Reminders and Notifications**
  - Automated email and in-app reminders
  - Real-time notifications for schedule changes
  - Customizable notification preferences

- **Setlist Management**
  - Create and attach setlists to rehearsal events
  - Track song duration and practice time
  - Add notes and resources for each song

- **Communication Tools**
  - Comment system for rehearsal events
  - Announcements for important updates
  - Direct messaging between members

- **Calendar Integration**
  - Sync with Google Calendar, iCal, etc.
  - Export rehearsal schedules
  - Subscribe to band calendars

- **Mobile Responsiveness**
  - Access from any device
  - Optimized interface for on-the-go use

## 🚀 Technology Stack

### Frontend
- React.js with TypeScript
- Redux for state management
- Material-UI for responsive design
- FullCalendar.js for calendar interface
- Formik with Yup for form validation
- Axios for API communication

### Backend
- Node.js with Express
- JWT authentication with Passport.js
- MongoDB database
- Mongoose ODM
- Socket.io for real-time updates
- SendGrid for email services
- Google Calendar API integration

### DevOps
- AWS or Vercel for frontend hosting
- Heroku for backend services
- Docker containerization
- GitHub Actions for CI/CD
- Sentry for error tracking
- Google Analytics for usage metrics

## 💻 Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB
- Git

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/dxaginfo/rehearsal-scheduler-app-2025.git
cd rehearsal-scheduler-app-2025/frontend

# Install dependencies
npm install

# Create .env file with environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd ../backend

# Install dependencies
npm install

# Create .env file with environment variables
cp .env.example .env

# Start development server
npm run dev
```

## 🔧 Configuration

Create `.env` files in both frontend and backend directories with the following variables:

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rehearsal-scheduler
JWT_SECRET=your_jwt_secret
SENDGRID_API_KEY=your_sendgrid_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CORS_ORIGIN=http://localhost:3000
```

## 📦 Project Structure

```
rehearsal-scheduler/
├── frontend/                  # React frontend application
│   ├── public/                # Static files
│   ├── src/                   # Source files
│   │   ├── assets/            # Images, fonts, etc.
│   │   ├── components/        # Reusable components
│   │   ├── context/           # React context providers
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── store/             # Redux store setup
│   │   ├── utils/             # Utility functions
│   │   ├── App.tsx            # Main App component
│   │   └── index.tsx          # Entry point
│   ├── package.json           # Frontend dependencies
│   └── tsconfig.json          # TypeScript configuration
│
├── backend/                   # Node.js backend application
│   ├── src/                   # Source files
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Express middleware
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utility functions
│   │   └── index.js           # Entry point
│   └── package.json           # Backend dependencies
│
├── docker/                    # Docker configuration
│   ├── Dockerfile.frontend    # Frontend Dockerfile
│   ├── Dockerfile.backend     # Backend Dockerfile
│   └── docker-compose.yml     # Docker Compose config
│
├── .github/                   # GitHub configuration
│   └── workflows/             # GitHub Actions workflows
│
└── README.md                  # Project documentation
```

## 🌱 Development

### Running Tests
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

### Code Linting
```bash
# Frontend linting
cd frontend
npm run lint

# Backend linting
cd backend
npm run lint
```

### Building for Production
```bash
# Frontend build
cd frontend
npm run build

# Backend build
cd backend
npm run build
```

## 📝 API Documentation

API documentation is available at `/api/docs` when running the development server. It is generated using Swagger UI and provides detailed information about all available endpoints.

## 🧪 Environment Variables

In addition to the basic environment variables mentioned in the Configuration section, the following are also available for more advanced configuration:

### Frontend
- `REACT_APP_SENTRY_DSN`: Sentry DSN for error tracking
- `REACT_APP_GA_TRACKING_ID`: Google Analytics tracking ID
- `REACT_APP_VERSION`: Application version number

### Backend
- `NODE_ENV`: Environment mode (development, production, test)
- `LOG_LEVEL`: Logging level (error, warn, info, debug)
- `REDIS_URL`: URL for Redis (used for caching and session storage)
- `EMAIL_FROM`: Default sender email address
- `RATE_LIMIT_WINDOW`: Rate limiting window in milliseconds
- `RATE_LIMIT_MAX`: Maximum requests in rate limit window

## 🚢 Deployment

### Using Docker
```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Manual Deployment
- Frontend can be deployed to Vercel, Netlify, or AWS S3 + CloudFront
- Backend can be deployed to Heroku, AWS Elastic Beanstalk, or Digital Ocean
- Database should be set up using MongoDB Atlas or a similar service

## 📊 Database Schema

The application uses MongoDB with the following collections:

- **Users**: User accounts and profiles
- **Bands**: Band/ensemble information and members
- **Rehearsals**: Rehearsal events with details
- **Availability**: Member availability data
- **Notifications**: System notifications
- **Comments**: Communication on rehearsal events

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Project Link: [https://github.com/dxaginfo/rehearsal-scheduler-app-2025](https://github.com/dxaginfo/rehearsal-scheduler-app-2025)

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Material-UI](https://material-ui.com/)
- [FullCalendar](https://fullcalendar.io/)