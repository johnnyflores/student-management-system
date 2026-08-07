# Student Management System

A full-stack student management application built with **Go** on the backend and **React + TypeScript** on the frontend.

The application provides a REST API for managing students and a modern web interface for creating, searching, updating, and deleting student records.

## Features

### Backend (Go)

- REST API using `net/http`
- Student CRUD operations:

  - Create student
  - Get all students
  - Search student by ID
  - Update student
  - Delete student

- Service layer architecture
- Repository pattern for storage abstraction
- JSON file persistence
- Unit tests with Go testing package
- Mock repository testing
- CORS support for frontend communication

### Frontend (React)

- Built with React + TypeScript + Vite
- Component-based architecture
- TanStack Query for server state management
- Student CRUD interface
- Search functionality
- Form handling for create/update
- Loading and error states
- Reusable components

## Project Structure

```
student-management-system/

├── backend/
│
├── cmd/
│   ├── api/
│   │   └── main.go
│   │
│   └── cli/
│       └── main.go
│
├── api/
│   ├── routes.go
│   ├── student_handler.go
│   └── middleware.go
│
├── services/
│   └── student_service.go
│
├── storage/
│   └── json_storage.go
│
├── models/
│   └── student.go
│
├── internal/
│   └── app/
│       └── app.go
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── services/
    │   ├── pages/
    │   └── types/
    │
    └── package.json
```

## Backend Architecture

The backend follows a layered architecture:

```
HTTP Request

      |
      v

Handler

      |
      v

Service

      |
      v

Repository / Storage
```

Responsibilities:

- **Handler**: Handles HTTP requests and responses
- **Service**: Contains business logic
- **Repository/Storage**: Handles data persistence

## Frontend Architecture

The frontend uses TanStack Query for API state management:

```
React Component

        |

        v

Custom Hook

        |

        v

TanStack Query

        |

        v

API Service

        |

        v

Go REST API
```

## Requirements

Install:

- Go 1.22+
- Node.js 18+
- npm

## Running the Backend

Start the REST API:

```bash
go run ./cmd/api
```

The API will start:

```
http://localhost:8080
```

## API Endpoints

### Get all students

```
GET /students
```

### Create student

```
POST /students
```

Example:

```json
{
  "ID": 101,
  "Name": "Alice",
  "Age": 20,
  "Grade": "A"
}
```

### Search student

```
GET /student?id=101
```

### Update student

```
PUT /student?id=101
```

### Delete student

```
DELETE /student?id=101
```

## Running the Frontend

Go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend runs by default:

```
http://localhost:5173
```

## Testing Backend

Run all tests:

```bash
go test ./...
```

Run tests with coverage:

```bash
go test -cover ./...
```

Example:

```
services coverage: 95%+
storage coverage: 80%+
```

## Frontend Dependencies

Main libraries:

- React
- TypeScript
- Vite
- TanStack Query
- React Query Devtools

Install TanStack Query:

```bash
npm install @tanstack/react-query
```

## Future Improvements

Possible future enhancements:

- User authentication with JWT
- PostgreSQL database support
- Docker Compose setup
- React Router navigation
- Pagination
- Advanced filtering
- Role-based permissions
- Deployment pipeline

## Development Notes

This project was created to practice:

- Go REST API development
- Clean architecture principles
- Unit testing
- Frontend/backend communication
- React state management
- Modern full-stack application structure
