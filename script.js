const form = document.querySelector("form");

const emailInput = document.querySelector("#email");
const emailError = document.querySelector(".email-error");

const passwordInput = document.querySelector("#password");
const passwordError = document.querySelector(".password-error");

const confirmPassword = document.querySelector("#confirm-password");
const confirmPasswordError = document.querySelector(".confirm-password-error");

emailInput.addEventListener("input", () => {
    if (emailInput.validity.valid) {
        emailError.textContent = "";
    } else {
        showEmailError();
    }
});

passwordInput.addEventListener("input", isPasswordValid);
confirmPassword.addEventListener("input", isConfirmPasswordValid);

function isPasswordValid() {
    let errorMessage = getPasswordError();
    if (errorMessage.length !== 0) {
        passwordError.textContent = errorMessage.join(",");
    } else {
        passwordError.textContent = "";
        return true;
    }
    return false;
}

function getPasswordError() {
    let message = [];
    if (passwordInput.value.length !== 0 && passwordInput.value.length < 14) {
        if (!/[A-Z]/.test(passwordInput.value)) {
            message.push("one uppercase letter");
        }
        if (!/[a-z]/.test(passwordInput.value)) {
            message.push("one lowerCase letter");
        }
        if (!/[^a-zA-Z0-9]/.test(passwordInput.value)) {
            message.push("one Symbol");
        }
        if (!/[0-9]/.test(passwordInput.value)) {
            message.push("one Number");
        }
    } else if (passwordInput.value.length >= 14) {
        message.push("password should be less than 10 letter");
    } else {
        message.push("please enter a value");
    }
    return message;
}

function isConfirmPasswordValid() {
    if (passwordInput.value === confirmPassword.value) {
        confirmPasswordError.textContent = "";
        return true;
    }
    confirmPasswordError.textContent = "password doesn't match";
    return false;
}

function showEmailError() {
    if (emailInput.validity.valueMissing) {
        emailError.textContent = "Please enter a value";
    } else if (emailInput.validity.typeMismatch) {
        emailError.textContent = "Please Enter a valid email";
    }
}
