const notesApiUrl = '{{NOTES_API_URL}}';

async function saveNote() {
    try {
        const noteText = document.getElementById('user-notes').value;
        const dayRank = document.getElementById('day-rank').value;
        
        const userData = await fetch('/auth-status');
        const authData = await userData.json();
        if (!authData.isAuthenticated) {
            displayMessage('Error: User not authenticated', 'error');
            return;
        }

        // Validate inputs
        if (!noteText || noteText.trim() === '') {
            displayMessage('Error: Note text cannot be empty', 'error');
            return;
        }

        if (!dayRank || isNaN(dayRank) || dayRank < 1 || dayRank > 5) {
            displayMessage('Error: Day rank must be a number between 1 and 10', 'error');
            return;
        }

        // Prepare the request
        const response = await fetch(`${notesApiUrl}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: new Date().toISOString(),
                userId: authData.userId,
                notes: noteText.trim(),
                dayRank: parseInt(dayRank)
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        displayMessage('Note saved successfully!', 'success');
        return result;

    } catch (error) {
        console.error('Error saving note:', error);
        displayMessage('Failed to save note. Please try again.', 'error');
        return null;
    }
}

async function getNoteForDate(date) {
    try {
        const userData = await fetch('/auth-status');
        const authData = await userData.json();
        if (!authData.isAuthenticated) {
            displayMessage('Error: User not authenticated', 'error');
            return;
        }

        const response = await fetch(`${notesApiUrl}/notes/${authData.userId}/${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const note = await response.json();
        if (note) {
            // Update the form fields with the retrieved data
            document.getElementById('note-input').value = note.notes || '';
            document.getElementById('day-rank').value = note.dayRank || '';
        } else {
            // Clear the form fields if no note exists
            document.getElementById('note-input').value = '';
            document.getElementById('day-rank').value = '';
        }

        return note;
    } catch (error) {
        console.error('Error fetching note:', error);
        displayMessage('Failed to fetch note. Please try again.', 'error');
        return null;
    }
}

function displayMessage(message, type) {
    const messageDiv = document.getElementById('message-display') || createMessageDisplay();
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    
    // Clear message after 3 seconds
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }, 3000);
}

function createMessageDisplay() {
    const messageDiv = document.createElement('div');
    messageDiv.id = 'message-display';
    messageDiv.className = 'message';
    document.body.appendChild(messageDiv);
    return messageDiv;
}