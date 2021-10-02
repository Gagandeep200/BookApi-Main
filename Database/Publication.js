const mongoose=require("mongoose");

//creata a Publication schema
const PublicationSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String]
});

//Publication Model
const PublicationModel=mongoose.model("Publications",PublicationSchema);

module.exports=PublicationModel;