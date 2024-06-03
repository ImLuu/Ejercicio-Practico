const express = require('express');
const morgan = require("morgan");
const routes = require("./routes/index.routes");
const cors = require("cors");
const PORT = require("dotenv").config();

//Config
const app = express();

//PORT
app.set('port', process.env.PORT)
app.use(express.json());
app.use(cors());
app.listen(app.get('port'));
console.log("PORT: " + app.get("port"));

app.use(morgan("dev"))

//Using the routes
app.use(routes);
