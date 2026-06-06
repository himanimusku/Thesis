# Thesis

A scientific research intelligence platform that helps researchers stay current with the latest publications in their fields. Thesis provides personalized feeds, impact-ranked papers, author tracking, and trend detection — powered by real data from [OpenAlex](https://openalex.org).

## Features

- **Personalized Feed** — Papers filtered to your research interests (e.g., Robotics, NLP, Neuroscience), ranked by impact
- **Impact Scoring** — Composite ranking based on institutional prestige, venue quality, and early citation traction
- **Author Tracking** — Follow researchers and see their latest publications
- **Global Search** — Search across 250M+ scholarly works
- **Trend Detection** — Identify accelerating research areas
- **User Profiles** — Firebase Authentication with onboarding flow for selecting interests and authors

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4, Inter font
- **Auth & Data**: Firebase Authentication + Firestore
- **Research Data**: OpenAlex API (250M+ scholarly works)
- **State Management**: Zustand + TanStack React Query
- **ORM**: Prisma (PostgreSQL schema)

## Getting Started

### Prerequisites

- Node.js >= 20.x
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy the example env file and fill in your Firebase credentials:

```bash
cp .env.local.example .env.local
```

Required variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Email/Password** and **Google** sign-in under Authentication
3. Create a **Firestore Database** in test mode
4. Copy your web app config into `.env.local`

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx         # Home — personalized feed
│   ├── papers/          # Paper search & detail
│   ├── authors/         # Author listing & detail
│   ├── topics/          # Topic listing
│   ├── trends/          # Trend intelligence
│   ├── signin/          # Sign in
│   ├── signup/          # Sign up
│   ├── onboarding/      # Interest & author picker
│   ├── about/           # About page
│   └── api/             # API routes (OpenAlex proxy)
├── components/          # Reusable UI components
│   ├── layout/          # App shell, sidebar, header
│   ├── ui/              # Primitives (button, badge, card, etc.)
│   ├── papers/          # Paper card
│   ├── authors/         # Author card
│   └── trends/          # Trend card
├── contexts/            # React contexts (auth)
├── lib/                 # Utilities
│   ├── firebase.ts      # Firebase client (lazy init)
│   ├── openalex.ts      # OpenAlex API client
│   ├── transform.ts     # Data transformation layer
│   ├── impact-score.ts  # Impact scoring algorithm
│   └── utils.ts         # General utilities
├── store/               # Zustand global state
└── types/               # TypeScript interfaces
```

## Data Source

All research data is fetched live from [OpenAlex](https://openalex.org), a fully open catalog covering:
- 250M+ scholarly works
- 90M+ authors
- 100K+ research concepts

## Author

Built by **Himani Musku**
