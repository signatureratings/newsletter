require('dotenv').config({
  path: '../.env',
})
const nodemailer = require('nodemailer')

async function sendemail(data) {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    var options = {
      from: process.env.EMAIL_USER,
      to: data.Email,
      subject: data.Subject,
      text: 'For clients supports only Text',
      html: `<div><h1>Hello, ${data.Name}</h1>
      <p>${data.Subject}</p>
      </div>`,
    }
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info)
      }
    })
  } catch (err) {
    console.log(err.message)
  }
}

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    const formdata = JSON.parse(event.body)
    if (!formdata.Email) {
      console.log('No email Submitted')
      return {
        statusCode: 401,
        body: 'Send the request with an email',
      }
    } else {
      const emaildata = {
        Name: formdata.Name,
        Email: formdata.Email,
        Subject:
          formdata.Subject || 'Thank you for Subscribing to the NewsLetter',
      }
      sendemail(emaildata)
      console.log('Email Sended')
      return {
        statusCode: 200,
        body: 'Email is sent',
      }
    }
  }
  return {
    statusCode: 401,
    body: 'Send a Post Request u fool',
  }
}
