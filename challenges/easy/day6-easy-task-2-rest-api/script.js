const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');
const createBtn = document.getElementById('createBtn');
const getAllBtn = document.getElementById('getAllBtn');
const clearBtn = document.getElementById('clearBtn');
const usersList = document.getElementById('usersList');
const messageDiv = document.getElementById('message');

let users = JSON.parse(localStorage.getItem('users')) || [];

// Display message
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + type;
    setTimeout(() => {
        messageDiv.className = 'message';
    }, 3000);
}

// Render users
function renderUsers() {
    if (users.length === 0) {
        usersList.innerHTML = '<div class="empty-message">No users found. Create one to get started!</div>';
        return;
    }

    usersList.innerHTML = users.map((user, index) => `
        <div class="user-card">
            <div class="user-info">
                <p><strong>ID:</strong> ${user.id}</p>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
            </div>
            <div class="user-actions">
                <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Create user
function createUser() {
    if (!userName.value || !userEmail.value || !userPhone.value) {
        showMessage('Please fill all fields!', 'error');
        return;
    }

    const newUser = {
        id: Date.now(),
        name: userName.value,
        email: userEmail.value,
        phone: userPhone.value
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    userName.value = '';
    userEmail.value = '';
    userPhone.value = '';
    
    showMessage('User created successfully!', 'success');
    renderUsers();
}

// Delete user
function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(users));
    showMessage('User deleted successfully!', 'success');
    renderUsers();
}

// Get all users (already displayed)
function getAllUsers() {
    showMessage(`Showing ${users.length} user(s)`, 'success');
}

// Clear all users
function clearAll() {
    if (confirm('Are you sure you want to delete all users?')) {
        users = [];
        localStorage.setItem('users', JSON.stringify(users));
        showMessage('All users cleared!', 'success');
        renderUsers();
    }
}

// Event listeners
createBtn.addEventListener('click', createUser);
getAllBtn.addEventListener('click', getAllUsers);
clearBtn.addEventListener('click', clearAll);

userName.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') createUser();
});

// Initial render
renderUsers();
