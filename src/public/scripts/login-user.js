
function loginUser(event) {
  event.preventDefault();  

  // construct AWS.CognitoIdentityServiceProvider
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: 'us-west-2'
  });

  var authFlow = "USER_PASSWORD_AUTH";
  const clientId = "3l2bfr2fosvu6cgc4t6uauqi7f"; // move to secrets manager
  const clientSecret = "7nhe6r1n2jbfrtcb8ig7en8nfooo5d629md860miirlm4f0rr07";

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
        sessionStorage.setItem('idToken', data.AuthenticationResult.IdToken); // todo - switch to access token
        sessionStorage.setItem('accessToken', data.AuthenticationResult.AccessToken); // todo - switch to access token
        document.getElementById("loginMessage").textContent = "Login successful!";
        window.location.href = "index.html";
    }
  });
}

document.getElementById("loginForm").addEventListener("submit", loginUser);
