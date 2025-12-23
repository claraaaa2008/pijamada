let activeCard = null;

// Función para alternar la visibilidad del contenido
function toggleContent(contentElement, button) {
    const card = button.closest(".card");
    
    // Si hay una tarjeta activa diferente a la actual, cerrarla
    if (activeCard && activeCard !== card) {
        const activeButton = activeCard.querySelector(".conocer");
        const activeContent = activeCard.querySelector("ol");
        activeContent.classList.remove("content-visible");
        activeButton.textContent = "Conocer";
        activeCard.classList.remove("overlay-pink");
    }
    
    // Alternar la tarjeta actual
    if (contentElement.classList.contains("content-visible")) {
        contentElement.classList.remove("content-visible");
        button.textContent = "Conocer";
        card.classList.remove("overlay-pink");
        activeCard = null;
    } else {
        contentElement.classList.add("content-visible");
        button.textContent = "Volver";
        card.classList.add("overlay-pink");
        activeCard = card;
    }
}

// Agregar event listeners a los botones
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".conocer");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".card");
            const ol = card.querySelector("ol");
            toggleContent(ol, button);
        });
    });

    // Intersection Observer para animar tarjetas al scrollear
    const cards = document.querySelectorAll(".card");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("hidden");
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
                entry.target.classList.add("hidden");
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});