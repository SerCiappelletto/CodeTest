
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./router')
const cors = require('cors');
const bodyParser = require('body-parser');

bodyParser.urlencoded({extended: true});

app.use(cors());
app.use(bodyParser.json());

app.use("/", router);

app.listen(port);

console.log("Process started on port " + port);
