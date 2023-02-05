
const express = require('express')

const app = express();
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()

const vaccines = require('./routes/vaccines');
const users = require("./routes/users");
const auth = require("./routes/auth");


app.use(express.json());
app.use(cors({
  origin: 'https://main--peppy-pony-00d3ac.netlify.app'
}))

app.use('/vaccines', vaccines);
app.use("/users", users);
app.use("/signin", auth);
app.use('/uploads', express.static('uploads'));

module.exports = app