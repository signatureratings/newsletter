const { default: axios } = require('axios')

async function run() {
  const Name = 'Sairam'
  const Email = 'balusairam26@gmail.com'

  await axios
    .post('http://localhost:8888/api/sendmail', {
      Name,
      Email,
    })
    .then((data) => console.log(data.data))
    .catch((err) => console.log(err, 'error occured'))
}
run()
