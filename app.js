const loginScreen = document.getElementById("loginScreen");
const appScreen = document.getElementById("appScreen");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");
const channelTitle = document.getElementById("channelTitle");
const channelSubtitle = document.getElementById("channelSubtitle");
const workspaceName = document.getElementById("workspaceName");
const currentUser = document.getElementById("currentUser");

let userName = "";
let currentChannel = "general";

const channelData = {
  general: { title: "# general", subtitle: "Main discussion channel" },
  announcements: { title: "# announcements", subtitle: "Official updates and news" },
  projects: { title: "# projects", subtitle: "Project planning and teamwork" },
  product: { title: "Product Team", subtitle: "Google Spaces-style shared space" },
  engineering: { title: "Engineering", subtitle: "Dev chat and technical discussion" }
};

const demoMessages = {
  general: [
    { user: "Alice", text: "Hey everyone, welcome to ChatFlow!", time: "10:01 AM" },
    { user: "Bob", text: "This layout feels like Discord + Google Chat together.", time: "10:02 AM" }
  ],
  announcements: [
    { user: "Muhammad", text: "Welcome to the workspace. This is the announcements channel.", time: "10:00 AM" }
  ],
  projects: [
    { user: "Alice", text: "Let's keep project updates here.", time: "9:45 AM" }
  ],
  product: [
    { user: "Muhammad", text: "This space is for product discussion and notes.", time: "9:30 AM" }
  ],
  engineering: [
    { user: "Bob", text: "Engineering space is ready for technical chat.", time: "9:15 AM" }
  ]
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = usernameInput.value.trim();
  const pass = passwordInput.value.trim();

  if (!name || !pass) {
    alert("Please enter username and password.");
    return;
  }

  userName = name;
  currentUser.textContent = userName;
  loginScreen.classList.add("hidden");
  appScreen.classList.remove("hidden");
  loadChannel("general");
});

function loadChannel(channel) {
  currentChannel = channel;
  const data = channelData[channel] || { title: channel, subtitle: "" };
  channelTitle.textContent = data.title;
  channelSubtitle.textContent = data.subtitle;
  messageInput.placeholder = `Message ${data.title}`;
  messages.innerHTML = "";

  const list = demoMessages[channel] || [];
  list.forEach(renderMessage);

  if (list.length === 0) {
    const empty = document.createElement("div");
    empty.className = "welcome";
    empty.innerHTML = `<h1>${data.title}</h1><p>${data.subtitle}</p>`;
    messages.appendChild(empty);
  }
}

function renderMessage(msg) {
  const row = document.createElement("div");
  row.className = "message-row";
  row.innerHTML = `
    <div class="avatar" style="width:38px;height:38px;font-size:16px;">${msg.user[0].toUpperCase()}</div>
    <div class="message-bubble">
      <div class="message-top">
        <strong>${msg.user}</strong>
        <span class="message-time">${msg.time}</span>
      </div>
      <div>${escapeHTML(msg.text)}</div>
    </div>
  `;
  messages.appendChild(row);
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  renderMessage({ user: userName, text, time });
  messageInput.value = "";
  messages.scrollTop = messages.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

document.querySelectorAll(".channel").forEach((el) => {
  el.addEventListener("click", () => {
    document.querySelectorAll(".channel").forEach((c) => c.classList.remove("active"));
    el.classList.add("active");
    loadChannel(el.dataset.channel);
  });
});

document.querySelectorAll(".server").forEach((el) => {
  if (el.dataset.server) {
    el.addEventListener("click", () => {
      document.querySelectorAll(".server").forEach((s) => s.classList.remove("active"));
      el.classList.add("active");
      if (el.dataset.server === "home") workspaceName.textContent = "Team Workspace";
      if (el.dataset.server === "team") workspaceName.textContent = "Team Workspace";
      if (el.dataset.server === "dev") workspaceName.textContent = "Game Dev";
    });
  }
});

document.getElementById("attachBtn").addEventListener("click", () => alert("File upload demo button."));
document.getElementById("emojiBtn").addEventListener("click", () => alert("Emoji picker demo button."));

function escapeHTML(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}