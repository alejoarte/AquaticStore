// Using Fetch to load the products
const url = "./js/products.json";
let products = [];

fetch(url)
    .then(response => response.json())
    .then(data => {
        products = data;
        uploadProducts(products);
    })

const productsContainer = document.querySelector("#products-container");
const buttonsCategories = document.querySelectorAll(".btn-category");
const mainTitle = document.querySelector("#main-title");
let addButtons = document.querySelectorAll(".product-add")
const numberItems = document.querySelector("#number-items");

buttonsCategories.forEach(button => button.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))

function uploadProducts(chosenProducts) {

    productsContainer.innerHTML = "";

    chosenProducts.forEach(product => {

        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <div class="product-image-container">
                <img class="product-image" src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="product-add" id="${product.id}">Agregar</button>
            </div>
        `;

        productsContainer.append(div);
    })
    updateButtonsAdd();
}


buttonsCategories.forEach(button => {
    button.addEventListener("click", (e) => {
        buttonsCategories.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "all-products") {
            const productCategory = products.find(product => product.category.id === e.currentTarget.id)
            mainTitle.innerText = productCategory.category.name;
            
            const productsButton = products.filter(product => product.category.id === e.currentTarget.id)
            uploadProducts(productsButton);
        } else {
            mainTitle.innerText = "Todos los Productos"
            uploadProducts(products);
        }
    })
});

function updateButtonsAdd() {
    addButtons = document.querySelectorAll(".product-add");
    
    addButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    })
};

let itemsInCart;
let itemsInCartLS = localStorage.getItem("items-in-cart");

if (itemsInCartLS) {
    itemsInCart = JSON.parse(itemsInCartLS);
    updateNumberItems();
} else {
    itemsInCart = [];
}

function addToCart(e) {

    // Creating the added message successfully with Toastify 
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idButton = e.currentTarget.id;
    const productAdded = products.find(product => product.id === idButton);
    
    if (itemsInCart.some(product => product.id === idButton)) {    
        const index = itemsInCart.findIndex(product => product.id === idButton);
        itemsInCart[index].quantity++;
    } else {
        productAdded.quantity = 1;
        itemsInCart.push(productAdded);
    }

    updateNumberItems();

    localStorage.setItem("items-in-cart", JSON.stringify(itemsInCart));
};

function updateNumberItems() {
    let newNumberItems = itemsInCart.reduce((acc, product) => acc + product.quantity, 0);
    numberItems.innerText = newNumberItems;
};