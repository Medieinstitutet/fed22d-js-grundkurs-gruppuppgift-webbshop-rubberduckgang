'use strict';

//*****************************************************************************************
//------------------------------ Lite kod som måste köras först ---------------------------
//*****************************************************************************************

const paymentCardInput = document.querySelector("#paymentCard");
const paymentCardBox = document.querySelector(".hiddenPaymentCard");
const paymentInvoiceInput = document.querySelector("#paymentInvoice");
const paymentInvoiceBox = document.querySelector(".hiddenPaymentInvoice");

updateTotalPrice();
giveMondayDiscount();


//*****************************************************************************************
//---------------------------------- Array för ankor -------------------------------------- By David
//*****************************************************************************************

const ducksDatabase = [    
    { 
        name: 'Regular Rubber Duck',
        image: 'assets/img/produkt_1/produkt_1_a.webp',
        info: 'Vår mest populära anka i klassisk gul färg.',
        price: 150,
        rating: 4.5,
        category: 'standard',
        id: 1,
    },
    {
        name: 'Blue Rubber Duck',
        image: 'assets/img/produkt_2/produkt_2_a.webp',
        info: 'Nykomling med hög potential. It\'s Blue Da-ba-dee!',
        price: 185,
        rating: 4,
        category: 'standard',
        id: 2,
    },
    {
        name: 'Green Rubber Duck',
        image: 'assets/img/produkt_3/produkt_3_a.webp',
        info: 'The greenie!! Ge han lite tid, han kommer ta sig.',
        price: 100,
        rating: 2,
        category: 'standard',
        id: 3,
    },
    {
        name: 'Pink Rubber Duck',
        image: 'assets/img/produkt_4/produkt_4_a.webp',
        info: 'Vad ska man säga. Rosa är rosa!',
        price: 125,
        rating: 3.5,
        category: 'standard',
        id: 4,
    },
    {
        name: 'Evel Knievel Duck',
        image: 'assets/img/produkt_5/produkt_5_a.webp',
        info: 'Kommer bjuda på en show du inte visste en anka kan!',
        price: 235,
        rating: 4,
        category: 'special',
        id: 5,
    },
    {
        name: 'Black Rubber Duck',
        image: 'assets/img/produkt_6/produkt_6_a.webp',
        info: 'Räds den mörka ankan, oanade krafter ligger bakom skapandet utav denna artefakt!',
        price: 666,
        rating: 0.5,
        category: 'unique',
        id: 6,
    },
    {
        name: 'Rainbow Duck',
        image: 'assets/img/produkt_7/produkt_7_a.webp',
        info: 'Regnbågar och enhörningar! NEJ! Men i alla fall en regnbågsfärgad badanka.',
        price: 250,
        rating: 5,
        category: 'special',
        id: 7,
    },
    {
        name: 'Army of Ducks',
        image: 'assets/img/produkt_8/produkt_8_a.webp',
        info: 'Fler, Fler, FLEEEEEER ANKOR!',
        price: 1750,
        rating: 5,
        category: 'standard',
        id: 8,
    },
    {
        name: 'Giant Duck',
        image: 'assets/img/produkt_9/produkt_9_a.webp',
        info: 'När det gäller ankor så har i alla fall storleken betydelse.',
        price: 2499,
        rating: 5,
        category: 'special',
        id: 9,
    },
    {
        name: 'THE Golden Duck',
        image: 'assets/img/produkt_10/produkt_10_a.webp',
        info: 'Ingen har någonsinn sett den, men här kan den beställas.',
        price: 3000,
        rating: 0,
        category: 'unique',
        id: 10,
    },
  ];

  const cart = [];

//*****************************************************************************************
//------------------------------ Skriva ut Ankor till HTML -------------------------------- By David
//...Helgpris, påslag 15% på orginalpriset, Fre efter 15.00 till Mån 03.00 (WeekEndPrice)...By J. del Pilar
//*****************************************************************************************

const duckContainer = document.querySelector(".duck__wrapper");

const weekendPrice = new Date();

// let newWeekendPrice = ducksDatabase.map(prod => Math.round(prod.price));

if((weekendPrice.getDay() === 5 && weekendPrice.getHours() > 15) || weekendPrice.getDay() === 6 || weekendPrice.getDay() === 0 || (weekendPrice.getDay() === 1 && weekendPrice.getHours() < 3 )) {

    ducksDatabase = ducksDatabase.map(prod => Math.round(prod.price * 1.15));
    
  }


function renderDucks() {
  let ducksArray = [...ducksDatabase];

  ducksArray = filterPrice(ducksArray);
  ducksArray = filterCategories(ducksArray);
  sortDucks(ducksArray);

  duckContainer.innerHTML = "";

  for (let i = 0; i < ducksArray.length; i++) {
    let stars = '';

    for (let j = 0; j < 5 ; j++) {
      if (j - ducksArray[i].rating < -0.5) {
        stars += '&#xf005';
      } else if (j - ducksArray[i].rating == -0.5) {
        stars += '&#xf123';
      } else {
        stars += '&#xf006;';
      }
    }

    duckContainer.innerHTML += `
        <article class="duck__${i+1}" id="${ducksArray[i].id}">
            <div class="slideshow">
                <button class="slideshow_btn_left">&lt;</button>
                <img class="duck__img" src="${ducksArray[i].image}" alt="${ducksArray[i].name}" width="130">
                <button class="slideshow_btn_right">&gt;</button>
            </div>
            <h3 class="duck__title">${ducksArray[i].name}</h3>
            <span class="duck__rating">Omdöme - <strong>${ducksArray[i].rating} / 5</strong></span>
            <div class="duck__info">${ducksArray[i].info}</div>
            <span class="duck__pricing">Pris ${ducksArray[i].price}:-</span>
            <div class="duck__amount">
                <button id="subtract${i+1}" class="subtract_btn" data-operator="subtract">-</button>
                <span class="amount_text">Antal:</span>
                <span id="amount${i+1}" class="amount_value">0</span>
                <button id="add${i+1}" class="add_btn" data-operator="add">+</button><br>
            </div>
            <button id="addToCart${i+1}" class="add_to_cart_btn" data-operator="addToCart">Lägg till</button>
        </article>
    `;
  }
}


//*****************************************************************************************
//--------------------------------------- Sortera ankor ----------------------------------- By Hanna
//*****************************************************************************************

const sortOptions = document.querySelector('#sort__options');
sortOptions.addEventListener('change', renderDucks);

function sortDucks(ducksArray) {
  const sortRating = document.querySelector('#sortRating');
  const sortPriceLow = document.querySelector('#sortPriceLow');
  const sortPriceHigh = document.querySelector('#sortPriceHigh');

  if (sortRating.selected) {
    ducksArray.sort((duck1, duck2) => duck2.rating - duck1.rating);
  }

  if (sortPriceLow.selected) {
    ducksArray.sort((duck1, duck2) => duck1.price - duck2.price);
  }

  if (sortPriceHigh.selected) {
    ducksArray.sort((duck1, duck2) => duck2.price - duck1.price);
  }
}

//*****************************************************************************************
//-------------------------------------- Välja kategori ----------------------------------- By Hanna
//*****************************************************************************************

const sortCategory = document.querySelector('#sort__categories');
sortCategory.addEventListener('change', renderDucks);

function filterCategories(ducksArray) {
  const categoryUnique = document.querySelector('#categoryUnique');
  const categorySpecial = document.querySelector('#categorySpecial');
  const categoryStandard = document.querySelector('#categoryStandard');

  if (categoryUnique.selected) {
    ducksArray = ducksArray.filter(duck => duck.category === 'unique');
  }

  if (categorySpecial.selected) {
    ducksArray = ducksArray.filter(duck => duck.category === 'special');
  }

  if (categoryStandard.selected) {
    ducksArray = ducksArray.filter(duck => duck.category === 'standard');
  }
  return ducksArray;
}

//*****************************************************************************************
//---------------------------------- Filtrera ankor på pris ------------------------------- By Hanna
//*****************************************************************************************

const fromSlider = document.querySelector("#fromSlider");
const toSlider = document.querySelector("#toSlider");
const minDisplay = document.querySelector('#sliderMinValue');
const maxDisplay = document.querySelector('#sliderMaxValue');

let mostExpensiveDuck = -1;

for(let i = 0; i < ducksDatabase.length; i++) {

   if (ducksDatabase[i].price > mostExpensiveDuck) {
    mostExpensiveDuck = ducksDatabase[i].price;
  }
}



// for (duck of ducksDatabase) {

// }

fromSlider.max = mostExpensiveDuck;
toSlider.max = mostExpensiveDuck;

fromSlider.value = 0;
toSlider.value = mostExpensiveDuck;

minDisplay.innerHTML = 0;
maxDisplay.innerHTML = mostExpensiveDuck;

fillSlider(fromSlider, toSlider, toSlider);
setToggleAccessible(toSlider);

fromSlider.addEventListener('input', (e) => controlFromSlider(fromSlider, toSlider, minDisplay, e)); 
toSlider.addEventListener('input', () => controlToSlider(fromSlider, toSlider, maxDisplay));
fromSlider.addEventListener('change', renderDucks);
toSlider.addEventListener('change', renderDucks);

function controlFromSlider(fromSlider, toSlider, minDisplay, e) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, toSlider);
  if (from > to) {
    fromSlider.value = to;
    minDisplay.innerHTML = to;
  } else {
    minDisplay.innerHTML = from;
  }
}

function controlToSlider(fromSlider, toSlider, maxDisplay) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, toSlider);
  setToggleAccessible();
  if (from <= to) {
    toSlider.value = to;
    maxDisplay.innerHTML = to;
  } else {
    maxDisplay.innerHTML = from;
    toSlider.value = from;
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value);
  const to = parseInt(currentTo.value);
  return [from, to];
}

function fillSlider(from, to, controlSlider) {
  const rangeDistance = to.max - to.min;
  const fromPosition = from.value - to.min;
  const toPosition = to.value - to.min;
  const sliderColor = '#C6C6C6';
  const rangeColor = '#556edf';

  controlSlider.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
    ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
    ${sliderColor} 100%)`;
}

function setToggleAccessible() {
  const toSlider = document.querySelector("#toSlider");
  if (Number(toSlider.value) <= 0) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

function filterPrice(ducksArray) {
  return ducksArray.filter(duck => duck.price >= fromSlider.value && duck.price <= toSlider.value);
}

renderDucks();

//*****************************************************************************************
//------------------------------ Plus/minus & Lägg till ----------------------------------- By David
//*****************************************************************************************

//Variabler för knapparna Plus, minus och lägg till
const subtractBtn = document.querySelectorAll('button[data-operator="subtract"]');
const addBtn = document.querySelectorAll('button[data-operator="add"]');
const addToCartBtn = document.querySelectorAll('button[data-operator="addToCart"]');

// loop för att sätta eventlistener till funktionerna på knapparna
for (let i = 0; i < addBtn.length; i++) {
  subtractBtn[i].addEventListener('click', subtractDuck);
  addBtn[i].addEventListener('click', addDuck);
  addToCartBtn[i].addEventListener('click', addDuckToCart);
}


// Plus knappen lägger till +1 vid klick
function addDuck(e) {
  const index = e.currentTarget.id.replace('add', '')
  const amountValue = document.querySelector(`#amount${index}`);
  let amount = Number(amountValue.innerText);
  amountValue.innerHTML = amount + 1;
 
}

// Minus knappen subtraherar -1 vid klick, om värdet redan är mindre än 0 och större än -1 avbryt
function subtractDuck(e) {
  const index = e.currentTarget.id.replace('subtract', '')
  const amountValue = document.querySelector(`#amount${index}`);
  let amount = Number(amountValue.innerText);

  if (amount - 1 < 0) {
    return;
  } else
    amountValue.innerHTML = amount - 1;

}

// "Lägg till" knappen läser av värdet i amount fältet och sparar värdet i arrayen under rätt objekt.
function addDuckToCart(e) {
  const index = e.currentTarget.id.replace('addToCart', ''); 
  const amount = document.querySelector(`#amount${index}`);
  let ducksArray = [...ducksDatabase];
  ducksArray[index-1].amount = Number(amount.innerHTML);
  console.log(amount.innerHTML);
}


//*****************************************************************************************
//----------------- Lägg till en vara ur varukorgen---------------------------------------- By J. del Pilar
//*****************************************************************************************

const cartContainer = document.querySelector('.checkout__cart');


cartContainer.innerHTML = '';

for (let i = 0; i < addToCartBtn.length; i++) {
  let addBtnClicked = addToCartBtn[i];
  addBtnClicked.addEventListener('click', addItemToCart);
}

function addItemToCart(event) {

  let button = event.target;
  const clickedItem = button.parentElement;
  const amountDom = clickedItem.getElementsByClassName('duck__amount')[0].getElementsByClassName('amount_value')[0];
  const amountToAdd = parseInt(amountDom.innerHTML);
  if (amountToAdd <= 0){
    return;
  }

  const duckToAdd = ducksDatabase.find(duck => duck.id == clickedItem.id); 
  duckToAdd.amount = amountToAdd;

  cart.push(duckToAdd);
  renderCart();
  console.log(cart);

  // addDuckToCart(image, price, title);

}

function renderCart() {
  const checkoutCart = document.getElementsByClassName('checkout__cart')[0];
  checkoutCart.innerHTML = '';
  for (let i = 0; i < cart.length; i++) {
    checkoutCart.innerHTML +=
    `
    <div class="checkout__cart--row">
      <article class="checkout__cart__article--product">
        <img src=${cart[i].image} alt="" width="100">
        <p>${cart[i].name}</p>
      </article>

      <article class="checkout__cart__article--price">
        <span class="cart__product--price">${cart[i].price}</span>
      </article>

    <article class="checkout__cart__article--quantity">
        <!--- Denna label ska göras visually-hidden i css/sass -->
        <label class="visually-hidden" for="amount">antal</label>
        <input type="number" class="cart__product--amount" id="amount" name="antal" min="1" value="${cart[i].amount}">

        <button role="button" class="btn-danger">Rensa</button>
      </article>
    </div>
    `

  }
  updateTotalPrice();
  giveMondayDiscount();
}

// function addDuckToCart() {
//   let checkoutCartRow = document.createElement('div');
//   checkoutCartRow.classList.add('checkout__cart--row')
//   const checkoutCart = document.getElementsByClassName('checkout__cart')[0];
//   let duckTitle = checkoutCart.getElementsByClassName('duck__title');
//   for (let i = 0; i < duckTitle.length; i++) {
//     if(duckTitle[i].innerText == title) {
//       alert('Oj, denna vara ligger redan i varukorgen!');
//       return;
//     }
//   }
  
//   const cartRowContent = 
//   `
//           <article class="checkout__cart__article--product">
//             <img src=${image} alt="" width="100">
//             <p>${title}</p>
//           </article>

//           <article class="checkout__cart__article--price">
//             <span class="cart__product--price">${price}</span>
//           </article>

//           <article class="checkout__cart__article--quantity">
//             <!--- Denna label ska göras visually-hidden i css/sass -->
//             <label class="visually-hidden" for="amount">antal</label>
//             <input type="number" class="cart__product--amount" id="amount" name="antal" min="1" value="1">

//             <button role="button" class="btn-danger">Rensa</button>
//           </article>
//   `
//   checkoutCartRow.innerHTML = cartRowContent;
//   checkoutCart.append(checkoutCartRow);
//   updateTotalPrice();
// }




//*****************************************************************************************
//-----------------Ta bort en vara ur varukorgen, btn-danger ------------------------------ By J. del Pilar
//*****************************************************************************************

const removeProductBtn = document.getElementsByClassName('btn-danger'); // Variabel för att komma åt varje knapp med klassen "btn-danger" (Rensa)
for (let i = 0; i < removeProductBtn.length; i++) {
  let removeBtn = removeProductBtn[i];
  removeBtn.addEventListener('click', removeCartRow);
}

function removeCartRow(event) {
    let removeBtnClicked = event.target
    removeBtnClicked.parentElement.parentElement.remove();

    updateTotalPrice();
    giveDiscount();
    giveMondayDiscount();
}

//*****************************************************************************************
//----------------- Uppdatera totalpriset när antalet ändras ------------------------------ By J. del Pilar
//*****************************************************************************************

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
    
    updateTotalPrice();
    giveDiscount();
    giveMondayDiscount();
    visualCartUpdate()
}

//*****************************************************************************************
//-----------------Uppdatera totalpriset när en vara tas bort ----------------------------- By J. del Pilar
//*****************************************************************************************

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
//----------------- Visuell kundkorgsindikering på tillägg -------------------------------- By J. del Pilar
//*****************************************************************************************

const redFrame = document.querySelector('#cart__total__price');

function visualCartUpdate() {
    redFrame.classList.add('red__frame');
    setTimeout(clearRedFrame, 300);
}

function clearRedFrame() {
    redFrame.classList.remove('red__frame');
}

//*****************************************************************************************
//------------------- Mängdrabatt vid köp av fler än 10 av samma sort --------------------- By J. del Pilar
//*****************************************************************************************

// let ducksArrayCheckAmount = [...ducksDatabase];

// ducksArrayCheckAmount = ducksDatabase.filter((product) => {
//     const amountOfDucks = product.amount;
//     let duckPrice = product.price;
//     console.log(duckPrice);
//     if(amountOfDucks >= 10) {
//         duckPrice = Math.round(duckPrice * 0.9);

//         console.log(duckPrice);
//     } else {
//         console.log('ingen rabatt');
//     }
 
//   }); 


//*****************************************************************************************
//--------------------------- Måndagsrabatt 10% före kl 10.00 ----------------------------- By J. del Pilar
//*****************************************************************************************

function giveMondayDiscount() {
  const mondayDiscount = new Date();
  if (mondayDiscount.getDay() === 1 && mondayDiscount.getHours() < 10) {
    // söndag = 0, måndag = 1 osv
    const messageToUser =
      'Måndag morgon, varsågod du får 10 % rabatt på din beställning';
    document.getElementById('msg__to__user').innerText = messageToUser;

    let reducedPrice = document
      .getElementById('cart__total__price')
      .innerHTML.replace(":-", "");

    reducedPrice = Number(reducedPrice * 0.9);
    document.getElementById('cart__total__price').innerHTML =
      reducedPrice + ':-';
  } else {
    document.getElementById('msg__to__user').innerText =
      'Måndagar före kl 10.00 gäller 10% rabatt';
  }
}
//*****************************************************************************************
//--------------------------- Manuell rabattkod ------------------------------------------- By J. del Pilar
//*****************************************************************************************

const discountInput = document.getElementById('discount');

discountInput.addEventListener('change', giveDiscount);

function giveDiscount() {
  if (discountInput.value == 'a_damn_fine-cup_of_coffee') {
    let newPrice = document
      .getElementById('cart__total__price')
      .innerHTML.replace(':-', '');
    newPrice = Number(newPrice * 0);
    document.getElementById('cart__total__price').innerHTML = newPrice + ':-';
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

//*****************************************************************************************
//-------------------------------- Jultema på julafton ------------------------------------ By David
//*****************************************************************************************

let christmasEve = new Date();

if(christmasEve.getDate() === 24 && christmasEve.getMonth() === 11) {
  let ducksArray = [...ducksDatabase];
  const body = document.querySelector('#body')

  body.classList.add('body__christmas__theme')

  for (let i = 0; i < ducksArray.length; i++) {
    const duckPrice = document.querySelector(`#duck__pricing__theme${i+1}`)
    duckPrice.classList.add('duck__pricing__christmas')
  }
}