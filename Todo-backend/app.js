const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
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
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://asm:6225asm1072@nodeapp-uw6kz.mongodb.net/test?retryWrites=true&w=majority',{
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


app.use(express.static(path.join(__dirname, "../todo-frontend/build")));



const port = process.env.PORT || 8000

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../todo-frontend/build/index.html"));

});

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});