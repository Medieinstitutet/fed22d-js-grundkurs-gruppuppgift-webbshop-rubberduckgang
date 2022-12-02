'use strict';

//*****************************************************************************************
//------------------------------- Initialize dates & times --------------------------------
//*****************************************************************************************

const now = new Date();

const isChristmasEve = now.getDate() === 24 && now.getMonth() === 11;
const useWeekendPrices = (now.getDay() === 5 && now.getHours() > 15) || now.getDay() === 6 || now.getDay() === 0 || (now.getDay() === 1 && now.getHours() < 3);
const isLucia = now.getMonth() === 11 && now.getDate() === 13;
const isEvenTuesday = now.getDay() == 2 && getWeeks(now) % 2 == 0;
const useMondayDiscount = now.getDay() === 1 && now.getHours() < 10;

function getWeeks(date) {
  let startDate = new Date(date.getFullYear(), 0, 1);
  let days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  var weekNumber = Math.ceil(days / 7);
  return weekNumber;
}

//*****************************************************************************************
//------------------------------ Initialize HTML references -------------------------------
//*****************************************************************************************

const paymentCardInput = document.querySelector('#paymentCard');
const paymentCardBox = document.querySelector('.hiddenPaymentCard');
const paymentInvoiceInput = document.querySelector('#paymentInvoice');
const paymentInvoiceBox = document.querySelector('.hiddenPaymentInvoice');

updateTotalPrice();
giveMondayDiscount();

//*****************************************************************************************
//-------------------------------- Initialize ducksDatabase ------------------------------- By David
//........Weekend price, 15% more friday after 15:00 to monday 03.00 (now)........By J. del Pilar
//*****************************************************************************************

let ducksDatabase = [
  {
    name: 'Simpel gummianka',
    image: [
      {
        src: 'assets/img/product_1/product_1_a_yellow_rubberduck.webp',
        alt: 'Simpel gummianka',
      },
      {
        src: 'assets/img/product_1/product_1_b_yellow_rubberduck.webp',
        alt: 'Simpel gummianka',
      },
    ],
    info: 'Vår mest populära anka i klassisk gul färg.',
    price: 150,
    rating: 4.5,
    category: 'standard',
    id: 1,
    amount: 0,
    visible: true,
  },
  {
    name: 'Blå gummianka',
    image: [
      {
        src: 'assets/img/product_2/product_2_a_blue_rubberduck.webp',
        alt: 'Blå gummianka',
      },
      {
        src: 'assets/img/product_2/product_2_b_blue_rubberduck.webp',
        alt: 'Blå gummianka',
      },
    ],
    info: 'Nykomling med hög potential. Det är Blue Da-ba-dee!',
    price: 185,
    rating: 4,
    category: 'standard',
    id: 2,
    amount: 0,
    visible: true,
  },
  {
    name: 'Grön gummianka',
    image: [
      {
        src: 'assets/img/product_3/product_3_a_green_rubberduck.webp',
        alt: 'Grön gummianka',
      },
      {
        src: 'assets/img/product_3/product_3_b_green_rubberduck.webp',
        alt: 'Grön gummianka',
      },
    ],
    info: 'Gröngölingen! Ge han lite tid, han kommer ta sig.',
    price: 100,
    rating: 2,
    category: 'standard',
    id: 3,
    amount: 0,
    visible: true,
  },
  {
    name: 'Rosa gummianka',
    image: [
      {
        src: 'assets/img/product_4/product_4_a_pink_rubberduck.webp',
        alt: 'Rosa gummianka',
      },
      {
        src: 'assets/img/product_4/product_4_b_pink_rubberduck.webp',
        alt: 'Rosa gummianka',
      },
    ],
    info: 'Vad ska man säga. Rosa är rosa!',
    price: 125,
    rating: 3.5,
    category: 'standard',
    id: 4,
    amount: 0,
    visible: true,
  },
  {
    name: 'Evel Knievel-ankan',
    image: [
      {
        src: 'assets/img/product_5/product_5_a_blue_rubberduck_with_stars.webp',
        alt: 'Evel Knievel-ankan',
      },
      {
        src: 'assets/img/product_5/product_5_b_blue_rubberduck_with_stars.webp',
        alt: 'Evel Knievel-ankan',
      },
    ],
    info: 'Kommer bjuda på en show du inte visste en anka kan!',
    price: 235.45,
    rating: 4,
    category: 'special',
    id: 5,
    amount: 0,
    visible: true,
  },
  {
    name: 'Svart gummianka',
    image: [
      {
        src: 'assets/img/product_6/product_6_b_black_rubberduck.webp',
        alt: 'Svart gummianka',
      },
      {
        src: 'assets/img/product_6/product_6_a_black_rubberduck.webp',
        alt: 'Svart gummianka',
      },
    ],
    info: 'Räds den mörka ankan, oanade krafter ligger bakom skapandet utav denna artefakt!',
    price: 666,
    rating: 0.5,
    category: 'unique',
    id: 6,
    amount: 0,
    visible: true,
  },
  {
    name: 'Regnbågsankan',
    image: [
      {
        src: 'assets/img/product_7/product_7_a_rainbow_colored_rubberduck.webp',
        alt: 'Regnbågsankan',
      },
      {
        src: 'assets/img/product_7/product_7_b_rainbow_colored_rubberduck.webp',
        alt: 'Regnbågsankan',
      },
    ],
    info: 'Regnbågar och enhörningar! NEJ! Men i alla fall en regnbågsfärgad badanka.',
    price: 250,
    rating: 5,
    category: 'special',
    id: 7,
    amount: 0,
    visible: true,
  },
  {
    name: 'Ankornas armé',
    image: [
      {
        src: 'assets/img/product_8/product_8_a_several_yellow_rubberducks.webp',
        alt: 'Ankornas armé',
      },
      {
        src: 'assets/img/product_8/product_8_b_pile_of_yellow_rubberducks.webp',
        alt: 'Ankornas armé',
      },
    ],
    info: 'Fler, Fler, FLEEEEEER ANKOR!',
    price: 1750,
    rating: 5,
    category: 'standard',
    id: 8,
    amount: 0,
    visible: true,
  },
  {
    name: 'Giganten',
    image: [
      {
        src: 'assets/img/product_9/product_9_b_giant_inflated_yellow_duck.webp',
        alt: 'Giganten',
      },
      {
        src: 'assets/img/product_9/product_9_a_giant_inflated_yellow_duck.webp',
        alt: 'Giganten',
      },
    ],
    info: 'När det gäller ankor så har i alla fall storleken betydelse.',
    price: 2499.99,
    rating: 5,
    category: 'special',
    id: 9,
    amount: 0,
    visible: true,
  },
  {
    name: 'Den ENDA guldankan',
    image: [
      {
        src: 'assets/img/product_10/product_10_a_golden_colored_rubberduck.webp',
        alt: 'Den ENDA guldankan',
      },
      {
        src: 'assets/img/product_10/product_10_b_golden_colored_rubberduck.webp',
        alt: 'Den ENDA guldankan',
      },
    ],
    info: 'Ingen har någonsinn sett den, men här kan den beställas.',
    price: 3000,
    rating: 0,
    category: 'unique',
    id: 10,
    amount: 0,
    visible: true,
  },
  {
    name: 'Stjärngåsen',
    image: 'assets/img/product_11/product_11_a.webp',
    info: 'Stilla natt, heliga natt..',
    price: 0,
    rating: 3,
    category: 'unique',
    id: 11,
    amount: 0,
    visible: false,
  },
];

if (useWeekendPrices) {
  ducksDatabase = ducksDatabase.map(duck => {
    duck.price = Math.round(duck.price * 1.15);
    return duck;
  });
}

//*****************************************************************************************
//--------------------------------- Render ducks to HTML ---------------------------------- By David
//*****************************************************************************************

const duckContainer = document.querySelector('.duck__wrapper');

function renderDucks() {
  let ducksArray = [...ducksDatabase];

  ducksArray = filterPrice(ducksArray);
  ducksArray = filterCategories(ducksArray);
  sortDucks(ducksArray);

  duckContainer.innerHTML = '';

  let rendered = 0;

  for (let i = 0; i < ducksArray.length; i++) {
    if (!ducksArray[i].visible) {
      continue;
    }

    let stars = '';
    for (let j = 0; j < 5; j++) {
      if (j - ducksArray[i].rating < -0.5) {
        stars += '&#xf005';
      } else if (j - ducksArray[i].rating == -0.5) {
        stars += '&#xf123';
      } else {
        stars += '&#xf006;';
      }
    }

    let christmasClass = '';

    if (isChristmasEve) {
      christmasClass = 'duck__pricing__christmas';
    }

    duckContainer.innerHTML += `
        <article class="duck__${rendered + 1}" id="${ducksArray[i].id}">
            <div class="slideshow">
                <button id="prevImg${i + 1}" class="slideshow_btn_left" data-operator="prevImg">&lt;</button>
                <img id="img__1-${i + 1}" src="${ducksArray[i].image[0].src}" alt="${ducksArray[i].image[0].alt}" width="130">
                <img id="img__2-${i + 1}" class="hidden" src="${ducksArray[i].image[1].src}" alt="${ducksArray[i].image[1].alt}" width="130">
                <button id="nextImg${i + 1}" class="slideshow_btn_right" data-operator="nextImg">&gt;</button>
            </div>
            <h3 class="duck__title">${ducksArray[i].name}</h3>
            <span class="duck__rating fa">${stars}</span>
            <div class="duck__info">${ducksArray[i].info}</div>
            <span class="duck__pricing ${christmasClass}">Pris ${ducksArray[i].price}:-</span>
            <div class="duck__amount">
                <button id="subtract${rendered + 1}" class="subtract_btn" data-operator="subtract">-</button>
                <span class="amount_text">Antal:</span>
                <span id="amount${rendered + 1}" class="amount_value">0</span>
                <button id="add${rendered + 1}" class="add_btn" data-operator="add">+</button><br>
            </div>
            <button id="addToCart${rendered + 1}" class="add_to_cart_btn" data-operator="addToCart">Lägg till</button>
        </article>
    `;
    rendered++;
  }
  applyListeners();
}

//*****************************************************************************************
//--------------------------------------- Sort ducks -------------------------------------- By Hanna
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
//---------------------------------- Filter by category ----------------------------------- By Hanna
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
//---------------------------------- Filter ducks by price -------------------------------- By Hanna
//*****************************************************************************************

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const minDisplay = document.querySelector('#sliderMinValue');
const maxDisplay = document.querySelector('#sliderMaxValue');

let mostExpensiveDuck = -1;

for (let i = 0; i < ducksDatabase.length; i++) {
  if (ducksDatabase[i].price > mostExpensiveDuck) {
    mostExpensiveDuck = ducksDatabase[i].price;
  }
}

fromSlider.max = mostExpensiveDuck;
toSlider.max = mostExpensiveDuck;

fromSlider.value = 0;
toSlider.value = mostExpensiveDuck;

minDisplay.innerHTML = 0;
maxDisplay.innerHTML = mostExpensiveDuck;

fillSlider(fromSlider, toSlider, toSlider);
setToggleAccessible(toSlider);

fromSlider.addEventListener('input', e => controlFromSlider(fromSlider, toSlider, minDisplay, e));
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
  const toSlider = document.querySelector('#toSlider');
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
//------------------------------- Add & subtract amount ----------------------------------- By David
//*****************************************************************************************

function applyListeners() {
  const subtractBtn = document.querySelectorAll('button[data-operator="subtract"]');
  const addBtn = document.querySelectorAll('button[data-operator="add"]');
  const addToCartBtn = document.querySelectorAll('button[data-operator="addToCart"]');

  const prevBtn = document.querySelectorAll('button[data-operator="prevImg"]');
  const nextBtn = document.querySelectorAll('button[data-operator="nextImg"]');

  for (let i = 0; i < addBtn.length; i++) {
    subtractBtn[i].addEventListener('click', subtractDuck);
    addBtn[i].addEventListener('click', addDuck);
    addToCartBtn[i].addEventListener('click', addItemToCart);
  }

  prevBtn.forEach(btn => {
    btn.addEventListener('click', switchImage);
  });

  nextBtn.forEach(btn => {
    btn.addEventListener('click', switchImage);
  });
}

function addDuck(e) {
  const index = e.currentTarget.id.replace('add', '');
  const amountValue = document.querySelector(`#amount${index}`);
  let amount = Number(amountValue.innerText);
  amountValue.innerHTML = amount + 1;
}

function subtractDuck(e) {
  const index = e.currentTarget.id.replace('subtract', '');
  const amountValue = document.querySelector(`#amount${index}`);
  let amount = Number(amountValue.innerText);

  if (amount <= 0) {
    return;
  }
  amountValue.innerHTML = amount - 1;
}

//*****************************************************************************************
//----------------------------- Add article to cart---------------------------------------- By J. del Pilar
//*****************************************************************************************

const cartContainer = document.querySelector('.checkout__cart');

cartContainer.innerHTML = '';

function addItemToCart(event) {
  let button = event.target;
  const clickedItem = button.parentElement;
  const amountDom = clickedItem.getElementsByClassName('duck__amount')[0].getElementsByClassName('amount_value')[0];
  const amountToAdd = parseInt(amountDom.innerHTML);
  if (amountToAdd <= 0) {
    return;
  }

  const duckToAdd = ducksDatabase.find(duck => duck.id == clickedItem.id);
  duckToAdd.amount = amountToAdd;

  if (isLucia && !hasLuciaDuck()) {
    const luciaDuck = ducksDatabase.find(duck => duck.id == 11);
    luciaDuck.amount = 1;
  }

  renderCart();
}

function renderCart() {
  const checkoutCart = document.getElementsByClassName('checkout__cart')[0];
  checkoutCart.innerHTML = '';
  for (let i = 0; i < ducksDatabase.length; i++) {
    if (ducksDatabase[i].amount == 0) {
      continue;
    }

    let price;
    if (ducksDatabase[i].amount >= 10) {
      price = ducksDatabase[i].price * 0.9;
    } else {
      price = ducksDatabase[i].price;
    }

    checkoutCart.innerHTML += `
    <div class="checkout__cart--row" id="${ducksDatabase[i].id}">
      <article class="checkout__cart__article--product">
        <img src=${ducksDatabase[i].image[0].src} alt="" width="100">
        <p>${ducksDatabase[i].name}</p>
      </article>

      <article class="checkout__cart__article--price">
        <span class="cart__product--price">${price}</span>
      </article>

      <article class="checkout__cart__article--quantity">
        <!--- Denna label ska göras visually-hidden i css/sass -->
        <label class="visually-hidden" for="amount">antal</label>

        <input type="number" class="cart__product--amount lock" id="${ducksDatabase[i].id}" name="antal" min="1" value="${ducksDatabase[i].amount}">

        <button role="button" class="btn-danger" id="${ducksDatabase[i].id}" >Rensa</button>
      </article>
    </div>
    `;
  }

  const removeProductBtn = document.getElementsByClassName('btn-danger');
  for (let i = 0; i < removeProductBtn.length; i++) {
    let removeBtn = removeProductBtn[i];
    removeBtn.addEventListener('click', removeCartRow);
  }
  const quantityInput = document.getElementsByClassName('cart__product--amount');
  for (let i = 0; i < quantityInput.length; i++) {
    const input = quantityInput[i];
    input.addEventListener('change', quantityInputChanged);
  }

  const discountInput = document.getElementById('discount');
  discountInput.addEventListener('change', giveDiscount);

  updateTotalPrice();
  giveMondayDiscount();
  giveDiscount();
  visualCartUpdate();
}

function hasLuciaDuck() {
  return ducksDatabase.find(duck => duck.id == 11).amount > 0;
}

//*****************************************************************************************
//--------------------- Function for Order, order button ------------------------------ By J. del Pilar
//*****************************************************************************************

document.querySelector('#go_to_form').addEventListener('click', goToForm);

function goToForm() {
  let scroll = document.getElementById('scroll');
  scroll.scrollIntoView();
}

//*****************************************************************************************
//--------------------- Remove article from cart, btn-danger ------------------------------ By J. del Pilar
//*****************************************************************************************

function removeCartRow(event) {
  let removeBtnClicked = event.target;
  for (let i = 0; i < ducksDatabase.length; i++) {
    if (removeBtnClicked.id == ducksDatabase[i].id) {
      ducksDatabase[i].amount = 0;
    }
  }
  renderCart();
}

//*****************************************************************************************
//----------------- Update total price when changed quantity ------------------------------ By J. del Pilar
//*****************************************************************************************

function quantityInputChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  for (let i = 0; i < ducksDatabase.length; i++) {
    if (input.id == ducksDatabase[i].id) {
      ducksDatabase[i].amount = input.value;
    }
  }
  renderCart();
}

//*****************************************************************************************
//--------------------- Update total sum when article removed ----------------------------- By J. del Pilar
//*****************************************************************************************

function updateTotalPrice() {
  const checkoutCart = document.getElementsByClassName('checkout__cart')[0];
  const cartRows = checkoutCart.getElementsByClassName('checkout__cart--row');
  let total = 0;
  let totalQuantity = 0;

  for (let i = 0; i < cartRows.length; i++) {
    const row = cartRows[i];
    const productPrice = row.getElementsByClassName('cart__product--price')[0];
    const productQuantity = row.getElementsByClassName('cart__product--amount')[0];

    const price = Number(productPrice.innerText);
    const quantity = Number(productQuantity.value);

    total = total + price * quantity;

    totalQuantity += quantity;
  }

  const paymentInvoice = document.querySelector('#paymentInvoice');
  const paymentCard = document.querySelector('#paymentCard');
  if (total > 800) {
    paymentInvoice.disabled = true;
    paymentCard.checked = true;
    switchPayment('paymentCard');
  } else {
    paymentInvoice.disabled = false;
  }

  let shippingPrice = 25 + total * 0.1;

  if (totalQuantity > 15) {
    shippingPrice = 0;
  }

  document.querySelector('#cart__shipping__price').innerHTML = toDisplayPrice(shippingPrice);

  if (isEvenTuesday && total >= 25) {
    total -= 25;
  }
  document.getElementById('cart__total__price').innerText = toDisplayPrice(total);

  document.querySelector('#cart__payment__price').innerHTML = toDisplayPrice(total + shippingPrice);
}

function toDisplayPrice(num) {
  return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2) + ':-';
}

//*****************************************************************************************
//-------------------- Visual indicator on addition in cart ------------------------------- By J. del Pilar
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
//----------------------------- Monday discount 10% before 10:00 -------------------------- By J. del Pilar
//*****************************************************************************************

function giveMondayDiscount() {
  if (useMondayDiscount) {
    const messageToUser = 'Måndag morgon, varsågod du får 10 % rabatt på din beställning';
    document.getElementById('msg__to__user').innerText = messageToUser;

    let reducedPrice = document.getElementById('cart__total__price').innerHTML.replace(':-', '');

    reducedPrice = Number(reducedPrice * 0.9);
    document.getElementById('cart__total__price').innerHTML = reducedPrice + ':-';
  }
}
//*****************************************************************************************
//---------------------------- Manual discount code --------------------------------------- By J. del Pilar
//*****************************************************************************************

const discountInput = document.getElementById('discount');

discountInput.addEventListener('change', giveDiscount);

function giveDiscount() {
  if (discountInput.value == 'a_damn_fine-cup_of_coffee') {
    let newPrice = document.getElementById('cart__total__price').innerHTML.replace(':-', '');
    newPrice = Number(newPrice * 0);
    document.getElementById('cart__payment__price').innerHTML = newPrice + ':-';
  } else {
    toDisplayPrice(0);
    updateTotalPrice();
    giveMondayDiscount();
  }
}

//*****************************************************************************************
//--------------------------- Toggle between card & invoice ------------------------------- By Hanna
//*****************************************************************************************

paymentCardInput.addEventListener('change', switchPaymentEventHandler);
paymentInvoiceInput.addEventListener('change', switchPaymentEventHandler);

function switchPaymentEventHandler(e) {
  switchPayment(e.target.id);
}

function switchPayment(paymentType) {
  if (paymentType == 'paymentCard') {
    paymentInvoiceBox.classList.remove('showPaymentInvoice');
    paymentInvoiceBox.classList.add('hiddenPaymentInvoice');

    paymentCardBox.classList.remove('hiddenPaymentCard');
    paymentCardBox.classList.add('showPaymentCard');
  }
  if (paymentType == 'paymentInvoice') {
    paymentCardBox.classList.remove('showPaymentCard');
    paymentCardBox.classList.add('hiddenPaymentCard');

    paymentInvoiceBox.classList.remove('hiddenPaymentInvoice');
    paymentInvoiceBox.classList.add('showPaymentInvoice');
  }
}

//*****************************************************************************************
//------------------------ Validate form (enables order button) --------------------------- By Hanna
//*****************************************************************************************

const orderBtn = document.querySelector('#orderButton');
orderBtn.disabled = true;

const validatedTexts = document.querySelectorAll('.checkout__validated__text');
const validatedCheckboxes = document.querySelectorAll('.checkout__validated__checkbox');
const paymentCardRadio = document.querySelector('#paymentCard');
const paymentInvoiceRadio = document.querySelector('#paymentInvoice');
const socialSecurityNumber = document.querySelector('#socialSecurityNumber');

for (let text of validatedTexts) {
  text.addEventListener('input', validate);
}

for (let box of validatedCheckboxes) {
  box.addEventListener('change', validate);
}

paymentCardRadio.addEventListener('change', validate);
paymentInvoiceRadio.addEventListener('change', validate);

function validate() {
  let shouldEnable = true;

  for (let text of validatedTexts) {
    if (text.value == '' && window.getComputedStyle(text.parentElement.parentElement, null).display !== 'none') {
      shouldEnable = false;
    }
  }

  for (let box of validatedCheckboxes) {
    if (!box.checked) {
      shouldEnable = false;
    }
  }

  if (!paymentCardRadio.checked && !paymentInvoiceRadio.checked) {
    shouldEnable = false;
  }

  orderBtn.disabled = !shouldEnable;
}

const checkoutForm = document.querySelector('.checkout__form');
checkoutForm.addEventListener('submit', order);

//*****************************************************************************************
//---------------------- Validate form (when clicking order button) ----------------------- By Hanna
//*****************************************************************************************

function order(e) {
  e.preventDefault();

  const zipCode = document.querySelector('#zipCode');
  const zipCodeSpan = document.querySelector('#zipCodeSpan');
  const phoneNumber = document.querySelector('#phoneNumber');
  const phoneNumberSpan = document.querySelector('#phoneNumberSpan');
  const socialSecurityNumber = document.querySelector('#socialSecurityNumber');
  const socialSecurityNumberSpan = document.querySelector('#socialSecurityNumberSpan');

  const regexZC = /^\d{3}[ ]?\d{2}$/;
  const regexPN = /^(([+]46)\s*(7)|07)[02369]\s*(\d{4})\s*(\d{3})$/;
  const regexSSN = /^(19|20)?[0-9]{6}[- ]?[0-9]{4}$/;

  const orderMessage = document.querySelector('#orderMessage');
  orderMessage.innerHTML = '';

  zipCodeSpan.innerHTML = 'Postnummer';
  zipCodeSpan.classList.remove('errorMessage');
  phoneNumberSpan.innerHTML = 'Telefonnummer';
  phoneNumberSpan.classList.remove('errorMessage');
  socialSecurityNumberSpan.innerHTML = 'Personnummer';
  socialSecurityNumberSpan.classList.remove('errorMessage');

  let hasErrors = false;
  let errors = [];

  if (!regexZC.test(zipCode.value)) {
    zipCodeSpan.innerHTML = 'Postnummer *';
    zipCodeSpan.classList.add('errorMessage');

    hasErrors = true;
    errors.push('Fyll i ett giltligt postnummer!');
  }

  if (!regexPN.test(phoneNumber.value)) {
    phoneNumberSpan.innerHTML = 'Telefonnummer *';
    phoneNumberSpan.classList.add('errorMessage');

    hasErrors = true;
    errors.push('Fyll i ett giltligt telefonnummer!');
  }

  if (window.getComputedStyle(socialSecurityNumber.parentElement.parentElement, null).display !== 'none' && !regexSSN.test(socialSecurityNumber.value)) {
    socialSecurityNumberSpan.innerHTML = 'Personnummer *';
    socialSecurityNumberSpan.classList.add('errorMessage');

    hasErrors = true;
    errors.push('Fyll i ett giltligt personnummer!');
  }

  if (hasErrors) {
    for (let i = 0; i < errors.length; i++) {
      if (i > 0) {
        orderMessage.innerHTML += '<br>';
      }
      orderMessage.innerHTML += errors[i];
    }
  }

  if (!hasErrors) {
    const firstName = document.querySelector('#firstName');
    alert(`Tack för din beställning ${firstName.value}! Leverans sker ${getDeliveryTime()}`);

    const formInputs = document.querySelectorAll('.lock');

    for (let i = 0; i < formInputs.length; i++) {
      formInputs[i].disabled = true;
    }
  }
}

//*****************************************************************************************
//---------------------------------------- Delivery --------------------------------------- By Hanna
//*****************************************************************************************

function getDeliveryTime() {
  if (now.getDay() === 6 || now.getDay() === 7) {
    return 'om 90 min.'; //if customer orders on a saturday or sunday
  }

  if (now.getHours() >= 0 && now.getHours() <= 6) {
    return 'om 45 min.'; //if customer orders between 24:00 & 6:00
  }

  if (now.getDay() === 4 && now.getHours() >= 11 && now.getHours() <= 13) {
    return 'kl 15:00.'; //if customer orders on a friday between 11:00 & 13:00
  }

  return 'om 30 min.'; //standard-delivery
}

//*****************************************************************************************
//------------------------------ Clear form after 15 minutes ------------------------------ By Hanna
//*****************************************************************************************

function resetForm() {
  document.querySelector('.checkout__form').reset();
  alert('Nu tog det lite lång tid... Om du vill beställa får du fylla i formuläret igen.');
}

setTimeout(resetForm, 1000 * 60 * 15);

//*****************************************************************************************
//----------------------------------- Delete order-button --------------------------------- By Hanna
//*****************************************************************************************

const clearOrderBtn = document.querySelector('#clearOrder');
clearOrderBtn.addEventListener('click', clearOrder);

function clearOrder() {
  document.querySelector('.checkout__form').reset();
  for (let i = 0; i < ducksDatabase.length; i++) {
    ducksDatabase[i].amount = 0;
  }
  renderCart();
  renderDucks();
}

//*****************************************************************************************
//--------------------------- Christmas theme on Christmas eve ---------------------------- By David
//*****************************************************************************************

if (isChristmasEve) {
  const body = document.querySelector('#body');
  body.classList.add('body__christmas__theme');

  const checkoutForm = document.querySelector('.checkout__form');
  const allLabels = checkoutForm.querySelectorAll('label');

  for (let label of allLabels) {
    const spans = label.querySelectorAll('span');

    for (let span of spans) {
      span.classList.add('span__christmas__theme');
    }
  }
}

//*****************************************************************************************
//------------------------------------ Slideshow ------------------------------------------ By David
//*****************************************************************************************

// funktion för att sätta eller ta bort class hidden
function switchImage(e) {
  const index = e.currentTarget.id.replace('prevImg', '').replace('nextImg', '');
  const img1 = document.querySelector(`#img__1-${index}`);
  const img2 = document.querySelector(`#img__2-${index}`);

  if (img1.classList.contains('hidden')) {
    img1.classList.remove('hidden');
    img2.classList.add('hidden');
  } else {
    img1.classList.add('hidden');
    img2.classList.remove('hidden');
  }
}
