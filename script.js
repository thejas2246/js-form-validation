const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector(".email-error");

emailInput.addEventListener("input", () => {
    if (emailInput.validity.valid) {
        emailError.textContent = "";
    } else {
        showEmailError();
    }
});

function showEmailError() {
    if (emailInput.validity.valueMissing) {
        emailError.textContent = "Please enter a value";
    } else if (emailInput.validity.typeMismatch) {
        emailError.textContent = "Please Enter a valid email";
    }
}
