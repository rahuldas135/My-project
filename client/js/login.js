const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector("#password-toggle");
const loginMessage = document.querySelector("#login-message");
const emailInput = document.querySelector("#login-email");
const emailError = document.querySelector("#login-email-error");

function validateEmail() {
  const value = emailInput.value.trim();
  const malformed = value.length > 0 && (emailInput.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@.]+$/.test(value));
  const message = malformed ? "Email is invalid. Please enter a correct email address." : "";
  emailInput.setCustomValidity(message);
  emailInput.setAttribute("aria-invalid", String(malformed));
  emailError.textContent = message;
  return !malformed;
}

function destinationAfterLogin() {
  const next = new URLSearchParams(window.location.search).get("next");
  return next && /^(quiz|profile|index)\.html(?:\?.*)?$/.test(next) ? next : "profile.html";
}

const signupLink = document.querySelector("#signup-link");
const pendingDestination = new URLSearchParams(window.location.search).get("next");
if (pendingDestination && /^(quiz|profile|index)\.html(?:\?.*)?$/.test(pendingDestination)) {
  signupLink.href = `signup.html?next=${encodeURIComponent(pendingDestination)}`;
}

emailInput.addEventListener("input", validateEmail);
emailInput.addEventListener("blur", validateEmail);

passwordToggle.addEventListener("click", () => {
  const showPassword = passwordInput.type === "password";
  passwordInput.type = showPassword ? "text" : "password";
  passwordToggle.setAttribute("aria-pressed", String(showPassword));
  passwordToggle.setAttribute("aria-label", showPassword ? "Hide password" : "Show password");
  passwordToggle.textContent = showPassword ? "Hide" : "Show";
});

document.querySelector("#login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateEmail()) {
    emailInput.focus();
    emailInput.reportValidity();
    return;
  }
  loginMessage.textContent = "Signing in…";
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailInput.value.trim(), password: passwordInput.value })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not sign in.");
    window.location.assign(destinationAfterLogin());
  } catch (error) {
    loginMessage.textContent = error.message.includes("Failed to fetch")
      ? "Start the QuizMaster server with npm start, then reload this page."
      : error.message;
  }
});

document.querySelector("#forgot-password").addEventListener("click", () => {
  loginMessage.textContent = "Password reset needs an email service and is not enabled in this local project.";
});
