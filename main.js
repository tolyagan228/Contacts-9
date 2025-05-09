// main.js

const firstNameInput = document.querySelector(".tag");
const lastNameInput = document.querySelector(".surname");
const phoneInput = document.querySelector(".tel");
const emailInput = document.querySelector(".email");
const saveButton = document.querySelector(".contact__btn");
const contactListBlock = document.querySelector(".contact__list");

let editContactIndex = null;

const loadContacts = () => {
  try {
    return JSON.parse(localStorage.getItem("savedContacts")) || [];
  } catch {
    return [];
  }
};

const updateStorage = (data) => {
  localStorage.setItem("savedContacts", JSON.stringify(data));
};

const renderList = () => {
  const data = loadContacts();
  contactListBlock.innerHTML = "";
  data.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className = "contact__item";
    li.innerHTML = `
      <div class="contact-text__box">
        <p class="contact__name">${item.first} ${item.last}</p>
        <p class="contact__tel">${item.phone}</p>
        <p class="contact__email">${item.email}</p>
      </div>
      <div class="contact-btn__box">
        <button class="contact-edit__btn" data-edit="${idx}">Редактировать</button>
        <button class="contact-del__btn" data-remove="${idx}">Удалить</button>
      </div>
    `;
    li.querySelector("[data-edit]").onclick = () => editEntry(idx);
    li.querySelector("[data-remove]").onclick = () => deleteEntry(idx);
    contactListBlock.appendChild(li);
  });
};

const clearFields = () => {
  firstNameInput.value = "";
  lastNameInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
  editContactIndex = null;
  saveButton.textContent = "Зберегти";
};

const addOrUpdate = () => {
  const contact = {
    first: firstNameInput.value.trim(),
    last: lastNameInput.value.trim(),
    phone: phoneInput.value.trim(),
    email: emailInput.value.trim(),
  };
  if (!contact.first || !contact.last || !contact.phone || !contact.email)
    return;
  // есть чатик немного
  const records = loadContacts();
  if (editContactIndex !== null) {
    records[editContactIndex] = contact;
  } else {
    records.push(contact);
  }

  updateStorage(records);
  renderList();
  clearFields();
};

const editEntry = (index) => {
  const contact = loadContacts()[index];
  firstNameInput.value = contact.first;
  lastNameInput.value = contact.last;
  phoneInput.value = contact.phone;
  emailInput.value = contact.email;
  editContactIndex = index;
  saveButton.textContent = "Оновити";
};

const deleteEntry = (index) => {
  const updated = loadContacts().filter((_, i) => i !== index);
  updateStorage(updated);
  renderList();
};

saveButton.addEventListener("click", addOrUpdate);
window.addEventListener("DOMContentLoaded", renderList);
