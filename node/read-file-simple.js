const http = require("http");
const path = require("path");
const fs = require("fs");
const mime = {
    png: 'image/png'
}
const server = http.createServer((req, res)=> {
    if(req.url.indexOf("/images/") > -1) {
        const reqPath = req.url;
        const filePath = path.join(__dirname, reqPath);
        const extname = path.extname(filePath)
        const extension = extname.slice(1)
        const rStream = fs.createReadStream(filePath);
        res.setHeader("Content-type", mime[extension])
        rStream.pipe(res)
        // res.end("send file in response");
    }
});

server.listen(3001)
