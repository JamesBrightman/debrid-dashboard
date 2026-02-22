# Debrid Dashboard

A simple Next.js app that displays Real-Debrid account information for a given API token.

![Debrid Dashboard UI (redacted)](public/screenshots/dashboard.png)

## Purpose

The purpose of this project is to let you paste a Real-Debrid API token and view useful account data (user details, traffic, downloads, torrents, hosts, and related actions) in one dashboard.

The dashboard is a single page which shows the following;

- User summary and account metadata
- Traffic usage insights
- Downloads and torrents tables
- Host and host-status information
- Basic account actions (for example, token disable / avatar reset)

## Token Safety

- The token is stored in browser `sessionStorage` (not in the repository) - it is never logged or saved externally
- It is only used to make authenticated requests for your Real-Debrid data.
- Because it uses `sessionStorage`, it is scoped to your current browser session.
- Closing the browser/tab clears `sessionStorage` in typical usage.
- No database or backend token storage is used by this project.

## Run Locally

```bash
1. Install dependencies:

npm install

2. Start the dev server:

npm run dev

3. Open:

http://localhost:3000

4. Paste your Real-Debrid API token into the header input and submit to load data.
```

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- TanStack Query + TanStack Table

## Hosted App

https://debrid-client-theta.vercel.app/
