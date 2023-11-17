const express = require('express');

const app = express();

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})



app.listen(5050);