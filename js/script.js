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

/* The end of form*/