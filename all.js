const http = require("http");
const url = require("url");
const fs = require("fs");
const busboy = require("busboy");

http.createServer(async (req, res) => {
    //////// 1 
    // // res.setHeader("Content-type", "text/html")
    // res.writeHeader(200, {"Content-type": "text/html"})
    // res.write("Hello World!");
    // res.write("\t");
    // res.write("\n");
    // res.write("Hello World Again!");
    // res.write("\t");
    // res.end("Hello World Finally Ended!");

    //////// 2
    // const parsedUrl = url.parse(req.url);
    // console.log(parsedUrl)
    // const currentPathname = parsedUrl.pathname;
    // if(currentPathname === "/") {
    //     res.end("You're at root route");
    // }
    // else if(currentPathname === "/users") {
    //     res.end("You're at users route");
    // }
    // else {
    //     res.writeHead(404);
    //     res.end("Nothing found!");
    // }

    /////// 3
    const currentPathname = url.parse(req.url).pathname;
    if(currentPathname==="/") {
        if(req.method === "GET") {
            const currentQuery = url.parse(req.url).query;
            console.log("const currentQuery = url.parse(req.url).query;", currentQuery)
            const currentParsedQuery = new URLSearchParams(currentQuery);
            console.log(currentParsedQuery)
            let data = {};
            for(var entry of currentParsedQuery.entries()) {
                data[entry[0]] = entry[1]
            }
            console.log("datadatadatadata");
            console.log(data);
            // writeToFile(data)
            //wait before moving further
            await wait();
            const appended = await appendToFile(data);
            console.log("appended")
            console.log(appended)
            // res.end("This is a get request")
            res.end("This is a get request")
            console.log("response already ended")
        }
        if(req.method === "POST") {
            console.log(url.parse(req.url))
            let chunks = [];
            res.end("This is a post request")
            req.on('data', (chunk)=>{
                chunks.push(chunk)
            })
            req.on('end', ()=>{
                const data = Buffer.concat(chunks);

                console.log("datadatadatadata")
                console.log(data)
                const stringData = data.toString();
                console.log(stringData)
                const parsedData = new URLSearchParams(stringData);
                console.log(parsedData)
                let ObjData = {}
                for(var entry of currentParsedQuery.entries()) {
                    ObjData[entry[0]] = entry[1]
                }
                console.log(ObjData)
            })
        }
    }
    if(currentPathname==="/form") {
        if(req.method === "POST") {
            const bb = busboy({ headers: req.headers });
            bb.on('file', (name, file, info) => {
              const { filename, encoding, mimeType } = info;
              console.log(`File [${name}]: filename: ${filename}, encoding: ${encoding}, mimeType: ${mimeType}`);
              file.on('data', (data) => {
                console.log(`File [${name}] got ${data.length} bytes`);
              }).on('close', () => {
                console.log(`File [${name}] done`);
              });
            });
            bb.on('field', (name, val, info) => {
              console.log(`Field [${name}]: value: ${val}`);
            });
            bb.on('close', () => {
              console.log('Done parsing form!');
            //   res.writeHead(303, { Connection: 'close', Location: '/' });
              res.end("Hello");
            });
            req.pipe(bb);
        }
    }

}).listen(8081, ()=> {
    console.log("server is started");
})

function writeToFile(data) {
    fs.writeFile("data.txt", JSON.stringify(data), ()=>{
        console.log("done");
    })
}

function appendToFile(data) {
    return new Promise((resolve, reject)=>{
        fs.appendFile("data.txt", JSON.stringify(data), ()=>{
            console.log("done")
            resolve(1);
        })
    })
}

function wait() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(0)
        },2000)
    })
}