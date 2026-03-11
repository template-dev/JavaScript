document.addEventListener("DOMContentLoaded", () => {
    const myBtn = document.querySelector('#openModalBtn');
    const myModal = document.querySelector('#myModal');

    myBtn.addEventListener('click', openModalHandler);

    function openModalHandler() {
        myModal.classList.add('show');
        attachModalEvents();
    }

    function attachModalEvents() {
        myModal.querySelector('.close').addEventListener('click', closeModalHandler);
        myModal.querySelector('.btn-secondary').addEventListener('click', closeModalHandler);
        myModal.querySelector('.btn-primary').addEventListener('click', closeModalHandler);
        document.addEventListener('keydown', escKeyHandler);
        myModal.addEventListener('click', outsideClickHandler);
    }

    function escKeyHandler(event) {
        if (event.key === "Escape")
            closeModalHandler();
    }

    function outsideClickHandler(event) {
        const isOutsideClicked = !!event.target.closest('.modal-content');

        if (!isOutsideClicked)
            closeModalHandler();
    }

    function closeModalHandler() {
        myModal.classList.remove('show');
        removeModalEvents();
    }

    function removeModalEvents() {
        myModal.querySelector('.close').removeEventListener('click', closeModalHandler);
        myModal.querySelector('.btn-secondary').removeEventListener('click', closeModalHandler);
        myModal.querySelector('.btn-primary').removeEventListener('click', closeModalHandler);
        document.removeEventListener('keydown', escKeyHandler);
        myModal.removeEventListener('click', outsideClickHandler);
    }
});