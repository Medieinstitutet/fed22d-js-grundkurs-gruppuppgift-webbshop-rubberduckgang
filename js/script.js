/**
 *  Kund / Varukorgs funktioner, lägga till och ta bort varor.
 *
 *  1. Lägga till varor i varukorgen
 *  2. Ta bort varor från varukorgen
 *  3. Uppdatera totalpriset
 *  4. Kassa knapp???
 */

updateTotalPrice();

// Ta bort vara ur kundkorgen.

const removeProductBtn = document.getElementsByClassName("btn-danger"); // Variabel för att komma åt varje knapp med klassen "btn-danger" (Rensa)
for (let i = 0; i < removeProductBtn.length; i++) {
  let removeBtn = removeProductBtn[i];
  removeBtn.addEventListener("click", function (e) {
    let removeBtnClicked = e.target;
    removeBtnClicked.parentElement.parentElement.remove();
    updateTotalPrice();
  });
}

const quantityInput = document.getElementsByClassName("cart__product--amount");
for (let i = 0; i < quantityInput.length; i++) {
  const input = quantityInput[i];
  input.addEventListener("change", quantityInputChanged);
}

function quantityInputChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  updateTotalPrice();
}

//Uppdatera totalpriset när en vara tas bort.

function updateTotalPrice() {
  const checkoutCart = document.getElementsByClassName("checkout__cart")[0];
  const cartRows = checkoutCart.getElementsByClassName("checkout__cart--row");
  let total = 0;

  for (let i = 0; i < cartRows.length; i++) {
    const row = cartRows[i];
    const productPrice = row.getElementsByClassName("cart__product--price")[0];
    const productQuantity = row.getElementsByClassName("cart__product--amount")[0];

    const price = Number(productPrice.innerText);
    const quantity = productQuantity.value;

    total = total + price * quantity;
    // console.log(price);
  }

  document.getElementById("cart__total__price").innerText = total + ":-";
}

/* This is the code for the form, by Hanna*/

/* Toggle between card & invoice*/

const paymentCardInput = document.querySelector('#paymentCard');
const paymentCardBox = document.querySelector('.hiddenPaymentCard');

const paymentInvoiceInput = document.querySelector('#paymentInvoice');
const paymentInvoiceBox = document.querySelector('.hiddenPaymentInvoice');

paymentCardInput.addEventListener('click', switchPayment);
paymentInvoiceInput.addEventListener('click', switchPayment);

function switchPayment(e) {
  if (e.target.id == 'paymentCard') {
    paymentInvoiceBox.classList.remove('showPaymentInvoice');
    paymentInvoiceBox.classList.add("hiddenPaymentInvoice");

    paymentCardBox.classList.remove("hiddenPaymentCard");
    paymentCardBox.classList.add("showPaymentCard");
  } else {
    paymentCardBox.classList.remove("showPaymentCard");
    paymentCardBox.classList.add("hiddenPaymentCard");

    paymentInvoiceBox.classList.remove("hiddenPaymentInvoice");
    paymentInvoiceBox.classList.add("showPaymentInvoice");
  }
}

/**
 * [x] Make the button disabled from start
 * [x] Go through all inputs and check if someone is empty
 * [] Also check if they are filled out correctly (zipCode & phoneNumber done)
 * [x] Personuppgifter checkbox needs to be checked (maybe use change if input doesnt work)
 * [x] More boxes for errormessage
 * [x] Either card or invoice needs to be chosen
 * [x] If invoice is chosen, validate socialSecurityNumber
 * [] If everything is correct, able orderBtn
 * 
 * [] When ordered, display message about delivery & order
 * [] Also grey out & lock form
*/

/* Validates the form */

const orderBtn = document.querySelector('#orderButton');
orderBtn.disabled = true;

const validatedTexts = document.querySelectorAll('.validatedText');
const validatedCheckboxes = document.querySelectorAll('.validatedCheckbox');
const paymentCardRadio = document.querySelector('#paymentCard');
const paymentInvoiceRadio = document.querySelector('#paymentInvoice');
const socialSecurityNumber = document.querySelector('#socialSecurityNumber');

const formInputs = document.querySelectorAll('.lock')

for (text of validatedTexts) {
    text.addEventListener('input', validate);
}

for (box of validatedCheckboxes) {
  box.addEventListener('change', validate);
}

paymentCardRadio.addEventListener('change', validate);
paymentInvoiceRadio.addEventListener('change', validate);

function validate() {
  let shouldEnable = true;

  for(text of validatedTexts) {
    if (text.value == '' && window.getComputedStyle(text.parentElement.parentElement, null).display !== 'none') {
      shouldEnable = false;
    }
  }

  for(box of validatedCheckboxes) {
    if (!box.checked) {
      shouldEnable = false;
    }
  }

  if (!paymentCardRadio.checked && !paymentInvoiceRadio.checked) {
    shouldEnable = false;
  }
    
  orderBtn.disabled = !shouldEnable;
}

const checkoutForm = document.querySelector('.checkoutForm');
checkoutForm.addEventListener('submit', order);

function order(e) {
    e.preventDefault();

    const zipCode = document.querySelector('#zipCode').value;
    const zipCodeSpan = document.querySelector('#zipCodeSpan');
    const phoneNumber = document.querySelector('#phoneNumber').value;
    const phoneNumberSpan = document.querySelector('#phoneNumberSpan');

    const orderMessage = document.querySelector('#orderMessage');

    orderMessage.innerHTML = '';
    zipCodeSpan.innerHTML = 'Postnummer';
    zipCodeSpan.classList.remove('errorMessage');
    phoneNumberSpan.innerHTML = 'Telefonnummer';
    phoneNumberSpan.classList.remove('errorMessage');

    let hasErrors = false;
    let errors = [];

    if (zipCode < 10000 || zipCode > 99999) {
        zipCodeSpan.innerHTML = 'Postnummer *';
        zipCodeSpan.classList.add('errorMessage');

        hasErrors = true;
        errors.push('Fyll i ett giltligt postnummer!');
    }

    if (phoneNumber.length != 10) {
        phoneNumberSpan.innerHTML = 'Telefonnummer *';
        phoneNumberSpan.classList.add('errorMessage');

        hasErrors = true;
        errors.push('Fyll i ett giltligt telefonnummer!');
    }

    if (hasErrors) {
      for(i = 0; i < errors.length; i++) {
        if (i > 0) {
          orderMessage.innerHTML += '<br>';
        }
        orderMessage.innerHTML += errors[i];
      }
    }

    if (!hasErrors) {
      const firstName = document.querySelector('#firstName');
      alert('Tack för din beställning ' + firstName.value + '!' + ' Leverans sker om 30 min.');

      for(i = 0; i < formInputs.length; i++) {
        console.log(formInputs[i]);
        formInputs[i].disabled = true;
      }
    }

}

/* The end of the code for form */
