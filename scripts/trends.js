const apiUrl = 'https://ajqc8nxe7e.execute-api.us-west-2.amazonaws.com/dev';

function emailTrends() {
    var msg = 'Working...';
    document.getElementById("email-trends-result").innerHTML = msg;
    const sendEmailUrl = apiUrl + '/email-trends';
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

function getTrends() {
    var msg = 'Working...';
    var resultMsg = document.getElementById("get-trends-result");
    const table = document.getElementById("google-trends");
    resultMsg.innerHTML = msg;
    var url = apiUrl + '?date=' + getFormattedDate();
    const accessToken = sessionStorage.getItem('accessToken');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
          },
    };
    
    fetch(url, requestOptions)
        .then(response => {
            const success = response.status === 200;
            const closeBtn = ""
            if (success) {
                response.json().then(data => {
                    msg = data;
                    const results = JSON.parse(data.body);
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
                }).catch(error => {
                    console.error('Error getting response body:', error);
                })
            }
            else {
                msg = 'Failed';
                resultMsg.innerHTML = msg;
            }
        });
};

function saveTrends() {
    var msg = 'Working...';
    document.getElementById("write-trends-result").innerHTML = msg;
    const requestOptions = {
        method: 'PUT'
    };
    fetch(apiUrl, requestOptions)
        .then(response => {
            const success = response.status === 200;
            const closeBtn = ""
            if (success) {
                msg = 'Success';
            }
            else {
                msg = 'Failed';
            }
            var resultMsg = document.getElementById("write-trends-result");
            resultMsg.innerHTML = msg;
            setTimeout(() => {
                resultMsg.innerHTML = '';
            }, 1000);
        });
};

function getFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
}
