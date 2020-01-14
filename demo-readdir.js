var fs = require('fs')

fs.readdir( "c:/" , "utf-8" , (err,data) => {
    console.log(data)
})