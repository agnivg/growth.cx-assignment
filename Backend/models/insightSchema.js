const mongoose=require('mongoose')

// The Schema for the Insights, the fields are self explanatory
const insightSchema=new mongoose.Schema({
    domainName:{
        type:String,
        required:true
    },
    wordCount:{
        type:Number,
        required:true
    },
    favourite:{
        type:Boolean,
        default:false
    },
    webLinks:{
        type:[String]
    },
    mediaLinks:{
        type:[String]
    }
});
module.exports=mongoose.model("Insights",insightSchema);