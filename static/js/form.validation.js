fNameValid = false;
lNameValid = false;
phoneValid = false;
addressValid = false;
cityValid = false;
postalValid = false;
makeValid = false;
modelValid = false;

function validateNames() {
    var nameRegex = /^([a-zA-Z\s\-])*$/;
    fName = document.getElementById("first_name");
    lName = document.getElementById("last_name");

    fName.addEventListener("input", (e) => {
        if (nameRegex.test(fName.value)) {
            fName.classList.add("is-valid");
            fName.classList.remove("is-invalid");

            fNameValid = true;
        } else {
            fName.classList.add("is-invalid");
            fName.classList.remove("is-valid");

            fNameValid = false;
        }
    });

    lName.addEventListener("input", (e) => {
        if (nameRegex.test(lName.value)) {
            lName.classList.add("is-valid");
            lName.classList.remove("is-invalid");

            lNameValid = true;
        } else {
            lName.classList.add("is-invalid");
            lName.classList.remove("is-valid");

            lNameValid = false;
        }
    });
}
function validateEmail() {
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    email.addEventListener("input", (e) => {
        if (emailRegex.test(email.value)) {
            email.value = email.value.trim();
            email.classList.add("is-valid");
            email.classList.remove("is-invalid");
        } else {
            email.classList.add("is-invalid");
            email.classList.remove("is-valid");
        }
    });
}
function validateAddress() {
    addr = document.getElementById("places-autocomplete");
    city = document.getElementById("city");
    postal = document.getElementById("postal-code");

    addr.addEventListener("input", (e) => {
        if (/^(\s*)$/.test(addr.value)) {
            addr.classList.add("is-invalid");
            addr.classList.remove("is-valid");

            addressValid = false;
        } else {
            addr.classList.add("is-valid");
            addr.classList.remove("is-invalid");

            addressValid = true;
        }
    });

    city.addEventListener("input", (e) => {
        if (/^(\s*)$/.test(city.value)) {
            city.classList.add("is-invalid");
            city.classList.remove("is-valid");

            cityValid = false;
        } else {
            city.classList.add("is-valid");
            city.classList.remove("is-invalid");

            cityValid = true;
        }
    });

    postal.addEventListener("input", (e) => {
        if (/^([A-Za-z]{1}[0-9]{1}[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}[0-9]{1})$/.test(postal.value)) {
            postal.classList.add("is-valid");
            postal.classList.remove("is-invalid");

            postalValid = true;
        } else {
            postal.classList.add("is-invalid");
            postal.classList.remove("is-valid");

            postalValid = false;
        }
    });
}
function validatePhone() {
    phone.addEventListener("input", (e) => {
        if (/^(\([0-9]{3}\)\s{1}[0-9]{3}\-[0-9]{4})$/.test(phone.value)) {
            phone.classList.add("is-valid");
            phone.classList.remove("is-invalid");

            phoneValid = true;
        } else {
            phone.classList.add("is-invalid");
            phone.classList.remove("is-valid");

            phoneValid = false;
        }
    });
}
function validateMakeAndModel() {
    make.addEventListener("input", (e) => {
        if (/^(\s*)$/.test(make.value)) {
            make.classList.add("is-invalid");
            make.classList.remove("is-valid");

            makeValid = false;
        } else {
            make.classList.add("is-valid");
            make.classList.remove("is-invalid");

            makeValid = true;
        }
    });

    model.addEventListener("input", (e) => {
        if (/^(\s*)$/.test(model.value)) {
            model.classList.add("is-invalid");
            model.classList.remove("is-valid");

            modelValid = false;
        } else {
            model.classList.add("is-valid");
            model.classList.remove("is-invalid");

            modelValid = true;
        }
    });
}

function formatPhoneNumber(value) {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;

    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, '');

    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;

    // we need to return the value with no formatting if its less than four digits
    // this is to avoid weird behavior that occurs if you  format the area code too early
    if (phoneNumberLength < 4) return phoneNumber;

    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
    )}-${phoneNumber.slice(6, 10)}`;
}

function phoneNumberFormatter() {
    const inputField = document.getElementById('phone');
    const formattedInputValue = formatPhoneNumber(inputField.value);
    inputField.value = formattedInputValue;
}

function postalCodeFormatter() {
    $('#postal-code').val($('#postal-code').val().replace(/[^\w]/g, ''));
}

function resetValidations() {
    fName = document.getElementById("first_name");
    lName = document.getElementById("last_name");
    email = document.getElementById("email");
    addr = document.getElementById("places-autocomplete");
    city = document.getElementById("city");
    postal = document.getElementById("postal-code");
    phone = document.getElementById("phone");
    make = document.getElementById("make");
    model = document.getElementById("model");

    fName.classList.remove("is-valid");
    fName.classList.remove("is-invalid");

    lName.classList.remove("is-valid");
    lName.classList.remove("is-invalid");

    email.classList.remove("is-valid");
    email.classList.remove("is-invalid");

    addr.classList.remove("is-valid");
    addr.classList.remove("is-invalid");
    
    make.classList.remove("is-valid");
    make.classList.remove("is-invalid");
    
    model.classList.remove("is-valid");
    model.classList.remove("is-invalid");

    phone.classList.remove("is-valid");
    phone.classList.remove("is-invalid");

    make.classList.remove("is-valid");
    make.classList.remove("is-invalid");

    model.classList.remove("is-valid");
    model.classList.remove("is-invalid");
}

validateNames();
validateEmail();
validateAddress();
validatePhone();
validateMakeAndModel();

const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
        e.stopPropagation();
        return false;
    }
    else if(fNameValid && lNameValid && phoneValid && addressValid && cityValid && postalValid && makeValid && modelValid) {
        $.ajax({
            type: 'POST',
            url: '/',
            data:
            {
                first_name: $("#first_name").val(),
                last_name: $("#last_name").val(),
                email: $("#email").val(),
                phone: $("#phone").val(),
                address: $("#places-autocomplete").val(),
                city: $("#city").val(),
                postal: $("#postal-code").val(),
                make: $("#make").val(),
                model: $("#model").val(),
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function () {
                let anim = document.getElementById('checkmark-animation');
                anim.removeAttribute('hidden');

                setTimeout(() => {
                    form.reset();

                    anim.setAttribute('hidden', 'hidden');
                    document.getElementById('hidden-address').setAttribute("hidden", "hidden");
                    resetValidations();
                }, 2000);
            }
        });
    } 
    // else {
    //     alert("Invalid form fields!");
    // }
});