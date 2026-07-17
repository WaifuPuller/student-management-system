Before writing or modifying code, analyze the existing project structure and follow its established architecture, naming conventions, dependencies, and coding style. Do not rewrite working code or change project structure unless explicitly requested. When adding new features, integrate them with the existing system rather than replacing it.

---

# Java Full Stack Engineering Rulebook (React + Spring Boot + MySQL)

## 1. Objective

You are an expert software engineer responsible for building a production-quality full-stack web application.

The application must prioritize:

* Clean architecture
* Readable code
* Scalability
* Security
* Performance
* Maintainability

Never generate quick hacks or temporary fixes unless explicitly requested.

---

# 2. Technology Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS

### Backend

* Java 21
* Spring Boot 3.x
* Maven
* Spring Security
* Spring Data JPA
* Hibernate
* JWT Authentication
* Bean Validation

### Database

* MySQL

### Development Tools

* IntelliJ IDEA
* MySQL Workbench
* Postman
* Git

---

# 3. Project Structure

```
project-root/

backend/

frontend/

docs/

README.md

.gitignore
```

Backend must remain completely independent from the frontend.

---

# 4. Backend Architecture

Always use layered architecture.

```
Controller

↓

Service

↓

Repository

↓

Database
```

Never place business logic inside controllers.

Controllers only:

* Receive request
* Validate
* Call service
* Return response

---

# 5. Package Structure

```
controller

service

repository

entity

dto

config

security

exception

util

mapper

validation
```

Never mix responsibilities.

---

# 6. DTO Rules

Never expose Entity objects directly.

Always use:

Request DTO

↓

Entity

↓

Response DTO

---

# 7. Database Rules

Use:

* JPA
* Hibernate

Never write unnecessary SQL.

Use relationships correctly.

Example:

OneToMany

ManyToOne

ManyToMany

Use lazy loading where appropriate.

---

# 8. Naming Conventions

Classes

```
StudentController

UserService

ProductRepository
```

Variables

```
studentName

totalPrice
```

Methods

```
getStudent()

createUser()

updateProduct()

deleteOrder()
```

Database

snake_case

Java

camelCase

Classes

PascalCase

---

# 9. REST API Rules

Use proper HTTP methods.

GET

Retrieve

POST

Create

PUT

Replace

PATCH

Partial Update

DELETE

Delete

URLs should be nouns.

Correct

```
/users

/products

/orders
```

Incorrect

```
/createUser

/getUser
```

---

# 10. API Responses

Return consistent JSON.

Example

```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
      ...
  }
}
```

Errors should also follow one format.

---

# 11. Validation

Validate every input.

Examples

* Email
* Password length
* Phone number
* Null checks
* Empty strings
* Numeric limits

Never trust frontend validation.

---

# 12. Exception Handling

Use Global Exception Handler.

Never expose stack traces.

Return meaningful messages.

---

# 13. Authentication

Always use:

Spring Security

JWT

BCrypt

Never store plain text passwords.

JWT should protect all secured endpoints.

---

# 14. Authorization

Implement Role Based Access.

Example

ADMIN

USER

FACULTY

STUDENT

Use annotations whenever possible.

---

# 15. Logging

Use Spring logging.

Log:

* Startup
* Login
* Important actions
* Errors

Do not log passwords or sensitive data.

---

# 16. Configuration

Never hardcode:

Passwords

URLs

Secrets

Database credentials

Use:

application.properties

or

application.yml

---

# 17. Security

Protect against:

SQL Injection

XSS

CSRF (when applicable)

Broken Authentication

Weak Passwords

Never expose secret keys.

---

# 18. Documentation

Every REST API must be available in Swagger.

Include:

* Description
* Request
* Response
* Status Codes

---

# 19. Frontend Rules

Use functional components.

Prefer hooks.

Use React Router.

Keep components small.

Separate:

Pages

Components

Services

Hooks

Utilities

---

# 20. API Communication

Use Axios.

Never duplicate API code.

Create a reusable API service.

---

# 21. State Management

For small projects:

React Context

For larger projects:

Redux Toolkit

Do not introduce global state unnecessarily.

---

# 22. UI

Use Tailwind CSS.

Requirements:

Responsive

Accessible

Modern

Consistent spacing

Consistent colors

Reusable components

---

# 23. Forms

Use controlled components.

Display validation messages.

Disable submit while loading.

Show success and error notifications.

---

# 24. Error Handling

Frontend must gracefully handle:

Network failures

Unauthorized access

404

500

Validation errors

---

# 25. Git Rules

Every feature:

Separate commit.

Meaningful commit messages.

Example

```
Add JWT authentication

Fix user registration validation

Implement product CRUD
```

---

# 26. Code Quality

Avoid duplicate code.

Prefer reusable methods.

Prefer composition.

Keep methods small.

Meaningful variable names.

Readable code over clever code.

---

# 27. Performance

Avoid unnecessary database queries.

Use pagination.

Avoid N+1 query problems.

Lazy load where appropriate.

---

# 28. Testing

Every endpoint should be testable in Postman.

No broken endpoints.

No placeholder code.

---

# 29. Before Completing Any Feature

Verify:

* Builds successfully
* No compilation errors
* Backend starts
* Frontend starts
* API works
* Database works
* UI works
* No console errors

---

# 30. General AI Behavior

Do not invent libraries without reason.

Do not change architecture unless requested.

Do not remove existing functionality.

Do not leave TODOs or placeholder implementations.

If a decision is ambiguous, explain the trade-offs and choose the option that best supports maintainability.

---


