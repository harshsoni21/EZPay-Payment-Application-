const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(cors());
const mainRouter = require("./routes/index.js");

app.use('/api/v1',mainRouter);

app.listen(3000,()=>{
    console.log(`port connected at http://localhost:3000`);
});



