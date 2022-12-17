const express = require("express");
const http = require("http");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();
// const object = {a: 1, b: 2, c:3}
// const {a, b} = object;
// console.log(a)
// const formData = multer({dest: "./images/"});
const storage = multer.diskStorage({
    destination: "./images/",
    filename: function(req, file, cb) {
        console.log(file)
        cb(null, Date.now()+'-'+file.originalname)
    }
})
app.use('/uploads', express.static('images'))
const formData = multer({storage})
const data = []
app.use(bodyParser.urlencoded({limit: '1mb'}))
app.use(bodyParser.json({limit: '1mb'}))
app.get("/", (req, res)=> {
    console.log(req.query);
    data.push(req.query)
    res.send("Hello from express!");
});
app.get("/all", (req, res)=>{
    // console.log(req.query);
    // data.push(req.query)
    res.send(data);
});
app.post("/", (req, res)=>{
    console.log(req.body)
    res.send("Hello from express post")
});
app.post("/json", (req, res)=>{
    console.log(req.body)
    res.send("Hello from express json")
});

app.post("/form-data", formData.none(), (req, res)=>{
    console.log(req.body)
    res.send("Hello from express json")
});

app.post("/form-data-file", formData.single("photo"), (req, res)=>{
    console.log(req.body)
    console.log(req.file)
    res.send("Hello from express json")
});

app.post("/form-data-file-multiple", formData.array("gallery", 2), (req, res)=>{
    console.log(req.body)
    console.log(req.files)
    res.send("Hello from express json")
});

app.post("/form-data-file-multiple-fields", formData.fields([{name: "photo", maxCount: 1},{name: "gallery", maxCount: 10 }]), (req, res)=>{
    console.log(req.body)
    console.log(req.files)
    res.status(200).send("Hello from express json")
});

app.post("/params/:id", (req, res)=>{
    console.log(req.params)
    res.status(200).send("Hello from express json")
});

const server = http.createServer(app);
const port = 8081;
server.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})