document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.side-menu');
    const overlay = document.querySelector('.menu-overlay');

    toggleButton.addEventListener('click', openModalHandler);

    function openModalHandler() {
        if (menu.classList.contains('is-open'))
            return;
        
        menu.classList.add('is-open');
        overlay.classList.add('is-open');

        overlay.addEventListener('click', closeModalHandler);
        menu.querySelector('.menu-close').addEventListener('click', closeModalHandler);
        document.addEventListener('keydown', escKeyHandler);
    }

    function closeModalHandler() {
        menu.classList.remove('is-open');
        overlay.classList.remove('is-open');
        detachModalEvents();
    }

    function escKeyHandler(event) {
        if (event.key === "Escape")
            closeModalHandler();
    }

    function detachModalEvents() {
        overlay.removeEventListener('click', closeModalHandler);
        menu.querySelector('.menu-close').removeEventListener('click', closeModalHandler);
        document.removeEventListener('keydown', escKeyHandler);
    }
});