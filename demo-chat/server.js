var express = require("express")
var app = express();
var parse = require("body-parser")
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(parse.json())
app.use(express.static(__dirname))
app.use(parse.urlencoded({extended:false}))

var Message = mongoose.model('Message',{
	name : String,
	message : String
})

var messages = 
[
	{name:'Sumesh',message:'Hello human'},
	{name:'Felix',message:'Hello 9 yr old'}
]

var dbUrl = 'mongodb+srv://admin:admin@cluster0.ruz9g.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority';
//database url 

//pushes message onto 'www.localhost:3000/messages'
app.get('/messages', (req,res)=>{
	res.send(messages)
}) 

//connecting to mongoose
mongoose.connect( dbUrl , { useUnifiedTopology: true , useNewUrlParser: true} , (err) => {
	console.log(' mongoose is connected', err);
})

//pushing a request body to test Postman. 
app.post('/messages', (req,res)=>{
	console.log(req.body);

	var mongo_msg = new Message( req.body );

	mongo_msg.save( (err) => {
		if (err)
			sendStatus(500);
			// 
		messages.push(req.body);
		io.emit('messaging',req.body);
		res.sendStatus(200);
	} )
	
})

//socket connection 
io.on('connection', (socket) => {
	console.log("a user is connected by socket")
})

var server = http.listen(3000, ()=>{
    console.log(" listening to the server from port ",server.address().port)
});