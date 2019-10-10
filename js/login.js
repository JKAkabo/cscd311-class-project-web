const credentials = {
    data: {
        idNumber: '',
        pin: '',
    },
    listener: function (data) { },
    registerListener: function (listener) { this.listener = listener; this.listener(this.data) },
    getIdNumber: function () { return this.data.idNumber },
    getPin: function () { return this.data.pin },
    setIdNumber: function (idNumber) { this.data.idNumber = idNumber; this.listener(this.data) },
    setPin: function (pin) { this.data.pin = pin; this.listener(this.data) },
}

window.onload = () => {
    let idNumberInput = document.querySelector('#id-number-input');
    let pinInput = document.querySelector('#pin-input');

    let loginBtn = document.querySelector('#login-btn');

    credentials.registerListener(loginBtnEnabler)

    idNumberInput.onchange = () => credentials.setIdNumber(idNumberInput.value);
    pinInput.onchange = () => credentials.setPin(pinInput.value);

    idNumberInput.onkeyup = () => credentials.setIdNumber(idNumberInput.value)
    pinInput.onkeyup = () => credentials.setPin(pinInput.value);

    loginBtn.onclick = (e) => {
        e.preventDefault();
        login() // .then()
    }
}

let loginBtnEnabler = (data) => {
    let loginBtn = document.querySelector('#login-btn');
    if (data.idNumber == '' || data.pin == '')
        loginBtn.disabled = true;
    else {
        loginBtn.disabled = false;
        console.log('hello')
    }
}