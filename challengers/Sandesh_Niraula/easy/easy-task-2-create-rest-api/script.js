// API Base URL
const API_URL = 'https://jsonplaceholder.typicode.com';

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        
        e.target.classList.add('active');
        const tabId = e.target.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});

// Helper function to show results
function showResults(elementId, content, isError = false) {
    const resultDiv = document.getElementById(elementId);
    resultDiv.innerHTML = content;
    resultDiv.classList.add('show');
    if (isError) resultDiv.classList.add('error');
    else resultDiv.classList.remove('error');
}

// Helper function to show loading state
function showLoading(elementId) {
    const resultDiv = document.getElementById(elementId);
    resultDiv.innerHTML = '<div class="loading"><span class="spinner"></span>Loading...</div>';
    resultDiv.classList.add('show');
}

// GET - Fetch Users
async function fetchUsers() {
    showLoading('usersList');
    try {
        const response = await fetch(`${API_URL}/users?_limit=5`);
        if (!response.ok) throw new Error('Failed to fetch users');
        
        const users = await response.json();
        let html = '<h3>Users (Limited to 5):</h3>';
        
        users.forEach(user => {
            html += `
                <div class="user-card">
                    <h3>${user.name}</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>Company:</strong> ${user.company.name}</p>
                </div>
            `;
        });
        
        showResults('usersList', html);
    } catch (error) {
        showResults('usersList', `<strong>Error:</strong> ${error.message}`, true);
    }
}

// POST - Create Post
async function createPost() {
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;
    const userId = document.getElementById('postUserId').value;

    if (!title.trim() || !body.trim() || !userId) {
        alert('Please fill all fields');
        return;
    }

    showLoading('createResult');

    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: parseInt(userId)
            })
        });

        if (!response.ok) throw new Error('Failed to create post');
        
        const post = await response.json();
        
        const html = `
            <div class="success">
                <strong>✓ Post Created Successfully!</strong>
                <pre>${JSON.stringify(post, null, 2)}</pre>
            </div>
        `;
        
        showResults('createResult', html);
        document.getElementById('createForm').reset();
    } catch (error) {
        showResults('createResult', `<strong>Error:</strong> ${error.message}`, true);
    }
}

// PUT - Update User
async function updateUser() {
    const userId = document.getElementById('updateUserId').value;
    const name = document.getElementById('updateUserName').value;
    const email = document.getElementById('updateUserEmail').value;

    if (!userId || (!name && !email)) {
        alert('Please enter User ID and at least one field to update');
        return;
    }

    showLoading('updateResult');

    try {
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;

        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        if (!response.ok) throw new Error('Failed to update user');
        
        const updatedUser = await response.json();
        
        const html = `
            <div class="success">
                <strong>✓ User Updated Successfully!</strong>
                <pre>${JSON.stringify(updatedUser, null, 2)}</pre>
            </div>
        `;
        
        showResults('updateResult', html);
    } catch (error) {
        showResults('updateResult', `<strong>Error:</strong> ${error.message}`, true);
    }
}

// DELETE - Delete User
async function deleteUser() {
    const userId = document.getElementById('deleteUserId').value;

    if (!userId) {
        alert('Please enter a User ID');
        return;
    }

    if (!confirm(`Are you sure you want to delete user ${userId}?`)) return;

    showLoading('deleteResult');

    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete user');
        
        const html = `
            <div class="success">
                <strong>✓ User Deleted Successfully!</strong>
                <p>User ID ${userId} has been removed.</p>
            </div>
        `;
        
        showResults('deleteResult', html);
        document.getElementById('deleteUserId').value = '';
    } catch (error) {
        showResults('deleteResult', `<strong>Error:</strong> ${error.message}`, true);
    }
}
