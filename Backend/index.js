const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());
app.use(require('./routes/insightsapi'))

// Connect server to mongodb atlas
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Connection successful")).catch((err)=>{
    console.log(err);
})

const port=process.env.PORT||8000;

// Starting the server
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})