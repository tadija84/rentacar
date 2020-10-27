const express = require("express");
const app = express();

const Datastore = require("nedb");

/* const port = process.env.PORT || 3000;
 app.listen(port, () => {
   console.log(`Starting server at ${port}`);
 });*/
app.use(express.static("public"));
app.use(express.json());
app.listen(3000, () => {
  console.log(`Starting server at 3000`);
});

const database = new Datastore("cardatabase.db");
database.loadDatabase();
const clientsBase = new Datastore("clientsDatabase.db");
clientsBase.loadDatabase();

app.get("/api", (request, response) => {
  database.find({}, (err, data) => response.json(data));
});
app.post("/api", (req, res) => {
  const data = req.body;
  database.insert(data);
  res.json({ status: "clicked", data });
});

app.post("/clients", (req, res) => {
  const clientData = req.body;
  clientsBase.insert(clientData);
  res.json({ status: "clicked", clientData });
});
app.get("/clients", (request, response) => {
  clientsBase.find({}, (err, data) => response.json(data));
});

app.post("/editing", (req, res) => {
  const data = req.body;
  database.find({ _id: data.vehicleId }, (err, result) => {
    console.log("data is", data);
    database.update(
      { _id: data.vehicleId },
      {
        $set: {
          vehicleType: data.vehicleType,
          vehicleBrand: data.vehicleBrand,
          vehicleModel: data.vehicleModel,
          constructionYear: data.constructionYear,
          fuelType: data.fuelType,
          seatsNumber: data.seatsNumber,
          pricePerDay: data.pricePerDay,
          reserved: data.reserved,
          rented: data.rented,
          rentedToClient: data.rentedToClient,
          reservedToClient: data.reservedToClient,
        },
      },
      { multi: false },
      function (err, numReplaced) {}
    );
  });
  res.json({ status: "back", data });
});

app.post("/deleting", (req, res) => {
  const data = req.body;
  database.find({ _id: data.vehicleId }, (err, result) => {
    console.log("data is deleted", data);
    database.remove({ _id: data.vehicleId }, { multi: true }, function (
      err,
      numRemoved
    ) {});
  });
  res.json({ status: "deleted", data });
});
app.post("/delClient", (req, res) => {
  const data = req.body;
  clientsBase.find({ _id: data.clientId }, (err, result) => {
    console.log("data is deleted", data);
    clientsBase.remove({ _id: data.clientId }, { multi: true }, function (
      err,
      numRemoved
    ) {});
  });
  res.json({ status: "deleted", data });
});
