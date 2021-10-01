// server/index.js
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;


var db=require('./database');
const app = express();

const jwt= require('jsonwebtoken');

app.use(express.json());
app.use(cors()); 

var profileRouter = require('./routes/profile-route');
app.use('/', profileRouter);
app.use('/isUserAuth', profileRouter);
app.use('/editprofile', profileRouter);
app.use('/editaddress', profileRouter);
app.use('/uploadprofileimage', profileRouter);
var registrationRouter = require('./routes/registration-route');
app.use('/', registrationRouter);

var loginRouter = require('./routes/login-route');
app.use('/', loginRouter);




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});