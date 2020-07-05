const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const api = require('./routes/mongodb_main');
const port = 3000;

const app = express();
app.use(cors())

app.use(bodyParser.json()); 

app.use('/mongodb', api);

app.listen(port, function(){
    console.log("MEAN Stack : Server running:" + port);
});