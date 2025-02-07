import { getTrends } from './trends.js';
import { getNoteForDate } from './notes.js';

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
            userNotes.placeholder = 'login to add your personal notes here...';
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

function updateTrendChart() {
    const now = new Date();
    // Format local date for display (YYYY-MM-DD)
    const localDate = now.toLocaleDateString('en-CA'); // en-CA gives YYYY-MM-DD format
    
    // Set the input value to local date
    document.getElementById("trends-date").value = localDate;
    
    // Format ISO date for API call (YYYY-MM-DD with timezone consideration)
    const isoDate = now.toISOString().split('T')[0];
    
    getTrends();
    getNoteForDate(isoDate);
}

export { initializePage }; 