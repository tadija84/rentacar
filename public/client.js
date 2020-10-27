getCarsData();
const newVehicleButton = document.getElementById("newVehicle");
newVehicleButton.addEventListener("click", setNewVehicle);
const pageReloadButton = document.getElementById("pageReload");
pageReloadButton.addEventListener("click", pageReload);

const newClientButton = document.getElementById("newClient");
newClientButton.addEventListener("click", setNewClient);
const showClientsButton = document.getElementById("showAllClients");
showClientsButton.addEventListener("click", getClientsData);

const newVehicleOperation = document.getElementById("newVehicleButton");
newVehicleOperation.addEventListener("click", addingNewVehicle);
const newVehicleCanceling = document.getElementById("cancelingNewVehicle");
newVehicleCanceling.addEventListener("click", cancelingNewVehicle);

const addNewClient = document.getElementById("addNewClient");
addNewClient.addEventListener("click", addingNewClient);

const cancelClient = document.getElementById("cancelNewClient");
cancelClient.addEventListener("click", cancelingNewClient);

const allCars = document.getElementById("allCars");
const allClients = document.getElementById("allClients");

function pageReload() {
  window.location.reload();
}
async function setNewVehicle() {
  const vehicleType = document.getElementById("vehicleType").value;
  const vehicleBrand = document.getElementById("vehicleBrand").value;
  const vehicleModel = document.getElementById("vehicleModel").value;
  const constructionYear = document.getElementById("constructionYear").value;
  const fuelType = document.getElementById("fuelType").value;
  const seatsNumber = document.getElementById("seatsNumber").value;
  const pricePerDay = document.getElementById("pricePerDay").value;
  let vehicle = {
    vehicleType: vehicleType,
    vehicleBrand: vehicleBrand,
    vehicleModel: vehicleModel,
    constructionYear: constructionYear,
    fuelType: fuelType,
    seatsNumber: seatsNumber,
    pricePerDay: pricePerDay,
    reserved: false,
    reservedToClient: "",
    rented: false,
    rentedToClient: "",
  };
  let data = JSON.stringify(vehicle);
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };
  fetch("/api", options).then((res) => {});
}
async function getCarsData() {
  const response = await fetch("/api");
  const carsData = await response.json();
  for (let i = carsData.length - 1; i >= 0; i--) {
    const mainCarWrap = document.createElement("div");
    mainCarWrap.setAttribute("class", "one-vehicle");
    mainCarWrap.setAttribute("id", `${carsData[i]._id}`);
    const vehicleType = document.createElement("p");
    vehicleType.textContent = `Type of vehicle: ${carsData[i].vehicleType}`;
    vehicleType.setAttribute("class", "vehicle-type-data vehicle-data");
    const vehicleBrand = document.createElement("p");
    vehicleBrand.textContent = `Brand of vehicle: ${carsData[i].vehicleBrand}`;
    vehicleBrand.setAttribute("class", "vehicle-brand-data vehicle-data");
    const vehicleModel = document.createElement("p");
    vehicleModel.textContent = `Model of vehicle: ${carsData[i].vehicleModel}`;
    vehicleModel.setAttribute("class", "vehicle-model-data vehicle-data");
    const constructionYear = document.createElement("p");
    constructionYear.textContent = `Year of construction: ${carsData[i].constructionYear}`;
    constructionYear.setAttribute("class", "construction-year vehicle-data");
    const fuelType = document.createElement("p");
    fuelType.textContent = `Type of fuel: ${carsData[i].fuelType}`;
    fuelType.setAttribute("class", "type-of-fuel vehicle-data");
    const seatsNumber = document.createElement("p");
    seatsNumber.textContent = `Number of seats: ${carsData[i].seatsNumber}`;
    seatsNumber.setAttribute("class", "number-of-seats vehicle-data");
    const pricePerDay = document.createElement("p");
    pricePerDay.textContent = `Price per day: ${carsData[i].pricePerDay}`;
    pricePerDay.setAttribute("class", "price-per-day vehicle-data");
    const available = document.createElement("p");
    if (carsData[i].reserved === false || carsData[i].rented === false) {
      available.textContent = "This vehicle is available";
    } else {
      available.textContent = "This vehicle is not available";
    }
    available.setAttribute("class", "availability vehicle-data");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit vehicle";
    editButton.addEventListener("click", function () {
      editSelectedVehicle(carsData[i]);
    });

    const reserveButton = document.createElement("button");
    reserveButton.textContent = "Reserve vehicle";
    reserveButton.addEventListener("click", function () {
      reserveSelectedVehicle(carsData[i]);
    });

    const rentButton = document.createElement("button");
    rentButton.textContent = "rent vehicle";
    rentButton.addEventListener("click", function () {
      rentSelectedVehicle(carsData[i]);
    });

    mainCarWrap.append(
      vehicleType,
      vehicleBrand,
      vehicleModel,
      constructionYear,
      fuelType,
      seatsNumber,
      pricePerDay,
      available,
      editButton,
      reserveButton,
      rentButton
    );
    allCars.append(mainCarWrap);
  }
}

function reserveSelectedVehicle() {}
function rentSelectedVehicle(selectedVehicle) {
  document.getElementById("wrapper").classList.add("hiden");
  const rentingPage = document.getElementById("rentingVehicle");
  rentingPage.classList.remove("hiden");

  const mainCarWrap = document.createElement("div");
  mainCarWrap.setAttribute("class", "one-vehicle-renting one-vehicle");
  //mainCarWrap.setAttribute("id", `selectedVehicle._id}`);
  const vehicleType = document.createElement("p");
  vehicleType.textContent = `Type of vehicle: ${selectedVehicle.vehicleType}`;
  vehicleType.setAttribute("class", "vehicle-type-data vehicle-data");
  const vehicleBrand = document.createElement("p");
  vehicleBrand.textContent = `Brand of vehicle: ${selectedVehicle.vehicleBrand}`;
  vehicleBrand.setAttribute("class", "vehicle-brand-data vehicle-data");
  const vehicleModel = document.createElement("p");
  vehicleModel.textContent = `Model of vehicle: ${selectedVehicle.vehicleModel}`;
  vehicleModel.setAttribute("class", "vehicle-model-data vehicle-data");
  const constructionYear = document.createElement("p");
  constructionYear.textContent = `Year of construction: ${selectedVehicle.constructionYear}`;
  constructionYear.setAttribute("class", "construction-year vehicle-data");
  const fuelType = document.createElement("p");
  fuelType.textContent = `Type of fuel: ${selectedVehicle.fuelType}`;
  fuelType.setAttribute("class", "type-of-fuel vehicle-data");
  const seatsNumber = document.createElement("p");
  seatsNumber.textContent = `Number of seats: ${selectedVehicle.seatsNumber}`;
  seatsNumber.setAttribute("class", "number-of-seats vehicle-data");
  const pricePerDay = document.createElement("p");
  pricePerDay.textContent = `Price per day: ${selectedVehicle.pricePerDay}`;
  pricePerDay.setAttribute("class", "price-per-day vehicle-data");

  mainCarWrap.append(
    vehicleType,
    vehicleBrand,
    vehicleModel,
    constructionYear,
    fuelType,
    seatsNumber,
    pricePerDay
  );

  const cancelRentButton = document.createElement("button");
  cancelRentButton.textContent = "Cancel";
  cancelRentButton.addEventListener("click", cancelRenting);

  rentingPage.append(mainCarWrap, cancelRentButton);
}

function cancelRenting() {
  document.getElementById("wrapper").classList.remove("hiden");
  document.getElementById("rentingVehicle").classList.add("hiden");
}

async function setNewClient() {
  const clientsName = document.getElementById("clientsName").value;
  const clientsEmail = document.getElementById("clientsEmail").value;
  const clientsPhone = document.getElementById("clientsPhone").value;
  let client = {
    clientsName: clientsName,
    clientsEmail: clientsEmail,
    clientsPhone: clientsPhone,
  };
  let data = JSON.stringify(client);
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };
  fetch("/clients", options).then((res) => {});
  document.getElementById("newClientWrap").classList.add("hiden");
  getClientsData();
}

async function getClientsData() {
  allClients.innerHTML = "";
  document.getElementById("wrapper").classList.add("hiden");
  allClients.classList.remove("hiden");

  const response = await fetch("/clients");
  const clientsData = await response.json();
  const clientsHeading = document.createElement("h3");
  clientsHeading.textContent = "All clients";
  clientsHeading.setAttribute("class", "edit-heading");
  const backToBasic = document.createElement("button");
  backToBasic.textContent = "Cancel";
  backToBasic.addEventListener("click", pageReload);
  allClients.append(clientsHeading, backToBasic);
  for (let i = 0; i < clientsData.length; i++) {
    const bigClientWrap = document.createElement("div");
    bigClientWrap.setAttribute("class", "one-client");
    bigClientWrap.setAttribute("id", `${clientsData[i]._id}`);

    const clientsName = document.createElement("p");
    clientsName.textContent = `Customer's name: ${clientsData[i].clientsName}`;
    clientsName.setAttribute("class", "clients-name-paraf client-data");

    const clientsEmail = document.createElement("p");
    clientsEmail.textContent = `Customer's email: ${clientsData[i].clientsEmail}`;
    clientsEmail.setAttribute("class", "clients-email-paraf client-data");

    const clientsPhone = document.createElement("p");
    clientsPhone.textContent = `Customer's phone: ${clientsData[i].clientsPhone}`;
    clientsPhone.setAttribute("class", "clients-phone-numb client-data");

    const clientsButtons = document.createElement("div");
    clientsButtons.setAttribute("class", "client-buttons");

    const deleteClientButton = document.createElement("button");
    deleteClientButton.innerText = "DELETE CUSTOMER";
    clientsButtons.append(deleteClientButton);
    deleteClientButton.setAttribute("class", "delete-buton");
    deleteClientButton.addEventListener("click", function () {
      let request = {
        clientId: clientsData[i]._id,
      };
      let data = JSON.stringify(request);
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      };
      fetch("/delClient", options);
      getClientsData();
    });
    const editClientButton = document.createElement("button");
    editClientButton.innerText = "Edit client";
    editClientButton.addEventListener("click", function () {
      editingClient(clientsData[i]);
    });
    clientsButtons.append(editClientButton);
    bigClientWrap.append(
      clientsName,
      clientsEmail,
      clientsPhone,
      clientsButtons
    );
    allClients.append(bigClientWrap);
  }
}
function editingClient(clientData) {
  //allClients.classList.add("hiden");
}

async function editSelectedVehicle(vehicleData) {
  document.getElementById("editingVehicle").classList.remove("hiden");
  document.getElementById("wrapper").classList.add("hiden");
  const editVehicleDiv = document.getElementById("editingVehicle");

  const editHeading = document.createElement("h2");
  editHeading.innerText = "Edit selected vehicle";
  editHeading.setAttribute("class", "edit-heading");

  const typeLabel = document.createElement("label");
  typeLabel.innerText = "Vehicle type";
  typeLabel.setAttribute("class", "vehicle-data-label");
  const array = ["Economy", "Estate", "Luxury", "SUV", "Cargo"];

  const vehicleType = document.createElement("select");

  for (let i = 0; i < array.length; i++) {
    let option = document.createElement("option");
    option.value = array[i].toLowerCase();
    option.text = array[i];
    vehicleType.appendChild(option);
  }

  vehicleType.setAttribute("class", "vehicle-type-change vehicle-data");

  const brandLabel = document.createElement("label");
  brandLabel.innerText = "Vehicle brand";
  brandLabel.setAttribute("class", "vehicle-data-label");
  const vehicleBrand = document.createElement("input");
  vehicleBrand.value = `${vehicleData.vehicleBrand}`;
  vehicleBrand.setAttribute("class", "vehicle-brand-change vehicle-data");

  const modelLabel = document.createElement("label");
  modelLabel.innerText = "Vehicle model";
  modelLabel.setAttribute("class", "vehicle-data-label");
  const vehicleModel = document.createElement("input");
  vehicleModel.value = `${vehicleData.vehicleModel}`;
  vehicleModel.setAttribute("class", "vehicle-model-change vehicle-data");

  const yearLabel = document.createElement("label");
  yearLabel.innerText = "construction year";
  yearLabel.setAttribute("class", "vehicle-data-label");
  const constructionYear = document.createElement("input");
  constructionYear.value = `${vehicleData.constructionYear}`;
  constructionYear.setAttribute(
    "class",
    "vehicle-construction-year-change vehicle-data"
  );

  const fuels = ["Diesel", "Gasoline", "Hybrid", "Electricity"];
  const fuelLabel = document.createElement("label");
  fuelLabel.setAttribute("class", "vehicle-data-label");
  fuelLabel.innerText = "Type of fuel";
  const fuelType = document.createElement("select");
  for (let i = 0; i < fuels.length; i++) {
    let option = document.createElement("option");
    option.value = fuels[i].toLowerCase();
    option.text = fuels[i];
    fuelType.appendChild(option);
  }

  fuelType.setAttribute("class", "vehicle-fuel-type-change vehicle-data");

  const seatsLabel = document.createElement("label");
  seatsLabel.innerText = "Number of seats";
  seatsLabel.setAttribute("class", "vehicle-data-label");
  const seatsNumber = document.createElement("input");
  seatsNumber.value = `${vehicleData.seatsNumber}`;
  seatsNumber.setAttribute("class", "vehicle-seats-number-change vehicle-data");

  const priceLabel = document.createElement("label");
  priceLabel.innerText = "Price per day";
  priceLabel.setAttribute("class", "vehicle-data-label");
  const pricePerDay = document.createElement("input");
  pricePerDay.value = `${vehicleData.pricePerDay}`;
  pricePerDay.setAttribute(
    "class",
    "vehicle-price-per-day-change vehicle-data"
  );

  const reservationLabel = document.createElement("label");
  reservationLabel.innerText = "Reserved";
  reservationLabel.setAttribute("class", "vehicle-data-label");
  const reserved = document.createElement("input");
  reserved.value = `${vehicleData.reserved}`;
  reserved.setAttribute("class", "vehicle-reserved-change vehicle-data");

  const rentedLabel = document.createElement("label");
  rentedLabel.innerText = "Rented";
  rentedLabel.setAttribute("class", "vehicle-data-label");
  const rented = document.createElement("input");
  rented.value = `${vehicleData.rented}`;
  rented.setAttribute("class", "vehicle-reserved-change vehicle-data");

  const rentedToClientLabel = document.createElement("label");
  rentedToClientLabel.innerText = "Rented to client";
  rentedToClientLabel.setAttribute("class", "vehicle-data-label");
  const rentedToClient = document.createElement("input");
  rentedToClient.value = `${vehicleData.rentedToClient}`;
  rentedToClient.setAttribute("class", "vehicle-reserved-change vehicle-data");

  const reservedToClientLabel = document.createElement("label");
  reservedToClientLabel.innerText = "Reserved to client";
  reservedToClientLabel.setAttribute("class", "vehicle-data-label");
  const reservedToClient = document.createElement("input");
  reservedToClient.value = `${vehicleData.reservedToClient}`;
  reservedToClient.setAttribute(
    "class",
    "vehicle-reserved-change vehicle-data"
  );

  const editButton = document.createElement("button");
  editButton.textContent = "Edit vehicle";
  editButton.addEventListener("click", function () {
    let request = {
      vehicleId: vehicleData._id,
      vehicleType: vehicleType.value,
      vehicleBrand: vehicleBrand.value,
      vehicleModel: vehicleModel.value,
      constructionYear: constructionYear.value,
      fuelType: fuelType.value,
      seatsNumber: seatsNumber.value,
      pricePerDay: pricePerDay.value,
      reserved: reserved.value,
      reservedToClient: reservedToClient.value,
      rented: rented.value,
      rentedToClient: rentedToClient.value,
    };
    let data = JSON.stringify(request);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    };
    fetch("/editing", options);
  });
  editButton.setAttribute("class", "one-edit-button");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "DELETE VEHICLE";
  deleteButton.addEventListener("click", function () {
    let request = {
      vehicleId: vehicleData._id,
    };
    let data = JSON.stringify(request);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    };
    fetch("/deleting", options);
  });
  deleteButton.setAttribute("class", "delete-buton one-edit-button");

  const cancelEditingButton = document.createElement("button");
  cancelEditingButton.textContent = "Cancel";
  cancelEditingButton.addEventListener("click", function () {
    document.getElementById("editingVehicle").innerHTML = "";
    document.getElementById("editingVehicle").classList.add("hiden");
    document.getElementById("wrapper").classList.remove("hiden");
  });
  cancelEditingButton.setAttribute("class", "one-edit-button");
  const threeButtons = document.createElement("div");
  threeButtons.setAttribute("class", "three-buttons");
  threeButtons.append(editButton, cancelEditingButton, deleteButton);

  editVehicleDiv.append(
    editHeading,
    typeLabel,
    vehicleType,
    brandLabel,
    vehicleBrand,
    modelLabel,
    vehicleModel,
    yearLabel,
    constructionYear,
    fuelLabel,
    fuelType,
    seatsLabel,
    seatsNumber,
    priceLabel,
    pricePerDay,
    reservationLabel,
    reserved,
    rentedLabel,
    rented,
    rentedToClientLabel,
    rentedToClient,
    reservedToClientLabel,
    reservedToClient,
    threeButtons
  );
}

function addingNewVehicle() {
  document.getElementById("wrapper").classList.add("hiden");
  document.getElementById("newVehicle").classList.remove("hiden");
}

function cancelingNewVehicle() {
  document.getElementById("wrapper").classList.remove("hiden");
  document.getElementById("newVehicle").classList.add("hiden");
}
function addingNewClient() {
  document.getElementById("wrapper").classList.add("hiden");
  document.getElementById("newClientWrap").classList.remove("hiden");
}
function cancelingNewClient() {
  document.getElementById("wrapper").classList.remove("hiden");
  document.getElementById("newClientWrap").classList.add("hiden");
}
