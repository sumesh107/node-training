var fs = require('fs');
var data = require('./data.json');

console.log( data.name )

fs.readFile( "/data.json", 'utf-8' , (err,data)=> {
    //var info = JSON.parse(data);
    //console.log( info.name );
})