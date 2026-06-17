let itemsInCart = localStorage.getItem("items-in-cart");
itemsInCart = JSON.parse(itemsInCart) || [];

const emptyCartContainer = document.querySelector("#empty-cart");
const cartProductsContainer = document.querySelector("#products-cart");
const cartActionsContainer = document.querySelector("#actions-cart");
let deleteButtons = document.querySelectorAll(".delete-product-cart");
const emptyCartButton = document.querySelector("#empty-actions-cart");
const totalContainer = document.querySelector("#total");
const whatsappButton = document.querySelector("#whatsapp-actions-cart");


function loadProductsCart() {
    if (itemsInCart && itemsInCart.length > 0) {

        emptyCartContainer.classList.add("disabled");
        cartProductsContainer.classList.remove("disabled");
        cartActionsContainer.classList.remove("disabled");
        
        cartProductsContainer.innerHTML = "";
        
        itemsInCart.forEach(product => {
    
            const div = document.createElement("div");
            div.classList.add("product-cart");
            div.innerHTML = `
                <div class="cart-image-container">
                    <img class="image-product-cart" src="${product.image}" alt="${product.title}">
                </div>
                <div class="cart-product-title">
                    <small>Título</small>
                    <h3>${product.title}</h3>
                </div>
                <div class="cart-product-quantity">
                    <small>Cantidad</small>
                    <p>${product.quantity}</p>
                </div>
                <div class="cart-product-price">
                    <small>Precio</small>
                    <p>${formatPrice(product.price)}</p>
                </div>
                <div class="cart-product-subtotal">
                    <small>Subtotal</small>
                    <p>${formatPrice(product.price * product.quantity)}</p>
                </div>
                <button class="delete-product-cart" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            cartProductsContainer.append(div);
        })

    } else {
    
        emptyCartContainer.classList.remove("disabled");
        cartProductsContainer.classList.add("disabled");
        cartActionsContainer.classList.add("disabled");
        
    }
    updateDeleteButtons();
    updateTotal();
};

loadProductsCart();

function updateDeleteButtons() {
    deleteButtons = document.querySelectorAll(".delete-product-cart");
    
    deleteButtons.forEach(boton => {
        boton.addEventListener("click", removeFromCart);
    });
};

function removeFromCart(e) {

    const idButton = e.currentTarget.id;
    const index = itemsInCart.findIndex(product => product.id === idButton);

    // Show SweetAlert to confirm the delete of a product
    Swal.fire({
        title: "¿Está seguro de eliminar este producto?",
        icon: "question",
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        showCancelButton: true,
        showCloseButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            // Creating the eliminated message successfully with Toastify 
            Toastify({
                text: "Producto eliminado",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #0ea5e9 0%, #0284c7 100%)",
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

            itemsInCart.splice(index, 1);
            loadProductsCart();
        
            localStorage.setItem("items-in-cart", JSON.stringify(itemsInCart));
        }
    });

};

emptyCartButton.addEventListener("click", emptyCart);

function emptyCart() {
    // Creating the sweetalert for confirmation when we are empting the cart
    Swal.fire({
        title: "¿Estás seguro?",
        html: `Se van a borrar ${itemsInCart.reduce((acc, product) => acc + product.quantity, 0)} productos.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0ea5e9",
        cancelButtonColor: "#dc2626",
        confirmButtonText: "Sí",
        cancelButtonText: 'No',
        iconColor: '#0ea5e9'
    }).then((result) => {
        if (result.isConfirmed) {
            itemsInCart.length = 0;
            localStorage.setItem("items-in-cart", JSON.stringify(itemsInCart));
            loadProductsCart();
            Swal.fire({
                title: "😢",
                text: "Tus artículos fueron eliminados.",
                icon: "success",
                confirmButtonColor: "#0ea5e9",
                confirmButtonText: "Aceptar"
            });
        }
    });


};

function updateTotal() {
    const totalCalculated = itemsInCart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    total.innerText = formatPrice(totalCalculated);
};

whatsappButton.addEventListener("click", openWhatsAppInquiry);

function buildWhatsAppMessage(items) {
    const lines = items.map(product => {
        const subtotal = product.price * product.quantity;
        return `• ${product.title} — Cantidad: ${product.quantity} — ${formatPrice(product.price)} c/u — Subtotal: ${formatPrice(subtotal)}`;
    });

    const total = items.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    return [
        "Hola, estoy interesado en los siguientes artículos:",
        "",
        ...lines,
        "",
        `Total: ${formatPrice(total)}`
    ].join("\n");
}

function openWhatsAppInquiry() {
    if (!WHATSAPP_NUMBER) {
        Swal.fire({
            title: "WhatsApp no configurado",
            text: "El número de WhatsApp aún no está configurado. Por favor, contactá al administrador del sitio.",
            icon: "info",
            confirmButtonColor: "#25D366",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    const message = buildWhatsAppMessage(itemsInCart);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}
