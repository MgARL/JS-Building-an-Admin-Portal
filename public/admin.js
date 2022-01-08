async function main() {

    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    books.forEach(renderBook)
    let submitBTNArray = document.querySelectorAll('.submit');
    
    submitBTNArray.forEach((button, index) =>{
        button.addEventListener('click', async (e) => {
            e.preventDefault()
            let inputValue = document.querySelector(`#inputValue${index}`).value;
            let response = await fetch('http://localhost:3001/updateBook', {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "id": books[index].id,
                    "quantity": inputValue,
                }),
            });

            let updatedQuantity = await response.json()
        })
    })


    
}

function renderBook(book,index) {
    let bookContainer = document.querySelector('#root')
    bookContainer.innerHTML += `
        <h5>${book.title}</h5>
        <input id="inputValue${index}" type="text" placeholder="Type here.." value="${book.quantity}">
        <input class="submit" type="submit">
    `
}

main()

