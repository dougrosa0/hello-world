
function loginUser(event) {
  event.preventDefault();  

  // construct AWS.CognitoIdentityServiceProvider
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: 'us-west-2'
  });

  var authFlow = "USER_PASSWORD_AUTH";
  const clientId = "x"; // move to secrets manager
  const clientSecret = "y";

  // Get user input
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  // Calculate SECRET_HASH
  const message = username + clientId;
  const hmac = CryptoJS.HmacSHA256(message, clientSecret);
  const secretHash = CryptoJS.enc.Base64.stringify(hmac);

  var initiateAuthParams = {
    AuthFlow: authFlow, 
    AuthParameters: {
     "PASSWORD": password,
     "SECRET_HASH": secretHash,
     "USERNAME": username
    }, 
    ClientId: clientId
   };

   cognitoidentityserviceprovider.initiateAuth(initiateAuthParams, function(err, data) {
    if (err) {
        document.getElementById("loginMessage").textContent = err.message;
    } 
    else {
        sessionStorage.setItem('accessToken', data.AuthenticationResult.IdToken); // todo - switch to access token
        document.getElementById("loginMessage").textContent = "Login successful!";
        window.location.href = "index.html";
    }
  });
}

document.getElementById("loginForm").addEventListener("submit", loginUser);
