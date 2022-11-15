/**
 *  Kund / Varukorgs funktioner, lägga till och tabort varor.
 */

// Tabort vara ur kundkorgen.

const removeProductBtn = document.getElementsByClassName('btn-danger'); // Variabel för att komma åt varje knapp med klassen "btn-danger" (Rensa)
for (let i = 0; i < removeProductBtn.length; i++) {
    let removeBtn = removeProductBtn[i];
    removeBtn.addEventListener('click', function(e) {
        let removeBtnClicked = e.target
        removeBtnClicked.parentElement.parentElement.remove();
    })
}