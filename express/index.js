const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const functions = require("./functions");
// const formData = multer();
// const formData = multer({dest: 'images/'});
const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname)
    }
});
const formData = multer({storage});

const app = express();
app.use(bodyParser.urlencoded({limit: '1mb'}));
app.get("/", (req, res)=> {
    functions.listTodos()
    console.log(req.query)
    res.status(200).send("Hello from express get!");
});
app.post("/", (req, res)=> {
    functions.createTodo()
    console.log(req.body);
    res.status(200).send("Hello from express post!");
});
app.post("/form-data", formData.none(), (req, res)=> {
    console.log(req.body);
    res.status(200).send("Hello from express post!");
});
app.post("/form-data-with-images", formData.single('file'), (req, res)=> {
    console.log(req.body);
    console.log(req.file);
    res.status(200).send("Hello from express post!");
});
app.post("/form-data-with-multiple-images", formData.fields([{name: 'profile', maxCount: 1}, {name: 'gallery', maxCount: 3}]), (req, res)=> {
    console.log(req.body);
    // console.log(req.file);
    console.log(req.files);
    res.status(200).send("Hello from express post!");
});
app.post("/form-data-multiple-images-array", formData.array('gallery', 2), (req, res)=> {
    console.log(req.body);
    // console.log(req.file);
    console.log(req.files);
    res.status(200).send("Hello from express post!");
});
app.post("/:id", (req, res)=> {
    console.log(req.params);
    console.log(req.body);
    res.status(200).send("Hello from express post!");
});

const server = http.createServer(app);
const port = 8081;
server.listen(port, ()=>console.log(`listening on port: ${port}`));