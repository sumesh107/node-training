fs = require('fs');

function phonenumber(err,data)
{
    console.log(data);
}

fs.readdir('c:/', phonenumber);

console.log(" This should be printed at last ");