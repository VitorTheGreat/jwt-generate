const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const routes = require('./src/routes');
var cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

routes(app); 

app.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);