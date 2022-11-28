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