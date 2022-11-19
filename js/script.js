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

const removeProductBtn = document.getElementsByClassName('btn-danger'); // Variabel för att komma åt varje knapp med klassen "btn-danger" (Rensa)
for (let i = 0; i < removeProductBtn.length; i++) {
    let removeBtn = removeProductBtn[i];
    removeBtn.addEventListener('click', function(e) {
        let removeBtnClicked = e.target
        removeBtnClicked.parentElement.parentElement.remove();
        updateTotalPrice();
    })

}

const quantityInput = document.getElementsByClassName('cart__product--amount');
    for (let i = 0; i < quantityInput.length; i++) {
        const input = quantityInput[i];
        input.addEventListener('change', quantityInputChanged); 
}


function quantityInputChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    
    updateTotalPrice()
}


//Uppdatera totalpriset när en vara tas bort.


function updateTotalPrice() {
    const checkoutCart = document.getElementsByClassName('checkout__cart')[0];
    const cartRows = checkoutCart.getElementsByClassName('checkout__cart--row');
    let total = 0;

    for (let i = 0; i < cartRows.length; i++) {
        const row = cartRows[i];
        const productPrice = row.getElementsByClassName('cart__product--price')[0];
        const productQuantity = row.getElementsByClassName('cart__product--amount')[0];

        
       
        const price = Number(productPrice.innerText);
        const quantity = productQuantity.value;

        total = total + (price * quantity);
        console.log(price);
    }

    document.getElementById('cart__total__price').innerText = total + ':-';
}


/* This is the code for the form, by Hanna*/

/* Toggle between card & invoice*/

const paymentCardInput = document.querySelector('#paymentCard');
const paymentCardBox = document.querySelector('.hiddenPaymentCard');

const paymentInvoiceInput = document.querySelector("#paymentInvoice");
const paymentInvoiceBox = document.querySelector(".hiddenPaymentInvoice");

paymentCardInput.addEventListener('click', switchPayment);
paymentInvoiceInput.addEventListener('click', switchPayment);

function switchPayment(e) {

    if(e.target.id == 'paymentCard') {
        paymentInvoiceBox.classList.remove('showPaymentInvoice');
        paymentInvoiceBox.classList.add('hiddenPaymentInvoice');

        paymentCardBox.classList.remove('hiddenPaymentCard');
        paymentCardBox.classList.add('showPaymentCard');
    } else {
        paymentCardBox.classList.remove('showPaymentCard');
        paymentCardBox.classList.add('hiddenPaymentCard');

        paymentInvoiceBox.classList.remove('hiddenPaymentInvoice');
        paymentInvoiceBox.classList.add('showPaymentInvoice');
    }
}

/* Order button */
/**
 * [] Make the button disabled from start
 * [] Button opens up when everything is filled out
 * [x] When pressed, validate form (not buzzCode, cardNumber, expiryDate, cvc)
 * [x] Validate zipCode & phoneNumber in js
 * [] When press button, info box(?) about delivery & order in
 * [] Invoice or card needs to be chosen
 */

 const orderBtn = document.querySelector('#orderButton');
 orderBtn.addEventListener('click', validateform);

 function validateform(){

    const zipCode = document.querySelector('#zipCode').value;
    const zipCodeSpan = document.querySelector('#zipCodeSpan');
    const phoneNumber = document.querySelector('#phoneNumber').value;
    const phoneNumberSpan = document.querySelector('#phoneNumberSpan');

    const orderMessage = document.querySelector('#orderMessage')

    orderMessage.innerHTML = '';
    zipCodeSpan.innerHTML = 'Postnummer';
    zipCodeSpan.classList.remove('errorMessage');
    phoneNumberSpan.innerHTML = 'Telefonnummer';
    phoneNumberSpan.classList.remove('errorMessage');

    if(zipCode < 10000 || zipCode > 99999) {
        orderMessage.innerHTML = 'Fyll i ett giltligt postnummer!';
        zipCodeSpan.innerHTML = 'Postnummer *';
        zipCodeSpan.classList.add('errorMessage');
    }

    if(phoneNumber.length != 10) {
        orderMessage.innerHTML = 'Fyll i ett giltligt telefonnummer!';
        phoneNumberSpan.innerHTML = 'Telefonnummer *';
        phoneNumberSpan.classList.add('errorMessage');
    }
}

/* The end of the code for form */