// app.js — front end logic for the Feedback Wall.

const form = document.getElementById('feedback-form');
const messagesEl = document.getElementById('messages');

// Renders a single message into the DOM.
//
// NOTE: this is intentionally vulnerable to DOM XSS — it builds HTML via string
// concatenation and assigns it with innerHTML, with no escaping/sanitisation.
// A message containing markup (e.g. an <img onerror=...> payload) will execute.
function renderMessage(msg) {
  const el = document.createElement('div');
  el.className = 'message';

  const nameEl = document.createElement('strong');
  nameEl.textContent = msg.name;

  el.appendChild(nameEl);
  el.appendChild(document.createTextNode(': ' + msg.text));
  messagesEl.appendChild(el);
}

function renderAll(messages) {
  messagesEl.innerHTML = '';
  messages.forEach(renderMessage);
}

async function loadMessages() {
  const res = await fetch('/api/messages');
  const messages = await res.json();
  renderAll(messages);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const text = document.getElementById('text').value;

  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, text })
  });
  const messages = await res.json();
  renderAll(messages);
  form.reset();
});

loadMessages();
