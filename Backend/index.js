const express = require('express');
const morgan = require("morgan")
const routes = require("./routes/index.routes")

//Config
const app = express();

//PORT
app.set('port', 4000)
app.use(express.json());
app.listen(app.get('port'));
console.log("PORT: " + app.get("port"));

app.use(morgan("dev"))

//Using the routes
app.use(routes);

