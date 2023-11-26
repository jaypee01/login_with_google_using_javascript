// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     $("#name").text(profile.getName());
//     $("#email").text(profile.getEmail());
//     $("#image").attr('src', profile.getImageUrl());
//     $(".data").css("display", "block");
//     $(".g-signin2").css("display", "none");
// }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("you have been signedout successfully");
        console.log('User signed out.');
        $(".g-signin2").css("display", "block");
        $(".data").css("display", "none");
    });
}

function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.


    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);

    const responsePayload = decodeJwtResponse(response.credential);
    $("#name").text(responsePayload.name);
    $("#email").text(responsePayload.email);
    $("#image").attr('src', responsePayload.picture);
    $(".data").css("display", "block");
    $(".g_id_signin").css("display", "none");
 }