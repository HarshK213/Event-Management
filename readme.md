<div align="center">
  <h1>🎉 Event Management System</h1>
  <p><strong>A comprehensive platform for organizing and managing events seamlessly</strong></p>
  
  ![Event Management](https://img.shields.io/badge/Event-Management-blue?style=for-the-badge)
  ![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
  ![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
  
  <p>
    <a href="#features">Features</a> •
    <a href="#demo">Demo</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Demo](#-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [🎯 Usage](#-usage)
- [📱 Screenshots](#-screenshots)
- [🔧 Configuration](#-configuration)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

## ✨ Features

### 🎪 For Event Organizers
- **📅 Event Creation & Management** - Create, schedule, update, and delete events
- **🎫 Ticket Management** - Generate and manage different ticket types
- **📊 Analytics Dashboard** - Track event performance and attendance
- **✅ Check-in System** - QR code scanning for seamless attendee check-ins
- **👥 Attendee Management** - Manage participant information and communications
- **💰 Payment Integration** - Secure payment processing for ticket sales
- **📧 Email Notifications** - Automated email campaigns and reminders

### 🎭 For Attendees
- **🔍 Event Discovery** - Browse and search for events by category, date, or location
- **🎟️ Easy Registration** - Simple sign-up process with multiple payment options
- **📱 Mobile-Friendly** - Responsive design for all devices
- **⭐ Reviews & Ratings** - Rate and review events after attendance
- **📅 Personal Calendar** - Sync events with personal calendars
- **🔔 Real-time Updates** - Get notified about event changes and updates

## 🚀 Demo

🌐 **Live Demo**: [Your Demo Link Here]

📹 **Video Demo**: [Your Video Link Here]

> **Note**: Demo credentials will be provided in the live demo link

## 🛠️ Tech Stack

<div align="center">

| Frontend | Backend | Database | Tools |
|----------|---------|----------|-------|
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) | ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) || ![VS Code](https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white) |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) | ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) |  | ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) |

</div>

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/HarshK213/Event-Management.git
   cd Event-Management
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies (if separate)
   cd client
   npm install
   cd ..
   

3. **Environment Setup**
   ```bash
   # Copy environment file
   cp .env.example .env
   
   # Edit the .env file with your configurations
   nano .env
   ```

4. **Database Setup**
   ```bash
   # Run database migrations
   npm run migrate
   
   # Seed the database (optional)
   npm run seed
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## 🎯 Usage

### Creating Your First Event

1. **Register/Login** to your organizer account
2. **Navigate** to the dashboard
3. **Click** "Create New Event"
4. **Fill** in event details:
   - Event name and description
   - Date, time, and venue
   - Ticket types and pricing
   - Event category and tags
5. **Publish** your event
6. **Share** the event link with potential attendees

### Managing Attendees

```javascript
// Example API usage for fetching attendees
const getEventAttendees = async (eventId) => {
  const response = await fetch(`/api/events/${eventId}/attendees`);
  const attendees = await response.json();
  return attendees;
};
```

<!-- ## 📱 Screenshots

<div align="center">

### 🏠 Dashboard
![Dashboard](https://via.placeholder.com/800x400/4f46e5/ffffff?text=Event+Dashboard)

### 🎫 Event Creation
![Event Creation](https://via.placeholder.com/800x400/059669/ffffff?text=Create+Event)

### 📊 Analytics
![Analytics](https://via.placeholder.com/800x400/dc2626/ffffff?text=Event+Analytics)

</div> -->

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=27017
DB_NAME=event_management
DB_USER=your_username
DB_PASS=your_password

# JWT Secret
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Payment Gateway
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# File Upload
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

<!-- ### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| POST | `/api/events` | Create new event |
| GET | `/api/events/:id` | Get event by ID |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |
| POST | `/api/events/:id/register` | Register for event | -->

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

<div align="center">

**Harsh K**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/HarshK213)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@example.com)

</div>

---

<div align="center">
  <p>⭐ Star this repository if you found it helpful!</p>
  <p>🐛 Found a bug? <a href="https://github.com/HarshK213/Event-Management/issues">Report it here</a></p>
</div>

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this project
- Inspired by modern event management platforms
- Built with ❤️ for the developer community

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/HarshK213">Harsh K</a></sub>
</div>
