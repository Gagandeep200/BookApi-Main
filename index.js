require("dotenv").config();
//Frame work
const mongoose = require ("mongoose");
const express = require("express");
//database
const database = require("./Database/database");

// Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");
//initializing  express
const booky = express();
//configuration
booky.use(express.json());
booky.listen(3000,()=> console.log("Hey server is running fine"))

mongoose.connect(process.env.MONGO_URL, 

)
.then(() => console.log("connection established!!!!"));


/*
Route           /authors
Description     to get specific author 
Access          PUBLIC
Parameter       name
Methods         GET
*/

booky.get("/is/:isbn", (req,res) => {
    const getSpecficAuthor = BookModel.findOne({name:req.params.id})

    // const getSpecficAuthor =database.authors.filter(
    //    (author) => author.name === (req.params.name)
    //    );

        if(!getSpecficAuthor){
            return res.json({error: `No author found for name of ${req.params.name}`,
        });
        }
        return res.json({auth:getSpecficAuthor});
    })


/*
Route            /author/book
Description      Get all authors based on books
Access           PUBLIC
Parameter        isbn
Methods          GET
*/

booky.get("/author/book/:isbn", (req,res) => {
    const getSpecificAuthor = database.author.filter(
      (author) => author.books.includes(req.params.isbn)
    );
  
    if(getSpecificAuthor.length === 0){
      return res.json({
        error: `No author found for the book of ${req.params.isbn}`
      });
    }
    return res.json({authors: getSpecificAuthor});
  });
  /*
    Route         /
    Description   Get All the Books
    Access        Public
    Parameter     NONE
    Methods       GET
*/
booky .get ("/",(req,res) => {
  return res.json({books:database.books});
});

/*
    Route         /
    Description   Get Specific Books on ISBN
    Access        Public
    Parameter     NONE
    Methods       GET
*/
booky.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
      (book) => book.ISBN === req.params.isbn
    );
  
    if (getSpecificBook.length === 0) {
      return res.json({
        error: `No book found for the ISBN of ${req.params.isbn}`,
      });
    }
  
    return res.json({ book: getSpecificBook });
  });
/*
    Route           /c
    Description     Get specific books based on category
    Access          PUBLIC
    Parameter       category
    Methods         GET
*/
booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter((book) =>
      book.category.includes(req.params.category)
    );
  
    if (getSpecificBook.length === 0) {
      return res.json({
        error: `No book found for the category of ${req.params.category}`,
      });
    }
  
    return res.json({ book: getSpecificBook });
  });
/*
Route           /l
Description     Get specific books based on language
Access          PUBLIC
Parameter       LANGUAGE
Methods         GET
*/
booky.get("/l/:language", (req, res) => {
    const getSpecificBook = database.books.filter((book) =>
      book.language.includes(req.params.language)
    );
  
    if (getSpecificBook.length === 0) {
      return res.json({
        error: `No book found in the language of ${req.params.language}`,
     });
    }
  
    return res.json({ book: getSpecificBook });
  });
 /*
 Route    - /author
 Des      - to get all authors
 Access   - Public
 Method   - GET
 Params   - none
 Body     - none
 */
 booky.get("/is/:isbn", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
        );
        if (getSpecificBook.length === 0) {
            return res.json({
                error:'No Book found for the ISBN of ${req.params.isbn}',
            });
        }
        return res.json({book:getSpecificBook});
    });
/*
Route            /publications
Description      Get all publications
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.get("/publications", (req,res) => {
    return res.json(Publications.database.Publication);
  })

/*
Route            /book/add
Description      add new book
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.post("/book/add", (req,res) => {
  console.log(req.body);
  const {newBook} = req.body;
database.books.push(newBook)
return res.json ({books:database.books});
});

/*
Route            /author/add
Description      add new author
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
booky.post("/author/add", (req,res) => {
  const {newAuthor} = req.body;
database.author.push(newAuthor)
return res.json ({author:database.author});
});

/*
Route           /publication/add
Description    to add new publication
Access          PUBLIC
Parameter      none
Methods         POST
*/
booky.post("/publication/add", (req,res) => {
  const {newPublication} = req.body;
  console.log(req.body);
database.publications.push(newPublication)
return res.json ({publications:database.publications});
});
/*
Route           /book/update/title
Description     Update book title 
Access          PUBLIC
Parameter       ISBN
Methods         Put
*/
booky.put("/book/update/title/:isbn", (req,res) => {
database.books.forEach((book) => {
  if(book.ISBN === req.params.isbn) {
    book.title = req.body.newBookTitle;
    return;
}
});
return res.json({books:database.book })
});

/*
Route           /book/update/author
Description     Update/add a new author for a book
Access          PUBLIC
Parameter       ISBN
Methods         Push
*/
booky.put("/book/update/author/:isbn/:authorId", (req,res) => {
//update book databasee
database.books.forEach((book) => {
  if(book.ISBN === req.params.isbn) {
    return book.author.push(req.params.authorId);

}
});

//update author database
database.author.forEach((Author) => {
  if(author.id === parseInt(req.params.authorId))
  return author.books.push(req.params.isbn);
});
return res.json({books: database.books, author: database.author})
});

 /*
Route           /publication/update/book
Description    update/add books to publications
Access          PUBLIC
Parameter      isbn
Methods         PUT
*/

booky.put("/publication/update/book/:isbn",(req,res) =>{
  //Update the publication database
  database.publications.forEach((publication) => {
      if(publication.id === req.body.pubId){
          return publication.books.push(req.params.isbn);
      }
  });
  //update the book database
database.books.forEach((book)=>{
  if(book.ISBN === req.params.isbn){
      book.publication =req.body.pubId;
      message:"Sucessfully updated publication"
      return;
  }
});
return res.json({books:database.books,publications:database.publications,message:""})
});

 /*
Route           /book/delete
Description    delete a book
Access          PUBLIC
Parameter      isbn
Methods         DELETE
*/
booky.delete("/book/delete/:isbn",(req,res) =>{
  const updatedBookDatabase =database.books.filter(
     (book) => book.ISBN !== req.params.isbn
);
     database.books = updatedBookDatabase;
return res.json({books:updatedBookDatabase});
});

/*
Route           /book/delete/author
Description    delete an author from book
Access          PUBLIC
Parameter      isbn, author id
Methods         DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
  //Update the book database
   database.books.forEach((book)=>{
     if(book.ISBN === req.params.isbn) {
       const newAuthorList = book.author.filter(
         (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
       );
       book.author = newAuthorList;
       return;
     }
   });


  //Update the author database
  database.author.forEach((eachAuthor) => {
    if(eachAuthor.id === parseInt(req.params.authorId)) {
      const newBookList = eachAuthor.books.filter(
        (book) => book !== req.params.isbn
      );
      eachAuthor.books = newBookList;
      return;
    }
  });

  return res.json({
    book: database.books,
    author: database.author,
    message: "Author was deleted!!!!"
  });
});

/*
Route           /publications/delete/book
Description    delete a book from publications
Access          PUBLIC
Parameter      isbn, publication id
Methods         DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId", (req,res) => {
  //update publication database
  database.publications.forEach((publication) => {
    if(publication.id === parseInt(req.params.pubId)){
        const newBooksList = publication.books.filter(
          (book) => book !== req.params.isbn
        );

        publication.books = newBooksList;
          return;
      }
    });

  //update books database
  database.books.forEach((books) => {
    if(book.ISBN ===req.params.isbn){
      book.publication = 0; // no publication available
      return;
    }
  });

  return res.json({books: database.books, publications: database.publication})

});

//mongoose model
//document model of mongodb


