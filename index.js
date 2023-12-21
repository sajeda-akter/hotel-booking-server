const express = require('express')
const app = express()
const cors=require('cors')
require('dotenv').config()
const port = process.env.PORT ||5000

// middleware
app.use(express.json())
app.use(cors())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nvo4nkj.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const roomsCollection=client.db('hotel_booking_DB').collection('rooms')
    const bookingCollection=client.db('hotel_booking_DB').collection('booking')


    // get all the rooms info
    app.get('/rooms',async(req,res)=>{
      // const price=req.query.price
      const query={}
      const options={
        sort:{"price":-1}
      }
    
      // console.log(query)
      const result=await roomsCollection.find(query,options).toArray()
      res.send(result)
    })

    // spesific data by id
    app.get('/rooms/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)}
      const result=await roomsCollection.findOne(query)
    
      res.send(result)
    })

    // all the booking insert
    app.post('/booking',async(req,res)=>{
      const query=req.body;
      const result=await bookingCollection.insertOne(query)
      res.send(result)
    })
    
    // get booking data by specific email
    app.get('/booking',async(req,res)=>{
      const email=req.query.email;
      const query={email:email}
      const result=await bookingCollection.find(query).toArray()
      res.send(result)
    })

    // delete specific data by using id
    app.delete('/booking/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)}
      const deleteBooked=await bookingCollection.deleteOne(query)
      res.send(deleteBooked)

    })
    // Send a ping to confirm a successful connection
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('assaignment_category_0004')
})

app.listen(port, () => {
  console.log(`Hotel_Booking app listening on port ${port}`)
})