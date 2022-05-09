const express = require('express');
const authRoute = require("./routes/authRoute");
const joueurRoute = require("./routes/joueurRoute");
const entreneurRoute = require("./routes/entreneurRoute");
const produitRoute = require("./routes/produitRoute");
const categoryRoute = require("./routes/categoryRoute");
const reservationRoute = require("./routes/reservationRoute");
const cors = require("cors");
const app = express();
// const bodyParser = require("body-parser");
let multer = require('multer');
let upload = multer();


// app.use(express.urlencoded());
// app.use(express.json());


app.use("/uploads", express.static("uploads"));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Request-Method','*');
  res.setHeader('Access-control-Allow-Headres','*');
  next();
})




app.listen(3000, ()=> {
    console.log("application started on port 3000")
})


require('./middleware/db');


// app.use( bodyParser.json() );
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json(), cors());
app.use("/api/user",upload.fields([]),authRoute);
app.use("/api/joueur",joueurRoute);
app.use("/api/entreneur",entreneurRoute);
app.use("/api/produit",produitRoute);
app.use("/api/category",categoryRoute);
app.use("/api/reservation",reservationRoute);