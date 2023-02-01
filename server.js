const app = require('./app')

const mongoose = require('mongoose')
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/vaccines');

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.listen(port, () => {
    console.log(`Server up at ${port}`)
  });