//Variables
const books = document.querySelector(".books");
const addNewBook = document.querySelector(".add-new");
const list = document.querySelector(".list");
const form = document.querySelector("form");
const main = document.querySelector("main");


class Book {
  
  constructor(title, author, pages, publisher, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.publisher = publisher;
    this.read = read;
  }


}

class Library {
  constructor() {
    this.myLibrary  = [
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          pages: 295,
          publisher: "Rawling Store",
          isRead: "not read",
        },
        {
          title: "Perfect Carrer",
          author: "Max Eggert",
          pages: 97,
          publisher: "Joe Black",
          isRead: "read",
        },
        {
          title: "Questions Young People ask",
          author: "J.Watchtower",
          pages: 453,
          publisher: "Apex Books",
          isRead: "not read",
        },
        {
          title: "Enjoy Life on Earth Forever",
          author: "J.W. Watchtower",
          pages: 860,
          publisher: "jw.org",
          isRead: "not read",
        },
      ];
  }

  addBookToLibrary(book) {
    // do stuff here
    this.myLibrary.push({
      title: book.title,
      author: book.author,
      pages: book.pages,
      publisher: book.publisher,
      isRead: book.read,
    });
  }

  displayLibrary() {
    books.innerHTML = "";
    this.myLibrary.forEach((element, i) => {
      let content = `
          <div class="book-details">
            <ul class="card">
                <li><span>Title: </span>${element.title}</li>
                <li><span>Author: </span>${element.author}</li>
                <li><span>Pages: </span>${element.pages}</li>
                <li><span>Publisher: </span>${element.publisher}</li>
            </ul>
            <div class="control">
                <button class="is-read">
                ${element.isRead}</button>
                <button id="delete" data-index = "${i}">🗑</button> 
            </div> 
        </div>
        `;
      books.innerHTML += content;
    });
  }

  deleteBook(e) {
    let bookIndex = e.target.dataset.index;
    console.log(bookIndex);
    this.myLibrary.splice(bookIndex, 1);
    this.displayLibrary();
  }

}
let library = new Library();
class init{
    constructor(){
        library.displayLibrary();
    }
}

addNewBook.addEventListener("click", () => {
  hide(addNewBook);
  hide(main);
  showBlock(form);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const publisher = document.querySelector("#publisher").value;
  const isRead = document.querySelector("#read").checked;

  const newBook = new Book(
    title,
    author,
    pages,
    publisher,
    isRead ? "read" : "not read"
  );
  library.addBookToLibrary(newBook);
  library.displayLibrary();
  hide(form);
  showBlock(main);
  showBlock(list);
  showBlock(addNewBook);
});

books.addEventListener("click", (e) => {
  if (e.target.matches("button.is-read")) {
    toggleRead(e);
  }

  if (e.target.matches("button#delete")) {
    library.deleteBook(e);
  }
});

function toggleRead(e) {
  let content = e.target.textContent;
  content.trim() == "not read"
    ? (e.target.textContent = "read")
    : (e.target.textContent = "not read");
}

function showBlock(element) {
  element.style.display = "block";
}

function hide(element) {
  element.style.display = "none";
}
  
new init();
