const categories = { html: "HTML", css: "CSS", python: "Python", java: "Java", gk: "General Knowledge" };
const dateLabel = (value) => value ? new Date(value).toLocaleString() : "—";

function cell(row, value) {
  const td = document.createElement("td");
  td.textContent = value;
  row.append(td);
}

async function loadAdminDashboard() {
  const message = document.querySelector("#admin-message");
  try {
    const response = await fetch("/api/admin/summary");
    const data = await response.json();
    if (response.status === 401) {
      window.location.replace("login.html?next=admin.html");
      return;
    }
    if (response.status === 403) {
      message.textContent = "This dashboard is restricted to the configured administrator account.";
      return;
    }
    if (!response.ok) throw new Error(data.error || "Could not load the admin dashboard.");
    document.querySelector("#admin-user-count").textContent = data.registeredUsers;
    document.querySelector("#admin-quiz-count").textContent = data.totalQuizzes;
    const users = document.querySelector("#admin-users");
    data.users.forEach((user) => {
      const row = document.createElement("tr");
      cell(row, user.fullName);
      cell(row, user.email);
      cell(row, user.role);
      cell(row, dateLabel(user.createdAt));
      cell(row, String(user.quizAttempts));
      cell(row, dateLabel(user.lastQuizAt));
      users.append(row);
    });
    const activity = document.querySelector("#admin-activity");
    data.activity.forEach((result) => {
      const item = document.createElement("article");
      item.className = "history-item";
      const details = document.createElement("div");
      const heading = document.createElement("h3");
      heading.textContent = `${result.fullName} · ${categories[result.category] || result.category}`;
      const subline = document.createElement("p");
      subline.textContent = `${result.email} · ${dateLabel(result.createdAt)}`;
      details.append(heading, subline);
      const score = document.createElement("strong");
      score.className = "history-score";
      score.textContent = `${result.correctAnswers}/${result.totalQuestions} (${result.score}%)`;
      const state = document.createElement("span");
      state.className = result.timedOut ? "history-status timed-out" : "history-status";
      state.textContent = result.timedOut ? "Timed out" : "Completed";
      item.append(details, score, state);
      activity.append(item);
    });
    message.textContent = `Loaded ${data.registeredUsers} users and ${data.totalQuizzes} quiz attempts.`;
  } catch (error) {
    message.textContent = error.message.includes("Failed to fetch")
      ? "Could not reach the QuizMaster server. Check the server and MongoDB connection."
      : error.message;
  }
}

document.querySelector("#admin-logout").addEventListener("click", async () => {
  await fetch("/api/auth/logout", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
  window.location.assign("index.html");
});

loadAdminDashboard();
