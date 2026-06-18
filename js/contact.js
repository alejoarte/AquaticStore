const HELP_WHATSAPP_MESSAGE = "Hola! Vi la tienda online y no encontré lo que busco. ¿Me pueden ayudar a conseguirlo?";

const helpWhatsAppButtons = document.querySelectorAll(".help-cta-whatsapp");

helpWhatsAppButtons.forEach(button => {
    button.addEventListener("click", openHelpWhatsApp);
});

function openHelpWhatsApp() {
    if (!WHATSAPP_NUMBER) {
        showInfoDialog({
            title: "WhatsApp no configurado",
            text: "El número de WhatsApp aún no está configurado. Por favor, contactá al administrador del sitio.",
            confirmColor: "#25D366"
        });
        return;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(HELP_WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank");
}
