# 🎓 Student Management System

A modern full-stack **Student Management System** built using **React + Vite**, **Spring Boot**, and **PostgreSQL**. The application provides a complete university-style management system for handling **Students**, **Teachers**, and **Courses** with proper relational database design and full CRUD operations.

---

# 🚀 Live Demo

### 🌐 Frontend

https://student-management-system-gamma-dusky.vercel.app

### ⚙️ Backend API

https://student-management-backend-c5xl.onrender.com

---

# ✨ Features

## 👨‍🎓 Student Management

- View all students
- Add new students
- Update student details
- Delete students
- Search students
- Assign students to courses
- View assigned teacher automatically through course relationship

---

## 👨‍🏫 Teacher Management

- View teachers
- Add teachers
- Update teacher information
- Delete teachers
- Search teachers
- Department management
- Specialization management

---

## 📚 Course Management

- View courses
- Add courses
- Edit courses
- Delete courses
- Assign teachers to courses
- Course code management
- Credits management

---

## 📊 Dashboard

Displays

- Total Students
- Total Teachers
- Total Courses

---

## 🗄️ Database Features

- Proper relational database design
- Foreign key relationships
- One Teacher → Many Courses
- One Course → Many Students
- Data integrity using JPA relationships
- Validation
- Referential integrity

---

## ☁️ Deployment

- Frontend hosted on Vercel
- Backend hosted on Render
- PostgreSQL hosted on Neon

---

# 🏗️ System Architecture

```
                    User
                      │
                      ▼
        React + Vite Frontend
               (Vercel)
                      │
               REST API Calls
                      │
                      ▼
      Spring Boot Backend
             (Render)
                      │
             Spring Data JPA
                      │
                      ▼
      PostgreSQL Database
             (Neon)
```

---

# 🗃️ Database Design

```
Teacher
│
├── id
├── teacherName
├── email
├── department
├── specialization
└── phoneNumber
      │
      │ One Teacher teaches many Courses
      ▼
Course
│
├── id
├── courseName
├── courseCode
├── credits
└── teacher_id
      │
      │ One Course has many Students
      ▼
Student
│
├── id
├── name
├── email
├── phone
├── year
└── course_id
```

---

# 🔗 Entity Relationships

```
Teacher
     │
     ▼
Course
     │
     ▼
Student
```

- One Teacher can teach multiple Courses.
- One Course can have multiple Students.
- Every Student belongs to exactly one Course.
- Teacher information is derived through the assigned Course.

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- Axios
- React Router DOM
- Tailwind CSS

## Backend

- Java 21
- Spring Boot
- Spring MVC
- Spring Data JPA
- Maven

## Database

- PostgreSQL
- Neon

## Deployment

- Vercel
- Render
- Neon

---

# 📁 Project Structure

```
StudentManagementSystem
│
├── backend
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   ├── service
│   ├── config
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   ├── assets
│   ├── App.jsx
│   ├── main.jsx
│   └── package.json
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

Navigate to backend

```bash
cd backend
```

Configure the database

```properties
spring.datasource.url=jdbc:postgresql://HOST/DATABASE

spring.datasource.username=YOUR_USERNAME

spring.datasource.password=YOUR_PASSWORD

spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
```

Run backend

```bash
mvn spring-boot:run
```

Runs on

```
http://localhost:8080
```

---

# Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Create

```
.env
```

```env
VITE_API_URL=http://localhost:8080
```

Run

```bash
npm run dev
```

Runs on

```
http://localhost:5173
```

---

# 🌐 REST API

## Student APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| GET | `/api/students/search` | Search students |
| POST | `/api/students` | Add student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |

---

## Teacher APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/teachers` | Get all teachers |
| GET | `/api/teachers/{id}` | Get teacher |
| POST | `/api/teachers` | Add teacher |
| PUT | `/api/teachers/{id}` | Update teacher |
| DELETE | `/api/teachers/{id}` | Delete teacher |

---

## Course APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/{id}` | Get course |
| POST | `/api/courses` | Add course |
| PUT | `/api/courses/{id}` | Update course |
| DELETE | `/api/courses/{id}` | Delete course |

---

# 🔧 Environment Variables

## Frontend

```env
VITE_API_URL=https://student-management-backend-c5xl.onrender.com
```

---

## Backend

```properties
SPRING_DATASOURCE_URL

SPRING_DATASOURCE_USERNAME

SPRING_DATASOURCE_PASSWORD
```

---

# 🚀 Deployment

## Frontend

**Platform:** Vercel

```
https://student-management-system-gamma-dusky.vercel.app
```

---

## Backend

**Platform:** Render

```
https://student-management-backend-c5xl.onrender.com
```

---

## Database

**Platform:** Neon PostgreSQL

---

# 📸 Screenshots

Recommended screenshots:

```
screenshots/

dashboard.png

students.png

teachers.png

courses.png

student-form.png

teacher-form.png

course-form.png
```

---

# 🔮 Future Enhancements

- JWT Authentication
- Role-Based Access Control
- Attendance Management
- Marks Management
- Multiple Course Enrollment
- Student Profile Images
- Email Notifications
- Pagination
- Export to PDF/Excel
- Docker Compose
- Unit Testing
- CI/CD Pipeline
- Audit Logs

---

# 👨‍💻 Author

**Aaditya Singh**

B.Tech Artificial Intelligence & Machine Learning

Malla Reddy University

GitHub:
https://github.com/WaifuPuller

---

# 📄 License

This project is developed for educational and learning purposes.