// const MongoClient = require("mongodb").MongoClient;

// MongoClient.connect("mongodb://localhost:27017", (err, db) => {
//     if (err) throw err;
//     console.log('connection established');
// });


// const MongoClient = require("mongodb").MongoClient;
// MongoClient.connect("mongodb://localhost:27017", (err, db)=>{
//     const dbo = db.db("mynewdb");
//     dbo.createCollection("collection", (err, result)=> {
//         console.log("resultresultresult")
//         console.log(result)
//     })
// })


// const MongoClient = require("mongodb").MongoClient;
// MongoClient.connect("mongodb://localhost:27017", (err, db)=>{
//     const dbo = db.db("mynewdb");
//     dbo.collection("documents").insertOne({a:1}, (err, res)=>{
//         console.log(err)
//         console.log(res)
//     })
// })

// const MongoClient = require("mongodb").MongoClient;
// MongoClient.connect("mongodb://localhost:27017/mynewdb", (err, db)=>{
//     const dbo = db.db("mynewdb");
//     dbo.collection("documents").findOne({}, (err, res)=>{
//         console.log(res)
//     });
// } )

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017/mynewdb", async (err, db)=>{
    const dbo = db.db("mynewdb");
    const documents = await dbo.collection("documents").findOne({});
    console.log(documents)
})