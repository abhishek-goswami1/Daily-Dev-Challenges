const BASE_URL = 'https://jsonplaceholder.typicode.com';

const getUserBtn = document.getElementById('getUserBtn');
const getAllPostsBtn = document.getElementById('getAllPostsBtn');
const getPostsBtn = document.getElementById('getPostsBtn');
const userIdInput = document.getElementById('userId');
const userDetails = document.getElementById('userDetails');
const postsList = document.getElementById('postsList');
const rawResponse = document.getElementById('rawResponse');

async function fetchUser(userId) {
    try {
        userDetails.innerHTML = '<p class="loading">Loading...</p>';
        const response = await fetch(`${BASE_URL}/users/${userId}`);
        if (!response.ok) throw new Error(`User not found`);
        const user = await response.json();
        displayUser(user);
        rawResponse.textContent = JSON.stringify(user, null, 2);
    } catch (error) {
        userDetails.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        rawResponse.textContent = '';
    }
}

async function fetchPosts(userId = null) {
    try {
        postsList.innerHTML = '<p class="loading">Loading...</p>';
        const url = userId ? `${BASE_URL}/users/${userId}/posts` : `${BASE_URL}/posts`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const posts = await response.json();
        displayPosts(posts);
        rawResponse.textContent = JSON.stringify(posts.slice(0, 3), null, 2) + '\n... (showing first 3)';
    } catch (error) {
        postsList.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        rawResponse.textContent = '';
    }
}

function displayUser(user) {
    userDetails.innerHTML = `
        <div class="detail-item"><span class="detail-label">ID:</span> ${user.id}</div>
        <div class="detail-item"><span class="detail-label">Name:</span> ${user.name}</div>
        <div class="detail-item"><span class="detail-label">Username:</span> ${user.username}</div>
        <div class="detail-item"><span class="detail-label">Email:</span> ${user.email}</div>
        <div class="detail-item"><span class="detail-label">Phone:</span> ${user.phone}</div>
        <div class="detail-item"><span class="detail-label">Website:</span> ${user.website}</div>
        <div class="detail-item"><span class="detail-label">Company:</span> ${user.company.name}</div>
    `;
}

function displayPosts(posts) {
    if (posts.length === 0) {
        postsList.innerHTML = '<p class="empty">No posts found</p>';
        return;
    }

    postsList.innerHTML = posts.map(post => `
        <div class="post-item">
            <div class="post-title">#${post.id} - ${post.title}</div>
            <div class="post-body">${post.body}</div>
            <div class="post-meta">User ID: ${post.userId}</div>
        </div>
    `).join('');
}

getUserBtn.addEventListener('click', () => {
    const userId = userIdInput.value.trim();
    if (!userId) {
        alert('Please enter a user ID');
        return;
    }
    fetchUser(userId);
});

getPostsBtn.addEventListener('click', () => {
    const userId = userIdInput.value.trim();
    if (!userId) {
        alert('Please enter a user ID');
        return;
    }
    fetchPosts(userId);
});

getAllPostsBtn.addEventListener('click', () => {
    fetchPosts();
});

userIdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getUserBtn.click();
    }
});
