const http = require("http");
const url = require("url");
const busboy = require("busboy");
const path = require("path");
const fs = require("fs");

http.createServer((req, res)=> {
    // res.write("Hello World!\n");
    // res.write("Hello World!\n");
    // res.write("Hello World Again!\t")
    // res.end("Hello World Finally!");
    // res.end("Hello World Finally!");
    console.log(req.url);
    const pathname = url.parse(req.url).pathname;
    console.log(pathname)
    if(pathname === "/") {
        console.log(req.method)
        res.end("This is home page1")
    }
    else if(pathname === "/users") {
        console.log(req.method)
        if(req.method === "GET") {
            //get request implementation
            console.log();
            const query = url.parse(req.url).query
            const parsedData = new URLSearchParams(query);
            let objectData = {};
            console.log(parsedData.entries())
            for(var entry of parsedData.entries()) {
                objectData[entry[0]] = entry[1];
            }
            console.log(parsedData)
            console.log(objectData)

        }
        else if(req.method === "POST") {
            //post impl.
            let data = []
            req.on("data", (chunk)=> {
                data.push(chunk);
            })
            req.on("end", ()=>{
                let allData = Buffer.concat(data);
                console.log("allData", allData)
                let stringifyData = allData.toString();
                console.log(stringifyData)
                const parsedData = new URLSearchParams(stringifyData);
                let objectData = {};
                console.log(parsedData.entries())
                for(var entry of parsedData.entries()) {
                    objectData[entry[0]] = entry[1];
                }
                console.log(objectData);
            })
        }
        else if(req.method === "PUT") {
            console.log("Inside PUT");
            const bb = busboy({headers: req.headers});
            let data = {};

            bb.on('file', (name, file, info )=>{
                file.on("data",(fileData)=>{
                    console.log(fileData.length)
                    console.log("File Loaded")
                })
                file.on("close",()=>{
                   console.log("File loaded")
                })
                const filename = info.filename
                const saveTo = path.join(`./images/${filename}`)
                console.log(saveTo)
                file.pipe(fs.createWriteStream(saveTo));
                    
                console.log(name)
                console.log(file)
                console.log(info)
            })
            bb.on('field', (name, value, info)=>{
                console.log(name);
                console.log(value)
                console.log(info)
                data[name] = value;
            })
            bb.on('close', ()=>{
                console.log()
                console.log("LOGGIN DATA")
            console.log(data)
            })

            
            req.pipe(bb);
        }
        res.end("This is user page")
    }
    else if(pathname === "/posts") {
        console.log(req.method)
        res.end("This is user page")
    } else {
        res.writeHead(404, {"Content-type": "text/html"});
        res.end("Not Found!")
    }
    console.log()
    
}).listen(8081)

console.log("xyz")