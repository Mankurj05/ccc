loadBooks();

async function loadBooks() {
    const res = await fetch("/api/books");
    const books = await res.json();

    displayBooks(books);
}

function displayBooks(books) {

    const list = document.getElementById("bookList");
    list.innerHTML = "";

    books.forEach(book => {

        list.innerHTML += `
        <li>

            <div class="book-info">
                <strong>${book.title}</strong><br>
                ${book.author} • ${book.category}<br>
                ₹${book.price} • Stock: ${book.quantity}
            </div>

            <div class="actions">

                <button class="edit-btn"
                onclick="editBook(
                    '${book._id}',
                    '${book.title}',
                    '${book.author}',
                    '${book.category}',
                    '${book.price}',
                    '${book.quantity}'
                )">
                    Edit
                </button>

                <button class="delete-btn"
                onclick="deleteBook('${book._id}')">
                    Delete
                </button>

            </div>

        </li>
        `;
    });
}

async function addBook() {

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;

    await fetch("/api/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            author,
            category,
            price,
            quantity
        })
    });

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("category").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";

    loadBooks();
}

async function deleteBook(id) {

    await fetch(`/api/books/${id}`, {
        method: "DELETE"
    });

    loadBooks();
}

async function editBook(
    id,
    currentTitle,
    currentAuthor,
    currentCategory,
    currentPrice,
    currentQuantity
) {

    const title = prompt("Enter Title", currentTitle);
    if (title === null) return;

    const author = prompt("Enter Author", currentAuthor);
    if (author === null) return;

    const category = prompt("Enter Category", currentCategory);
    if (category === null) return;

    const price = prompt("Enter Price", currentPrice);
    if (price === null) return;

    const quantity = prompt("Enter Quantity", currentQuantity);
    if (quantity === null) return;

    const response = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            author,
            category,
            price,
            quantity
        })
    });

    const result = await response.json();
    console.log(result);

    loadBooks();
}

async function searchBook() {

    const title = document.getElementById("searchTitle").value;

    if (title.trim() === "") {
        loadBooks();
        return;
    }

    const res = await fetch(`/api/books/search/${title}`);
    const books = await res.json();

    displayBooks(books);
}