# Modern Fullstack Application

A modern fullstack application built with Django REST Framework, React, and Docker.

## Tech Stack

### Backend
- **Django REST Framework** - API framework
- **PostgreSQL** - Primary database
- **Celery** - Background task processing
- **Redis** - Cache and message broker

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **Redux Toolkit** - State management
- **TailwindCSS** - Styling
- **shadcn/ui** - UI components
- **Zod** - Schema validation
- **React Hook Form** - Form handling

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and static serving
- **GitHub Actions** - CI/CD pipeline
- **pre-commit hooks** - Code quality

### Code Quality
- **Python**: black, isort, mypy
- **React**: eslint, prettier, husky

## Environment Configuration

This project uses environment variables for configuration. Copy `backend/env.example` to `.env.local` for local development or `.env.production` for production:

```bash
# For local development
cp backend/env.example .env.local

# For production
cp backend/env.example .env.production
# Edit .env.production and set DEBUG=False, a strong SECRET_KEY, and your server's ALLOWED_HOSTS
```

To use a specific environment file with Docker Compose, copy it to `.env` in the project root:

```bash
cp .env.local .env  # For local
cp .env.production .env  # For production
```

## Running Locally

1. Copy `.env.local` to `.env` in the project root.
2. Run:
   ```bash
   docker-compose up -d
   ```
3. Access the app at:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

## Running in Production

1. Copy `.env.production` to `.env` in the project root and edit as needed.
2. Run:
   ```bash
   docker-compose up -d --build
   ```
3. Access the app at your server's IP or domain.

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PimForceReact
   ```

2. **Start the application**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Admin Panel: http://localhost:8000/admin

### Local Development

1. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Redis & Celery**
   ```bash
   # Start Redis
   docker run -d -p 6379:6379 redis:alpine
   
   # Start Celery worker (in backend directory)
   celery -A core worker -l info
   ```

## Project Structure

```
├── backend/                 # Django backend
│   ├── core/               # Main Django project
│   ├── api/                # API endpoints
│   ├── tasks/              # Celery tasks
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store
│   │   ├── hooks/          # Custom hooks
│   │   └── types/          # TypeScript types
│   └── package.json
├── nginx/                  # Nginx configuration
├── docker-compose.yml      # Docker orchestration
├── .github/                # GitHub Actions
└── .pre-commit-config.yaml # Pre-commit hooks
```

## Features

- **Authentication**: JWT-based authentication
- **API Documentation**: Auto-generated with drf-spectacular
- **Background Tasks**: Celery integration with Redis
- **Form Validation**: Zod schemas with React Hook Form
- **State Management**: Redux Toolkit with RTK Query
- **UI Components**: shadcn/ui component library
- **Code Quality**: Automated linting and formatting
- **CI/CD**: GitHub Actions pipeline
- **Docker**: Complete containerization

## Development Workflow

1. **Code Quality**: Pre-commit hooks ensure code quality
2. **Testing**: Automated tests run on every commit
3. **Deployment**: GitHub Actions handles CI/CD
4. **Monitoring**: Health checks and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License

