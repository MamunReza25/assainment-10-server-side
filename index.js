const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


// 7HJPw4M4qAxWtIBb
// assainment-10

const uri = "mongodb+srv://assainment-10:7HJPw4M4qAxWtIBb@cluster0.5cco7jl.mongodb.net/?appName=Cluster0";



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // create mongobd database
        const db = client.db("assainment_10_db");
        const allCourseCollection = db.collection("all_course");

        // all course data client side data show korar api
        // find()
        // findOne()
        app.get('/allcourse', async (req, res) => {
            const result = await allCourseCollection.find().toArray()
            res.send(result);
        });

        // allcourse detailes  findOne
        app.get('/allcourse/:id', async (req, res) => {
            const id = req.params.id;
            console.log(`need id`, id)
            const query = { _id: new ObjectId(id) };
            const result = await allCourseCollection.findOne(query)
            res.send(result);
        })









        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello server connected')
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
