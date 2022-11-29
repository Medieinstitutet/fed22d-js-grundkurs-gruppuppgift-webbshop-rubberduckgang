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
  checkoutCartRow.classList.add('checkout__cart--row')
  const checkoutCart = document.getElementsByClassName('checkout__cart')[0];
  let duckTitle = checkoutCart.getElementsByClassName('duck__title');
  for (let i = 0; i < duckTitle.length; i++) {
    if(duckTitle[i].innerText == title) {
      alert('Oj, denna vara ligger redan i varukorgen!');
      return;
    }
  }
  
  const cartRowContent = 
  `
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
  `
  checkoutCartRow.innerHTML = cartRowContent;
  checkoutCart.append(checkoutCartRow);
  updateTotalPrice();
}