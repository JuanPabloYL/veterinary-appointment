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

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("flex", "mt-[1rem]");

      const editButton = document.createElement("button");
      editButton.classList.add(
        "flex",
        "justify-around",
        "w-full",
        "text-white",
        "bg-gradient-to-r",
        "from-blue-500",
        "via-blue-600",
        "to-blue-700",
        "hover:bg-gradient-to-br",
        "focus:ring-4",
        "focus:outline-none",
        "focus:ring-blue-300",
        "dark:focus:ring-blue-800",
        "font-medium",
        "rounded-lg",
        "text-sm",
        "px-5",
        "py-2.5",
        "text-center",
        "mr-2",
        "mb-2",
      );
      editButton.innerHTML = `
             <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Edit
      `;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add(
        "flex",
        "justify-around",
        "w-full",
        "text-white",
        "bg-gradient-to-r",
        "from-red-400",
        "via-red-500",
        "to-red-600",
        "hover:bg-gradient-to-br",
        "focus:ring-4",
        "focus:outline-none",
        "focus:ring-red-300",
        "dark:focus:ring-red-800",
        "font-medium",
        "rounded-lg",
        "text-sm",
        "px-5",
        "py-2.5",
        "text-center",
        "mr-2",
        "mb-2",
      );
      deleteButton.innerHTML = `
            <svg
                xmlns="http://www.w4.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              Delete
      `;

      btnContainer.appendChild(editButton);
      btnContainer.appendChild(deleteButton);

      for (const element in appointment) {
        this.handleLI(appointment[element], element, ul);
      }

      ul.appendChild(btnContainer);
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
