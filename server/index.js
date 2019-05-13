const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// initialize app with express
const app = express();


// middle ware
app.use(bodyParser.json());
app.use(cors());

// api
const posts = require('./routes/api/posts');
// any route that goes to api/posts will be directed to posts
app.use('/api/posts', posts);


// [2] handle production
if(process.env.NODE_ENV === 'production') {
    // static folder
    app.use(express.static(__dirname + '/public'));

    // handle SPA
    // refers to any route
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}



// set port for heroku
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))