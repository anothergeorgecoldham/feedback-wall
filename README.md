# Feedback Wall

A simple public feedback wall. Visitors can post a name and a short message,
and the page shows everyone's messages.

## Purpose of this repository

This is a **deliberately unhardened demo application**, built as a teaching
prop for a live session on developer security. It is not production software,
does not follow security best practices, and should not be deployed publicly
with real user data.

The app is intentionally left in a raw, unreviewed state so that common
developer security tooling (code scanning, dependency scanning, secret
scanning, and pull request review) has real things to find during the
session — the specific issues are not documented here on purpose, since
discovering them live is the point.

If you're browsing this repo outside that context: feel free to explore the
code, but treat everything here as an illustrative example rather than a
reference implementation.

## Running locally

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

## How it works

- Static front end: `index.html`, `app.js`, `styles.css`
- Backend: a single Express server (`server.js`) exposing one API route,
  `/api/messages`, supporting `GET` (list messages) and `POST` (add a message)
- Messages are stored in memory only — nothing is persisted between restarts
