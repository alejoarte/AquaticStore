(function () {
    const openMenu = document.querySelector("#open-menu");
    const closeMenu = document.querySelector("#close-menu");
    const mobileNav = document.querySelector("#mobile-nav");

    window.closeMobileNav = function () {
        if (mobileNav) mobileNav.classList.remove("open");
    };

    if (openMenu && mobileNav) {
        openMenu.addEventListener("click", () => {
            mobileNav.classList.add("open");
        });
    }

    if (closeMenu && mobileNav) {
        closeMenu.addEventListener("click", () => {
            window.closeMobileNav();
        });
    }

    if (mobileNav) {
        mobileNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                window.closeMobileNav();
            });
        });
    }
})();
