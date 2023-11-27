window.onload = function () {
    google.accounts.id.initialize({
        client_id: "879873924784-cfi7nis3k852gh17i3ma51ni6ge60ogf.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("g_signin_button"),
        { 
            theme: "outline",
            size: "large",
            type: "standard",
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "center"
        }  // customization attributes
    );
    //google.accounts.id.prompt(); // also display the One Tap dialog
}

function decodeJwtResponse(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
    return JSON.parse(jsonPayload);
}

// function init() {
//     gapi.load('auth2', function() {
//         gapi.auth2.init();
//       });
// }

// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         alert("you have been signedout successfully");
//         console.log('User signed out.');
//         $(".g_id_signin").css("display", "block");
//         $(".data").css("display", "none");
//     });
// }

function handleCredentialResponse(response) {

    console.log("jwtresponse :" + JSON.stringify(response));
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.

    const responsePayload = decodeJwtResponse(response.credential);

    console.log("responsePayload : " + JSON.stringify(responsePayload));


    console.log('Full Name: ' + responsePayload.name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);


    $("#name").text(responsePayload.name);
    $("#email").text(responsePayload.email);
    $("#image").attr('src', responsePayload.picture);
    $(".data").css("display", "block");
    $("#g_signin_button").css("display", "none");
}


