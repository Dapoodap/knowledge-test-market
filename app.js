const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const conn  = require('./src/Config/db')
const allRoute = require('./src/Routes');
const testConnection = require('./src/Config/CheckConnection');

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(allRoute)

testConnection(conn)
app.get('/',(req,res)=>{
    res.json({
        "message" : "Hello World!"
    })
})

app.listen(8080,()=>{
    console.log("app listen in port 8080")
})