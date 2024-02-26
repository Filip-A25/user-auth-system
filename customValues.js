// Regular expression for validating entered email address.
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// Max number of characters allowed for entered email address.
const emailMaxChars = 255;

// Regular expression for validating entered username.
const usernameRegexp = /[ `!#@$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
// Max number of characters allowed for entered username.
const usernameMaxChars = 16;
// Min number of characters allowed for entered username.
const usernameMinChars = 3;

module.exports = {emailRegexp, emailMaxChars, usernameRegexp, usernameMaxChars, usernameMinChars};