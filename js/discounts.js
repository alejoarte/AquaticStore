const DISCOUNT_RULES = [
    { id: "speedsocket-2.0-rojo-humo", originalPrice: 269900 },
    { prefix: "speedsocket", originalPrice: 319900 },
    { id: "speedo-pure-focus", originalPrice: 459900 },
    { id: "arena-paddles-fingers-negra", originalPrice: 91100 },
    { id: "arena-paddles-negra", originalPrice: 121600 },
    { id: "arena-paddles-verde", originalPrice: 121600 },
    { id: "arena-paddles-verde-oscuro", originalPrice: 121600 },
    { prefix: "arena-powerfins-2-pro", originalPrice: 425500 },
    { prefix: "TYR-catalyst", originalPrice: 150000 },
    { prefix: "speedo-power-plus", originalPrice: 189900 }
];

function isProductComingSoon(product) {
    return product.comingSoon === true;
}

function renderComingSoonLabel(className = "product-coming-soon") {
    return `<p class="${className}">Disponibles próximamente</p>`;
}

function findDiscountRule(productId) {
    return DISCOUNT_RULES.find(rule => {
        if (rule.id) {
            return rule.id === productId;
        }

        return rule.prefix && productId.startsWith(rule.prefix);
    });
}

function getProductDiscount(product) {
    const rule = findDiscountRule(product.id);

    if (!rule || product.price >= rule.originalPrice) {
        return null;
    }

    return {
        originalPrice: rule.originalPrice,
        percent: Math.round((1 - product.price / rule.originalPrice) * 100)
    };
}

function renderProductPrice(product, options = {}) {
    if (isProductComingSoon(product)) {
        return "";
    }

    const discount = getProductDiscount(product);
    const priceClass = options.priceClass ?? "product-price";
    const originalClass = options.originalClass ?? "product-price-original";
    const wrapperClass = options.wrapperClass ?? "product-pricing";

    if (!discount) {
        return `<p class="${priceClass}">${formatPrice(product.price)}</p>`;
    }

    return `
        <div class="${wrapperClass}">
            <p class="${originalClass}">${formatPrice(discount.originalPrice)}</p>
            <p class="${priceClass} ${priceClass}--sale">${formatPrice(product.price)}</p>
        </div>
    `;
}

function renderDiscountBadge(product) {
    if (isProductComingSoon(product)) {
        return "";
    }

    const discount = getProductDiscount(product);

    if (!discount) {
        return "";
    }

    return `<span class="product-discount-badge">-${discount.percent}%</span>`;
}
