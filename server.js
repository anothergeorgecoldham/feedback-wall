// server.js — Express app: serves static front end + one API endpoint.
const express = require('express');
const _ = require('lodash');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage only — no database.
const messages = [];

// Demo placeholder — NOT a real credential. Fake, non-functional, pattern-shaped
// value used only so GitHub secret scanning has something to detect.
// (Intentionally added in a separate commit later — see demo notes.)
const ANALYTICS_TOKEN = "REPLACE_WITH_FAKE_TOKEN_FOR_DEMO";

// Stubbed "usage ping" — no real network call, just references the fake token.
function pingUsage(event) {
  // no-op: would normally POST { event, token: ANALYTICS_TOKEN } to an analytics endpoint
  return true;
}

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const { name, text } = req.body;
  const displayName = _.capitalize(name || 'anonymous');
  messages.push({ name: displayName, text });
  pingUsage('message_posted');
  res.json(messages);
});

app.listen(PORT, () => {
  console.log(`Feedback Wall running at http://localhost:${PORT}`);
});
