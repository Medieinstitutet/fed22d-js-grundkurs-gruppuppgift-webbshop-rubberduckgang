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

/* Rules for delivery: (usually 30 min) */

/* If the customer orders on a weekend: 1,5 h */

/* If the custonmer orders in the middle of the night: 45 min */

/* If the customer orders on a friday between 11 & 13 (weekly meeting): delivery at 15:00 */

/* If 15 minutes pass, clear form. Alert("Too slow!") */

/**
 * setTimeout(function, 1000 * 1500)
 * börja med alert
 */

/* If cart exceeds 800kr, invoice can't be chosen */

/* The end of form*/