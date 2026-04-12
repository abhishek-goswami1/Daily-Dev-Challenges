const BASE_URL = 'https://jsonplaceholder.typicode.com';

// DOM Elements
const getUserBtn = document.getElementById('getUserBtn');
const getAllPostsBtn = document.getElementById('getAllPostsBtn');
const getPostsBtn = document.getElementById('getPostsBtn');
const userIdInput = document.getElementById('userId');
const userDetails = document.getElementById('userDetails');
const postsList = document.getElementById('postsList');
const rawResponse = document.getElementById('rawResponse');
const responseStatus = document.getElementById('responseStatus');
const currentViewLabel = document.getElementById('currentView');
const navItems = document.querySelectorAll('.nav-item');

// State
let currentSource = 'all';

// Initialize
function init() {
    setupEventListeners();
    fetchAllPosts(); // Default view
}

function setupEventListeners() {
    getUserBtn.addEventListener('click', () => {
        const id = getUserId();
        if (id) fetchUser(id);
    });

    getPostsBtn.addEventListener('click', () => {
        const id = getUserId();
        if (id) fetchUserPosts(id);
    });

    getAllPostsBtn.addEventListener('click', fetchAllPosts);

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function getUserId() {
    const val = userIdInput.value;
    if (!val || val < 1 || val > 10) {
        showError('Please enter a valid User ID between 1 and 10');
        return null;
    }
    return val;
}

function setStatus(status, type = 'idle') {
    responseStatus.innerText = status;
    responseStatus.className = `badge ${type}`;
    if (type === 'error') responseStatus.style.background = '#fee2e2';
    if (type === 'success') responseStatus.style.background = '#dcfce7';
    if (type === 'loading') responseStatus.style.background = '#e0e7ff';
}

async function fetchUser(userId) {
    showLoading();
    setStatus('fetching user...', 'loading');
    currentViewLabel.innerText = `User #${userId} Details`;
    
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}`);
        if (!response.ok) throw new Error('User not found');
        const user = await response.json();
        
        displayUser(user);
        updateRaw(user);
        setStatus('200 OK', 'success');
    } catch (err) {
        showError(err.message);
    }
}

async function fetchUserPosts(userId) {
    showLoading();
    setStatus('fetching posts...', 'loading');
    currentViewLabel.innerText = `User #${userId} Posts`;

    try {
        const response = await fetch(`${BASE_URL}/users/${userId}/posts`);
        const posts = await response.json();
        
        displayPosts(posts);
        updateRaw(posts);
        setStatus('200 OK', 'success');
    } catch (err) {
        showError(err.message);
    }
}

async function fetchAllPosts() {
    showLoading();
    setStatus('fetching all...', 'loading');
    currentViewLabel.innerText = 'All Posts';

    try {
        const response = await fetch(`${BASE_URL}/posts`);
        const posts = await response.json();
        
        displayPosts(posts.slice(0, 10)); // Just first 10 for performance
        updateRaw(posts.slice(0, 5));
        setStatus('200 OK (Partial)', 'success');
    } catch (err) {
        showError(err.message);
    }
}

function displayUser(user) {
    postsList.innerHTML = '';
    userDetails.innerHTML = `
        <div class="detail-item">
            <span class="detail-label">Name</span>
            <span class="detail-value">${user.name}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Email</span>
            <span class="detail-value">${user.email}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Username</span>
            <span class="detail-value">${user.username}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Website</span>
            <span class="detail-value">${user.website}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Company</span>
            <span class="detail-value">${user.company.name}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">City</span>
            <span class="detail-value">${user.address.city}</span>
        </div>
    `;
}

function displayPosts(posts) {
    userDetails.innerHTML = '';
    postsList.innerHTML = posts.map(post => `
        <div class="post-card">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        </div>
    `).join('');
}

function updateRaw(data) {
    rawResponse.textContent = JSON.stringify(data, null, 2);
}

function showLoading() {
    postsList.innerHTML = '<div class="empty-state">Loading data...</div>';
    userDetails.innerHTML = '';
}

function showError(msg) {
    setStatus('Error', 'error');
    postsList.innerHTML = `<div class="empty-state" style="color: #ef4444">${msg}</div>`;
}

init();
