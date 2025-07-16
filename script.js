const form = document.querySelector("form");

const emailInput = document.querySelector("#email");
const emailError = document.querySelector(".email-error");

const passwordInput = document.querySelector("#password");
const passwordError = document.querySelector(".password-error");

emailInput.addEventListener("input", () => {
    if (emailInput.validity.valid) {
        emailError.textContent = "";
    } else {
        showEmailError();
    }
});

passwordInput.addEventListener("input", isPasswordValid);

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
    if (passwordInput.value.length !== 0) {
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
    } else {
        message.push("please enter a value");
    }
    return message;
}

function showEmailError() {
    if (emailInput.validity.valueMissing) {
        emailError.textContent = "Please enter a value";
    } else if (emailInput.validity.typeMismatch) {
        emailError.textContent = "Please Enter a valid email";
    }
}
