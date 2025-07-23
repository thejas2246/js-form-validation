const form = document.querySelector("form");

const emailInput = document.querySelector("#email");
const emailError = document.querySelector(".email-error");

const passwordInput = document.querySelector("#password");
const passwordError = document.querySelector(".password-error");

const confirmPassword = document.querySelector("#confirm-password");
const confirmPasswordError = document.querySelector(".confirm-password-error");

const countryInput = document.querySelector("#country");
const countryError = document.querySelector(".country-error");

const postalCode = document.querySelector("#postal-code");
const postalCodeError = document.querySelector(".postal-code-error");

emailInput.addEventListener("input", () => {
    if (emailInput.validity.valid) {
        emailError.textContent = "";
    } else {
        showEmailError();
    }
});

passwordInput.addEventListener("input", showPasswordError);
confirmPassword.addEventListener("input", showPasswordError);
countryInput.addEventListener("input", isValidCountry);
postalCode.addEventListener("input", isPostalCodeValid);
form.addEventListener("submit", checkFormValidity);

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

function checkFormValidity(e) {
    if (
        !emailInput.validity.valid ||
        !isPasswordValid() ||
        !isConfirmPasswordValid() ||
        !isValidCountry() ||
        !isValidCountry() ||
        !isPostalCodeValid()
    ) {
        e.preventDefault();
        showEmailError();
        isPasswordValid();
        isConfirmPasswordValid();
        isValidCountry();
        isPostalCodeValid();
    }
}

function isValidCountry() {
    countryError.textContent = "";
    if (countryInput.value === "country") {
        countryError.textContent = "Select a country";
        return false;
    }
    postalCodeError.textContent = "";
    return true;
}

function isPostalCodeValid() {
    let constraints = {
        country: ["(?!.*)", "Select a country"],
        ch: [
            "^(CH-)?\\d{4}$",
            "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
        ],
        fr: [
            "^(F-)?\\d{5}$",
            "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
        ],
        de: [
            "^(D-)?\\d{5}$",
            "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
        ],
        nl: [
            "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
            "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
        ],
    };
    const constraint = new RegExp(constraints[countryInput.value][0]);
    if (constraint.test(postalCode.value)) {
        postalCodeError.textContent = "";
        return true;
    } else {
        postalCodeError.textContent = constraints[countryInput.value][1];
        return false;
    }
}

function showPasswordError() {
    isPasswordValid();
    isConfirmPasswordValid();
}
