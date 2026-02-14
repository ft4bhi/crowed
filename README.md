# Project Collaboration Platform

## 🚀 Overview
A modern web platform for students, professionals, and innovators to share project ideas and find collaborators. Users can post their project ideas, specify required skills, and provide contact information (Instagram, LinkedIn, Email, WhatsApp) for interested collaborators to reach out.

## 🎯 Purpose
- Help users find collaborators for their projects.
- Showcase project ideas and attract interest from the community.
- Enable easy contact and networking between project owners and interested contributors.

## 🛠️ Features
- Add project ideas with type, department, technology, description, and more.
- Optional contact info fields: Instagram, LinkedIn, Email, WhatsApp.
- Filter and search projects by type, department, technology, etc.
- View your own projects in your profile.
- Edit and manage your projects.
- Secure authentication and user management.

## 🌐 Use Cases
- Students looking for teammates for academic or hobby projects.
- Professionals seeking collaborators for side projects or startups.
- Hackathon teams forming around new ideas.

## 🏗️ Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js API routes, Drizzle ORM, PostgreSQL
- **Auth:** Firebase Authentication
- **Database:** PostgreSQL

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/project-collaboration.git
cd project-collaboration
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
FIREBASE_ADMIN_PRIVATE_KEY=your_firebase_admin_private_key
FIREBASE_ADMIN_CLIENT_EMAIL=your_firebase_admin_client_email
```

### 4. Database Migration & Seeding
```bash
npx drizzle-kit push
npx tsx drizzle/seed.ts
```

### 5. Run the Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

## 📦 Project Structure
- `app/` — Next.js app directory (pages, API routes, components)
- `components/` — Shared React components
- `drizzle/` — Database schema, migrations, and seed scripts
- `lib/` — Utility libraries, database, and Firebase config
- `types/` — TypeScript types

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License
[MIT](LICENSE)
