const validator = require('validator');

function signinvalidation(data) {
    if (Object.keys(data).length === 0) {
        throw new Error("Request body cannot be empty");
    }
    const allowedFields = ["firstname", "lastname", "userid", "emailid", "password", "age","skills","bio","gender"];
    const isValidOperation = Object.keys(data).every((field) => {
        return allowedFields.includes(field);
    });
    if (!isValidOperation) {
        throw new Error("Invalid fields in request body");
    }
    if (data.emailid && !validator.isEmail(data.emailid)) {
        throw new Error(`${data.emailid} is not a valid email!`);
    }
    if (data.userid && !/^[a-zA-Z0-9_]+$/.test(data.userid)) {
        throw new Error(`${data.userid} is not a valid userid! Only alphanumeric characters and underscores are allowed.`);
    }
    if (data.password) {
        if (data.password.length < 6) {
            throw new Error("Password must be at least 6 characters long.");
        }
        if (data.password.toLowerCase().includes("password")) {
            throw new Error('Password should not contain the word "password".');
        }
    }
    if (data.age) {
        if (!Number.isInteger(data.age) || data.age < 18 || data.age > 100) {
            throw new Error("Age must be an integer between 18 and 100.");
        }
    }
    return true;
}
module.exports = signinvalidation;
