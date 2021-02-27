const env = require('dotenv')
env.config()
const { MongoClient } = require('mongodb')
const url = process.env.DATABASE_URL

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function run() {
  try {
    await client.connect()
    await client.db('sairam').command({ ping: 1 })
    console.log('connected')
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { client, run }
