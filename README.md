# Student Management System

A full-stack application for managing students, courses, and enrollments using Go on the backend and React + TypeScript on the frontend.

This project was built to practice full-stack development, REST API design, UI flows, and Docker-based local development in a realistic application structure.

## Features

### Backend

- Go REST API with `net/http`
- Student CRUD operations
- Course and enrollment management
- Search and pagination support
- JSON-based persistence for core entities
- Service and repository layering
- CORS support for frontend integration
- Go tests for services and storage logic

### Frontend

- React + TypeScript + Vite
- Modern dashboard and management pages
- Student details and course management views
- Search and filtering flows
- Drawer-based create/edit interactions
- Loading, empty, and error states
- TanStack Query for API data handling

### CLI

- Terminal-based management interface
- Uses the same business logic as the API layer
- Allows CRUD operations without the browser UI

## Tech Stack

- Backend: Go 1.25+
- Frontend: React, TypeScript, Vite
- Styling: Tailwind / custom component styling
- Data fetching: TanStack Query
- Testing: Go tests, Vitest, Playwright
- Containerization: Docker + Docker Compose

## Project Structure

```text
student-management-system/
├── backend/
│   ├── api/              # HTTP handlers and routes
│   ├── cli/              # CLI commands
│   ├── cmd/              # App entry points
│   ├── data/             # Seed JSON data
│   ├── internal/         # Internal app setup
│   ├── models/           # Domain models
│   ├── services/         # Business logic
│   ├── storage/          # Persistence layer
│   ├── utils/            # Shared helpers
│   ├── Dockerfile.dev    # Backend dev container
│   ├── go.mod            # Go module definition
│   └── ...
│
├── frontend/
│   ├── src/
|   │   ├── components/   # Shared and reusable UI components
|   │   ├── features/     # Feature-specific functionality
|   │   ├── hooks/        # Shared React hooks
|   │   ├── layout/       # Application layouts
|   │   ├── lib/          # Libraries and shared utilities
|   │   ├── pages/        # Route-level pages
|   │   ├── routes/       # Application routing configuration
|   │   └── test/         # Frontend testing utilities and setup
|   |
│   ├── e2e/              # Playwright end-to-end tests
│   ├── public/           # Static assets
│   ├── Dockerfile.dev    # Frontend dev container
│   ├── package.json      # Frontend scripts and dependencies
│   └── ...
│
├── docker-compose.yml    # Multi-container local setup
├── README.md
└── .gitignore
```

## Requirements

- Docker Desktop or Docker Engine + Compose
- Go 1.25+ (for local non-Docker development)
- Node.js 18+ and npm (for local non-Docker frontend development)

## Quick Start with Docker Compose

From the project root, run:

```bash
docker compose up --build
```

Or with the legacy CLI:

```bash
docker-compose up --build
```

This starts:

- Backend API: `http://localhost:8080`
- Frontend app: `http://localhost:5173`

To stop the services:

```bash
docker compose down
```

## Local Development (without Docker)

### Backend

```bash
cd backend
go run ./cmd/api
```

The API will run on `http://localhost:8080`.

To start the CLI:

```bash
cd backend
go run ./cmd/cli
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app is available at `http://localhost:5173`.

## API Overview

### Students

- `GET /students?page=1&limit=10&name=alice` - list or search students
- `POST /students` - create a student
- `GET /student?id=101` - get one student
- `PUT /student?id=101` - update a student
- `DELETE /student?id=101` - delete a student

### Courses

- `GET /courses` - list courses
- `POST /courses` - create a course
- `GET /course?id=201` - get one course
- `GET /courses/students?course_id=201` - view enrolled students
- `POST /courses/students?course_id=201&student_id=101` - assign a student
- `DELETE /courses/students?course_id=201&student_id=101` - remove a student

### Example payloads

Create student:

```json
{
  "Name": "Alice",
  "Age": 20,
  "Grade": "A"
}
```

Create course:

```json
{
  "Name": "Mathematics",
  "Teacher": "Dr. Smith"
}
```

## Frontend Routes

- `/` - dashboard
- `/students` - student list
- `/courses` - course list
- `/students/:id` - student details

## Testing

### Backend

```bash
cd backend
go test ./...
```

### Frontend

```bash
cd frontend
npm run test:run
```

### E2E

```bash
cd frontend
npm run e2e
```

## Troubleshooting

- If ports `8080` or `5173` are already in use, stop the conflicting process or update the port mappings in `docker-compose.yml`.
- If the frontend fails to start, rebuild the containers: `docker compose up --build`.
- To inspect logs: `docker compose logs -f backend` and `docker compose logs -f frontend`.

## License

This project is shared as a personal portfolio project to demonstrate full-stack development skills, hands-on learning, and professional growth.
