

const express = require('express');
const app = express()
const {initializeDatabase} = require('./database/database.connect')
app.use(express.json());
const Book = require('./models/book.models')

//q1

const addNewBookData = async (bookData) => {
    try{
        const newBook = new Book(bookData)
        const saveBook = await newBook.save()
            return saveBook
        

    }
     catch(error){
        throw error
     }
}
 app.post('/books' , async (req , res) => {
    try{
        const saveBookData = await addNewBookData(req.body)
        if(saveBookData){
            res.status(201).json({message : 'Book Data Added Sucessfully' , newBook : saveBookData})
        }

    }
     catch(error){
        res.status(500).json({error : 'An error Occured During Api fetch' , errors : error.message})
     }
 })

 //q2

 const readAllBook = async () => {
    const book = await Book.find()
    return book
 }

 app.get('/books' , async (req , res) => {
    try{
    const booksDetail = await readAllBook()
    if(booksDetail.length !== 0){
        res.json(booksDetail)
    }
     else{
        res.status(404).json({error : 'Book Not Found'})
     }
    }
     catch(error){
        res.status(500).json({error : 'An Api fetch erro happen'})
     }
 })

 //q3
 const readBookByTitle = async (bookTitle) => {
    try{
        const book =  await Book.findOne({title : bookTitle})
        return book
    }
     catch(error){
        throw error
     }
 }
 app.get('/books/:title' , async(req , res) => {
    try{
        const bookDetails = await readBookByTitle(req.params.title)
         if(bookDetails){
            res.json(bookDetails)
         }
          else{
            res.status(404).json({error : 'Books Not found'})
          }

    }
     catch(error){
        res.status(500).json({error : 'An Api fetch erro happen'})

     }
 })

 

 //q5

 const readBookByAuthor = async (bookAuthor) => {
    try{
        const book =  await Book.find({author : bookAuthor})
        return book
    }
     catch(error){
        throw error
     }
 }
 app.get('/books/author/:authorName' , async(req , res) => {
    try{
        const bookDetails = await readBookByAuthor(req.params.authorName)
         if(bookDetails.length !== 0){
            res.json(bookDetails)
         }
          else{
            res.status(404).json({error : 'Books Not found'})
          }

    }
     catch(error){
        res.status(500).json({error : 'An Api fetch erro happen'})

     }
 })

 //q6
 const readBookByGenre = async (bookGenre) => {
    try{
        const book =  await Book.find({genre : bookGenre})
        return book
    }
     catch(error){
        throw error
     }
 }

 app.get('/books/genre/:genreName' , async(req , res) => {
    try{
        const bookDetails = await readBookByGenre(req.params.genreName)
         if(bookDetails.length !== 0){
            res.json(bookDetails)
         }
          else{
            res.status(404).json({error : 'Books Not found'})
          }

    }
     catch(error){
        res.status(500).json({error : 'An Api fetch erro happen'})

     }
 })

 //q7
 const readBookByReleaseYear = async (bookYear) => {
    try{
        const book = await Book.find({publishedYear: bookYear})
        return book
    }
     catch(error){
        throw error
     }
 }

 app.get('/books/year/:publishYear' , async(req , res) => {
    try{
        const bookDetails = await readBookByReleaseYear(req.params.publishYear)
         if(bookDetails.length !== 0){
            res.json(bookDetails)
         }
          else{
            res.status(404).json({error : 'Books Not found'})
          }

    }
     catch(error){
        res.status(500).json({error : 'An Api fetch erro happen'})

     }
 })

 //q8

 const readBookAndUpdate = async (bookId , dataUpdate) => {
    try{
        const bookData = await Book.findByIdAndUpdate(bookId , dataUpdate , {new : true}  )
        //console.log(bookData)
        return bookData
    }
     catch(error){
        throw error
     }
 }

 app.post('/books/Id/:bookId' , async(req , res) => {
    try{
        const bookDetails = await readBookAndUpdate(req.params.bookId , req.body)
        //console.log(bookDetails)
         if(bookDetails){
            res.status(200).json({message : 'Data updated sucessfully' , data : bookDetails})
         }
          else{
            res.status(404).json({error : 'Books Not found'})
          }

    }
     catch(error){
        res.status(500).json({error : 'An Api fetch error happen'})

     }
 })

 //q9

 const readBooksAndUpdate = async (booktitle , dataUpdate) => {
    try{
        const bookData = await Book.findOneAndUpdate({title : booktitle} , dataUpdate , {new : true})
        return bookData
    }
     catch(error){
        throw error
     }
 }
 //readBookAndUpdate()

 //console.log("🔥 Title update route loaded");


 app.post('/books/title/:bookTitle' , async(req , res) => {
    try{

        // console.log(req.params.bookTitle);
        // console.log(req.body)
        const bookDetails = await readBooksAndUpdate(req.params.bookTitle , req.body)
         if(bookDetails){
            res.status(200).json({message : 'Data updated Sucessfuly' , Data : bookDetails})
         }
          else{
            res.status(404).json({error : 'Books Not found'})
          }

    }
     catch(error){
        res.status(500).json({error : 'An Api fetch error happen' ,  erroMessage : error.message })

     }
 })
const PORT = 3000
const start = async () => {
    try{
    await initializeDatabase()
    app.listen(PORT , () => {
        console.log(`Server is running on port ${PORT}`)
    })
    }
    catch(error){
        throw error.message
    }
}

 start()

