import '../css/2-forms.css';

document.addEventListener('DOMContentLoaded', function () {
  const formData = {
    email: '',
    message: '',
    clear() {
      this.email = '';
      this.message = '';
    },
  };
  const form = document.querySelector('.feedback-form');
  // console.log('init.form', form);

  const localStorageKey = 'feedback-form-state';
  const savedFormData = getFormDataFromLocalStorage();
  // console.log('savedFormData:', savedFormData);
  if (savedFormData) {
    formData.email = form.email.value = savedFormData.email;
    formData.message = form.message.value = savedFormData.message;
  }
  // console.log('init.formData', formData);

  function getFormDataFromLocalStorage() {
    //return JSON.parse(localStorage.getItem(localStorageKey));
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  }

  form.addEventListener('input', handleInput);
  function handleInput(event) {
    const key = event.target.name;
    const value = event.target.value.trim();
    formData[key] = value;

    localStorage.setItem(localStorageKey, JSON.stringify(formData));
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
