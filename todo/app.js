document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector(".todo-app");
    if (!root) return;

    const form = root.querySelector(".todo-form");
    const input = root.querySelector(".todo-input");
    const list = root.querySelector(".todo-list");
    const counter = root.querySelector(".tasks-count");

    const STORAGE_KEY = "tasks";

    let state = {
        tasks: []
    };

    init();

    function init() {
        state.tasks = loadTasks();
        render();

        form.addEventListener("submit", handleCreateTask);
        root.addEventListener("click", handleDeleteTask);
        root.addEventListener("change", handleToggleTask);
    }

    function loadTasks() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveTasks() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    }

    function handleCreateTask(event) {
        event.preventDefault();

        const title = input.value.trim();
        if (!title) return;

        const newTask = {
            id: generateId(),
            title,
            completed: false,
            createdAt: new Date().toISOString()
        };

        state.tasks = [...state.tasks, newTask];

        saveTasks();
        render();

        form.reset();
    }

    function handleDeleteTask(event) {
        const button = event.target.closest(".todo-delete-btn");
        if (!button) return;

        const item = button.closest(".todo-item");
        const id = Number(item.dataset.id);

        state.tasks = state.tasks.filter(task => task.id !== id);

        saveTasks();
        render();
    }

    function handleToggleTask(event) {
        const checkbox = event.target.closest('input[type="checkbox"]');
        if (!checkbox) return;

        const item = checkbox.closest(".todo-item");
        const id = Number(item.dataset.id);

        state.tasks = state.tasks.map(task =>
            task.id === id
                ? { ...task, completed: checkbox.checked }
                : task
        );

        saveTasks();
        render();
    }

    function render() {
        renderTasks();
        renderCounter();
    }

    function renderTasks() {
        list.innerHTML = state.tasks
            .map(task => taskTemplate(task))
            .join("");
    }

    function renderCounter() {
        counter.textContent = `${state.tasks.length} tasks total`;
    }

    function taskTemplate(task) {
        const date = new Date(task.createdAt);

        return `
            <li class="todo-item ${task.completed ? "completed" : ""}" data-id="${task.id}">
                <div class="todo-main">
                    <label class="todo-checkbox">
                        <input type="checkbox" ${task.completed ? "checked" : ""}>
                        <span class="todo-checkbox-ui"></span>
                    </label>

                    <div class="todo-content">
                        <p class="todo-task">${escapeHtml(task.title)}</p>
                        <span class="todo-date">
                            ${date.toLocaleDateString()} • ${date.toLocaleTimeString()}
                        </span>
                    </div>
                </div>

                <button class="todo-delete-btn" type="button" aria-label="Delete task">×</button>
            </li>
        `;
    }

    function generateId() {
        return state.tasks.length
            ? Math.max(...state.tasks.map(t => t.id)) + 1
            : 1;
    }

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }
});