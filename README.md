<a id="top"></a>

<div align="center">

# 🚑 Lifeline Dispatch

### A Connected Ambulance Dispatch & Emergency Transport Platform

**Request assistance. Coordinate ambulances. Manage trips.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/UI-shadcn%2Fui-18181B)](https://ui.shadcn.com/)

**[🌐 Live Website](https://lifeline-dispatch-fontend.netlify.app/)** · **[💻 Frontend Repository](https://github.com/Asadul1120/Lifeline-Dispatch-Frontend)**

</div>

---

## 📖 Overview

**Lifeline Dispatch** is a role-based emergency ambulance dispatch web application that brings **patients, ambulance drivers, and administrators** into one coordinated workflow. Patients can request ambulance assistance and review trip progress; drivers can manage assigned trips and availability; administrators can oversee users, driver approvals, ambulances, emergency requests, and dispatch operations.

This repository contains the **frontend application**, built with the **Next.js App Router**, TypeScript, Tailwind CSS v4, and shadcn/ui. It consumes a separate REST API developed for the Lifeline Dispatch backend.

> **Important:** Lifeline Dispatch is a software demonstration/project, not a substitute for emergency services. In an immediate medical emergency, contact your local emergency service directly. Ambulance availability and response times must not be assumed from the demo.

## 🔗 Project Links

| Resource | Link |
| --- | --- |
| Live frontend | [lifeline-dispatch-fontend.netlify.app](https://lifeline-dispatch-fontend.netlify.app/) |
| Frontend source | [Lifeline-Dispatch-Frontend](https://github.com/Asadul1120/Lifeline-Dispatch-Frontend) |
| Backend source | Add your backend repository URL here |
| API documentation / Postman | Available in the backend project's `src/doc/Lifeline-Dispatch.postman_collection.json` |
| Project demo video | Add your demonstration video URL here |

## ✨ Key Features

### 🔐 Authentication & Access

- Patient registration and email verification.
- Driver application and email verification.
- Email/password login and logout.
- Google sign-in integration when a Google OAuth client ID is configured.
- Role-based dashboards for **PATIENT**, **DRIVER**, and **ADMIN**.
- Protected dashboard navigation and role-aware redirects.
- Reusable form validation, loading feedback, and toast notifications.
- Optional one-click demo login entry points for the three roles (requires separate demo accounts and configuration).

### 🧑‍⚕️ Patient Dashboard

- View an overview of personal emergency requests.
- Create ambulance requests with pickup, destination, and emergency information.
- View request details and status/history.
- Cancel eligible emergency requests.
- Review payment records and payment-result screens.
- Edit patient profile information and profile image.

### 🚑 Driver Dashboard

- Apply as a driver and verify the account.
- View assigned emergency requests.
- Manage availability and current location.
- Start trips and update trip progress.
- Mark a trip as on the way, mark a patient as picked up, and complete/cancel trips when permitted by the API.
- View trip history and individual trip details.
- Update driver profile information and profile image.

### 🛡️ Admin Dashboard

- View dashboard summaries and operational information.
- Browse users and inspect individual user profiles.
- Search/filter users and update eligible user-account statuses.
- Review, approve, or reject driver applications.
- Create, edit, and update ambulance records and availability statuses.
- Review emergency requests and assign available ambulances.
- Inspect emergency request details, trip information, and audit logs.
- Use paginated management views where supported by the corresponding API/UI.

### 🎨 Public Website & Experience

- Landing page introducing the service and the patient/driver/admin workflows.
- About Us page outlining the platform's mission and capabilities.
- Contact/Support page with a validated **email-draft** form and FAQ, if the latest contact-page implementation has been applied.
- Responsive navigation, consistent emerald/slate styling, and reusable interface components.
- Dedicated loading, error, and not-found UI where the corresponding Next.js route files have been added.

> **Feature verification:** The modules above are based on the provided frontend/backend source and subsequent UI work. A listed capability does not by itself guarantee that every production flow has passed end-to-end testing. Recently drafted pages/components must be committed before they appear in the deployed site.

## 👥 User Roles

| Capability | Patient | Driver | Admin |
| --- | :---: | :---: | :---: |
| Personal dashboard | ✅ | ✅ | ✅ |
| Create emergency requests | ✅ | — | — |
| View own requests/payments | ✅ | — | — |
| Manage assigned trips | — | ✅ | — |
| Update driver availability/location | — | ✅ | — |
| Approve/reject drivers | — | — | ✅ |
| Manage ambulances | — | — | ✅ |
| Assign ambulances to requests | — | — | ✅ |
| Manage users and review audit logs | — | — | ✅ |

## 🧭 Main Routes

### Public & Authentication

| Route | Purpose |
| --- | --- |
| `/` | Home |
| `/about-us` | About the platform |
| `/contact` | Contact and support *(if added)* |
| `/register` | Patient registration |
| `/verify-email` | Patient email verification |
| `/login` | Sign in |
| `/driver-apply` | Driver application |
| `/driver-verify` | Driver email verification |

### Patient

| Route | Purpose |
| --- | --- |
| `/dashboard/patient` | Patient overview |
| `/dashboard/patient/emergency-request` | Emergency request management |
| `/dashboard/patient/emergency-request/[id]` | Request details |
| `/dashboard/patient/payments` | Payment history |
| `/dashboard/patient/payments/success` | Successful payment result |
| `/dashboard/patient/payments/cancel` | Cancelled payment result |
| `/dashboard/patient/payments/failed` | Failed payment result |
| `/dashboard/patient/payments/unknown` | Unknown payment result |
| `/dashboard/patient/profile` | Patient profile |

### Driver

| Route | Purpose |
| --- | --- |
| `/dashboard/driver` | Driver overview and assignments |
| `/dashboard/driver/trips` | Trip history |
| `/dashboard/driver/trips/[id]` | Trip details |
| `/dashboard/driver/profile` | Driver profile |

### Admin

| Route | Purpose |
| --- | --- |
| `/dashboard/admin` | Admin overview |
| `/dashboard/admin/users` | User directory |
| `/dashboard/admin/users/[id]` | User details and management |
| `/dashboard/admin/drivers` | Driver approval management |
| `/dashboard/admin/ambulances` | Ambulance management |
| `/dashboard/admin/emergency-requests` | Emergency dispatch and request history |
| `/dashboard/admin/emergency-requests/[id]` | Request details |
| `/dashboard/admin/audit-logs` | Audit-log history |

> The `[id]` segments are dynamic route parameters. The folders in parentheses in `src/app` are Next.js route groups and do **not** appear in the browser URL.

## 🛠️ Technology Stack

| Category | Technologies |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui, Base UI, `class-variance-authority` |
| Icons | Lucide React |
| Data fetching / cache | TanStack Query (React Query), `ofetch` |
| Forms / validation | TanStack React Form, Zod |
| Authentication UI | Email/password, Google OAuth UI |
| Notifications | Sonner |
| Code quality | Biome |
| Frontend hosting | Netlify (current project link) |
| Backend integration | Express REST API (`/api/v1`) |
| Payment workflow | bKash integration through the backend API |

The separate backend uses **Node.js, Express, TypeScript, PostgreSQL, Prisma**, and supporting services. Backend installation and database configuration are maintained separately from this frontend repository.

## 📁 Project Structure

```text
src/
├── api/                         # API request functions by feature
│   ├── auth.api.ts
│   ├── patient.api.ts
│   ├── driver.api.ts
│   ├── trip.api.ts
│   ├── admin.api.ts
│   └── admin-management.api.ts
├── app/
│   ├── (public)/                # Public pages and shared public layout
│   ├── (auth)/                  # Login, registration, verification
│   ├── (driver-onboarding)/     # Driver application and verification
│   ├── (dashboard)/dashboard/   # Patient, Driver, Admin areas
│   ├── globals.css             # Global styles / Tailwind theme
│   └── layout.tsx               # Root providers and notifications
├── components/
│   ├── form/                    # Reusable forms
│   ├── modules/                 # Feature-oriented UI modules
│   ├── share/                   # Header, Footer, Dashboard Sidebar
│   └── ui/                      # shadcn/ui components
├── hooks/                       # Query and mutation hooks
├── lib/                         # API client and utilities
├── providers/                   # Application providers
├── types/                       # Shared TypeScript definitions
├── validation/                  # Form validation schemas
└── proxy.ts                     # Next.js dashboard request proxy

public/                           # Static assets
next.config.ts                    # Next.js configuration
components.json                   # shadcn/ui configuration
biome.json                        # Biome configuration
package.json                      # Scripts and dependencies
```

## ⚙️ Getting Started

### Prerequisites

- Node.js **20+** (a current LTS version is recommended).
- npm.
- Git.
- A working Lifeline Dispatch backend API with access to its required services.

### 1. Clone the frontend

```bash
git clone https://github.com/Asadul1120/Lifeline-Dispatch-Frontend.git
cd Lifeline-Dispatch-Frontend
```

### 2. Install dependencies

```bash
npm install
```

Or, to install exactly from the committed lockfile:

```bash
npm ci
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```dotenv
# Required: base URL of the Lifeline Dispatch backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Optional: enables the Google Sign-In button
NEXT_PUBLIC_GOOGLE_CLIENT_ID=

# Optional: public address for the Contact page's email-draft form
NEXT_PUBLIC_SUPPORT_EMAIL=

# Optional: only for deliberately public, restricted DEMO accounts
NEXT_PUBLIC_DEMO_PATIENT_EMAIL=
NEXT_PUBLIC_DEMO_PATIENT_PASSWORD=
NEXT_PUBLIC_DEMO_DRIVER_EMAIL=
NEXT_PUBLIC_DEMO_DRIVER_PASSWORD=
NEXT_PUBLIC_DEMO_ADMIN_EMAIL=
NEXT_PUBLIC_DEMO_ADMIN_PASSWORD=
```

**Environment notes:**

- `NEXT_PUBLIC_API_URL` must point to the backend **API base path**, which is `/api/v1` in the provided backend code. Do not append `/auth` or any other endpoint to this value.
- Optional variables above are used only if the corresponding UI additions are present in your current branch.
- Every `NEXT_PUBLIC_` value is exposed to the browser. **Never use actual personal or privileged admin credentials as demo credentials.** Use restricted disposable accounts intended for public demonstration.
- Do **not** commit `.env`, `.env.local`, tokens, production passwords, or secret API keys.
- If you implement a same-origin API rewrite in `next.config.ts`, keep its destination and the frontend API client's base URL consistent; the direct API configuration shown here matches the original frontend source.

### 4. Start the development server

```bash
npm run dev
```

Open **http://localhost:3000**.

### 5. Production build and preview

```bash
npm run build
npm run start
```

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run Biome checks |
| `npm run format` | Format files with Biome |

## 🔄 How the Platform Works

```text
PATIENT
  Register / verify / sign in
       ↓
  Create emergency request
       ↓
ADMIN / DISPATCH
  Review incoming request
       ↓
  Assign an available ambulance and driver
       ↓
DRIVER
  View assignment → Start trip → Update status
       ↓
PATIENT
  Review trip status and payment information
       ↓
ADMIN
  Review operational records and audit history
```

A request or trip can only move through status changes allowed by the backend. The frontend displays actions according to the available role, current state, and API response.

## 🔌 Backend API Integration

API calls are organized under `src/api/` and reused through custom TanStack Query hooks. The common client lives in `src/lib/apiClient.ts`; in the original project it uses `ofetch` with `credentials: "include"` for cookie-based sessions.

The backend exposes endpoints under `/api/v1` including:

| Area | Representative endpoints |
| --- | --- |
| Authentication | `/auth/register`, `/auth/verify-email`, `/auth/login`, `/auth/google`, `/auth/logout` |
| Current user | `/user/me` |
| Driver | `/driver/apply`, `/driver/assigned-requests`, `/driver/availability`, `/driver/location` |
| Emergency requests | `/emergencyRequest/create`, `/emergencyRequest/my` |
| Ambulances | `/ambulance`, `/ambulance/create` |
| Trips | `/trip/my`, `/trip/start/:requestId`, `/trip/complete/:tripId` |
| Payments | `/payment/create`, `/payment/my` |
| Administration | `/admin/dashboard`, `/admin/users`, `/admin/emergency-requests` |
| Audit logs | `/audit-log` |

**Session/deployment note:** Frontend and backend may use different domains. Cookie attributes, HTTPS, CORS, and browser third-party-cookie restrictions affect whether the login session persists. Confirm these settings in the deployed environment and test all protected routes. Frontend route guards are not a substitute for server-side authorization.

## 💳 Payment Integration

The frontend integrates with the **bKash payment flow provided by the backend**, including personal payment history and result pages for success, cancellation, failure, and unknown outcomes. The backend is responsible for payment creation, callback handling, verification, and authoritative payment status.

> A payment-result page is **not** proof of payment by itself. Validate transactions against the backend's verified payment state. If your assignment explicitly requires a different payment gateway, verify that requirement independently; do not describe bKash as Stripe or SSLCommerz.

## 🎭 Demo Login

The optional Home/Login demo-login UI supports three roles: **Patient**, **Driver**, and **Admin**. To enable these buttons:

1. Create one disposable, restricted test account for each role in the backend.
2. Set its corresponding `NEXT_PUBLIC_DEMO_*` values in the frontend environment.
3. Restart the development server or redeploy Netlify after changing environment variables.
4. Test that each account opens only its own authorized dashboard.

Because these values are public, do **not** reuse real accounts, private credentials, or an unrestricted administrator account. If safe demo accounts are unavailable, leave the optional demo configuration disabled rather than displaying nonworking or unsafe shortcuts.

## ☁️ Deployment (Netlify)

1. Push the frontend project to GitHub.
2. Create a new Netlify site using this repository.
3. Set the project root to the repository root and use Netlify's Next.js-compatible deployment configuration.
4. Add `NEXT_PUBLIC_API_URL` and any other required environment variables in Netlify's site settings.
5. Deploy the site and test public pages, login, protected dashboards, image loading, and payment callbacks.
6. Ensure the backend accepts the deployed frontend origin and that authentication cookies work in production.

**Live frontend:** https://lifeline-dispatch-fontend.netlify.app/

## ✅ Quality & Manual Testing Checklist

- [ ] `npm run build` completes successfully.
- [ ] `npm run lint` reports no blocking issues.
- [ ] Home, About, Contact (if included), Login, and Register pages render on mobile and desktop.
- [ ] Invalid routes show the custom not-found UI (if implemented).
- [ ] Loading and error states display appropriately.
- [ ] Patient, Driver, and Admin login redirects are correct.
- [ ] An unauthenticated visitor cannot access protected dashboards.
- [ ] A user cannot access another role's restricted API actions.
- [ ] Patient request create/list/details/cancel workflows work.
- [ ] Driver availability, assignment, trip status, and profile workflows work.
- [ ] Admin users, approvals, ambulances, assignment, and audit-log workflows work.
- [ ] Search/filter/pagination controls work, including browser Back/Forward where URL synchronization is implemented.
- [ ] Payment status reflects a verified backend response.
- [ ] Mobile menus, keyboard navigation, form errors, and empty states behave correctly.
- [ ] Netlify production deployment has working API connectivity and session cookies.

## 🔒 Security & Safety Notes

- Keep actual secrets on the backend; never store them in `NEXT_PUBLIC_` variables.
- Do not commit `.env.local` or share private demo/admin passwords.
- Validate all sensitive actions and role permissions on the server.
- Use HTTPS in production and verify cookie/CORS configuration.
- Do not display invented response times, ambulance availability, or emergency service guarantees.
- The public contact form, when enabled, opens an email draft rather than sending a message to a backend contact endpoint.

## 🖼️ Screenshots & Demonstration

To make this README more useful to evaluators, add screenshots **after capturing the actual running application**. Recommended screenshots:

- Public homepage (desktop and mobile).
- Login screen with three demo-role entry points (when configured).
- Patient request dashboard.
- Driver trip dashboard.
- Admin overview and ambulance assignment screen.

Keep screenshots in a folder such as `public/screenshots/` and reference only files that really exist. You can also add the 5–10-minute project walkthrough link in the **Project Links** table above.

## 🧩 Troubleshooting

| Symptom | What to check |
| --- | --- |
| Requests fail with `Failed to fetch` | Backend running, correct `/api/v1` base URL, HTTPS and CORS |
| Login succeeds but dashboard redirects to login | Browser cookies, backend `Set-Cookie`, cross-site/session policy, proxy rules |
| Google sign-in is missing | `NEXT_PUBLIC_GOOGLE_CLIENT_ID` configuration |
| Images do not load | `images.remotePatterns` in `next.config.ts`, URL accessibility |
| Demo login cannot connect | Test account exists, correct role, optional demo env variables |
| Contact form does not submit | The form opens an email draft; confirm `NEXT_PUBLIC_SUPPORT_EMAIL` and send from an email client |
| Production build fails | Run `npm run lint` and `npm run build`; resolve reported TypeScript/import errors |

## 📌 Project Scope

This is the **frontend repository** for a role-based ambulance dispatch project developed for the **Programming Hero Level 2, Batch 7 — B7A7 (Ambulance Dispatch)** assignment. Backend services are maintained separately.

This README documents the codebase and recent UI work discussed for the project. Some recently added UI pages and enhancements may not exist in an older checkout or deployment until the corresponding files are committed and deployed. Functional completion should be established through a successful build and end-to-end testing—not by documentation alone.

## 🤝 Contributing

For project improvements:

1. Create a feature branch.
2. Make focused changes consistent with the existing TypeScript, Tailwind, and shadcn/ui patterns.
3. Run `npm run lint` and `npm run build`.
4. Commit with a descriptive message (for example, `feat(patient): add request history filters`).
5. Open a pull request describing the changes and testing performed.

## 📄 License

No license has been specified in this repository. All rights remain with the project owner unless a license is added.

---

<div align="center">

**Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.**

*Lifeline Dispatch — Connecting emergency transport workflows.*

[⬆ Back to top](#top)

</div>
