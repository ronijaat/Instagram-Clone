const express = require("express");
const cors = require('cors');

const path = require("path");
const connection = require('./db/conn');
const router = require('./routes/auth');
const Postrouter = require('./routes/createPost');
const userRouter = require('./routes/user')

const app = express();
const PORT = process.env.PORT || 8000 ;

app.use(cors());
connection();

app.use(express.json());
app.use(router);
app.use(Postrouter);
app.use(userRouter)

app.use(express.static(path.join(__dirname,"./front-end/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./front-end/build/index.html"))
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})