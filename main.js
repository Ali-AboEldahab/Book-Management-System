
class Book {
  constructor(name, price, author) {
    this.name = name;
    this.price = price;
    this.author = author;
  }
}
class Author {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

var numOfBooks;
var arrOfBooks = [];
var counter = 0
var ctr = 1;
// Sections
let NumOfBooksContainer = document.getElementById("booknumContainer");
let FormOfAddBooks = document.querySelector(".form-container");
const DisplayBox = document.getElementById("displayBooks");
const welcome = document.getElementById("startpage");

//inputs
let numOfBooksInput = document.getElementById("bookNum");
const bookNameInput = document.getElementById("book-name");
const bookPriceInput = document.getElementById("book-price");
const authorNameInput = document.getElementById("author-name");
const authorEmailInput = document.getElementById("author-email");

//buttons
const numBookBtn = document.getElementById("bookNumBtn")
const addBookBtn = document.getElementById("add-book");
const startBtn = document.getElementById("start");


const ul = document.getElementById("ul")

//Start Page

startBtn.addEventListener("click", function () {
  welcome.classList.add("d-none")
  NumOfBooksContainer.classList.remove("d-none");

})

// Get NumOfBooks
function confirmNumOfBooks() {
  if (
    !numOfBooksInput.value ||
    !isFinite(numOfBooksInput.value) ||
    numOfBooksInput.value == 0
  ) {
    ul.classList.remove("d-none")
  } else {
    numOfBooks = numOfBooksInput.value;
    NumOfBooksContainer.classList.add("d-none");
    FormOfAddBooks.classList.replace("d-none", "d-block");


  }
}
numBookBtn.addEventListener("click", (e) => {
  confirmNumOfBooks()
  e.preventDefault();
})

function validation() {
  bookNameInput.style.outline = "none";
  if (!/^[A-Za-z]+([ ]?[A-Za-z]+)*$/.test(bookNameInput.value)) {
    bookNameInput.style.outline = "2px solid red";
    bookNameInput.focus();
  } else if (!/^\d*\.?\d+$/.test(bookPriceInput.value)) {
    bookNameInput.style.outline = "none";
    bookPriceInput.style.outline = "2px solid red";
    bookPriceInput.focus();
  } else if (!/^[A-Za-z]+([ ]?[A-Za-z]+)*$/.test(authorNameInput.value)) {
    bookPriceInput.style.outline = "none";
    authorNameInput.style.outline = "2px solid red";
    authorNameInput.focus();
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      authorEmailInput.value
    )
  ) {
    authorNameInput.style.outline = "none";
    authorEmailInput.style.outline = "2px solid red";
    authorEmailInput.focus();

  } else {
    authorEmailInput.style.outline = "none";
    if (counter < numOfBooks) {
      AddBook()
      counter++
      if (counter == numOfBooks) {
        FormOfAddBooks.classList.add("d-none")
        DisplayBox.classList.replace("d-none", "d-block");
        console.log(arrOfBooks);
        display();
      }
    }
  }
}
function AddBook() {
  ctr++;
  document.querySelector("h1 span").innerHTML = ctr;
  var author = new Author(authorNameInput.value, authorEmailInput.value);
  var book = new Book(bookNameInput.value, bookPriceInput.value, author);
  arrOfBooks.push(book);
  authorNameInput.value = authorEmailInput.value = bookNameInput.value = bookPriceInput.value = '';

}
function display() {
  let tr = ``;
  for (let i = 0; i < arrOfBooks.length; i++) {
    tr += `
    <tr id="row-${i}">
            <td id="name-${i}">${arrOfBooks[i].name}</td>
            <td id="price-${i}">${arrOfBooks[i].price}</td>
            <td id="authorName-${i}">${arrOfBooks[i].author.name}</td>
            <td id="authorEmail-${i}">${arrOfBooks[i].author.email}</td>
            <td>
              <i id = "edite" onclick="editBook(${i})" class="fa-solid fa-pen-to-square" ></i>
              <i id = "save" onclick="saveEdit(${i})" class="fa-solid fa-save d-none" ></i>
            </td>
            <td>
              <i onclick="deleteBook(${i})" class="fa-solid fa-trash text-danger"></i>
            </td>
      </tr>
    `
  }
  document.getElementById("tbody").innerHTML = tr;
  if (arrOfBooks.length == 0) {
    welcome.classList.remove("d-none");
    DisplayBox.classList.add("d-none");
    ctr = 1;
  }
}

function editBook(index) {
  let name = document.getElementById(`name-${index}`).innerText;
  let price = document.getElementById(`price-${index}`).innerText;
  let authorName = document.getElementById(`authorName-${index}`).innerText;
  let authorEmail = document.getElementById(`authorEmail-${index}`).innerText;

  document.getElementById(`name-${index}`).innerHTML = `<input type="text" id="editName-${index}" value="${name}">`;
  document.getElementById(`price-${index}`).innerHTML = `<input type="text" id="editPrice-${index}" value="${price}">`;
  document.getElementById(`authorName-${index}`).innerHTML = `<input type="text" id="editAuthorName-${index}" value="${authorName}">`;
  document.getElementById(`authorEmail-${index}`).innerHTML = `<input type="text" id="editAuthorEmail-${index}" value="${authorEmail}">`;

  var editeBtn = document.getElementById(`edite`);
  editeBtn.classList.add("d-none");
  var saveBtn = document.getElementById(`save`);
  saveBtn.classList.remove("d-none");


}

function saveEdit(index) {

  let editedName = document.getElementById(`editName-${index}`);
  let editedPrice = document.getElementById(`editPrice-${index}`);
  let editedAuthorName = document.getElementById(`editAuthorName-${index}`);
  let editedAuthorEmail = document.getElementById(`editAuthorEmail-${index}`);


  editedName.style.outline = "none";
  if (!/^[A-Za-z]+([ ]?[A-Za-z]+)*$/.test(editedName.value)) {
    editedName.style.outline = "2px solid red";
    editedName.focus();
  } else if (!/^\d*\.?\d+$/.test(editedPrice.value)) {
    editedName.style.outline = "none";
    editedPrice.style.outline = "2px solid red";
    editedPrice.focus();
  } else if (!/^[A-Za-z]+([ ]?[A-Za-z]+)*$/.test(editedAuthorName.value)) {
    editedPrice.style.outline = "none";
    editedAuthorName.style.outline = "2px solid red";
    editedAuthorName.focus();
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      editedAuthorEmail.value
    )
  ) {
    editedAuthorName.style.outline = "none";
    editedAuthorEmail.style.outline = "2px solid red";
    editedAuthorEmail.focus();

  } else {
    editedAuthorEmail.style.outline = "none";
    arrOfBooks[index].name = editedName.value;
    arrOfBooks[index].price = editedPrice.value;
    arrOfBooks[index].author.name = editedAuthorName.value;
    arrOfBooks[index].author.email = editedAuthorEmail.value;

    display();
  }

}

function deleteBook(index) {
  arrOfBooks.splice(index, 1);
  display();
}

addBookBtn.addEventListener("click", (e) => {
  validation()
  e.preventDefault()
})