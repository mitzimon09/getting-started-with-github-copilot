document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;
    messageDiv.className = "message info";
    messageDiv.textContent = "Signing up...";
    messageDiv.classList.remove("hidden");

    fetch(`/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`, {
      method: "POST"
    })
      .then((res) => {
        if (!res.ok) return res.json().then((data) => Promise.reject(data));
        return res.json();
      })
      .then((data) => {
        messageDiv.className = "message success";
        messageDiv.textContent = data.message;
        signupForm.reset();
        setTimeout(() => window.location.reload(), 1000); // reload to update participants
      })
      .catch((err) => {
        messageDiv.className = "message error";
        messageDiv.textContent = err.detail || "An error occurred.";
      });
  });
});
