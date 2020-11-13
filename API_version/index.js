
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./router')
const cors = require('cors');

app.use(cors());

app.use("/", cors() ,router);

app.listen(port);

console.log("Process started on port " + port);
