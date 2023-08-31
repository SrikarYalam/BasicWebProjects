function Book(author, title, pages){
    this.author = author;
    this.title = title;
    this.pages = pages;
}

Book.prototype.getInfo = function() {
    return `${this.title} by ${this.author}, ${this.pages} long`;
}

const books = [];

function canAddBook(book)
{
    let bool = true;
    books.forEach(b => {
        bool = bool && (b.toString() != book.toString());
    })
    return bool;
}

function addNewBookToScreen() {
    
}

const addBookButton = document.querySelector('.add-book');
const addScreen = document.querySelector('.add-screen');
const onScreenBookButton = document.querySelector('#on-screen-book-button');
const inputs = document.querySelectorAll('.add-book-popup input');


addBookButton.addEventListener('click', function(){
    addScreen.classList.toggle('on');
    console.log('hello');
});

addScreen.addEventListener('click', function(e){
    if (e.target.classList.contains('on')) 
    {
        addScreen.classList.remove('on');
        console.log("removed on from classList of add-screen");
    }
});

onScreenBookButton.addEventListener('click', function(e){
    let bAuthor;
    let bTitle;
    let bPages;
    inputs.forEach(input => {
        if (!input.value) return;
        // could've used a switch statement to optomize maybe
        if (input.id == "author-input") bAuthor = input.value;
        if (input.id == "name-input") bTitle = input.value;
        if (input.id == "pages-input") bPages = input.value;
        input.value = "";
    });
    const newBook = new Book(bAuthor, bTitle, bPages);
    if (canAddBook(newBook)) 
    {
        books.push(newBook);
        addNewBookToScreen();
        onScreenBookButton.textContent = "Add Book";
    }
    else onScreenBookButton.textContent = "Add (New) Book";
    console.log(books);
});