var express = require('express')
var app = express()
var http = require('http')
var path = require('path')
var cors = require('cors')

app.use(cors({
  origin: ['https://trello.com',
    'https://api-meu-formulario.herokuapp.com',
    'http://localhost:8080']
}))

app.use(express.static(path.join(__dirname, 'build')))

app.PORT = process.env.PORT || 8080

var server = http.createServer(app)

server.listen(app.PORT, () => {
  console.log('listening in ', app.PORT)
})

app.get('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})
