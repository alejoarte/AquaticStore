const url = "./js/products.json";
let products = [];

const TOAST_STYLE = {
    background: "linear-gradient(to right, #0ea5e9 0%, #0284c7 100%)",
    borderRadius: "2rem",
    textTransform: "uppercase",
    fontSize: ".75rem"
};

fetch(url)
    .then(response => response.json())
    .then(data => {
        products = data;
        uploadProducts(products);
    });

const productsContainer = document.querySelector("#products-container");
const buttonsCategories = document.querySelectorAll(".btn-category");
const buttonsCategoriesMobile = document.querySelectorAll(".btn-category-mobile");
const mainTitle = document.querySelector("#main-title");
let addButtons = document.querySelectorAll(".product-add");
const numberItems = document.querySelector("#number-items");

function handleImageError(img) {
    img.classList.add("image-error");
    img.closest(".product-image-container")?.classList.add("image-error");
}

function filterProducts(buttonId) {
    buttonsCategories.forEach(button => {
        button.classList.toggle("active", button.id === buttonId);
    });

    buttonsCategoriesMobile.forEach(button => {
        button.classList.toggle("active", button.dataset.target === buttonId);
    });

    if (buttonId !== "all-products") {
        const productCategory = products.find(product => product.category.id === buttonId);
        mainTitle.innerText = productCategory.category.name;
        const productsButton = products.filter(product => product.category.id === buttonId);
        uploadProducts(productsButton);
    } else {
        mainTitle.innerText = "Todos los productos";
        uploadProducts(products);
    }

    window.closeMobileNav?.();
}

buttonsCategories.forEach(button => {
    button.addEventListener("click", (e) => {
        filterProducts(e.currentTarget.id);
    });
});

buttonsCategoriesMobile.forEach(button => {
    button.addEventListener("click", () => {
        filterProducts(button.dataset.target);
    });
});

function uploadProducts(chosenProducts) {
    productsContainer.innerHTML = "";

    chosenProducts.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <div class="product-image-container">
                <img class="product-image" src="${product.image}" alt="${product.title}">
                <span class="product-category">${product.category.name}</span>
            </div>
            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="product-add" id="${product.id}">Agregar</button>
            </div>
        `;

        const img = div.querySelector(".product-image");
        img.addEventListener("error", () => handleImageError(img));

        productsContainer.append(div);
    });
    updateButtonsAdd();
}

function updateButtonsAdd() {
    addButtons = document.querySelectorAll(".product-add");

    addButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

let itemsInCart;
let itemsInCartLS = localStorage.getItem("items-in-cart");

if (itemsInCartLS) {
    itemsInCart = JSON.parse(itemsInCartLS);
    updateNumberItems();
} else {
    itemsInCart = [];
}

function addToCart(e) {
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: TOAST_STYLE,
        offset: {
            x: "1.5rem",
            y: "1.5rem"
        },
        onClick: function() {}
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
}

function updateNumberItems() {
    let newNumberItems = itemsInCart.reduce((acc, product) => acc + product.quantity, 0);
    numberItems.innerText = newNumberItems;
}
