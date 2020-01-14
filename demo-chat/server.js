var express = require("express")
var app = express();

app.use(express.static(__dirname)) 
var server = app.listen(3000, ()=>{
    console.log(" listening to the server from port ",server.address().port)
});