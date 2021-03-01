const axios = require('axios')
require('dotenv').config({
  path: '../.env',
})
const { client } = require('../database')

async function email() {}
email()

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    const formdata = JSON.parse(event.body)
    if (formdata.EMAIL) {
      try {
        await client.connect()
        await client.db('sairam').command({ ping: 1 })
        console.log('connected')
        const dbcollection = client.db('sairam').collection('newsletter')
        const result = await dbcollection.findOne({ Email: formdata.EMAIL })
        if (result) {
          console.log(result, 'You already Registered for our newsletter')
          return {
            statusCode: 203,
            body: 'You already Registered for our newsletter',
          }
        } else {
          try {
            const data = {
              Name: formdata.NAME,
              Email: formdata.EMAIL,
              Date: formdata.DATE,
            }
            const Name = formdata.NAME
            const Email = formdata.EMAIL
            const insetresult = await dbcollection.insertOne(data)
            console.log('Insert Result', insetresult)
            const url = process.env.SERVER_URL + 'api/sendmail'
            await axios
              .post(url, {
                Name,
                Email,
              })
              .then((x) => console.log('Email is sent', x))

            return {
              statusCode: 200,
              body: 'Saved into database And sent Mail',
            }
          } catch (err) {
            console.log('Error', err.message)
            return {
              statusCode: 503,
              body: 'Internal Error Occured',
            }
          }
        }
      } catch (err) {
        return {
          statusCode: 501,
          body: 'Internal Server Error',
        }
      }
    } else {
      return {
        statusCode: 403,
        body: 'Please Send email data',
      }
    }
  }
  return {
    statusCode: 401,
    body: 'Acess the Server with Post Method',
  }
}
