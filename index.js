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
Route              /author/name
Description        Get Specific Author based id
Access             PUBLIC
Parameter          name
Methods            GET
*/
booky.get("/:name",async (req,res)=>{
  // const getSpecificAuthor=database.author.filter((author)=>author.name===req.params.name);
  const getSpecificAuthor=await AuthorModel.findOne({Author:req.params.name})
  if(!getSpecificAuthor)
  {
      return res.json({error:`No Author Found for the Id of ${req.params.name}`});
  }
  else{
      return res.json({Author:getSpecificAuthor});
  }
});

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

booky.get("/book/:isbn",async (req,res)=>{
  // const getSpecificAuthor=database.author.filter((author)=>author.books.includes(req.params.isbn));
  const getSpecificAuthor=await AuthorModel.findOne({Author:req.params.isbn})

  if(!getSpecificAuthor){
      return res.json({error:`No Author Found for the isbn of ${req.params.isbn}`});
  }
  else{
      return res.json({Author:getSpecificAuthor})
  }
});
  /*
    Route         /
    Description   Get All the Books
    Access        Public
    Parameter     NONE
    Methods       GET
*/
booky .get ("/", async (req,res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});


/*
    Route         /
    Description   Get Specific Books on isbn
    Access        Public
    Parameter     NONE
    Methods       GET
*/
booky.get("/is/:isbn",async (req,res) => {

  const getSpecificBook = await BookModel.findOne({isbn: req.params.isbn});
  
  //null !0 = 1 , !1=0
    if(!getSpecificBook) {
      return res.json({error: `No book found for the isbn of ${req.params.isbn}`});
    }
  
    return res.json({book: getSpecificBook});
  });
/*
    Route           /c
    Description     Get specific books based on category
    Access          PUBLIC
    Parameter       category
    Methods         GET
*/
booky.get("/c/:category", async (req,res) => {
  const getSpecificBook = await BookModel.findOne({category: req.params.category});

  //null !0 = 1 , !1=0
    if(!getSpecificBook) {
      return res.json({error: `No book found for the category of ${req.params.category}`});
    }

    return res.json({book: getSpecificBook});
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
 booky.get("/author", async (req,res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});

/*
Route            /publications
Description      Get all publications
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.get("/publications",async (req,res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json(getAllPublications);
})

/*
Route            /book/add
Description      add new book
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.post("/book/new",async (req,res) => {
  const { newBook } = req.body;
  const addNewBook = BookModel.create(newBook);
  return res.json({
    books: addNewBook,
    message: "Book was added !!!"
  });
});

/*
Route            /author/add
Description      add new author
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
booky.post("/author/new",async (req,res) => {
  const { newAuthor } = req.body;
  const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json(
      {
        author: addNewAuthor,
        message: "Author was added!!!"
      }
    );
  });

/*
Route           /publication/add
Description    to add new publication
Access          PUBLIC
Parameter      none
Methods         POST
*/

booky.post("/publication/new", (req,res) => {
  const newPublication = req.body;
  database.publication.push(newPublication);
  return res.json(database.publication);
});

/*
Route           /book/update/title
Description     Update book title 
Access          PUBLIC
Parameter       isbn
Methods         Put
*/
booky.put("/book/update/:isbn",async (req,res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn
    },
    {
      title: req.body.bookTitle
    },
    {
      new: true
    }
  );

  return res.json({
    books: updatedBook
  });
});
/*********Updating new author**********/
/*
Route            /book/author/update
Description      Update /add new author
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/

booky.put("/book/author/update/:isbn", async(req,res) =>{
  //Update book database
const updatedBook = await BookModel.findOneAndUpdate(
  {
    ISBN: req.params.isbn
  },
  {
    $addToSet: {
      authors: req.body.newAuthor
    }
  },
  {
    new: true
  }
);

  //Update the author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor
    },
    {
      $addToSet: {
        books: req.params.isbn
      }
    },
    {
      new: true
    }
  );

  return res.json(
    {
      bookss: updatedBook,
      authors: updatedAuthor,
      message: "New author was added"
    }
  );
} );
/*
Route            /publication/update/book
Description      Update /add new publication
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/

booky.put("/publication/update/book/:isbn", (req,res) => {
  //Update the publication database
  database.publication.forEach((pub) => {
    if(pub.id === req.body.pubId) {
      return pub.books.push(req.params.isbn);
    }
  });

  //Update the book database
  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn) {
      book.publications = req.body.pubId;
      return;
    }
  });

  return res.json(
    {
      books: database.books,
      publications: database.publication,
      message: "Successfully updated publications"
    }
  );
});

/*
Route           /publication/update/book
Description     Update book on isbn
Access          PUBLIC
Parameter       isbn
Methods         Put
*/
booky.put("/book/update/:isbn",async (req,res)=> {
const updatedBook = await BookModel.findOneAndUpdate(
  {
    ISBN: req.params.isbn
  },  
  {
    title: req.body.bookTitle
  },
  {
    new:true
  }
);
return res.json({
  books:updatedBook
});
});

/*
Route           /book/update/author
Description     Update/add a new author for a book
Access          PUBLIC
Parameter       isbn
Methods         Push
*/
booky.put("/book/author/update/:isbn", async(req,res) =>{
  //Update book database
const updatedBook = await BookModel.findOneAndUpdate(
  {
    ISBN: req.params.isbn
  },
  {
    $addToSet: {
      authors: req.body.newAuthor
    }
  },
  {
    new: true
  }
);

  //Update the author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor
    },
    {
      $addToSet: {
        books: req.params.isbn
      }
    },
    {
      new: true
    }
  );

  return res.json(
    {
      bookss: updatedBook,
      authors: updatedAuthor,
      message: "New author was added"
    }
  );
} );

 /*
Route           /publication/update/book
Description    update/add books to publications
Access          PUBLIC
Parameter      isbn
Methods         PUT
*/

booky.put("/publication/update/book/:isbn", (req,res) => {
  //Updating the publication database
  database.publication.forEach((publication)=>{
    if(publication.id===req.body.pubId){
       return publication.books.push(req.params.ISBN);
    }
   });
  //Updating the book database
   database.books.forEach((book)=>{
       if(book.ISBN===req.params.ISBN){
           book.publication=req.body.pubId;
           return;
       }
   })
   return res.json({Books:database.books,Publications:database.publication,message:"Successfully updated Database"})
}); 

 /*
Route           /book/delete
Description    delete a book
Access          PUBLIC
Parameter      isbn
Methods         DELETE
*/
booky.delete("/book/delete/:isbn", async (req,res) => {
  //Whichever book that doesnot match with the isbn , just send it to an updatedBookDatabase array
  //and rest will be filtered out

  const updatedBookDatabase = await BookModel.findOneAndDelete(
    {
      ISBN: req.params.isbn
    }
  );

  return res.json({
    books: updatedBookDatabase
  });
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
     if(book.isbn === req.params.isbn) {
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
  //Update publication database
  database.publication.forEach((publication)=>{
    if(publication.id === parseInt(req.params.pubId)){
        const newBookList=publication.books.filter((book)=> book !== req.params.ISBN);
        publication.books=newBookList;
        return;
    }
});
//Update book database
database.books.forEach((book)=>{
    if(book.ISBN===req.params.ISBN){
        book.publication=0; //No publication is avaliable
        return;
    }
});
return res.json({Books:database.books,Publication:database.publication})
});

//mongoose model
//document model of mongodb


