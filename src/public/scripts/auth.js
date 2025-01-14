const express = require('express');
const router = express.Router();

async function updateAuthSection() {
    try {
        const response = await fetch('/auth-status');
        const authData = await response.json();
        const authSection = document.getElementById('auth-section');

        if (authData.isAuthenticated) {
            authSection.innerHTML = `
                <p class="user-name">Welcome, ${authData.user.name}</p>
                <a href="/logout" class="btn">Logout</a>
            `;
        } else {
            authSection.innerHTML = `
                <a href="/login" class="btn">Login</a>
            `;
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
    }
}

router.get('/auth-status', (req, res) => {
  res.json({
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user
  });
});

module.exports = router;

// Add this to your existing initializePage function
function initializePage() {
    updateAuthSection();
    // ... any other initialization code ...
} 