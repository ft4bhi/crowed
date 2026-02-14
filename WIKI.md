# Project Collaboration Platform Wiki

Welcome to the Project Collaboration Platform Wiki!

## About
This platform helps users share project ideas and find collaborators. Users can post projects, specify required skills, and provide contact info for easy networking.

## Key Features
- Add and manage project ideas
- Filter/search projects
- Profile page for your projects
- Contact project owners via Instagram, LinkedIn, Email, WhatsApp
- Admin panel for managing categories and options
- Secure authentication with Firebase

---

## Getting Started

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/yourusername/project-collaboration.git
cd project-collaboration
```

### 2. Install Dependencies
Install all required Node.js packages:
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory. You can copy from an example if provided:
```bash
cp .env.example .env.local
```
Fill in the following variables with your own credentials:
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
Run the following commands to set up your database schema and seed initial data:
```bash
npx drizzle-kit push
npx tsx drizzle/seed.ts
```

### 5. Start the Development Server
Start the app locally:
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage
- **Add a Project:** Use the "Add Project" page to submit your idea and contact info.
- **View Projects:** Browse and filter projects on the home page.
- **Profile:** See and manage your own projects in your profile.
- **Edit/Delete:** Edit or delete your projects from your profile page.
- **Contact:** Use the provided links to contact project owners via Instagram, LinkedIn, Email, or WhatsApp.
- **Admin:** Use the admin panel to manage categories and options.

---

## Advanced Configuration
- **Custom Domains:** You can specify a custom domain for your project if needed.
- **Seeding More Data:** Edit the files in `drizzle/seed-*.ts` to add more categories, options, or example projects.
- **Production Deployment:** Configure your environment variables and database for production. Use a process manager (like PM2) or deploy to Vercel/Netlify for serverless hosting.

---

## Troubleshooting
- **Database Errors:** Ensure your `DATABASE_URL` is correct and the database server is running.
- **Firebase Auth Issues:** Double-check all Firebase credentials in your `.env.local` file.
- **Migrations Fail:** If migrations fail, check for existing tables or conflicting schema changes.
- **Port in Use:** If port 3000 is in use, set `PORT=xxxx` in your `.env.local`.

---

## FAQ
- **How do I add a new category?** Use the admin panel to manage categories.
- **How do I reset my password?** Use the Firebase authentication reset link.
- **How do I change the project branding?** Edit the Navbar and Footer components in `components/`.
- **How do I add more contact methods?** Extend the project schema and forms in the codebase.

---

## More
For detailed documentation, see the README or open an issue for help. You can also expand this wiki with:
- API Reference
- Admin Guide
- Deployment Guide
- Customization Tips 