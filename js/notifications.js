const AQUATIC_COLORS = {
    accent: "#0ea5e9",
    accentHover: "#0284c7",
    danger: "#dc2626",
    whatsapp: "#25D366"
};

const SWAL_DEFAULTS = {
    customClass: {
        popup: "swal-aquatic-popup",
        confirmButton: "swal-aquatic-confirm",
        cancelButton: "swal-aquatic-cancel"
    },
    confirmButtonColor: AQUATIC_COLORS.accent,
    cancelButtonColor: AQUATIC_COLORS.danger,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
    showCancelButton: true
};

function showToast(message, variant = "success") {
    const accentBorder = variant === "success"
        ? AQUATIC_COLORS.accent
        : AQUATIC_COLORS.danger;

    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        className: "toast-aquatic",
        offset: { x: "1.5rem", y: "1.5rem" },
        style: {
            background: "#ffffff",
            color: "#0f172a",
            borderLeft: `4px solid ${accentBorder}`,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08), 0 2px 4px rgba(15, 23, 42, 0.04)",
            fontSize: "0.875rem",
            fontWeight: "500",
            padding: "0.875rem 1.25rem"
        }
    }).showToast();
}

function confirmAction({ title, html, icon = "question", iconColor = AQUATIC_COLORS.accent, showCloseButton = false }) {
    return Swal.fire({
        ...SWAL_DEFAULTS,
        title,
        html,
        icon,
        iconColor,
        showCloseButton
    });
}

function showInfoDialog({ title, text, confirmColor = AQUATIC_COLORS.accent }) {
    return Swal.fire({
        title,
        text,
        icon: "info",
        confirmButtonColor: confirmColor,
        confirmButtonText: "Aceptar",
        customClass: {
            popup: "swal-aquatic-popup",
            confirmButton: "swal-aquatic-confirm"
        }
    });
}
