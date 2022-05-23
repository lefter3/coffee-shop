const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
var cors = require('cors')
const app = express();
const http = require('http');
const server = http.createServer(app);
const apiRouter = require('./api');
// import { mainRouter as apiRouter } from './api';
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongo_uri = 'mongodb://localhost:27017/menu';
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */

  console.log('new client connected');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});
app.use('/api', apiRouter);

server.listen(process.env.PORT || 8080);
