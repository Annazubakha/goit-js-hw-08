import throttle from 'lodash.throttle';
import { save, load } from './localstorage-api';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const STORAGE_KYE = 'feedback-form-state';
savedForm();
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(evt) {
  const userData = load(STORAGE_KYE) || {};
  const { name, value } = evt.target;
  userData[name] = value;
  save(STORAGE_KYE, userData);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const { email, message } = evt.target.elements;
  console.log({ email: email.value, message: message.value });
  localStorage.removeItem(STORAGE_KYE);
  evt.target.reset();
}

function savedForm() {
  let userData = load(STORAGE_KYE);
  if (userData) {
    Object.entries(userData).forEach(([key, value]) => {
      refs.form.elements[key].value = value;
    });
  }
}
