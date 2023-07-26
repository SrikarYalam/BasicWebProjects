function Book(author, title, pages){
    this.author = author;
    this.title = title;
    this.pages = pages;
}

Book.prototype.getInfo = function() {
    return `${this.title} by ${this.author}, ${this.pages} long`;
}

const addBookButton = document.querySelector('.add-book');
const addScreen = document.querySelector('.add-screen');

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