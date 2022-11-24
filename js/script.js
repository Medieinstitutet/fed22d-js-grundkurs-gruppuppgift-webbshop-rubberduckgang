/**
 *  Kund / Varukorgs funktioner, lägga till och ta bort varor.
 *
 *  1. Lägga till varor i varukorgen
 *  2. Ta bort varor från varukorgen
 *  3. Uppdatera totalpriset
 *  4. Kassa knapp???
 */

 const paymentCardInput = document.querySelector("#paymentCard");
 const paymentCardBox = document.querySelector(".hiddenPaymentCard");
 
 const paymentInvoiceInput = document.querySelector("#paymentInvoice");
 const paymentInvoiceBox = document.querySelector(".hiddenPaymentInvoice");

updateTotalPrice();
giveMondayDiscount();

//*****************************************************************************************
//---------------------------------- Array för ankor -------------------------------------- By David
//*****************************************************************************************

const ducksArray = [    
    { 
        name: 'Regular Rubber Duck',
        image: 'assets/img/produkt_1/produkt_1_a.webp',
        info: 'Vår mest populära anka i klassisk gul färg.',
        price: 150,
        rating: 5,
        category: 'standard',
        amount: 0,
    },
    {
        name: 'Blue Rubber Duck',
        image: 'assets/img/produkt_2/produkt_2_a.webp',
        info: "Nykomling med hög potential. It's Blue Da-ba-dee!",
        price: 185,
        rating: 4,
        category: 'standard',
        amount: 0,
    },
    {
        name: 'Green Rubber Duck',
        image: 'assets/img/produkt_3/produkt_3_a.webp',
        info: 'The greenie!! Ge han lite tid, han kommer ta sig.',
        price: 100,
        rating: 2,
        category: 'standard',
        amount: 0,
    },
    {
        name: 'Pink Rubber Duck',
        image: 'assets/img/produkt_4/produkt_4_a.webp',
        info: 'Vad ska man säga. Rosa är rosa!',
        price: 125,
        rating: 3,
        category: 'standard',
        amount: 0,
    },
    {
        name: 'Evel Knievel Duck',
        image: 'assets/img/produkt_5/produkt_5_a.webp',
        info: 'Kommer bjuda på en show du inte visste en anka kan!',
        price: 235,
        rating: 4,
        category: 'special',
        amount: 0,
    },
    {
        name: 'Black Rubber Duck',
        image: 'assets/img/produkt_6/produkt_6_a.webp',
        info: 'Räds den mörka ankan, oanade krafter ligger bakom skapandet utav denna artefakt!',
        price: 666,
        rating: 0,
        category: 'unique',
        amount: 0,
    },
    {
        name: 'Rainbow Duck',
        image: 'assets/img/produkt_7/produkt_7_a.webp',
        info: 'Regnbågar och enhörningar! NEJ! Men i alla fall en regnbågsfärgad badanka.',
        price: 250,
        rating: 5,
        category: 'special',
        amount: 0,
    },
    {
        name: 'Army of Ducks',
        image: 'assets/img/produkt_8/produkt_8_a.webp',
        info: 'Fler, Fler, FLEEEEEER ANKOR!',
        price: 1750,
        rating: 5,
        category: 'standard',
        amount: 0,
    },
    {
        name: 'Giant Duck',
        image: 'assets/img/produkt_9/produkt_9_a.webp',
        info: 'När det gäller ankor så har i alla fall storleken betydelse.',
        price: 2499,
        rating: 5,
        category: 'special',
        amount: 0,
    },
    {
        name: 'THE Golden Duck',
        image: 'assets/img/produkt_10/produkt_10_a.webp',
        info: 'Ingen har någonsinn sett den, men här kan den beställas.',
        price: 9999,
        rating: 0,
        category: 'unique',
        amount: 0,
    },
  ];

//*****************************************************************************************
//------------------------------ Skriva ut Ankor till HTML -------------------------------- By David
//*****************************************************************************************

const duckContainer = document.querySelector('.duck__wrapper');

function renderDucks() {
  duckContainer.innerHTML = '';

  for (let i = 0; i < ducksArray.length; i++) {
    duckContainer.innerHTML += `
        <article class="duck__$+[i]">
            <div class="slideshow">
                <span>&lt;</span>
                <img src="${ducksArray[i].image}" alt="${ducksArray[i].name}" width="130">
                <span>&gt;</span>
            </div>
            <h3>${ducksArray[i].name}</h3>
            <span class="duck__rating">Omdöme - <strong>${ducksArray[i].rating} / 5</strong></span>
            <div class="duck__info">${ducksArray[i].info}</div>
            <span class="duck__pricing">Pris ${ducksArray[i].price}:-</span>
            <div class="duck__amount">
                <button class="subtract_btn">-</button>
                <span>Antal:</span>
                <input type="number" min="0" max="99" value="${ducksArray[i].amount}">
                <button class="add_btn">+</button><br>
            </div>
            <button class="add_to_cart_btn">Lägg till</button>
        </article>
    `;
  }
}

renderDucks()
  
//*****************************************************************************************
//-----------------Ta bort en vara ur varukorgen, btn-danger ------------------------------ By J. del Pilar
//*****************************************************************************************

const removeProductBtn = document.getElementsByClassName("btn-danger"); // Variabel för att komma åt varje knapp med klassen "btn-danger" (Rensa)
for (let i = 0; i < removeProductBtn.length; i++) {
  let removeBtn = removeProductBtn[i];
  removeBtn.addEventListener("click", removeCartRow);
}

function removeCartRow(event) {
  let removeBtnClicked = event.target;
  removeBtnClicked.parentElement.parentElement.remove();
  updateTotalPrice();
}

//*****************************************************************************************
//----------------- Uppdatera totalpriset när antalet ändras ------------------------------ By J. del Pilar
//*****************************************************************************************

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
  giveDiscount();
  giveMondayDiscount();
}

//*****************************************************************************************
//-----------------Uppdatera totalpriset när en vara tas bort ----------------------------- By J. del Pilar
//*****************************************************************************************

function updateTotalPrice() {
  const checkoutCart = document.getElementsByClassName("checkout__cart")[0];
  const cartRows = checkoutCart.getElementsByClassName("checkout__cart--row");
  let total = 0;

  for (let i = 0; i < cartRows.length; i++) {
    const row = cartRows[i];
    const productPrice = row.getElementsByClassName("cart__product--price")[0];
    const productQuantity = row.getElementsByClassName(
      "cart__product--amount"
    )[0];

    const price = Number(productPrice.innerText);
    const quantity = productQuantity.value;

    total = total + price * quantity;
  }

  const paymentInvoice = document.querySelector('#paymentInvoice');
  const paymentCard = document.querySelector('#paymentCard');
  if (total > 800) {
    paymentInvoice.disabled = true;
    paymentCard.checked = true;
    switchPayment('paymentCard');
  } else {
    paymentInvoice.disabled = false;
  } //denna kod är från hanna & gör att faktura väljs bort när totalsumman > 800

  document.getElementById("cart__total__price").innerText = total + ":-";
}

//*****************************************************************************************
//--------------------------- Måndagsrabatt 10% före kl 10.00 ----------------------------- By J. del Pilar
//*****************************************************************************************

function giveMondayDiscount() {
  const mondayDiscount = new Date();
  if (mondayDiscount.getDay() === 1 && mondayDiscount.getHours() < 10) {
    // söndag = 0, måndag = 1 osv
    const messageToUser =
      "Måndag morgon, varsågod du får 10 % rabatt på din beställning";
    document.getElementById("msg__to__user").innerText = messageToUser;

    let reducedPrice = document
      .getElementById("cart__total__price")
      .innerHTML.replace(":-", "");

    reducedPrice = Number(reducedPrice * 0.9);
    document.getElementById("cart__total__price").innerHTML =
      reducedPrice + ":-";
  } else {
    document.getElementById("msg__to__user").innerText =
      "Måndagar före kl 10.00 gäller 10% rabatt";
  }
}
//*****************************************************************************************
//--------------------------- Manuell rabattkod ------------------------------------------- By J. del Pilar
//*****************************************************************************************

const discountInput = document.getElementById("discount");

discountInput.addEventListener("change", giveDiscount);
//console.log(discountInput);

function giveDiscount() {
  if (discountInput.value == "a_damn_fine-cup_of_coffee") {
    let newPrice = document
      .getElementById("cart__total__price")
      .innerHTML.replace(":-", "");
    newPrice = Number(newPrice * 0);
    document.getElementById("cart__total__price").innerHTML = newPrice + ":-";
  } else {
    updateTotalPrice();
    giveMondayDiscount();
  }
}

//*****************************************************************************************
//--------------------------- Toggle mellan kort & faktura -------------------------------- By Hanna
//*****************************************************************************************

paymentCardInput.addEventListener("change", switchPaymentEventHandler);
paymentInvoiceInput.addEventListener("change", switchPaymentEventHandler);

function switchPaymentEventHandler(e) {
  switchPayment(e.target.id);
}

function switchPayment(paymentType) {
  if (paymentType == "paymentCard") {
    paymentInvoiceBox.classList.remove("showPaymentInvoice");
    paymentInvoiceBox.classList.add("hiddenPaymentInvoice");

    paymentCardBox.classList.remove("hiddenPaymentCard");
    paymentCardBox.classList.add("showPaymentCard");
  }
  if (paymentType == 'paymentInvoice') {
    paymentCardBox.classList.remove("showPaymentCard");
    paymentCardBox.classList.add("hiddenPaymentCard");

    paymentInvoiceBox.classList.remove("hiddenPaymentInvoice");
    paymentInvoiceBox.classList.add("showPaymentInvoice");
  }
}

//*****************************************************************************************
//-------------------- Validering av formuläret (enablar beställ-knapp) ------------------- By Hanna
//*****************************************************************************************

const orderBtn = document.querySelector("#orderButton");
orderBtn.disabled = true;

const validatedTexts = document.querySelectorAll(".validatedText");
const validatedCheckboxes = document.querySelectorAll(".validatedCheckbox");
const paymentCardRadio = document.querySelector("#paymentCard");
const paymentInvoiceRadio = document.querySelector("#paymentInvoice");
const socialSecurityNumber = document.querySelector("#socialSecurityNumber");

for (text of validatedTexts) {
  text.addEventListener("input", validate);
}

for (box of validatedCheckboxes) {
  box.addEventListener("change", validate);
}

paymentCardRadio.addEventListener("change", validate);
paymentInvoiceRadio.addEventListener("change", validate);

function validate() {
  let shouldEnable = true;

  for (text of validatedTexts) {
    if (
      text.value == "" &&
      window.getComputedStyle(text.parentElement.parentElement, null)
        .display !== "none"
    ) {
      shouldEnable = false;
    }
  }

  for (box of validatedCheckboxes) {
    if (!box.checked) {
      shouldEnable = false;
    }
  }

  if (!paymentCardRadio.checked && !paymentInvoiceRadio.checked) {
    shouldEnable = false;
  }

  orderBtn.disabled = !shouldEnable;
}

const checkoutForm = document.querySelector(".checkoutForm");
checkoutForm.addEventListener("submit", order);

const formInputs = document.querySelectorAll(".lock");

//*****************************************************************************************
//-------------- Validering av formuläret (vid klick på beställ-knapp) -------------------- By Hanna
//*****************************************************************************************

function order(e) {
  e.preventDefault();

  const zipCode = document.querySelector("#zipCode");
  const zipCodeSpan = document.querySelector("#zipCodeSpan");
  const phoneNumber = document.querySelector("#phoneNumber");
  const phoneNumberSpan = document.querySelector("#phoneNumberSpan");
  const socialSecurityNumber = document.querySelector("#socialSecurityNumber");
  const socialSecurityNumberSpan = document.querySelector("#socialSecurityNumberSpan");

  const regexZC = /^\d{3}[ ]?\d{2}$/;
  const regexPN = /^(([+]46)\s*(7)|07)[02369]\s*(\d{4})\s*(\d{3})$/;
  const regexSSN = /^(19|20)?[0-9]{6}[- ]?[0-9]{4}$/;

  const orderMessage = document.querySelector("#orderMessage");
  orderMessage.innerHTML = "";

  zipCodeSpan.innerHTML = "Postnummer";
  zipCodeSpan.classList.remove("errorMessage");
  phoneNumberSpan.innerHTML = "Telefonnummer";
  phoneNumberSpan.classList.remove("errorMessage");
  socialSecurityNumberSpan.innerHTML = "Personnummer";
  socialSecurityNumberSpan.classList.remove("errorMessage");

  let hasErrors = false;
  let errors = [];

  if (!regexZC.test(zipCode.value)) {
    zipCodeSpan.innerHTML = "Postnummer *";
    zipCodeSpan.classList.add("errorMessage");

    hasErrors = true;
    errors.push("Fyll i ett giltligt postnummer!");
  }

  if (!regexPN.test(phoneNumber.value)) {
    phoneNumberSpan.innerHTML = "Telefonnummer *";
    phoneNumberSpan.classList.add("errorMessage");

    hasErrors = true;
    errors.push("Fyll i ett giltligt telefonnummer!");
  }

  if (!regexSSN.test(socialSecurityNumber.value)) {
    socialSecurityNumberSpan.innerHTML = "Personnummer *";
    socialSecurityNumberSpan.classList.add("errorMessage");

    hasErrors = true;
    errors.push("Fyll i ett giltligt personnummer!");
  }

  if (hasErrors) {
    for (i = 0; i < errors.length; i++) {
      if (i > 0) {
        orderMessage.innerHTML += "<br>";
      }
      orderMessage.innerHTML += errors[i];
    }
  }

  if (!hasErrors) {
    const firstName = document.querySelector("#firstName");
    alert(
      `Tack för din beställning ${firstName.value}! Leverans sker ${getDeliveryTime()}`
    );

    for (i = 0; i < formInputs.length; i++) {
      formInputs[i].disabled = true;
    }
  }
}

//*****************************************************************************************
//-------------------------------------- Leveranstider ------------------------------------ By Hanna
//*****************************************************************************************

function getDeliveryTime() {
  const now = new Date();

  if (now.getDay() === 5 || now.getDay() === 6) {
    return 'om 90 min.'; //om kunden beställer på lör eller sön
  }

  if (now.getHours() >= 0 && now.getHours() <= 6) {
    return 'om 45 min.' //om kunden beställer mellan 24:00 & 6:00
  }

  if (now.getDay() === 4 && now.getHours() >= 11 && now.getHours() <= 13) {
    return 'kl 15:00.' //om kunden beställer på en fredag mellan 11 & 13
  }

  return 'om 30 min.'; //standard-leverans
}

//*****************************************************************************************
//------------------------------ Rensar formulär efter 15 min ----------------------------- By Hanna
//*****************************************************************************************

function resetForm() {
  document.querySelector('.checkoutForm').reset();
  alert('Nu tog det lite lång tid... Om du vill beställa får du fylla i formuläret igen.');
}

setTimeout(resetForm , 1000 * 60 * 15);