const cardholder = document.getElementById("cardholder-name");
const cardNumber = document.getElementById("card-number");
const expiry = Array.from(document.querySelectorAll(".expiry"));
const cvc = document.getElementById("cvc");
const submit = document.getElementById("submit");
const nameOnCard = document.querySelector(".cardholder-display");
const numOnCard = document.querySelector(".card-number-display");
const expMM = document.querySelector(".expiry-month-display");
const expYY = document.querySelector(".expiry-year-display");
const cvcDisplay = document.querySelector(".cvc-display");

// console.log(expMM);

function inputName() {
  nameOnCard.innerHTML = cardholder.value;
  if (nameOnCard.innerHTML == "") {
    nameOnCard.innerHTML = cardholder.placeholder;
  }
}
function inputCardNum() {
  let cardNumberInput = cardNumber.value;
  // Do not allow users to write invalid characters
  let formattedCardNumber = cardNumberInput.replace(/[^\d]/g, "");
  formattedCardNumber = formattedCardNumber.substring(0, 16);
  // Split the card number is groups of 4
  let cardNumberSections = formattedCardNumber.match(/\d{1,4}/g);
  if (cardNumberSections !== null) {
    formattedCardNumber = cardNumberSections.join(" ");
  }
  // If the formmattedCardNumber is different to what is shown, change the value
  if (cardNumberInput !== formattedCardNumber) {
    cardNumber.value = formattedCardNumber;
  }
  numOnCard.innerHTML = cardNumber.value;
  if (cardNumber.value === "") {
    numOnCard.innerHTML = cardNumber.placeholder;
  }
}
function inputMM() {
  let formattedMM = expiry[0].value;
  formattedMM = formattedMM.substring(0, 2);
  expiry[0].value = formattedMM;
  if (expiry[0].value === "") {
    expMM.innerHTML = "00";
  } else {
    expMM.innerHTML = expiry[0].value;
  }
}
function inputYY() {
  let formattedYY = expiry[1].value;
  formattedYY = formattedYY.substring(0, 4);
  expiry[1].value = formattedYY;
  if (expiry[1].value === "") {
    expYY.innerHTML = "0000";
  } else {
    expYY.innerHTML = expiry[1].value;
  }
}
function inputCvc() {
  let formattedCvc = cvc.value;

  formattedCvc = formattedCvc.substring(0, 3);
  cvc.value = formattedCvc;
  if (cvc.value === "") {
    cvcDisplay.innerHTML = "000";
  } else {
    cvcDisplay.innerHTML = cvc.value;
  }
}

function massValidate() {
  function validateName() {
    let cardholderExp = /^[A-Z a-z]+$/;
    let errorMsg = document.getElementById("errorMsg");
    if (cardholder.value.match(cardholderExp)) {
      errorMsg.textContent = "";
    } else {
      errorMsg.innerHTML = "Please enter cardholder name!";
    }
  }
  function validateCard() {
    let cardNumError = document.getElementById("card-num-error");
    if (cardNumber.value.length > 0 && cardNumber.value.length < 16) {
      cardNumError.innerHTML = "Wrong format!";
    } else if (cardNumber.value == "") {
      cardNumError.innerHTML = "Can't be blank!";
    } else {
      cardNumError.innerHTML = "";
    }
  }
  function validateExpiry() {
    let expMonth = /^[0-9]{2}$/;
    let expYear = /^[0-9]{4}$/;
    let expiryErrorMsg = document.getElementById("expiry-error");
    if (expiry[0].value.match(expMonth) && expiry[1].value.match(expYear)) {
      expiryErrorMsg.innerHTML = "";
    } else {
      expiryErrorMsg.innerHTML = "Can't be blank!";
    }
  }
  function validateCvc() {
    let cvcErrorMsg = document.getElementById("error-cvc");
    let cvcExp = /^[0-9]{3}$/;
    if (cvc.value === "") {
      cvcErrorMsg.innerHTML = "Can't be blank";
    } else if (cvc.value.match(cvcExp)) {
      cvcErrorMsg.innerHTML = "";
    } else {
      cvcErrorMsg.innerHTML = "Wrong format!";
    }
  }
  validateName();
  validateCard();
  validateExpiry();
  validateCvc();

  if (
    nameOnCard.innerHTML == cardholder.placeholder ||
    numOnCard.innerHTML == cardNumber.placeholder ||
    expMM.innerHTML == "00" ||
    expYY.innerHTML == "0000" ||
    cvcDisplay.innerHTML == "000"
  ) {
    return false;
  } else {
    return true;
  }
}

// Submit Button

submit.addEventListener("click", function () {
  massValidate();
  if (massValidate() == false) {
    event.preventDefault();
  }
});
