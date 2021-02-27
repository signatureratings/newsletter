const express = require('express')
const app = new express()
const path = require('path')
const axios = require('axios').default
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
require('dotenv').config()
const { client } = require('./database')

app.post('/', async (req, res) => {
  console.log(req.body)
  try {
    await client.connect()
    await client.db('sairam').command({ ping: 1 })
    console.log('connected')
    const dbcollection = client.db('sairam').collection('newsletter')
    const findresult = await dbcollection.findOne({ Email: req.body.EMAIL })
    if (findresult) {
      console.log('The Email is already in our database')
      return res.status(203).json('The Email is already in our Database')
    } else {
      const inserted = await dbcollection.insertOne({
        Name: req.body.NAME,
        Email: req.body.EMAIL,
        Date: req.body.DATE,
      })
      console.log(inserted)
      axios.post('api/sendmail', {
        Name: req.body.NAME,
        Email: req.body.EMAIL,
        Subject: 'Thank you for Subscribing to the NewsLetter',
      })
      console.log('I called serverless function')
    }
  } catch (err) {
    console.log('Error Occured: ', err.message)
    return res.status(501).json('Internal Server Error')
  }
  return res.status(200).json('You registered for our NewsLetter')
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
