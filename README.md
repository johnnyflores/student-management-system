# Student Management System

A full-stack student and course management application built with Go on the backend and React + TypeScript on the frontend.

The project now includes:

- a REST API for students and courses
- an interactive CLI for terminal-based management
- a browser UI with dashboard, student, and course pages

## Features

### Backend

- REST API built with `net/http`
- Student management: create, list, search, update, and delete
- Course management: create, list, inspect, assign students, and remove students
- Pagination and search support for the students endpoint
- JSON file persistence for students and courses
- Layered design with handlers, services, and storage repositories
- CORS enabled for the frontend
- Unit tests for storage and service behavior

### Frontend

- React, TypeScript, and Vite
- TanStack Query for server state management
- Dashboard, students, and courses pages
- Student details route
- Drawer-based create and edit flows
- Loading, empty, and error states

### CLI

- Interactive terminal menu for student and course management
- Uses the same service layer as the API
- Persists changes back to the JSON data files

## Requirements

- Go 1.25+
- Node.js 18+
- npm

## Project Structure

```text
student-management-system/
├── backend/
│   ├── api/              # HTTP/API handlers
│   ├── cli/              # CLI commands
│   ├── cmd/              # Application entry points
│   ├── data/             # Seed/sample data
│   ├── internal/         # Internal application packages
│   ├── models/           # Domain models
│   ├── services/         # Business logic
│   ├── storage/          # Data persistence
│   ├── utils/            # Shared backend utilities
│   └── go.mod
│
└── frontend/
    ├── src/
    │   ├── components/   # Shared and reusable UI components
    │   ├── features/     # Feature-specific functionality
    │   ├── hooks/        # Shared React hooks
    │   ├── layout/       # Application layouts
    │   ├── lib/          # Libraries and shared utilities
    │   ├── pages/        # Route-level pages
    │   ├── routes/       # Application routing configuration
    │   └── test/         # Frontend testing utilities and setup
    │
    ├── e2e/              # End-to-end tests
    ├── public/           # Static assets
    └── package.json
```

## Backend

Start the API:

```bash
cd backend
go run ./cmd/api
```

The API listens on `http://localhost:8080`.

Start the CLI:

```bash
cd backend
go run ./cmd/cli
```

### API Routes

Students:

- `GET /students?page=1&limit=10&name=alice` - list or search students
- `POST /students` - create a student
- `GET /student?id=101` - get one student
- `PUT /student?id=101` - update a student
- `DELETE /student?id=101` - delete a student

Courses:

- `GET /courses` - list all courses
- `POST /courses` - create a course
- `GET /course?id=201` - get one course
- `GET /courses/students?course_id=201` - view enrolled students
- `POST /courses/students?course_id=201&student_id=101` - assign a student to a course
- `DELETE /courses/students?course_id=201&student_id=101` - remove a student from a course

### Example Requests

Create a student:

```json
{
  "Name": "Alice",
  "Age": 20,
  "Grade": "A"
}
```

Create a course:

```json
{
  "Name": "Mathematics",
  "Teacher": "Dr. Smith"
}
```

## Frontend

Install dependencies:

```bash
cd frontend
npm install
```

Run the development server:

```bash
npm run dev
```

The app is available at `http://localhost:5173`.

Frontend routes:

- `/` dashboard
- `/students` students list
- `/courses` courses list
- `/students/:id` student details

## Testing

Backend tests:

```bash
cd backend
go test ./...
```

Frontend tests:

```bash
cd frontend
npm run test:run
```

Frontend end-to-end tests:

```bash
cd frontend
npm run e2e
```
