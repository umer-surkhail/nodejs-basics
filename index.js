// Import the Node.js http module
var http = require('http'); 
const url = require("url");
  
// req is the request object which is
// coming from the client side
// res is the response object which is going
// to client as response from the server
  
// Create a server object
http.createServer(function (req, res) {
    // console.log(req)
    const reqUrl = url.parse(req.url).pathname
    console.log(reqUrl)
    if(reqUrl==="/") {
        res.writeHead(200, {'Content-Type': 'text/html'}); 
  
        // Write a response to the client
        res.write('Congrats you have a created a web server');
    
        // End the response
        res.end();
    }

    else if(reqUrl==="/list") {
        res.writeHead(200, {'Content-Type': 'text/html'}); 
  
        // Write a response to the client
        res.write('Congrats you received a list');
    
        // End the response
        res.end();
    } 
    else {
        res.writeHead(400, {'Content-Type': 'text/html'}); 
  
        // Write a response to the client
        res.write('Page not found');
    
        // End the response
        res.end();
    }

  
}).listen(8081); // Server object listens on port 8081
  
console.log('Node.js web server at port 8081 is running..')