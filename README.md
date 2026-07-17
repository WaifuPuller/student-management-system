# 📚 Student Management System

A full-stack Student Management System built using **React + Vite**, **Spring Boot**, and **PostgreSQL**. The application allows users to manage student records through a clean and responsive web interface with complete CRUD functionality.

---

## 🚀 Live Demo

### Frontend
https://student-management-system-gamma-dusky.vercel.app

### Backend API
https://student-management-backend-c5xl.onrender.com

---

## ✨ Features

- 📋 View all students
- ➕ Add new students
- ✏️ Update student information
- ❌ Delete student records
- 🔍 Search students by name
- 📊 Dashboard with student statistics
- 📱 Responsive UI
- ☁️ Cloud-hosted backend and database

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Axios
- React Router
- Tailwind CSS

### Backend
- Spring Boot
- Java 21
- Maven
- Spring Data JPA
- REST API

### Database
- PostgreSQL
- Neon Database

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Neon

---

# 📁 Project Structure

```
StudentManagementSystem
│
├── backend
│   ├── src
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/WaifuPuller/student-management-system.git

cd student-management-system
```

---

# Backend Setup

Move into backend folder

```bash
cd backend
```

Create an `application.properties` file.

Example configuration

```properties
spring.datasource.url=jdbc:postgresql://HOST/DATABASE

spring.datasource.username=YOUR_USERNAME

spring.datasource.password=YOUR_PASSWORD

spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update

spring.jpa.show-sql=true
```

Run backend

```bash
mvn spring-boot:run
```

Backend runs on

```
http://localhost:8080
```

---

# Frontend Setup

Move into frontend folder

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_API_URL=http://localhost:8080
```

Start development server

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🌐 API Endpoints

| Method | Endpoint | Description |
|----------|----------------------|-------------------|
| GET | /api/students | Get all students |
| GET | /api/students/{id} | Get student by ID |
| GET | /api/students/search?name= | Search student |
| POST | /api/students | Create student |
| PUT | /api/students/{id} | Update student |
| DELETE | /api/students/{id} | Delete student |

---

# 🚀 Deployment

## Backend

Hosted on Render

```
https://student-management-backend-c5xl.onrender.com
```

## Frontend

Hosted on Vercel

```
https://student-management-system-gamma-dusky.vercel.app
```

## Database

Hosted on Neon PostgreSQL

---

# 🔧 Environment Variables

## Frontend

```env
VITE_API_URL=https://student-management-backend-c5xl.onrender.com
```

## Backend

```properties
SPRING_DATASOURCE_URL

SPRING_DATASOURCE_USERNAME

SPRING_DATASOURCE_PASSWORD
```

---

# 📸 Screenshots

You can add screenshots here.

Example:

```
screenshots/

dashboard.png

add-student.png

student-list.png
```

---

# 📈 Future Improvements

- Authentication & Authorization
- Pagination
- Student profile image upload
- Export data to PDF/Excel
- Role-based access control
- Dark mode
- Advanced filtering
- Unit testing
- Docker Compose
- CI/CD Pipeline

---

# 👨‍💻 Author

**Aaditya Singh**

B.Tech CSE  
Malla Reddy University

---

# 📄 License

This project is developed for educational purposes.
