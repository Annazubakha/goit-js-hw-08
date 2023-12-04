import throttle from 'lodash.throttle';
import { save } from './localstorage-api';
import { load } from './localstorage-api';

const refs = {
  form: document.querySelector('.feedback-form'),
};

let userData = {};

const STORAGE_KYE = 'feedback-form-state';
savedForm();
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(evt) {
  const target = evt.target;
  const formValue = target.value;
  const formName = target.name;
  userData[formName] = formValue;
  save(STORAGE_KYE, userData);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.target.reset();
  localStorage.removeItem(STORAGE_KYE);
  console.log(userData);
}

function savedForm() {
  let userData = load(STORAGE_KYE);
  if (userData) {
    Object.entries(userData).forEach(([key, value]) => {
      refs.form.elements[key].value = value;
    });
  }
}
