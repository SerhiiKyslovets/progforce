'use strict';

const winnerBtn = document.getElementById('new-winner-btn');
const saveBtn = document.getElementById('save-btn');

let allParticipants = [];

let rows;
let editMode = false;
let eidtableRow;

const inputs = document.querySelectorAll('input');
const table = document.getElementById('people');
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

const patterns = {
  name: /^[a-z]{2,10}$/i,
  surname: /^[a-z]{2,10}$/i,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2-8})?$/,
  phone: /^$|^\d{9,12}?$/
}


inputs.forEach((input) => {
  input.addEventListener('keyup', (evt) => {
    validateInput(evt.target, patterns[evt.target.attributes.name.value]);
    validateForm(inputs);
  });
})


function validateInput (field, reg) {
  if (reg.test(field.value)) {
    field.className = 'valid';
  } else {
    field.className = 'invalid';
  }
}


function validateForm () {
  let formIsValid = true;  

  inputs.forEach((input) => {
    let inputIsValid = (!(input.classList.contains('invalid')) 
      && !((input.hasAttribute('required') && (input.value === ''))
    )) ? true : false;

    formIsValid = formIsValid && inputIsValid;
  });
  
  if (formIsValid) {
    saveBtn.disabled = false;
  } else {
    saveBtn.disabled = true;
  }

  return formIsValid;
}


function addRow (...args) {
  const data = [...args];

  const tableRef = table.getElementsByTagName('tbody')[0];
  const row = document.createElement('tr');
  row.id = data[0];
  row.className = 'editable';
  
  for (let i = 0; i < 4; i++ ) {
    const cell = document.createElement('td');
    const nameText = document.createTextNode(data[i + 1]);

    cell.appendChild(nameText);
    row.appendChild(cell);
  }
  
  tableRef.appendChild(row);
}


function clearForm() {
  nameInput.value = '';
  surnameInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';
  saveBtn.disabled = true;
  editMode = false;
}


function createParticipant (Model, ...args) {
  let participant = new Model(...args);
  allParticipants.push(participant);

  addRow(...args);
  clearForm();
}

saveBtn.onclick = function(evt) {
  evt.preventDefault();

  if (editMode) {
    allParticipants[eidtableRow].name = nameInput.value;
    allParticipants[eidtableRow].surname = surnameInput.value;
    allParticipants[eidtableRow].email = emailInput.value;
    allParticipants[eidtableRow].phone = phoneInput.value;

    document.getElementById(eidtableRow).childNodes[0].innerHTML = nameInput.value;
    document.getElementById(eidtableRow).childNodes[1].innerHTML = surnameInput.value;
    document.getElementById(eidtableRow).childNodes[2].innerHTML = emailInput.value;
    document.getElementById(eidtableRow).childNodes[3].innerHTML = phoneInput.value;

    clearForm();
  } else {
    const id = allParticipants.length;
    const name = capitalizeFirstLetter(nameInput.value.toLowerCase());
    const surname = capitalizeFirstLetter(surnameInput.value.toLowerCase());
    const email = emailInput.value;
    const phone = phoneInput.value;

    createParticipant(class Participant {
      constructor(id, name, surname, email, phone) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
      }
    }, id, name, surname, email, phone)
  }

  rows = document.getElementsByClassName('editable');
  
  for (let i = 0; i < rows.length; i++) {
    rows[i].addEventListener('click', (evt) => {
      editMode = true;
      eidtableRow = i;
      editData(i);
    })
  }

}


function editData(id) {
  nameInput.value = allParticipants[id].name;
  surnameInput.value = allParticipants[id].surname;
  emailInput.value = allParticipants[id].email;
  phoneInput.value = allParticipants[id].phone;
}



function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function getWinnerFullName (winnerObj) {
  return `${winnerObj.name} ${winnerObj.surname}`;
}


winnerBtn.onclick = function () {
  const participantsAmount =  allParticipants.length;

  if (participantsAmount < 2) {
    alert ('Add at least two participants');
  } else {
    const winner = allParticipants[Math.floor(Math.random() * participantsAmount)];
    const winnerFullName = getWinnerFullName(winner);
    document.getElementById('winners-block').innerHTML = winnerFullName;
  }
}