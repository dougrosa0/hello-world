function loginUser(event) {
  event.preventDefault();

  // Dummy user credentials (replace with your authentication logic)
  const dummyUser = {
      username: "user123",
      password: "password123"
  };

  // Get user input
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Check user credentials (replace with your authentication logic)
  if (username === dummyUser.username && password === dummyUser.password) {
      document.getElementById("loginMessage").textContent = "Login successful!";
      // Redirect to a dashboard or another page
      window.location.href = "index.html"; // Replace with the desired page URL
  } else {
      document.getElementById("loginMessage").textContent = "Invalid credentials. Please try again.";
  }
}

document.getElementById("loginForm").addEventListener("submit", loginUser);
