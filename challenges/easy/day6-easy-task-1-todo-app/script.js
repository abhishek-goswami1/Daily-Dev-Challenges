const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

// Add task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    addTaskToDOM(taskText, false);
    saveTasks();
    taskInput.value = '';
    taskInput.focus();
}

// Add task to DOM
function addTaskToDOM(text, completed) {
    const li = document.createElement('li');
    li.className = 'task-item' + (completed ? ' completed' : '');
    
    li.innerHTML = `
        <span class="task-text">${text}</span>
        <div class="task-buttons">
            <button class="complete-btn">${completed ? 'Undo' : 'Done'}</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    const completeBtn = li.querySelector('.complete-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        completeBtn.textContent = li.classList.contains('completed') ? 'Undo' : 'Done';
        saveTasks();
    });

    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        tasks.push({
            text: item.querySelector('.task-text').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Load tasks on page load
loadTasks();
