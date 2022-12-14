const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const posts = require('./routes/api/posts');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/posts', posts);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    })
}

// Handle production
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});