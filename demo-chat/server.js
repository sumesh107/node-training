var express = require("express")
var app = express();
var parse = require("body-parser")
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(parse.json())
app.use(express.static(__dirname))
app.use(parse.urlencoded({extended:false}))

var messages = 
[
	{name:'Sumesh',message:'Hello human'},
	{name:'Felix',message:'Hello 9 yr old'}
]

//pushes message onto 'www.localhost:3000/main'
app.get('/main', (req,res)=>{
	res.send(messages)
}) 

var server = http.listen(3000, ()=>{
    console.log(" listening to the server from port ",server.address().port)
});

//pushing a request body to test Postman. 
app.post('/main', (req,res)=>{
	console.log(req.body);
	messages.push(req.body);
	io.emit('message',req.body);
	res.sendStatus(200);
})

//socket connection 
io.on('connection', (socket) => {
	console.log("a user is connected by socket")
})
