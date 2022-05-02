const express = require('express')
const app = express()

const cors = require('cors')

const port = 5000
const morgan = require('morgan')
app.use(morgan('combined'))

const route = require('./routes')
const db = require('./config/db')

//Connect to DB
db.connect();

app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());

app.use(cors());

route(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})