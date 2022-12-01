function validateInput(fieldName, errorFieldId) {
  let inputField = document.getElementById(fieldName).value;
  const errorField = document.getElementById(errorFieldId);

  if (inputField.length === 0) {
    errorField.innerHTML = '*';
    return false;
  }

  errorField.innerHTML = '<i class="fa-solid fa-check"></i>';
  return true;
}

validateInput('zipCode', 'zipCodeError');

//*****************************************************************************************
//----------------- Kod som vi testat men inte använder i projektet -----------------------
//*****************************************************************************************

function addDuckToCart() {
  let checkoutCartRow = document.createElement('div');
  checkoutCartRow.classList.add('checkout__cart--row');
  const checkoutCart = document.getElementsByClassName('checkout__cart')[0];
  let duckTitle = checkoutCart.getElementsByClassName('duck__title');
  for (let i = 0; i < duckTitle.length; i++) {
    if (duckTitle[i].innerText == title) {
      alert('Oj, denna vara ligger redan i varukorgen!');
      return;
    }
  }

  const cartRowContent = `
          <article class="checkout__cart__article--product">
            <img src=${image} alt="" width="100">
            <p>${title}</p>
          </article>

          <article class="checkout__cart__article--price">
            <span class="cart__product--price">${price}</span>
          </article>

          <article class="checkout__cart__article--quantity">
            <!--- Denna label ska göras visually-hidden i css/sass -->
            <label class="visually-hidden" for="amount">antal</label>
            <input type="number" class="cart__product--amount" id="amount" name="antal" min="1" value="1">

            <button role="button" class="btn-danger">Rensa</button>
          </article>
  `;
  checkoutCartRow.innerHTML = cartRowContent;
  checkoutCart.append(checkoutCartRow);
  updateTotalPrice();
}

let currentImageIndex = 0;
console.log(currentImageIndex);

//Variabler för knapparna Nästa och Föregående bild
const nextImgBtn = document.querySelectorAll('button[data-operator="nextImg"]');
const prevImgBtn = document.querySelectorAll('button[data-operator="prevImg"]');

// loop för att sätta eventlistener till funktionerna på knapparna
for (let i = 0; i < nextImgBtn.length; i++) {
  nextImgBtn[i].addEventListener('click', nextImage);
  prevImgBtn[i].addEventListener('click', prevImage);
}

function nextImage(e) {
  const index = e.currentTarget.id;
  let img = e.currentTarget.parentNode.childNodes[3].src;

  if (currentImageIndex + 1 > ducksDatabase.image - 1) {
    currentImageIndex = 0;
  } else {
    currentImageIndex += 1;
  }

  console.log(currentImageIndex);
}
console.log(img);
console.log(index);

function prevImage(e) {
  const index = e.currentTarget.id;
  console.log(index);
}

function nextImage() {
  if (currentImageIndex + 1 > images.length - 1) {
    //restart from beginning
    currentImageIndex = 0;
    swapImages(images.length - 1, currentImageIndex);
  } else {
    currentImageIndex += 1;
    swapImages(currentImageIndex - 1, currentImageIndex);
  }

  console.log('nextImage', currentImageIndex);
}

function prevImage() {
  if (currentImageIndex - 1 < 0) {
    // Restart from end
    currentImageIndex = images.length - 1;
    swapImages(0, currentImageIndex);
  } else {
    currentImageIndex -= 1;
    swapImages(currentImageIndex + 1, currentImageIndex);
  }

  console.log('prevImage', currentImageIndex);
}
