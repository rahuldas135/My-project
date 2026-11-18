const signupEmail = document.querySelector("#signup-email");
const signupEmailError = document.querySelector("#signup-email-error");
const signupMessage = document.querySelector("#signup-message");

function validateSignupEmail() {
  const value = signupEmail.value.trim();
  const malformed = value.length > 0 && (signupEmail.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@.]+$/.test(value));
  const message = malformed ? "Email is invalid. Please enter a correct email address." : "";
  signupEmail.setCustomValidity(message);
  signupEmail.setAttribute("aria-invalid", String(malformed));
  signupEmailError.textContent = message;
  return !malformed;
}

function destinationAfterSignup() {
  const next = new URLSearchParams(window.location.search).get("next");
  return next && /^(quiz|profile|index)\.html(?:\?.*)?$/.test(next) ? next : "profile.html";
}

const loginLink = document.querySelector("#login-link");
const pendingDestination = new URLSearchParams(window.location.search).get("next");
if (pendingDestination && /^(quiz|profile|index)\.html(?:\?.*)?$/.test(pendingDestination)) {
  loginLink.href = `login.html?next=${encodeURIComponent(pendingDestination)}`;
}

signupEmail.addEventListener("input", validateSignupEmail);
signupEmail.addEventListener("blur", validateSignupEmail);

document.querySelector('[data-toggle="signup-password"]').addEventListener("click", (event) => {
  const button = event.currentTarget;
  const input = document.getElementById(button.dataset.toggle);
  const showPassword = input.type === "password";
  input.type = showPassword ? "text" : "password";
  button.textContent = showPassword ? "Hide" : "Show";
  button.setAttribute("aria-pressed", String(showPassword));
  button.setAttribute("aria-label", showPassword ? "Hide password" : "Show password");
});

document.querySelector("#signup-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateSignupEmail()) {
    signupEmail.focus();
    signupEmail.reportValidity();
    return;
  }
  const password = document.querySelector("#signup-password").value;
  const confirmation = document.querySelector("#signup-confirm-password").value;
  if (password !== confirmation) {
    signupMessage.textContent = "The passwords do not match. Please enter the same password in both fields.";
    document.querySelector("#signup-confirm-password").focus();
    return;
  }
  const form = event.currentTarget;
  signupMessage.textContent = "Creating your account…";
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: document.querySelector("#signup-name").value.trim(),
        email: signupEmail.value.trim(),
        phone: document.querySelector("#signup-phone").value.trim(),
        password,
        confirmPassword: confirmation
      })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not create the account.");
    window.location.assign(destinationAfterSignup());
  } catch (error) {
    signupMessage.textContent = error.message.includes("Failed to fetch")
      ? "Start the QuizMaster server with npm start, then reload this page."
      : error.message;
  }
});
