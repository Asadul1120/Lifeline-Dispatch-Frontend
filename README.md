<a id="top"></a>

# Lifeline Dispatch

### Connected Ambulance Dispatch & Emergency Transport Platform

Lifeline Dispatch is a role-based emergency ambulance dispatch platform that connects **patients, ambulance drivers, and administrators** in one coordinated workflow.

Patients can request emergency transport and track request progress. Drivers can manage assigned trips and availability. Administrators can manage users, drivers, ambulances, emergency requests, dispatch operations, and audit records.

> **Disclaimer:** Lifeline Dispatch is a software project/demo and is not a replacement for real emergency services. In a medical emergency, contact your local emergency service directly.

<p align="center">
  <a href="https://lifeline-dispatch-fontend.netlify.app/">Live Website</a> ·
  <a href="https://github.com/Asadul1120/Lifeline-Dispatch-Frontend">Frontend Repository</a> ·
  <a href="https://github.com/Asadul1120/Lifeline-Dispatch-Backend">Backend Repository</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Payment-bKash-E2136E" alt="bKash" />
</p>

---

## Project Links

| Resource | Link |
|---|---|
| Live Frontend | [lifeline-dispatch-fontend.netlify.app](https://lifeline-dispatch-fontend.netlify.app) |
| Frontend Repository | [Lifeline-Dispatch-Frontend](https://github.com/Asadul1120/Lifeline-Dispatch-Frontend) |
| Backend Repository | [Lifeline-Dispatch-Backend](https://github.com/Asadul1120/Lifeline-Dispatch-Backend) |
| Live Backend | [lifeline-dispatch-backend.vercel.app](https://lifeline-dispatch-backend.vercel.app) |
| API Documentation | [View Postman Documentation](https://documenter.getpostman.com/view/37760772/2sBYB1M85o) |

## Demo Access

Use the following restricted demo account to explore the Admin dashboard:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@gmail.com` | `123456` |

The application also supports role-based demo login buttons when the Patient and Driver demo credentials are configured through environment variables.

> **Security note:** These credentials are for project demonstration only. Never use publicly exposed credentials for a real production administrator account.

---

## Key Features

### Authentication and Authorization

- Patient registration and email verification
- Driver application and verification flow
- Email/password authentication
- Google OAuth integration when configured
- Login, logout, and current-user session validation
- Three role-based dashboards:
  - **Patient**
  - **Driver**
  - **Admin**
- Role-aware dashboard routing and protected dashboard access
- One-click demo login entry points
- Form validation with human-readable error messages
- Toast notifications for success and API errors

### Patient Dashboard

- View personal emergency requests
- Create ambulance requests with pickup, destination, emergency type, and priority
- View emergency request details and status history
- Cancel eligible emergency requests
- Start bKash payment from an eligible request
- View payment history and payment statuses
- Dedicated payment success, cancelled, failed, and unknown-result pages
- Update patient profile and profile image

### Driver Dashboard

- Submit driver application
- Verify driver account
- View assigned emergency requests
- Manage availability and current location
- Start assigned trips
- Update trip status:
  - On the way
  - Picked up
  - Completed
  - Cancelled
- View trip history and trip details
- Update driver profile and availability information

### Admin Dashboard

- View operational dashboard statistics
- Manage users and inspect user details
- Search, filter, paginate, and update eligible user statuses
- Review, approve, or reject driver applications
- Create and update ambulance records
- Manage ambulance availability/status
- Review emergency requests
- Assign ambulances to emergency requests
- View emergency request details and trip/payment information
- Review audit logs
- Use role-specific dashboard navigation

### User Experience and Reliability

- Responsive mobile-first interface
- Reusable UI components and feature modules
- TanStack Query for server-state fetching and caching
- URL-synchronized admin search, filter, sorting, and pagination state
- Skeleton loading screens for dashboard data-fetching routes
- Empty states for lists and tables
- Error boundaries and graceful error states
- Custom not-found pages
- Consistent emerald/slate visual theme
- Accessible labels, status announcements, and keyboard-friendly controls

---

## User Roles

| Capability | Patient | Driver | Admin |
|---|:---:|:---:|:---:|
| Access personal dashboard | ✅ | ✅ | ✅ |
| Create emergency request | ✅ | — | — |
| View own requests and payments | ✅ | — | — |
| Manage assigned trips | — | ✅ | — |
| Update driver availability/location | — | ✅ | — |
| Apply as a driver | — | ✅ | — |
| Approve/reject driver applications | — | — | ✅ |
| Manage ambulances | — | — | ✅ |
| Assign ambulance to request | — | — | ✅ |
| Manage users | — | — | ✅ |
| Review audit logs | — | — | ✅ |

---

## Main Routes

### Public and Authentication Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/about-us` | About Lifeline Dispatch |
| `/contact` | Contact and support page |
| `/login` | Login page with role-based demo access |
| `/register` | Patient registration |
| `/verify-email` | Email verification |
| `/driver-apply` | Driver application |
| `/driver-verify` | Driver verification |

### Patient Routes

| Route | Description |
|---|---|
| `/dashboard/patient` | Patient dashboard overview |
| `/dashboard/patient/emergency-request` | Emergency request list and creation |
| `/dashboard/patient/emergency-request/[id]` | Emergency request details and payment initiation |
| `/dashboard/patient/payments` | Payment history |
| `/dashboard/patient/payments/success` | Successful payment result |
| `/dashboard/patient/payments/cancel` | Cancelled payment result |
| `/dashboard/patient/payments/failed` | Failed payment result |
| `/dashboard/patient/payments/unknown` | Unknown payment result |
| `/dashboard/patient/profile` | Patient profile settings |

### Driver Routes

| Route | Description |
|---|---|
| `/dashboard/driver` | Driver dashboard and assigned requests |
| `/dashboard/driver/trips` | Driver trip history |
| `/dashboard/driver/trips/[id]` | Trip details and status actions |
| `/dashboard/driver/profile` | Driver profile and availability |

### Admin Routes

| Route | Description |
|---|---|
| `/dashboard/admin` | Admin overview and analytics |
| `/dashboard/admin/users` | User management |
| `/dashboard/admin/users/[id]` | User details |
| `/dashboard/admin/drivers` | Driver application management |
| `/dashboard/admin/ambulances` | Ambulance management |
| `/dashboard/admin/emergency-requests` | Emergency request and dispatch management |
| `/dashboard/admin/emergency-requests/[id]` | Emergency request details |
| `/dashboard/admin/audit-logs` | Audit log history |

> Parentheses in folders such as `(dashboard)` and `(auth)` are Next.js route groups. They do not appear in the browser URL.

---

## Technology Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui, Base UI |
| Icons | Lucide React |
| Data Fetching | TanStack Query |
| API Client | ofetch |
| Forms | TanStack React Form |
| Validation | Zod |
| Authentication | Custom backend authentication, Google OAuth UI |
| Notifications | Sonner |
| Payments | bKash through the backend API |
| Code Quality | Biome |
| Frontend Hosting | Netlify |
| Backend | Node.js, Express, TypeScript, PostgreSQL, Prisma |

---

## Project Structure

```text
.
├── middleware.ts
├── public/
├── src/
│   ├── api/                    # API functions grouped by feature
│   ├── app/
│   │   ├── (auth)/             # Login, registration, verification
│   │   ├── (dashboard)/        # Patient, Driver, and Admin dashboards
│   │   ├── (driver-onboarding)/# Driver application and verification
│   │   └── (public)/           # Home, About, and Contact pages
│   ├── components/
│   │   ├── form/               # Reusable form components
│   │   ├── modules/            # Feature-specific UI modules
│   │   ├── share/              # Shared layout and skeleton components
│   │   └── ui/                 # Reusable UI primitives
│   ├── hooks/                  # React Query and feature hooks
│   ├── lib/                    # API client and utility functions
│   ├── providers/              # Application providers
│   ├── types/                  # Shared TypeScript types
│   └── validation/             # Zod validation schemas
├── next.config.ts
├── package.json
└── biome.json
```

---

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- Git
- A running Lifeline Dispatch backend API

### 1. Clone the repository

```bash
git clone https://github.com/Asadul1120/Lifeline-Dispatch-Frontend.git
cd Lifeline-Dispatch-Frontend
```

### 2. Install dependencies

```bash
npm install
```

For a clean installation using the lockfile:

```bash
npm ci
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# Backend API base URL
NEXT_PUBLIC_API_URL=https://lifeline-dispatch-backend.vercel.app/api/v1

# Optional Google OAuth client ID
NEXT_PUBLIC_GOOGLE_CLIENT_ID=

# Optional support email used by the contact page
NEXT_PUBLIC_SUPPORT_EMAIL=

# Optional public demo accounts used by one-click demo login
NEXT_PUBLIC_DEMO_PATIENT_EMAIL=
NEXT_PUBLIC_DEMO_PATIENT_PASSWORD=
NEXT_PUBLIC_DEMO_DRIVER_EMAIL=
NEXT_PUBLIC_DEMO_DRIVER_PASSWORD=
NEXT_PUBLIC_DEMO_ADMIN_EMAIL=admin@gmail.com
NEXT_PUBLIC_DEMO_ADMIN_PASSWORD=123456

# Optional middleware configuration
AUTH_COOKIE_NAME=
USER_ROLE_COOKIE_NAME=user_role
```

> Never commit `.env`, `.env.local`, private tokens, real passwords, or production secrets. Values beginning with `NEXT_PUBLIC_` are exposed to the browser.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run Biome checks |
| `npm run format` | Format the source files with Biome |

---

## API Integration

The frontend communicates with the Lifeline Dispatch backend through the configured `NEXT_PUBLIC_API_URL`.

Feature API modules are organized in `src/api/`:

- `auth.api.ts` — registration, login, logout, verification, current user
- `patient.api.ts` — emergency requests, patient profile, payments
- `driver.api.ts` — driver application, verification, profile
- `trip.api.ts` — trip status and lifecycle actions
- `admin.api.ts` — driver approval and dispatch actions
- `admin-management.api.ts` — users and ambulance management

Full API reference:

[Open the Postman API Documentation](https://documenter.getpostman.com/view/37760772/2sBYB1M85o)

---

## Payment Flow

The patient payment workflow uses bKash through the backend API:

1. A patient creates an emergency request.
2. The patient opens the request details page.
3. The frontend requests a bKash checkout URL from the backend.
4. The patient completes or cancels the external checkout.
5. The user returns to the appropriate result page.
6. Payment history displays the recorded payment status from the backend.

---

## Deployment

The current frontend deployment is hosted on Netlify:

[https://lifeline-dispatch-fontend.netlify.app](https://lifeline-dispatch-fontend.netlify.app)

The backend is hosted on Vercel:

[https://lifeline-dispatch-backend.vercel.app](https://lifeline-dispatch-backend.vercel.app)

For a new deployment, configure the production frontend environment variable:

```env
NEXT_PUBLIC_API_URL=https://lifeline-dispatch-backend.vercel.app/api/v1
```

Make sure the backend allows the deployed frontend origin through its CORS configuration and that authentication cookies are configured correctly for the deployed domains.

---

## Quality and Security Notes

- Role checks are implemented through protected dashboard routing and role-aware UI navigation.
- The backend remains the source of truth for authentication and authorization.
- Do not rely on frontend-only role checks for sensitive operations.
- Keep authentication cookies `HttpOnly`, `Secure`, and configured with an appropriate `SameSite` policy.
- Do not expose real administrator credentials in public repositories.
- Validate all API input on the backend as well as in the frontend.
- Test payment success, cancellation, failure, and retry scenarios before production use.

---

## License

This project is developed for educational and demonstration purposes.

[Back to top](#top)
