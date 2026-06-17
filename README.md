# AquaticStore

Tienda en línea de equipamiento para nadadores. AquaticStore permite explorar gafas, trajes de competición e implementos de entrenamiento, agregarlos al carrito y consultar la compra por WhatsApp.

## Características

- **Navegación de productos:** Catálogo organizado por categorías con ordenamiento por precio.
- **Carrito de compras:** Agregar, eliminar y vaciar productos con confirmaciones claras.
- **Persistencia local:** El carrito se guarda en `localStorage` entre sesiones.
- **Consulta por WhatsApp:** Envío del pedido formateado al número configurado.

## Tecnologías Utilizadas

- **HTML5** para la estructura de la página web.
- **CSS3** para el diseño y la presentación.
- **JavaScript** para la interactividad y la lógica del carrito de compras.
- **Toastify.js** y **SweetAlert2** para notificaciones y confirmaciones.
- **Local Storage** para almacenar de manera persistente el contenido del carrito.

## Instalación

1. Clona este repositorio en tu máquina local:
    ```sh
    git clone https://github.com/alejoarte/AquaticStore.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd AquaticStore
    ```
3. (Opcional) Copia `js/config.example.js` a `js/config.js` y configura tu número de WhatsApp.

## Uso

1. Abre el archivo `index.html` en tu navegador web preferido.
2. Navega por los productos disponibles y agrega los que desees al carrito.
3. Revisa el carrito en `cart.html`, elimina productos o vacíalo si es necesario.
4. Consulta la compra por WhatsApp desde el carrito.

## Estructura del Proyecto

```plaintext
├── img/                  # Imágenes de productos
├── js/
│   ├── cart.js           # Lógica del carrito
│   ├── config.example.js # Plantilla de configuración
│   ├── currency.js       # Formato de precios
│   ├── main.js           # Catálogo y agregar al carrito
│   ├── menu.js           # Menú móvil
│   ├── notifications.js  # Toasts y diálogos de confirmación
│   └── products.json     # Datos del catálogo
├── styles/
│   └── style.css         # Estilos globales
├── cart.html             # Página del carrito
├── index.html            # Página principal
└── README.md
```
