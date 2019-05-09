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

    // save loadPOstsCollection in var posts
    const posts = await loadPostsCollection();
    // find with empty {} can be pass arg to search text/something
    // sned array of posts in the database
    res.send(await posts.find({}).toArray());
});


// add post
router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();

    // insert one is a method that comes with mongodb driver
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    // 201 means OK and something was created
    res.status(201).send();
});


// delete post
// delete need a specific post to delete
// /:id represent whatever the id
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();

    // when using mongodb driver, the _id is a special type of field / objectId
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});

    res.status(200).send();
})


// connect to cloud.mongodb
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://irwanphan:qwertyuiop@cluster0-tpj1d.mongodb.net/test?retryWrites=true', {
        useNewUrlParser: true
    });

    // get posts connection os that we can run methods on it
    return client.db('Cluster0-tpjld').collection('posts');
}

module.exports = router;