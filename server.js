var express = require('express')
var app = express()
var http = require('http')
var path = require('path')
var cors = require('cors')
app.use(express.static(path.join(__dirname, 'build')))
app.use(cors())
app.PORT = process.env.PORT || 8080

var server = http.createServer(app)

server.listen(app.PORT, () => {
  console.log('listening in ', app.PORT)
})
