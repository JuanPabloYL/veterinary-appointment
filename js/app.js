// Variables
const ownerInput = document.querySelector('[data-name="owner"]');
const petInput = document.querySelector('[data-name="pet"]');
const telephoneInput = document.querySelector('[data-name="telephone"]');
const dateInput = document.querySelector('[data-name="date"]');
const timeInput = document.querySelector('[data-name="time"]');
const syntomsInput = document.querySelector('[data-name="syntoms"]');

const form = document.querySelector('[data-name="form"]');
const appointmentsContainer = document.querySelector(
  '[data-name="appointments"]',
);

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

  handleLI(input, text, node) {
    const li = document.createElement("li");
    li.classList.add(
      "flex",
      "justify-around",
      "gap-[5rem]",
      "text-lg",
      "border-b",
      "pb-2",
    );

    const label = document.createElement("p");
    label.classList.add("text-gray-400", "text-left", "w-full");
    label.textContent = text;

    const labelName = document.createElement("p");
    labelName.classList.add("font-bold", "w-full");
    labelName.textContent = input;

    li.appendChild(label);
    li.appendChild(labelName);

    node.appendChild(li);
    return li;
  }

  displayAppointment({ appointments }) {
    this.clearHTML(appointmentsContainer);
    appointments.forEach((appointment) => {
      const ul = document.createElement("ul");
      ul.classList.add("bg-white", "p-2", "mt-[1.5rem]");
      for (const element in appointment) {
        this.handleLI(appointment[element], element, ul);
      }

      appointmentsContainer.appendChild(ul);
    });
  }

  clearHTML(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
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
  citaObj["id"] = Date.now();
  handleAppointments.handleAppointment({ ...citaObj });
  ui.displayAppointment(handleAppointments);

  form.reset();
}
