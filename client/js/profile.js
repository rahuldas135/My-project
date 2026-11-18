const topicNames = { html: "HTML", css: "CSS", python: "Python", java: "Java", gk: "General Knowledge" };
const historyHost = document.querySelector("#history-list");

function makeHistoryItem(attempt) {
  const item = document.createElement("article");
  item.className = "history-item";
  const main = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = topicNames[attempt.topic] || attempt.topic;
  const date = document.createElement("p");
  date.textContent = new Date(attempt.created_at).toLocaleString();
  main.append(title, date);
  const score = document.createElement("strong");
  score.className = "history-score";
  score.textContent = `${attempt.score} / ${attempt.total}`;
  const status = document.createElement("span");
  status.className = attempt.timed_out ? "history-status timed-out" : "history-status";
  status.textContent = attempt.timed_out ? "Time ended" : "Completed";
  item.append(main, score, status);
  return item;
}

async function loadProfile() {
  const message = document.querySelector("#profile-message");
  try {
    const response = await fetch("/api/profile");
    if (response.status === 401) {
      const next = encodeURIComponent("profile.html");
      window.location.replace(`login.html?next=${next}`);
      return;
    }
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not load your profile.");

    const initials = data.user.fullName.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
    document.querySelector("#profile-avatar").textContent = initials || "Q";
    document.querySelector("#profile-name").textContent = `Hello, ${data.user.fullName}`;
    document.querySelector("#profile-email").textContent = data.user.email;
    document.querySelector("#attempt-count").textContent = data.attemptCount;
    document.querySelector("#logout-button").hidden = false;
    if (data.user.role === "admin") {
      const adminLink = document.createElement("a");
      adminLink.className = "admin-link button button-light";
      adminLink.href = "admin.html";
      adminLink.textContent = "Admin dashboard";
      document.querySelector(".profile-heading").append(adminLink);
    }

    const byTopic = data.topicCounts || {};
    document.querySelector("#topic-count").textContent = Object.keys(byTopic).length;
    document.querySelector("#average-score").textContent = data.attemptCount ? `${data.averagePercentage}%` : "—";
    document.querySelector("#total-score").textContent = data.totalScore;

    const stats = document.querySelector("#topic-stats");
    Object.entries(byTopic).forEach(([topic, count]) => {
      const chip = document.createElement("span");
      chip.className = "topic-stat";
      chip.textContent = `${topicNames[topic] || topic}: ${count} ${count === 1 ? "attempt" : "attempts"}`;
      stats.append(chip);
    });
    if (!data.history.length) {
      message.textContent = "No quizzes completed yet. Choose a topic to make your first history entry.";
      const empty = document.createElement("div");
      empty.className = "history-empty";
      empty.textContent = "Your completed quiz attempts and scores will appear here.";
      historyHost.append(empty);
    } else {
      message.textContent = `Showing your ${data.history.length} most recent ${data.history.length === 1 ? "attempt" : "attempts"}.`;
      data.history.forEach((attempt) => historyHost.append(makeHistoryItem({
        topic: attempt.category,
        score: attempt.correctAnswers,
        total: attempt.totalQuestions,
        timed_out: attempt.timedOut,
        created_at: attempt.createdAt
      })));
    }
  } catch (error) {
    message.textContent = error.message.includes("Failed to fetch")
      ? "Start the QuizMaster server with npm start to access your profile."
      : error.message;
  }
}

document.querySelector("#logout-button").addEventListener("click", async () => {
  await fetch("/api/auth/logout", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
  window.location.assign("index.html");
});

loadProfile();
