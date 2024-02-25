#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();
var https = require('https');


const expressWs = require('express-ws')(app);
var aWss = expressWs.getWss('/');

app.ws('/', function(ws, req) {
    console.log('WEB SOCKET: Connection from web site!!');
    
    ws.onmessage = function(msg) {
    console.log(msg.data);
    aWss.clients.forEach(function (client) {
      client.send(msg.data);
    });
  };
});

app.ws('/raspberrypi', function(ws, req) {
    console.log('WEB SOCKET: Connection from Raspberry Pi!!');
    
    // SENDING MESSAGE TO RPI
    ws.send(`hello`);
    
    // RECEIVING MESSAGE FROM RPI
    ws.on('message', function(msg) {
        tempFromRPi = msg
        console.log(`Message from RaspberryPi: ${msg}`);
        
    });
});

// END WEB SOCKET

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs')

app.use(express.static('static'))

app.get('/', function (req, res) {
     res.redirect('https://recovering.sites.tjhsst.edu/entry')
})

const router = require('./router.js');
app.use(router);


app.get('/will', function (req, res) {
//   res.send('Hello Will')
    
     res.render('will2')
})
app.get('/amith', function (req, res) {
//   res.send('Hello Will')
    
     res.render('amith')
})
app.get('/tommy', function (req, res) {
//   res.send('Hello Will')
    
     res.render('tommy')
})

app.get('/on', function (req, res) {
   console.log("im turning on")
   res.send('turning on')
})

app.get('/off', function (req, res) {
    console.log("im turning off")
   res.send('turning off')
})


// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("EXPRESS IS WORKING WAHOOO!!! :D");
});