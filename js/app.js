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

class UI {
  handleAlert(msg, type) {
    const exists = document.querySelector("[data-name='alert']");
    if (exists) return;
    const div = document.createElement("div");
    div.dataset.name = "alert";
    div.classList.add(
      "w-full",
      "rounded",
      "text-white",
      "absolute",
      "top-[-1.5rem]",
      "text-center",
      "font-bold",
      "text-lg",
    );
    div.textContent = msg;

    if (type) {
      div.classList.add("bg-red-500");
    } else {
      div.classList.add("bg-green-500");
    }

    form.prepend(div);

    setTimeout(() => {
      div.remove();
    }, 3000);
  }

  displayAppointment(appointments) {
    console.log(appointments);
  }
}

class Appointment {
  constructor() {
    this.appointments = [];
  }

  handleAppointment(appointment) {
    this.appointments = [...this.appointments, appointment];
  }
}

const ui = new UI();
const handleAppointments = new Appointment();

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

  form.addEventListener("submit", addAppointment);
}

function dataAppointment(e) {
  const target = e.target;
  citaObj[target.name] = target.value;
}

function addAppointment(e) {
  e.preventDefault();

  if (Object.values(citaObj).some((value) => value === "")) {
    ui.handleAlert("All fields are required", "error");
    return;
  }
  ui.handleAlert("Appointment created");
  handleAppointments.handleAppointment({ ...citaObj });
  ui.displayAppointment(handleAppointments);

  form.reset();
}
