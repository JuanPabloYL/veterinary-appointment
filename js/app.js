// Variables
const ownerInput = document.querySelector('[data-name="owner"]');
const petInput = document.querySelector('[data-name="pet"]');
const telephoneInput = document.querySelector('[data-name="telephone"]');
const dateInput = document.querySelector('[data-name="date"]');
const timeInput = document.querySelector('[data-name="time"]');
const syntomsInput = document.querySelector('[data-name="syntoms"]');

const form = document.querySelector('[data-name="form"]');

const citaObj = {
  owner: "",
  pet: "",
  telephone: "",
  date: "",
  time: "",
  syntoms: "",
};

class UI {}

class Appointmetn {
  constructor() {
    this.citas = [];
  }
}

const ui = new UI();

eventListeners();
function eventListeners() {
  [
    ownerInput,
    petInput,
    telephoneInput,
    dateInput,
    timeInput,
    syntomsInput,
  ].forEach((input) => input.addEventListener("input", dataAppointment));

  form.addEventListener("submit", handleAppointment);
}

function dataAppointment(e) {
  const target = e.target;
  citaObj[target.name] = target.value;
  console.log(citaObj);
}

function handleAppointment(e) {
  e.preventDefault();

  if (Object.values(citaObj).some((value) => value === "")) {
    ui.handleAlert("All fields are required", "error");
    return;
  }
}
