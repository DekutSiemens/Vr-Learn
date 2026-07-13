# VR Learn Frontend

This is the Next.js frontend for the learning area. It talks to the Nest backend API; it does not connect directly to Postgres, Redis, Resend, or Mailtrap.

## Local Setup

Create `.env.local` in this folder:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3008
```

The file is already ignored by git. If your backend uses a different port, change only the port in that URL.

## Run Locally

Start the backend requirements first from the backend project:

```bash
cd D:\SiemensVr\store\improved-succotash\Backend
docker compose up -d
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

The backend `.env` should include:

```bash
PORT=3008
DATABASE_URL=postgresql://postgres:password@localhost:5432/vrstore_local
REDIS_URL=redis://localhost:6379
CORS_ORIGINS=http://localhost:4000
```

For email, use either Mailtrap SMTP or another SMTP service supported by the backend:

```bash
EMAIL_SERVICE=smtp
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=your-mailtrap-user
SMTP_PASSWORD=your-mailtrap-password
EMAIL_FROM_ADDRESS=test@example.com
```

Then start this frontend:

```bash
cd D:\SiemensVr\store\Vr-Learn
npm run dev
```

Open [http://localhost:4000](http://localhost:4000).

## Important

If you change `NEXT_PUBLIC_API_URL`, restart the frontend dev server so Next.js reloads the environment variable.
