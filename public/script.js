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
      .post('/', {
        NAME,
        EMAIL,
        DATE,
      })
      .then((response) => {
        console.log(response)
      })
    email.value = ''
    nam.value = ''
    message.innerText = 'Your Email is registered to the NewsLetter'
  } catch (err) {
    console.log(err.message)
    message.innerText = 'There is an Error in our System'
  }
  button.disabled = false
  button.innerHTML = 'Submit for NewsLetter'
})
