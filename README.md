# CRVS Backend API

This Node.js application serves as the backend API for a Civil Registration and Vital Statistics (CRVS) digitization platform. Built with Express.js and Prisma, it manages user authentication, workspace organization, PDF form uploads, and the lifecycle of digitized form data (Uploaded → To Validate → Draft → Validated). It integrates with external services like Firebase for file storage and an OCR service for data extraction, supporting use cases such as student profile form digitization within educational institutions.

## Features

- **Authentication**: Secure login for regular users and admins using JWT tokens.
- **Admin User Management**: Allows admins to create data entry user accounts linked to their institution (EIIN).
- **Workspace Management**: Organize forms into workspaces with detailed statistics tracking.
- **Form Intake**: Upload PDF forms to Firebase Storage and trigger OCR processing.
- **Data Management**: Manage form data through validation, draft, and final validation stages.
- **Modular Design**: Separates routing, controllers, and database logic for scalability.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: JWT (via authentication.js)
- **File Storage**: Firebase Storage
- **HTTP Client**: Axios (for OCR service calls)
- **Middleware**: CORS, JSON parsing, Multer (file uploads), Morgan (logging)

## Prerequisites

- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **PostgreSQL**: v13 or higher
- **Firebase Account**: For file storage (configure with service account credentials)
- **External OCR Service**: A compatible OCR API (e.g., the OCR backend from a related project)
- **Environment Configuration**: .env file with required variables

## Installation

### Clone the Repository:
```bash
git clone https://github.com/your-username/crvs-backend.git
cd crvs-backend
```

### Install Dependencies:
```bash
npm install
```

### Configure Environment:
Create a `.env` file in the root directory:
```
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/crvs_db?schema=public"
JWT_SECRET="your-secret-key"
FIREBASE_CREDENTIALS_PATH="./path/to/firebase-service-account.json"
OCR_SERVICE_URL="http://localhost:5074/"
```
Replace values with your setup (e.g., database credentials, Firebase JSON path, OCR service endpoint).

### Set Up Database:
Initialize Prisma schema:
```bash
npx prisma migrate dev --name init
```

### Start the Server:
```bash
npm start
```
The API will run at http://localhost:3000 (or your configured PORT).

## API Endpoints

### Authentication
- **POST /auth/login**
  - Body: `{ "username": "string", "password": "string" }` (users) or `{ "eiin": "string", "password": "string" }` (admins)
  - Response: `{ "token": "jwt-token" }` (200 OK) or error message (401)

### Admin User Management
- **POST /admin/createUser** (Admin-only)
  - Headers: `Authorization: Bearer <admin-token>`
  - Body: `{ "username": "string", "password": "string" }`
  - Response: Success message (201) or error (400/403)

### Workspace Management
- **POST /workspace/createWorkspace**
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "name": "string", "level": "string", "section": "string", "group": "string", "rollStart": "number", "rollEnd": "number", "totalStudent": "number", "year": "number" }`
  - Response: Workspace object (201) or error (400)
- **GET /workspace/getAllWorkspace**
  - Headers: `Authorization: Bearer <token>`
  - Response: Array of workspace objects (200)
- **GET /workspace/getWorkspace/:workspace_id**
  - Headers: `Authorization: Bearer <token>`
  - Response: Workspace details with stats (200)
- **PUT /workspace/updateWorkspace/:workspace_id**
  - Headers: `Authorization: Bearer <token>`
  - Body: Updated workspace fields
  - Response: Success message (200) or error (400)

### Form Intake
- **POST /fileUpload/single/**
  - Headers: `Authorization: Bearer <token>`
  - Form-Data: `file` (PDF), `workspace_id` (string)
  - Response: Success message with form_id (201) or error (400)

### Form Data Management
- **GET /workspace/getValidateList/:workspace_id**
  - Headers: `Authorization: Bearer <token>`
  - Response: List of forms awaiting validation (200)
- **GET /workspace/getValidateForm/:form_id**
  - Headers: `Authorization: Bearer <token>`
  - Response: OCR data and PDF URL (200)
- **PUT /workspace/updateFormPageOne**
  - Headers: `Authorization: Bearer <token>`
  - Body: Updated form data (page 1)
  - Response: Success message (200)
- **GET /workspace/getDraftList/:workspace_id**
  - Headers: `Authorization: Bearer <token>`
  - Response: List of draft forms (200)
- **GET /workspace/getDraftForm/:form_id**
  - Headers: `Authorization: Bearer <token>`
  - Response: Draft data and PDF URL (200)
- **PUT /workspace/updateDraftPageOne**
  - Headers: `Authorization: Bearer <token>`
  - Body: Updated draft data (page 1)
  - Response: Success message (200)
- **POST /workspace/updateForm**
  - Headers: `Authorization: Bearer <token>`
  - Body: Final validated form data
  - Response: Success message (201)
- **GET /workspace/getValidatedList/:workspace_id**
  - Headers: `Authorization: Bearer <token>`
  - Response: List of validated forms (200)

## Usage

1. **Authenticate**: Log in as a user or admin to obtain a JWT token.
2. **Manage Users**: Admins can create data entry users via `/admin/createUser`.
3. **Create Workspaces**: Organize forms into workspaces using `/workspace/createWorkspace`.
4. **Upload Forms**: Submit PDFs to `/fileUpload/single/` to store them in Firebase and trigger OCR.
5. **Validate Data**: Retrieve forms from `/workspace/getValidateList`, edit drafts, and submit validated data.

## Project Structure

```
crvs-backend/
├── Controller/         # Request handlers
├── DB/                # Prisma database operations
├── Firebase/          # Firebase Storage integration
├── Models/            # Data models (e.g., workspaceModel)
├── Route/             # API routes
├── prisma/            # Prisma schema and migrations
├── app.js             # Express app setup
├── index.js           # Server entry point
├── authentication.js  # JWT auth logic
└── .env               # Environment variables
```

## Dependencies

- express: API framework
- @prisma/client: Database ORM
- jsonwebtoken: JWT authentication
- firebase-admin: Firebase Storage
- axios: HTTP requests to OCR service
- multer: File upload handling
- cors, morgan: Middleware

## Configuration

- **prisma/schema.prisma**: Defines database models (users, admin, workspace, pdf, form_ocr_output, form_draft, form_validated).
- **.env**: Configures port, database, JWT secret, Firebase credentials, and OCR service URL.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## Potential Enhancements

- **Retry Logic**: Add retries for OCR service failures.
- **Performance**: Optimize workspace stats queries with caching or denormalization.
- **Webhooks**: Implement callbacks from the OCR service instead of polling.
- **Role-Based Access**: Enhance permissions beyond admin/user roles.
