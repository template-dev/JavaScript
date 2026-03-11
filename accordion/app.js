document.addEventListener("DOMContentLoaded", () => {
    const accordion = document.querySelector(".accordion");

    accordion.addEventListener("click", (event) => {
        const button = event.target.closest(".accordion-trigger");
        if (!button)
            return;

        const item = button.closest(".accordion-item");
        const activeItem = accordion.querySelector(".accordion-item.active");

        if (item === activeItem)
            return;

        activeItem?.classList.remove("active");
        item.classList.add("active");
    });
});