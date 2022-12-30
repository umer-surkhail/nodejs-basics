//createCollection, findOne, find, insertMany, insertOne, updateOne, updateMany, deleteOne, deleteMany
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
// const MongoClient = require("mongodb").MongoClient;
const express = require ("express");
const http = require("http");
const app = express();

const dbUrl = "mongodb://localhost:27017/bootcamp"
mongoose.connect(dbUrl);


const productSchema = new mongoose.Schema({
    name: String,
    sku: {type: String, unique: true},
    price: {type: Number, default: 0, required: true},
    category: {type: mongoose.SchemaTypes.ObjectId, ref: "Category"}
})
const Product = mongoose.model("Product", productSchema);

const categorySchema = new mongoose.Schema({
    name: String
}, {timeStamp: true})
const Category = mongoose.model("Category", categorySchema);


// const mongoClient = new MongoClient(dbUrl);
// await = mongoClient.connect();
// const db = mongoClient.db("bootcamp")

app.get("/", async (req, res) => {
    try {
        const data = req.query;
        // db.collection("topics").insertOne({title: "Monog", description: "This will cover mongo db"}, (err, result)=>{
        //     console.log(result);
        // });
        // const result = await db.collection("topics").deleteMany({});
        // const products = await Product.find({});
        const product = await Product.create({title: "Product 1", price: 12});
        console.log("After query", product);
        res.send({status: true, message: "", product});
    }
    catch (e) {
        res.json(e)
    }
})
const server =http.createServer(app);
server.listen(8081)