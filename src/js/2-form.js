import '../css/2-forms.css';

document.addEventListener('DOMContentLoaded', function () {
  const localStorageKey = 'feedback-form-state';
  const formData = {
    email: '',
    message: '',
    clear() {
      this.email = '';
      this.message = '';
    },
  };
  console.log('init.formData', formData);

  const form = document.querySelector('.feedback-form');
  console.log('init.form', form);

  form.addEventListener('input', handleInput);
  function handleInput(event) {
    // console.log(`input:${event.target.name}:[${event.target.value}]`);
    const key = event.target.name;
    const value = event.target.value.trim();
    formData[key] = value;

    // const inputName = event.target.name;
    // if (inputName === 'email') {
    //   formData.email = event.target.value.trim();
    // } else if (inputName === 'message') {
    //   formData.message = event.target.value.trim();
    // }
    //console.log('handleInput:formData', formData);
    //    saveFormDataToLocalStorage(formData);
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  }

  const savedFormData = getFormDataFromLocalStorage();
  console.log('savedFormData:', savedFormData);
  if (savedFormData) {
    form.email.value = savedFormData.email;
    form.message.value = savedFormData.message;
  }

  //   function saveFormDataToLocalStorage(formData) {
  //       localStorage.setItem(localStorageKey, JSON.stringify(formData));
  // }

  function getFormDataFromLocalStorage() {
    //return JSON.parse(localStorage.getItem(localStorageKey));
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  }
  /*
function getFormDataFromLocalStorage() {
  const savedData = localStorage.getItem(localStorageKey);
    //return JSON.parse(localStorage.getItem(localStorageKey));
    console.log('savedData', savedData);
    console.log('savedData.Type', typeof savedData);
    const json = JSON.parse(savedData);
    console.log('json', json);
    console.log('json.Type', typeof json);
    return json;
  }
  return null;
}
*/
  function validateForm(formData) {
    for (const key in formData) {
      if (formData[key] === '') {
        return false;
      }
    }
    return true;
  }

  form.addEventListener('submit', handleSubmit);
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    if (formData.email === '' || formData.message === '') {
      return alert('Fill please all fields');
    }
    console.log(formData);
    localStorage.removeItem(localStorageKey);
    formData.clear();
    form.reset();
  }
});
