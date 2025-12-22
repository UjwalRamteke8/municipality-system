# 🏛️ CivicConnect - Municipality Management System

![Banner](https://via.placeholder.com/1200x300?text=CivicConnect+Municipality+Management+System)

---

## 📋 Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Data Flow & User Journeys](#data-flow--user-journeys)
- [Tech Stack](#tech-stack)
- [Key Modules](#key-modules)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Contributing Guidelines](#contributing-guidelines)
- [License](#license)

---

## 📖 Overview

### Problem Statement

Traditional municipal management systems rely heavily on manual record-keeping, paper-based workflows, and fragmented data storage. This creates significant challenges:

- **Inefficiency**: Citizens must visit physical offices to lodge complaints, request certificates, or make payments
- **Lack of Transparency**: Limited access to service status and progress tracking
- **Data Fragmentation**: Information scattered across multiple departments and systems
- **Delayed Service Delivery**: Manual processing leads to extended turnaround times

### Solution: CivicConnect

**CivicConnect** is a comprehensive, digitized municipality management platform designed to:

✅ **Digitize & Centralize** all municipal services and records  
✅ **Empower Citizens** with 24/7 access to services and real-time status tracking  
✅ **Streamline Operations** for municipal employees with an intuitive admin dashboard  
✅ **Enhance Transparency** through integrated notification and feedback systems  
✅ **Enable Data-Driven Decisions** with analytics and reporting tools

### Target Audience

- **Citizens**: Access services, lodge complaints, and track status online
- **Municipal Employees**: Manage requests, process applications, and coordinate departments
- **System Administrators**: Monitor platform health, manage users, and configure system settings

---

## 🏗️ System Architecture

### High-Level Architecture

CivicConnect follows a **Modern Web Architecture** pattern:

- **Client Layer**: React.js-based responsive frontend
- **API Gateway**: Express.js backend with REST and WebSocket APIs
- **Business Logic Layer**: Controllers and services handling core functionality
- **Data Layer**: MongoDB for flexible document storage
- **External Integrations**: Firebase Authentication, Cloudinary CDN, Payment Gateways

### Architecture Diagram

```mermaid
graph TD
    A["🌐 Client Layer<br/>React.js + Vite + Tailwind"]
    B["🔐 API Gateway<br/>Express.js + CORS + Auth"]
    C["⚙️ Business Logic<br/>Controllers & Services"]
    D["🗄️ Data Layer<br/>MongoDB Atlas"]
    E["📡 Real-time<br/>Socket.IO"]
    F["☁️ External Services<br/>Firebase, Cloudinary<br/>Payment Gateway"]
    G["🤖 AI Integration<br/>Google Generative AI<br/>OpenAI"]
    H["📊 IoT Sensors<br/>Simulator & Real Devices"]

    A -->|REST/WebSocket| B
    B --> C
    C --> D
    B --> E
    C --> F
    C --> G
    B --> H

    style A fill:#e1f5ff
    style B fill:#fff3e0
    style C fill:#f3e5f5
    style D fill:#e8f5e9
    style E fill:#fce4ec
    style F fill:#fff9c4
    style G fill:#f1f8e9
    style H fill:#ede7f6
```

---

## 📊 Data Flow & User Journeys

### Critical Flow: Citizen Lodging a Public Grievance

A citizen's journey from filing a complaint to resolution:

```mermaid
sequenceDiagram
    participant Citizen as 👤 Citizen
    participant Frontend as 🖥️ Frontend App
    participant Backend as ⚙️ Backend Server
    participant Database as 🗄️ MongoDB
    participant Firebase as 🔐 Firebase
    participant NotifyService as 📬 Notification Service
    participant Admin as 👨‍💼 Admin Dashboard

    Citizen->>Frontend: Opens app & logs in
    Frontend->>Firebase: Authenticate user
    Firebase-->>Frontend: Token received

    Citizen->>Frontend: Fills complaint form
    Frontend->>Frontend: Validates data

    Citizen->>Frontend: Submits complaint
    Frontend->>Backend: POST /api/complaints
    Backend->>Firebase: Verify user token
    Firebase-->>Backend: Token valid

    Backend->>Database: Save complaint record
    Database-->>Backend: Complaint created (ID: #12345)
    Backend-->>Frontend: 201 Success + Complaint ID
    Frontend-->>Citizen: ✅ Complaint filed (Ref: #12345)

    Backend->>NotifyService: Trigger email notification
    NotifyService-->>Citizen: 📧 Email sent

    Admin->>Admin: Checks dashboard
    Backend->>Database: Query new complaints
    Database-->>Admin: Display complaint #12345

    Admin->>Backend: PUT /api/complaints/12345 (Status: In Progress)
    Backend->>Database: Update status
    Backend->>NotifyService: Notify citizen of status change
    NotifyService-->>Citizen: 📱 SMS/Email: Status updated

    Admin->>Admin: Resolves complaint
    Admin->>Backend: PUT /api/complaints/12345 (Status: Resolved)
    Backend->>Database: Update status + close date
    Backend->>NotifyService: Notify citizen of resolution
    NotifyService-->>Citizen: ✅ Complaint resolved

    Citizen->>Frontend: Views complaint status (Resolved)
    Frontend->>Backend: GET /api/complaints/12345
    Backend->>Database: Fetch complaint details
    Database-->>Frontend: Display resolution details
```

---

## 🛠️ Tech Stack

### Frontend Technologies

| Category             | Technology                      | Purpose                     |
| -------------------- | ------------------------------- | --------------------------- |
| **Framework**        | React.js 19.2.0                 | UI component library        |
| **Build Tool**       | Vite                            | Fast module bundler         |
| **Styling**          | Tailwind CSS 4.1.17             | Utility-first CSS framework |
| **Routing**          | React Router v7.9.6             | Client-side navigation      |
| **State Management** | React Hooks + React Query 5.9.0 | Data fetching & caching     |
| **Forms**            | React Hook Form 7.66.1          | Efficient form handling     |
| **Animation**        | Framer Motion 12.23.24          | Smooth UI animations        |
| **Icons**            | Lucide React 0.554.0            | SVG icon library            |
| **HTTP Client**      | Fetch API / TanStack Query      | REST API communication      |
| **Authentication**   | Firebase SDK 11.0.0             | User auth & secure tokens   |
| **Analytics**        | Vercel Analytics 1.5.0          | User behavior tracking      |
| **AI Integration**   | Google Generative AI 0.24.1     | Chatbot & AI features       |

### Backend Technologies

| Category                    | Technology                  | Purpose                       |
| --------------------------- | --------------------------- | ----------------------------- |
| **Framework**               | Express.js 4.21.1           | REST API & HTTP server        |
| **Runtime**                 | Node.js 20+                 | JavaScript runtime            |
| **Database**                | MongoDB 8.9.0 (Atlas)       | NoSQL document database       |
| **Authentication**          | Firebase Admin SDK 13.6.0   | Token verification & auth     |
| **Real-time Communication** | Socket.IO 4.8.1             | WebSocket for live chat       |
| **File Upload**             | Multer 2.0.2                | Handle file uploads           |
| **Image Storage**           | Cloudinary 2.8.0            | Cloud-based image CDN         |
| **Encryption**              | Bcrypt 6.0.0                | Password hashing              |
| **JWT**                     | jsonwebtoken 9.0.2          | Token generation & validation |
| **Environment Vars**        | Dotenv 16.6.1               | Configuration management      |
| **AI Integration**          | OpenAI 6.15.0               | Advanced AI features          |
| **Google AI**               | Google Generative AI        | Alternative AI model          |
| **IoT Simulation**          | Custom Simulator            | IoT sensor data generation    |
| **Error Handling**          | Express Async Handler 1.2.0 | Async error management        |
| **Metadata**                | Exifr 7.1.3                 | Photo metadata extraction     |

### DevOps & Infrastructure

| Category             | Technology        | Purpose                      |
| -------------------- | ----------------- | ---------------------------- |
| **Containerization** | Docker            | Application containerization |
| **Orchestration**    | Docker Compose    | Multi-container management   |
| **Reverse Proxy**    | Nginx             | Load balancing & routing     |
| **Database Hosting** | MongoDB Atlas     | Managed cloud database       |
| **Cloud Storage**    | Cloudinary        | Image CDN & optimization     |
| **Deployment**       | Vercel (Frontend) | Serverless frontend hosting  |
| **Development**      | Nodemon           | Auto-restart on file changes |

---

## 🎯 Key Modules

### 1. **Citizen Services Module**

- **Online Tax Payment**: Secure payment gateway integration
- **Certificate Issuance**: Birth, death, residence certificate requests
- **Service Requests**: General service inquiries and bookings
- **Status Tracking**: Real-time tracking of submitted requests
- **Digital Records**: Access to personal municipal records

### 2. **Public Grievance Redressal System**

- **Complaint Filing**: Multi-category complaint submission
- **Real-time Status Updates**: WebSocket-based live status notifications
- **Complaint Tracking**: Unique reference numbers and timeline view
- **Feedback System**: Post-resolution citizen feedback
- **Analytics Dashboard**: Complaint trends and resolution rates

### 3. **Admin Management Dashboard**

- **Request Management**: Review, approve, or reject citizen requests
- **User Management**: Add/remove users and manage roles
- **Department Coordination**: Assign tasks across departments
- **Analytics & Reporting**: Generate compliance and performance reports
- **System Configuration**: Manage fees, notification templates, and policies

### 4. **Real-time Chat System**

- **Live Support**: Direct messaging between citizens and support staff
- **WebSocket Integration**: Instant message delivery via Socket.IO
- **Chat History**: Persistent conversation storage
- **Notification System**: SMS and email alerts for new messages

### 5. **IoT Integration Module**

- **Sensor Data Collection**: Real-time data from environmental/traffic sensors
- **Simulator**: Development-mode sensor data generation
- **Live Dashboard**: Visualization of IoT metrics
- **Alerts**: Threshold-based anomaly detection

### 6. **AI-Powered Assistant**

- **Chatbot Support**: Natural language processing for FAQs
- **Complaint Categorization**: Automatic category assignment using AI
- **Document Analysis**: Intelligent form filling and data extraction
- **Recommendations**: Personalized service suggestions

### 7. **Media Management**

- **Image Upload & Storage**: Cloudinary integration for optimized storage
- **EXIF Data Extraction**: Photo metadata for records
- **Gallery Management**: Organized photo collection with search

---

## 🚀 Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (or local MongoDB)
- **Git** version control
- **Docker** (optional, for containerization)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/municipality-system.git
cd municipality-system
```

### Step 2: Set Up Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/municipality

# Firebase Configuration
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service.json
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_API_KEY=your-api-key

# AI & APIs
GEMINI_API_KEY=your-gemini-api-key
OPENAI_API_KEY=your-openai-api-key

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Payment Gateway (if applicable)
STRIPE_SECRET_KEY=your-stripe-key
STRIPE_PUBLISHABLE_KEY=your-publishable-key

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# CORS Settings
CORS_ORIGIN=http://localhost:3000
EOF

# Add Firebase service account JSON file
# (Download from Firebase Console and save as firebase-service.json)

# Run the server
npm start
# Or for development with auto-reload
npm run dev
```

Server will start at: `http://localhost:5000`

### Step 3: Set Up Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (if needed)
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your-firebase-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
EOF

# Run development server
npm run dev
```

Frontend will be available at: `http://localhost:3000`

### Step 4: Run with Docker (Optional)

```bash
cd docker

# Build and run containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Step 5: Verify Installation

Check that both servers are running:

```bash
# Check backend (should return API response)
curl http://localhost:5000/api/health

# Check frontend (open in browser)
http://localhost:3000
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication

All protected endpoints require a **Bearer token** from Firebase:

```bash
Authorization: Bearer <firebase-token>
```

### Core API Endpoints

#### 1. **Complaints API**

**Create Complaint**

```http
POST /api/complaints
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Pothole on Main Street",
  "description": "Large pothole causing damage",
  "category": "Road Maintenance",
  "priority": "high",
  "location": {
    "address": "Main Street, City",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}
```

Response: `201 Created`

```json
{
  "_id": "612a4b7c8d9e0f2a3c4e5f6g",
  "complaintId": "#12345",
  "userId": "user-uuid",
  "status": "Open",
  "createdAt": "2025-12-22T10:30:00Z",
  "updatedAt": "2025-12-22T10:30:00Z"
}
```

**Fetch Complaint Status**

```http
GET /api/complaints/:complaintId
Authorization: Bearer <token>
```

**Update Complaint Status** (Admin only)

```http
PUT /api/complaints/:complaintId
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "In Progress",
  "remarks": "Team assigned to fix"
}
```

#### 2. **Citizens Services API**

**Apply for Certificate**

```http
POST /api/services/certificate
Authorization: Bearer <token>
Content-Type: application/json

{
  "certificateType": "birth",
  "childName": "John Doe",
  "dateOfBirth": "2020-01-15"
}
```

#### 3. **Payment API**

**Initiate Payment**

```http
POST /api/payments/initiate
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 500,
  "service": "tax_payment",
  "description": "Municipal Tax - Property ID: 12345"
}
```

### Full API Documentation

For comprehensive API documentation with all endpoints, request/response examples, and error codes, refer to:

- **Swagger/OpenAPI Docs**: `http://localhost:5000/api-docs`
- **Postman Collection**: [Download Here](./docs/api-docs.yaml)

---

## 🤝 Contributing Guidelines

We welcome contributions from the community! Please follow these guidelines:

### How to Contribute

1. **Fork the Repository**

   ```bash
   git clone https://github.com/yourusername/municipality-system.git
   ```

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**

   - Write clean, well-documented code
   - Follow existing code style and conventions
   - Ensure all tests pass
   - Add tests for new features

4. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Submit a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues (#123)
   - Ensure CI/CD checks pass

### Code Standards

- **JavaScript/ES6+**: Use modern syntax, avoid `var`
- **Naming**: Use camelCase for variables, PascalCase for components/classes
- **Comments**: Add comments for complex logic
- **Error Handling**: Always handle errors gracefully
- **Testing**: Write unit tests for new features

### Reporting Issues

Found a bug? Please create an issue with:

- Clear title and description
- Steps to reproduce
- Expected vs. actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots (if applicable)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 📞 Support & Contact

- **Documentation**: [Wiki](./docs)
- **Email**: support@civicconnect.local
- **Issues**: [GitHub Issues](https://github.com/yourusername/municipality-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/municipality-system/discussions)

---

## 🙏 Acknowledgments

- Built with ❤️ by the CivicConnect Team
- Special thanks to all contributors and community members
- Powered by open-source technologies

---

**Last Updated**: December 22, 2025  
**Version**: 1.0.0
