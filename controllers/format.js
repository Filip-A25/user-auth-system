const {emailRegexp, emailMaxChars, usernameRegexp, usernameMaxChars, usernameMinChars} = require("../customValues");

// Check if entered email address is properly formatted.
const checkEmailFormat = (email) => {
    if (emailRegexp.test(email)) {
        if (email.length > emailMaxChars) {
            console.log("Error: Entered e-mail address is too long.");
            return false;
        } else if (email === "") {
            console.log("Error: Entered e-mail address cannot be empty.");
        } else return true;
    } else {
        console.log("Erorr: Entered e-mail address is invalid.");
        return false;
    }
}

// Check if entered username is properly formatted.
const checkUsernameFormat = (username) => {
    if (!usernameRegexp.test(username)) {
        if (username.length < usernameMinChars) {
            console.log("Error: Entered username is too short.");
            return false;
        } else if (username.length > usernameMaxChars) {
            console.log("Error: Entered username is too long.");
            return false;
        } else if (username === "") {
            console.log("Error: Entered username cannot be empty.");
        } else return true;
    } else {
        console.log("Error: Entered username is invalid.");
        return false;
    }
}

module.exports = {checkEmailFormat, checkUsernameFormat};