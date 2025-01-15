async function updateAuthSection() {
    try {
        const response = await fetch('/auth-status');
        const authData = await response.json();
        const authSection = document.getElementById('auth-section');
        const userNotes = document.getElementById('user-notes');

        if (authData.isAuthenticated) {
            authSection.innerHTML = `
                <p class="user-name">Welcome, ${authData.user.name}</p>
                <a href="/logout" class="btn">Logout</a>
            `;
            userNotes.disabled = false;  // Enable textarea when user is authenticated
        } else {
            authSection.innerHTML = `
                <a href="/login" class="btn">Login</a>
            `;
            userNotes.disabled = true;   // Disable textarea when user is not authenticated
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
    }
}

function initializePage() {
    updateAuthSection();
    updateTrendChart();
}

export { initializePage }; 