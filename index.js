const express = require('express')
const app = express()
const cors=require('cors')
require('dotenv').config()
const port = process.env.PORT ||5000

// middleware
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('assaignment_category_004')
})

app.listen(port, () => {
  console.log(`Hotel_Booking app listening on port ${port}`)
})