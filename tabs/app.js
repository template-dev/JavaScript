document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelector(".tabs");
    if (!tabs) return;

    const tabsNav = tabs.querySelector(".tabs-nav");
    const tabButtons = tabs.querySelectorAll(".tab-btn");
    const tabPanels = tabs.querySelectorAll(".tab-panel");

    let activeButton = tabs.querySelector(".tab-btn.active");
    let activePanel = tabs.querySelector(".tab-panel.active");

    tabsNav.addEventListener("click", (event) => {
        const button = event.target.closest(".tab-btn");
        if (!button || button === activeButton) return;

        const index = Array.from(tabButtons).indexOf(button);

        activeButton.classList.remove("active");
        activeButton.setAttribute("aria-selected", "false");

        activePanel.classList.remove("active");

        button.classList.add("active");
        button.setAttribute("aria-selected", "true");
        tabPanels[index].classList.add("active");

        activeButton = button;
        activePanel = tabPanels[index];
    });
});