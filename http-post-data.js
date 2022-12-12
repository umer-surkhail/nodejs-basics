const http = require("http");

const server = http.createServer((request, response) => {
    const chunks = [];
    request.on("data", (chunk) => {
        console.log(chunk)
      chunks.push(chunk);
    });
    request.on("end", () => {
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
    });
});

server.listen(8081, () => {
  console.log("Server is running on Port 8081");
});