// **** heroku app link https://attainuamandeployment.herokuapp.com/ c ****

const express = require('express');

const app = express();

const fs = require('fs');

const bodyparser = express.urlencoded({extended:false})

const port = process.env.PORT || 3001;

app.get('/' , (req,res) => {
    res.sendFile(`${__dirname}/views/getbook.html`)
})

app.get('/add' , (req,res) => {
    res.sendFile(`${__dirname}/views/bookForm.html`);
})

app.post('/getbook' , bodyparser,(req,res) => {
    let flag = true;
    let {bookname} = req.body
    console.log(bookname)
    fs.readFile('./books.json', function (err,data) {
        filter()
        async function filter(){
        var json = await JSON.parse(data)
       
        let book = json.filter((item , index , array) => {
                if (item.bookName === bookname) return item
                
            })
            if(!book.length ){
                res.send("Book not found")
                flag = false;
            }
        if (flag == true) res.json(book[0])

        }
        
    })
   
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

app.get('/delete', bodyparser , (req,res) => {
    res.sendFile(`${__dirname}/views/delete.html`)
});

app.post('/bookDelete',bodyparser,(req,res) => {
    let flag = true;
    let {bookname} = req.body
    console.log(bookname)
    fs.readFile('./books.json', function (err,data) {
        filter()
        async function filter(){
        var json = await JSON.parse(data)
       
        let book = json.filter((item , index , array) => {
                if (item.bookName != bookname) return item
                
            })
            if(book.length === json.length){
                res.send("Book not found")
                flag = false;
            }
        console.log(book)
        json = book;
        fs.writeFile("./books.json", JSON.stringify(json), function(err){
            if (err) throw err;
            else{
               
                if(flag === true) {
                    console.log('The requested data was deleted from file!');
                    res.send('Data Deleted');
                } 
               
            }
          });

        }
        
    })
   
})
app.listen(port, console.log('App is live on :', port))