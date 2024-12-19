const apiUrl = '{{TRENDS_API_URL}}';

function displayResults(results, table, resultMsg) {
    // Clear existing table rows
    while (table.rows.length > 1) {  // Keep header row
        table.deleteRow(1);
    }
    
    for (let i = 0; i < results.length; i++) {
        const row = table.insertRow();
        const rankCell = row.insertCell(0);
        rankCell.innerHTML = results[i].dayRank;
        const queryCell = row.insertCell(1);
        queryCell.innerHTML = "<a href=\"" + encodeURI('https://google.com/search?q=' + results[i].queryText) + "\">" + results[i].queryText + "</a>";
        const trafficCell = row.insertCell(2);
        trafficCell.innerHTML = results[i].trafficAmount;
    }
    resultMsg.innerHTML = "";
}

function emailTrends() {
    var msg = 'Working...';
    document.getElementById("email-trends-result").innerHTML = msg;
    const sendEmailUrl = apiUrl + '/email';
    const data = {
        date: getFormattedDate(),
        email: document.getElementById("email-input").value
    };
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(sendEmailUrl, requestOptions)
        .then(response => {
            const success = response.status === 200;
            const closeBtn = ""
            if (success) {
                msg = 'Sent';
            }
            else {
                msg = 'Failed';
            }
            var resultMsg = document.getElementById("email-trends-result");
            resultMsg.innerHTML = msg;
            setTimeout(() => {
                resultMsg.innerHTML = '';
            }, 1000);
        });
};

function getFormattedDate() {
    const dateInput = document.getElementById("trends-date");
    if (!dateInput.value) {
        // If no date is selected, use current date as fallback
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Remove the dashes from the date picker value (which comes in YYYY-MM-DD format)
    return dateInput.value;
}

async function getTrends() {
    var msg = 'Working...';
    var resultMsg = document.getElementById("get-trends-result");
    const table = document.getElementById("google-trends");
    resultMsg.innerHTML = msg;
    var url = apiUrl + '/' + getFormattedDate();
    const requestOptions = {
        method: 'GET',
    };
    
    try {
        // First attempt to get trends
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        const results = JSON.parse(data.body);

        // Check if we have results
        if (!results || results.length === 0) {
            // No data found, so let's save trends first
            await saveTrends();
            // Wait a moment for DynamoDB to update
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Try getting trends again
            const secondResponse = await fetch(url, requestOptions);
            const secondData = await secondResponse.json();
            const secondResults = JSON.parse(secondData.body);
            displayResults(secondResults, table, resultMsg);
        } else {
            // We have data, display it
            displayResults(results, table, resultMsg);
        }
    } catch (error) {
        console.error('Error:', error);
        resultMsg.innerHTML = 'Failed';
    }
}

function initializePage() {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];  // Format: YYYY-MM-DD
    document.getElementById("trends-date").value = today;
    
    // Get trends for the default date
    getTrends();
}

function saveTrends() {
    var msg = 'Working...';
    document.getElementById("get-trends-result").innerHTML = msg;
    var url = apiUrl + '/' + getFormattedDate();
    const requestOptions = {
        method: 'PUT'
    };
    fetch(url, requestOptions)
        .then(response => {
            const success = response.status === 200;
            if (success) {
                msg = 'Success';
            }
            else {
                msg = 'Failed';
            }
            var resultMsg = document.getElementById("get-trends-result");
            resultMsg.innerHTML = msg;
            setTimeout(() => {
                resultMsg.innerHTML = '';
            }, 1000);
        });
};
