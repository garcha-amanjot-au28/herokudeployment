const express = require('express');

const app = express();

const fs = require('fs');

const bodyparser = express.urlencoded({extended:false})

const port = process.env.PORT || 3001;

app.get('/' , (req,res) => {
    res.sendFile(`${__dirname}/views/bookForm.html`);
})

app.post("/addBook" , bodyparser,(req,res) => {
   const {bookname,price,isbn,author,publisher,date,edition} = req.body;
    console.log(bookname,price,isbn,author,publisher,date,edition);
    let books = fs.readFileSync('books.json' , (err,data) => {
        if (err) console.log(err)
        else return data;
    } );
    let Book = JSON.parse(books);
    
    let newBook = {bookName : bookname,price:price,ISBN:isbn,authorName:author,publisherName:publisher,publishedDate:date,edition:edition}
    Book.push(newBook);
    let book = JSON.stringify(Book)
    fs.writeFileSync('books.json' ,book )
    res.send('book added')
})


app.listen(port, console.log('App is live on :', port))