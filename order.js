document.getElementById("order-form")
.addEventListener("submit", validateForm);

function validateForm(event) {

    event.preventDefault();

    let name =
        document.getElementById("name").value.trim();

    let email =
        document.getElementById("email").value.trim();

    let orderType =
        document.getElementById("orderType").value;

    let address =
        document.getElementById("address").value.trim();

    let product =
        document.getElementById("product").value;

    let errorMessage =
        document.getElementById("errorMessage");

    errorMessage.textContent = "";

    if (name.length < 2) {
        errorMessage.textContent =
            "Please enter a valid name.";
        return;
    }

    if (!isValidName(name)) {
        errorMessage.textContent =
            "Name may only contain letters and spaces.";
        return;
    }

    if (!isValidEmail(email)) {
        errorMessage.textContent =
            "Please enter a valid email address.";
        return;
    }

    if (orderType === "") {
        errorMessage.textContent =
            "Please select Delivery or Pick-Up.";
        return;
    }

    if (orderType === "delivery") {

        if (address.length < 10) {
            errorMessage.textContent =
                "Please enter a valid delivery address.";
            return;
        }
    }

    if (product === "") {
        errorMessage.textContent =
            "Please select a product.";
        return;
    }

    // Payment Validation
    let payment =
        document.querySelector(
            'input[name="payment"]:checked'
        );

    if (payment === null) {
        errorMessage.textContent =
            "Please select a payment method.";
        return;
    }

    // Collect Add-ons
    let addons = [];

    let checkedAddons =
        document.querySelectorAll(
            'input[name="addons"]:checked'
        );

    checkedAddons.forEach(function(addon) {
        addons.push(addon.value);
    });

    let message =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Order Type: " + orderType + "\n";

    if (orderType === "delivery") {
        message +=
            "Address: " + address + "\n";
    }

    message +=
        "Product: " + product + "\n" +
        "Add-ons: ";

    if (addons.length > 0) {
        message += addons.join(", ");
    } else {
        message += "None";
    }

    message +=
        "\nPayment Method: " +
        payment.value;

        let confirmed = confirm(
        message +
        "\n\nIs your order correct?"
    );

    if (confirmed) {

        alert("Your order has been submitted!");

        document.getElementById("order-form").reset();

    } else {

        alert("Please review your order.");

    }
}


function isValidEmail(email) {

    let atPosition =
        email.indexOf("@");

    let dotPosition =
        email.lastIndexOf(".");

    if (atPosition <= 0) {
        return false;
    }

    if (dotPosition <= atPosition + 1) {
        return false;
    }

    if (dotPosition === email.length - 1) {
        return false;
    }

    return true;
}

function isValidName(name) {

    for (let i = 0; i < name.length; i++) {

        let character = name[i];

        let isUppercase =
            character >= 'A' &&
            character <= 'Z';

        let isLowercase =
            character >= 'a' &&
            character <= 'z';

        let isSpace =
            character === ' ';

        if (
            !isUppercase &&
            !isLowercase &&
            !isSpace
        ) {
            return false;
        }
    }

    return true;
}