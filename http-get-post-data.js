// Import the HTTP module
const http = require("http");
// Import the URL module
const url = require("url");

// Make our HTTP server
const server = http.createServer((req, res) => {
  // Set our header
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Parse the request url
  const parsed = url.parse(req.url, true);
  console.log(parsed);
  // Get the path from the parsed URL
  const reqUrl = parsed.pathname;
  // Compare our request method
  if (req.method == "GET") {
    if (reqUrl == "/") {
      // Send a JSON version of our URL query
      res.write("Hello, you sent\n" + JSON.stringify(parsed.query));
      res.end();
    }
  } else if (req.method == "POST") {
    if (reqUrl == "/") {
      const chunks = [];
      req.on("data", (chunk) => {
        console.log(chunk);
        chunks.push(chunk);
      });
      req.on("end", () => {
        console.log("all parts/chunks have arrived");
        const data = Buffer.concat(chunks);
        console.log("Data: ", data);
        const stringData = data.toString();
        console.log("stringData: ", stringData);
        const parsedData = new URLSearchParams(stringData);
        console.log(parsedData, "parsedData");
        const dataObj = {};
        for (var pair of parsedData.entries()) {
          dataObj[pair[0]] = pair[1];
        }
        console.log("DataObj: ", dataObj);
        let responseData = [
            { a: 1, b: 2, c: { x: 1, y: 2, z: { a: 1, b: 2, z: 3 } } },
            { a: 2, b: 3, c: { x: 1, y: 2 } },
          ];
          console.log("THIS IS MY LOG");
          console.log(responseData);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify(responseData));
          res.end();
      });
    }
  }
});
// Have the server listen on port 9000
server.listen(8081);
