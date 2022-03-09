const http = require('http');
http.createServer((request,response) =>{
    // console.log(request.body,request.params,request.query);
   console.log( request.url)
//    response.setHeader("content-type","application/json")
    response.write(JSON.stringify({name:"vinay",age:"27"}));
response.end();
}).listen(3333);

