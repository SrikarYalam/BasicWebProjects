function Book(author, title, pages){
    this.author = author;
    this.title = title;
    this.pages = pages;
}

Book.prototype.getInfo = function() {
    return `${this.title} by ${this.author}, ${this.pages} long`;
}

let books = [];

const addBookButton = document.querySelector('.add-book');
const addScreen = document.querySelector('.add-screen');
const onScreenBookButton = document.querySelector('#on-screen-book-button');
const inputs = document.querySelectorAll('.add-book-popup input');
const bookSpace = document.querySelector(".book-space");
const givenDelete = document.querySelector(".delete");
const exampleBook = document.querySelector(".book");
let bookElements = document.querySelectorAll(".book");

function canAddBook(book)
{
    let bool = true;
    books.forEach(b => {
        bool = bool && (b.getInfo() != book.getInfo());
    })
    return bool;
}

function addNewBookToScreen() {
    console.log("went into add new book to screen");
    const bookInfo = books[books.length - 1];

    const author = document.createElement('p');
    author.classList.add("author");
    author.textContent = bookInfo.author;
    const name = document.createElement('p');
    name.classList.add("name");
    name.textContent = bookInfo.title;
    const pages = document.createElement('p');
    pages.classList.add("pages");
    pages.textContent = bookInfo.pages;
    const deleteButton = document.createElement("button");
    deleteButton.classList.add('delete');
    deleteButton.textContent = "Remove Book";


    const addBook = document.createElement("div");
    addBook.appendChild(author);
    addBook.appendChild(name);
    addBook.appendChild(pages);
    addBook.appendChild(deleteButton);

    const childrens = addBook.childNodes;
    childrens.forEach(child => {
        child.id = "book-info";
    });

    const checked = document.createElement('p');
    checked.classList.add("checked");
    checked.textContent = "✓";
    checked.id = "toggle-check";
    addBook.appendChild(checked);

    addBook.classList.add("book");

    bookSpace.appendChild(addBook);
    bookElements = document.querySelectorAll(".book");
    addBook.addEventListener("click", () =>
    {
        console.log("clicked book");
        // not amazing time complexity
        addBook.childNodes.forEach(c => {
            if (c.id == "toggle-check")
            {
                if (c.textContent == "✓") c.textContent = "";
                else c.textContent = "✓";
            }
        });
    })

    deleteButton.addEventListener("click", (e) =>
    {
        remove(addBook);
        bookSpace.removeChild(addBook);
    })

    console.log("did it");
}

function remove(book)
{
    books = books.filter(item => item != book);
}


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
        if (input.id == "author-input") bAuthor = input.value;
        if (input.id == "name-input") bTitle = input.value;
        if (input.id == "pages-input") bPages = input.value;
        input.value = "";
    });
    const newBook = new Book(bAuthor, bTitle, bPages);
    console.log(`this is the new book: ${newBook.getInfo()}`);
    if (canAddBook(newBook)) 
    {
        books.push(newBook);
        addNewBookToScreen();
        onScreenBookButton.textContent = "Add Book";
    }
    else onScreenBookButton.textContent = "Add (New) Book";
    console.log(books);
});

// unneeded but incase future additions come into play
bookElements.forEach(book => {
    book.addEventListener("click", () =>
    {
        console.log("clicked book");
        // not amazing time complexity
        book.childNodes.forEach(c => {
            if (c.id == "toggle-check")
            {
                if (c.textContent == "✓") c.textContent = "";
                else c.textContent = "✓";
            }
        });
    })
});

givenDelete.addEventListener("click", () => {
    bookSpace.removeChild(exampleBook);
})



