var express = require("express")
var app = express();
var parse = require("body-parser")

app.use(parse.json())

var messages = 
[
	{name:'Sumesh',message:'Hello human'},
	{name:'Felix',message:'Hello 9 yr old'}
]

app.use(express.static(__dirname)) 
var server = app.listen(3000, ()=>{
    console.log(" listening to the server from port ",server.address().port)
});

app.get('/main', (req,res)=>{
	res.send(messages)
}) 

app.post('/main', (req,res)=>{
	console.log(req.body)
	messages.push(req.body)
	res.sendStatus(200);
})