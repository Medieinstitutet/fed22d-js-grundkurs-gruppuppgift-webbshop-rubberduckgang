/**
 *  Kund / Varukorgs funktioner, lägga till och ta bort varor.
 * 
 *  1. Lägga till varor i varukorgen
 *  2. Ta bort varor från varukorgen
 *  3. Uppdatera totalpriset
 *  4. Kassa knapp???
 */

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

//Uppdatera totalpriset.


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
