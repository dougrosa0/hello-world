async function updateAuthSection() {
    try {
        const response = await fetch('/auth-status');
        const authData = await response.json();
        const authSection = document.getElementById('auth-section');
        const userNotes = document.getElementById('user-notes');
        const dayRank = document.getElementById('day-rank');
        const saveNotes = document.getElementById('save-notes');

        if (authData.isAuthenticated) {
            authSection.innerHTML = `
                <p class="user-name">Welcome, ${authData.user.name}</p>
                <a href="/logout" class="btn">Logout</a>
            `;
            userNotes.disabled = false;
            dayRank.disabled = false;
            saveNotes.disabled = false;
        } else {
            authSection.innerHTML = `
                <a href="/login" class="btn">Login</a>
            `;
            userNotes.disabled = true;
            dayRank.disabled = true;
            saveNotes.disabled = true;
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