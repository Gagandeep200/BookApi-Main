const mongoose = require("mongoose");
//Creating a book schema
const BookSchema = mongoose.Schema({
    
        ISBN:String,
        title:String,
        pubDate:String,
        language:String,
        Page_num:Number,
        Author:Number,
        publication:Number,
        category:String
    
});

//Create a book model
const BookModel = mongoose.model(BookSchema);



