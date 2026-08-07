# Student Management System

A Student Management System built from scratch using Go. This project demonstrates clean project structure, CRUD operations, REST API development, JSON persistence, unit testing, and dependency injection.

## Features

### Student Management

- Add student
- View all students
- Search student by ID
- Update student information
- Delete student by ID
- Prevent duplicate student IDs

### Storage

- JSON file persistence
- Repository interface pattern
- Mock repository for unit testing

### Applications

The project provides two ways to use the system:

- CLI application
- REST API application

### Testing

- Unit tests for service layer
- Mock repository testing
- JSON storage testing
- Test coverage tracking
- GitHub Actions CI pipeline

---

## Tech Stack

- Go 1.25+
- Standard library `net/http`
- JSON file storage
- Go testing package
- GitHub Actions

---

## Project Structure

```text
student-management-system/

├── cmd/
│   ├── api/
│   │   └── main.go          # REST API application
│   │
│   └── cli/
│       └── main.go          # CLI application
│
├── internal/
│   └── app/
│       └── app.go           # Application dependency setup
│
├── api/
│   ├── routes.go
│   └── student_handler.go   # HTTP handlers
│
├── cli/
│   └── menu.go              # Terminal interface
│
├── services/
│   ├── student_service.go   # Business logic
│   └── *_test.go
│
├── storage/
│   ├── student_repository.go
│   ├── json_storage.go
│   └── *_test.go
│
├── models/
│   └── student.go
│
├── utils/
│   └── input.go
│
├── data/
│   └── students.json
│
└── go.mod
```

---

## Installation

Clone the repository:

```bash
git clone git@github.com:johnnyflores/student-management-system.git

cd student-management-system
```

Check Go version:

```bash
go version
```

Install dependencies:

```bash
go mod tidy
```

---

# Running the CLI Application

Start the terminal application:

```bash
go run ./cmd/cli
```

Example menu:

```text
===== Student Management System =====

1. Add Student
2. View Students
3. Search Student
4. Update Student
5. Delete Student
6. Exit
```

---

# Running the REST API

Start the API server:

```bash
go run ./cmd/api
```

The server runs on:

```text
http://localhost:8080
```

---

## API Endpoints

### Get all students

```http
GET /students
```

Example:

```bash
curl http://localhost:8080/students
```

Response:

```json
[
  {
    "ID": 101,
    "Name": "Alice",
    "Age": 20,
    "Grade": "A"
  }
]
```

---

### Create student

```http
POST /students
```

Example:

```bash
curl -X POST http://localhost:8080/students \
-H "Content-Type: application/json" \
-d '{
  "ID":101,
  "Name":"Alice",
  "Age":20,
  "Grade":"A"
}'
```

---

### Search student

```http
GET /student?id=101
```

Example:

```bash
curl "http://localhost:8080/student?id=101"
```

---

## Running Tests

Run all tests:

```bash
go test ./...
```

Run tests with details:

```bash
go test -v ./...
```

Run coverage:

```bash
go test -cover ./...
```

Current coverage:

- Services: ~95%
- Storage: ~83%

---

## Architecture

The project follows a layered architecture:

```text
             CLI / REST API
                    |
                    v
             Student Service
                    |
                    v
        Student Repository Interface
                    |
          +---------+---------+
          |                   |
          v                   v
     JSON Storage        Mock Repository
```

Benefits:

- Separation of responsibilities
- Easier testing
- Replace storage implementation without changing business logic
- Cleaner dependency management

---

## Continuous Integration

GitHub Actions automatically runs tests on:

- Push
- Pull requests

Pipeline checks:

```bash
go test ./...
```

---

## Future Improvements

Possible next steps:

- Add PostgreSQL database support
- Add authentication and authorization
- Add API documentation with Swagger/OpenAPI
- Add Docker support
- Add API integration tests
- Add request logging middleware

---

## License

This project is for learning and demonstration purposes.
