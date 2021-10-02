const mongoose = require("mongoose.Schema")

//Author Schema

const AuthorSchema = mongoose.schema({
    id:Number,
    name:String,
    books:String,
});

//Author model

const AuthorModel = mongoose.model(AuthorSchema);

module.exports = AuthorModel;