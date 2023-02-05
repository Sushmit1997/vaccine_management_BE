const app = require('./app')

const mongoose = require('mongoose')
const port = process.env.PORT || 5000;

const dataBaseUrl = 'mongodb+srv://sushmit:d0Kursd8XPXaSlR2@cluster0.k446z.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dataBaseUrl);

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.listen(port, () => {
    console.log(`Server up at ${port}`)
  });