# 🔗 URL Shortener

A modern, full-stack URL shortener application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to create short URLs, manage their links, and track click analytics.

## ✨ Features

### 🚀 Core Functionality
- **URL Shortening**: Convert long URLs into short, shareable links
- **Custom URLs**: Create personalized short URLs with custom slugs
- **User Authentication**: Secure registration and login system
- **URL Management**: View, edit, and delete your shortened URLs
- **Click Tracking**: Monitor click analytics for your links
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🔐 Authentication & Security
- JWT-based authentication with refresh tokens
- Secure password hashing with bcrypt
- HTTP-only cookies for token storage
- CORS protection
- Input validation and sanitization

### 📊 Analytics & Management
- Track click counts for each shortened URL
- View all your shortened URLs in one dashboard
- Edit URL names for better organization
- Delete unwanted URLs
- Duplicate URL prevention for logged-in users

### 🎨 User Experience
- Modern, responsive UI built with React and Tailwind CSS
- Real-time notifications with toast messages
- Loading states and smooth animations
- Copy-to-clipboard functionality
- Mobile-first design approach

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **nanoid** - URL ID generation
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **GSAP** - Animations
- **React Icons** - Icon library

### Deployment
- **Vercel** - Frontend hosting
- **MongoDB Atlas** - Cloud database

## 📁 Project Structure

```
url-shortener/
├── backend/
│   ├── config/
│   │   └── db.config.js          # Database configuration
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── contact.controller.js # Contact form handling
│   │   └── url.controller.js     # URL management logic
│   ├── dao/
│   │   ├── url.dao.js           # URL data access layer
│   │   └── user.dao.js          # User data access layer
│   ├── middlewares/             # Custom middleware
│   ├── models/
│   │   ├── url.model.js         # URL schema
│   │   └── user.model.js        # User schema
│   ├── routes/
│   │   ├── auth.route.js        # Authentication routes
│   │   ├── contact.route.js     # Contact routes
│   │   └── url.route.js         # URL routes
│   ├── services/
│   │   ├── email.service.js     # Email functionality
│   │   └── url.service.js       # URL business logic
│   ├── app.js                   # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── contexts/            # React contexts
│   │   ├── utils/               # Utility functions
│   │   └── App.jsx              # Main app component
│   ├── buttons/                 # Button components
│   ├── forms/                   # Form components
│   ├── inputs/                  # Input components
│   ├── loaders/                 # Loading components
│   ├── navbars/                 # Navigation components
│   ├── pages/                   # Page components
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Backend Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:5173
   PORT=3000
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```
4. **Frontend Environment Variables**

   Create a `.env` file in the frontend directory:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```
   
5. **Start the Development Servers**
   
   Backend (Terminal 1):
   ```bash
   cd backend
   npm run server
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📚 API Endpoints

### Authentication
- `POST /api/auth/user/register` - User registration
- `POST /api/auth/user/login` - User login
- `GET /api/auth/user` - Get user profile
- `POST /api/auth/user/refresh` - Refresh access token
- `POST /api/auth/user/logout` - User logout

### URL Management
- `POST /api/url` - Create short URL
- `POST /api/url/custom` - Create custom short URL
- `GET /urls/:userid` - Get user's URLs
- `PUT /api/url/:id` - Update URL
- `DELETE /api/url/:id` - Delete URL

### URL Redirection
- `GET /:id` - Redirect to original URL
- `GET /custom/:slug` - Redirect custom URL

### Contact
- `POST /api/contact` - Send contact message

## 🎯 Usage

### For Anonymous Users
1. Visit the homepage
2. Enter a long URL
3. Click "Shorten URL"
4. Copy the generated short URL

### For Registered Users
1. Register/Login to your account
2. Create short URLs (prevents duplicates)
3. Create custom URLs with personalized slugs
4. View all your URLs in the dashboard
5. Track click analytics
6. Edit or delete your URLs

## 🔧 Configuration

### Database Setup
- Use MongoDB Atlas for cloud database
- Or install MongoDB locally
- Update `MONGO_URI` in environment variables

### Email Configuration
- Configure SMTP settings for contact form
- Update `EMAIL_USER` and `EMAIL_PASS` in environment variables

### CORS Configuration
- Update `FRONTEND_URL` in backend environment variables
- Ensure frontend URL matches your deployment

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

### Backend
1. Deploy to your preferred hosting service (Railway, Render, Heroku, etc.)
2. Set environment variables
3. Ensure MongoDB connection is configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Nitin** - Full Stack Developer

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the flexible database solution
- Vercel for the seamless deployment platform

---

**Happy URL Shortening! 🔗✨**
