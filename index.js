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
    google.accounts.id.prompt(); // also display the One Tap dialog
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

function handleCredentialResponse(response) {

    console.log("full responsePayload : " + JSON.stringify(decodeJwtResponse(response)));
    const responsePayload = decodeJwtResponse(response.credential);

    console.log("responsePayload credential: " + JSON.stringify(responsePayload));

    $("#name").text(responsePayload.name);
    $("#email").text(responsePayload.email);
    $("#image").attr('src', responsePayload.picture);
    $(".data").css("display", "block");
    $("#g_signin_button").css("display", "none");
}


