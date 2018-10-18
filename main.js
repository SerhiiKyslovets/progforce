'use strict';

const winnerBtn = document.getElementById('new-winner-btn');
const saveBtn = document.getElementById('save-btn');

let allParticipants = [];

function createParticipant (Model, ...args) {
  let participant = new Model(...args);
  allParticipants.push(participant);
}



saveBtn.onclick = function () {
  const name = document.getElementById('name').value;
  
  createParticipant(class Participant {
    constructor(name, surname, email, phone) {
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.phone = phone;
    }
  }, name, 'Kyslovets', 'serhii.love@gmail.com', '0938820506')  
  
  console.log(allParticipants);
}

winnerBtn.onclick = function () {
  console.log('New winner!');
}