const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('.tab-btn');
const tabContents = tabs.querySelectorAll('.tab-panel');

let activeButton = tabs.querySelector('.tab-btn.active');
let activePanel = tabs.querySelector('.tab-panel.active');

tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (button === activeButton)
            return;

        activeButton.classList.remove('active');
        activeButton.setAttribute('aria-selected', 'false');

        activePanel.classList.remove('active');

        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        tabContents[index].classList.add('active');

        activeButton = button;
        activePanel = tabContents[index];
    });
});