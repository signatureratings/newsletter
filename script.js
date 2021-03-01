const myform = document.getElementById('myform')
var email = document.getElementById('Email')
var nam = document.getElementById('Name')
var button = document.getElementById('button')
var message = document.getElementById('message')

myform.addEventListener('submit', async function (e) {
  e.preventDefault()
  button.disabled = true
  button.innerHTML = '<span class="sending"></span>'
  const EMAIL = email.value
  const NAME = nam.value
  let DATE = new Date()
  try {
    console.log(nam.value)
    console.log(email.value)
    await axios
      .post('api/request', {
        NAME,
        EMAIL,
        DATE,
      })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          message.innerText = 'Your Email is registered to the NewsLetter'
        } else if (response.status === 203) {
          message.innerText = 'Your Email is already registered to the NewsLetter'
        }
      })
    email.value = ''
    nam.value = ''
  } catch (err) {
    console.log(err.message)
    if (err.message === 'Request failed with status code 403') {
      message.innerText = 'Use Post Method to Access the Server'
    } else {
      message.innerText = 'There is an Error in internal System'
    }
  }
  button.disabled = false
  button.innerHTML = 'Submit for NewsLetter'
})
