const mongoose = require("mongoose")
//Publication Schema
const PublicationSchema = mongoose.schema({
    id:Number,
    name:String,
    books:String,
});
//Publication model
const PublicationModel = mongoose.model(PublicationSchema);

module.exports = PublicationModel;