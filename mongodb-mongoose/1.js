const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
// const MongoClient = require("mongodb").MongoClient;
const dbUrl = "mongodb://localhost:27017/bootcamp"
mongoose.connect(dbUrl);
// const client = new MongoClient(dbUrl);

// const dbo = client.db("bootcamp");
const app=express();
//Product Schema
const productSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    price: {type: Number, default: 15},
    categoryId: {type: mongoose.Types.ObjectId, ref: "Category"},
    image: String
});
const Product = mongoose.model("Product", productSchema)

//Category Schema
const categorySchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    image: String
});
const Category = mongoose.model("Category", categorySchema)




const port= 8080;
app.use(bodyParser.urlencoded({limit: '1MB'}))
app.get('/', async (req,res,next)=>{
    const query = req.query
    // const result = await dbo.collection("users").find(query).toArray();
    const result = await Product.find(query, {__v: 0}).skip(10).limit(20);
    res.status(200).send({status: true, message: "All Users Fetched Successfully", result})
});
app.post('/', async (req,res,next)=>{
    const payload = req.body;
    console.log(payload)
    // const result = await dbo.collection("users").insertOne(payload);
    let product = await Product.create(payload);
    res.status(200).send({status: true, message: "User Created Successfully", product})
});

app.get('/list', async (req,res,next)=>{
    // const payload = req.body;
    // console.log(payload)
    let products = await Product.aggregate([
        {
            $match: {
                price: 10
            }
        },
        {
            $lookup: {
                localField: "categoryId",
                foreignField: "_id",
                from: "categories",
                as: "category"
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                price: 1,
                category: 1
            }
        }
        // {
        //     $skip: 10
        // },
        // {
        //     $limit: 10
        // }
    ]);
    res.status(200).send({status: true, message: "User Created Successfully", products})
});

app.post('/category', async (req,res,next)=>{
    const payload = req.body;
    console.log(payload)
    // const result = await dbo.collection("users").insertOne(payload);
    let category = await Category.create(payload);
    res.status(200).send({status: true, message: "Category Created Successfully", category})
});
app.listen(port,()=>{console.log(`listenning on ${port}...`)})