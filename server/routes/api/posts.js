const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// get posts
// ('/') means ('/api/posts') as mentioned in index.js
// router.get('/', (req, res) => {
// make it asyncronous
router.get('/', async (req, res) => {
    // run test on browser
    // res.send('hello');

    const posts = await loadPostsCollection();
    // find with empty {} can be pass arg to find something
    // and return in array so toArray
    res.send(await posts.find({}).toArray());
});


// add post



// delete post



// connect to cloud.mongodb
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://irwanphan:qwertyuiop@cluster0-tpj1d.mongodb.net/test?retryWrites=true', {
        useNewUrlParser: true
    });

    // get posts connection os that we can run methods on it
    return client.db('Cluster0').collection();
}

module.exports = router;