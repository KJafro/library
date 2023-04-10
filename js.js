const addBookBtn = document.getElementById('addBookBtn')
const title = document.getElementById('title')
const author = document.getElementById('author')
const pages = document.getElementById('pages')
const bookResults = document.getElementById('bookResults')
const displayBooks = document.getElementById('displayBooks')
const displayBooks2 = document.getElementById('displayBooks2')
const showBookBtn = document.getElementById('showBookBtn')
let noBooks = document.getElementById('noBooks')
let remove = document.getElementById('removeBookBtn')
let paste = document.getElementById('pasteBook')

let arr = JSON.parse(localStorage.getItem('books')) || []


title.addEventListener('keydown', function () {
    if (title.value < 1) {
        title.style.border = '1.5px solid red'
    } else {
        title.style.border = '1.5px solid green'
    }
})

author.addEventListener('keydown', function () {
    if (author.value == 0) {
        author.style.border = '1.5px solid red'
    } else {
        author.style.border = '1.5px solid green'
    }
})

pages.addEventListener('change', function () {
    if (pages == '') {
        pages.style.border = '1.5px solid red'
    } else {
        pages.style.border = '1.5px solid green'
    }
})

addBookBtn.addEventListener('click', function (e) {
    e.preventDefault()  
    if (title.value == '' || author.value == '' || pages.value == '') {
        title.classList.add('warning')
        author.classList.add('warning')
        pages.classList.add('warning')
        bookResults.style.color = 'red'
        bookResults.innerText = 'Please complete the form above!'
    } else if (arr.length == 5){
        bookResults.style.color = 'red'
        bookResults.innerText = 'You can\'t add more than 5 books!'
    } else {
        arr.unshift({title: title.value, author: author.value, pages: Number(pages.value)})
        bookResults.style.color = 'green'
        bookResults.innerText = `${title.value} was added`
        bookResults.style.marginTop = '10px'
        title.value = ``
        author.value = ``
        pages.value = ``
        title.style.border = '1.5px solid black'
        author.style.border = '1.5px solid black'
        pages.style.border = '1.5px solid black'
        showBookBtn.style.display = 'inline'
        displayBooks.innerText = ``
        noBooks.innerText = ''
        remove.style.display = 'none'
        localStorage.setItem('books', JSON.stringify(arr))
        unShow.style.display = 'none'
        displayBooks2.innerHTML = ''
    }
})

let showUnShowDiv = document.getElementById('showUnShowDiv')
let unShow = document.createElement('button')
let unShowTxt = document.createTextNode('Hide')
unShow.setAttribute('id', 'unShowBtn')
unShow.appendChild(unShowTxt)
showUnShowDiv.appendChild(unShow)
unShow.style.display = 'none'
const bookListLength = arr.length

showBookBtn.addEventListener('click', function (e) {
e.preventDefault()
displayBooks.innerHTML = ``
arr.forEach(ar => {
    displayBooks.innerHTML += `<hr><div id="${ar.title}"><h4>${ar.title}</h4>${ar.author}<br>${ar.pages}<br></div>`
})
let pages = arr.reduce((pages, book) => {
    return pages + book.pages
}, 0)

let length = arr.reduce((pages, book) => {
    return arr.length
}, 0)

displayBooks2.innerHTML = `Total Books: ${length} | Total Pages: ${pages}`
showBookBtn.style.display = 'none'
unShow.style.display = 'inline'
remove.style.display = 'inline'
bookResults.innerHTML = ''
if (arr.length == 0) {
    unShow.style.display = 'none'
    remove.style.display = 'none'
}

unShow.addEventListener('click', function () {
    displayBooks.innerHTML = ``
    unShow.style.display = 'none'
    showBookBtn.style.display = 'inline'
    remove.style.display = 'none'
    bookResults.innerHTML = ''
    displayBooks2.innerHTML = ''
})
if (arr.length == 0) {
    bookResults.innerText = ''
    noBooks.style.color = 'red'
    noBooks.innerText = 'No Books!'
}

remove.addEventListener('click', function (e) {
    e.preventDefault()
    arr.splice(0)
    localStorage.setItem('books', JSON.stringify(arr));
    bookResults.style.color = 'green'
    bookResults.innerText = `Removed Books!`
    displayBooks.innerHTML = ``
    unShow.style.display = 'none'
    remove.style.display = 'none'
    showBookBtn.style.display = 'inline'
    remove.style.display = 'none'
    displayBooks2.innerHTML = ''
})
})