const express = require('express')
const app = express()
require('dotenv').config()

const cors = require('cors')

const mongoose = require('mongoose');
const userRoutes = require('./Routes/users')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const labelRoutes = require('./Routes/labels')
const taskRoutes = require('./Routes/tasks')



//db connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('DB Connected');
}).catch(err=>console.log(err));

mongoose.connection.on('error',err=>{
    console.log(`DB connection error :${err}`)
})


//middleware


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors());

app.use("/api",userRoutes);
app.use("/api",labelRoutes)
app.use("/api",taskRoutes);


const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});