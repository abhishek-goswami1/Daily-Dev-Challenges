class MockAPI {
    constructor() {
        this.users = [
            { id: 1, name: 'John Doe', email: 'john@example.com', created_at: '2024-01-15' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', created_at: '2024-01-16' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', created_at: '2024-01-17' },
            { id: 4, name: 'Alice Williams', email: 'alice@example.com', created_at: '2024-01-18' },
            { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', created_at: '2024-01-19' }
        ];

        this.posts = [
            { id: 1, title: 'Getting Started with APIs', content: 'Learn how to use REST APIs effectively', user_id: 1, created_at: '2024-01-20' },
            { id: 2, title: 'JavaScript Best Practices', content: 'Tips and tricks for writing clean JavaScript', user_id: 2, created_at: '2024-01-21' },
            { id: 3, title: 'Web Development Tools', content: 'Essential tools for modern web development', user_id: 1, created_at: '2024-01-22' },
            { id: 4, title: 'CSS Layout Techniques', content: 'Master CSS Grid and Flexbox', user_id: 3, created_at: '2024-01-23' },
            { id: 5, title: 'Responsive Design', content: 'Building mobile-first applications', user_id: 2, created_at: '2024-01-24' },
            { id: 6, title: 'API Security', content: 'Keep your APIs secure and protected', user_id: 4, created_at: '2024-01-25' },
            { id: 7, title: 'Database Design', content: 'Designing efficient database schemas', user_id: 5, created_at: '2024-01-26' },
            { id: 8, title: 'Testing Strategies', content: 'Unit testing and integration testing', user_id: 1, created_at: '2024-01-27' },
            { id: 9, title: 'Performance Optimization', content: 'Make your applications faster', user_id: 3, created_at: '2024-01-28' },
            { id: 10, title: 'DevOps Basics', content: 'Introduction to DevOps practices', user_id: 4, created_at: '2024-01-29' }
        ];

        this.nextUserId = 6;
        this.nextPostId = 11;
    }

    // User endpoints
    getAllUsers() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    data: this.users,
                    message: 'Users retrieved successfully'
                });
            }, 500);
        });
    }

    getUserById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this.users.find(u => u.id === parseInt(id));
                if (user) {
                    resolve({
                        status: 200,
                        data: user,
                        message: 'User retrieved successfully'
                    });
                } else {
                    reject({
                        status: 404,
                        error: 'User not found',
                        message: `User with ID ${id} does not exist`
                    });
                }
            }, 500);
        });
    }

    createUser(name, email) {
        return new Promise(resolve => {
            setTimeout(() => {
                const newUser = {
                    id: this.nextUserId++,
                    name: name,
                    email: email,
                    created_at: new Date().toISOString().split('T')[0]
                };
                this.users.push(newUser);
                resolve({
                    status: 201,
                    data: newUser,
                    message: 'User created successfully'
                });
            }, 500);
        });
    }

    // Post endpoints
    getAllPosts() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    data: this.posts,
                    message: 'Posts retrieved successfully'
                });
            }, 500);
        });
    }

    getPostById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const post = this.posts.find(p => p.id === parseInt(id));
                if (post) {
                    resolve({
                        status: 200,
                        data: post,
                        message: 'Post retrieved successfully'
                    });
                } else {
                    reject({
                        status: 404,
                        error: 'Post not found',
                        message: `Post with ID ${id} does not exist`
                    });
                }
            }, 500);
        });
    }

    createPost(title, content) {
        return new Promise(resolve => {
            setTimeout(() => {
                const newPost = {
                    id: this.nextPostId++,
                    title: title,
                    content: content,
                    user_id: Math.floor(Math.random() * 5) + 1,
                    created_at: new Date().toISOString().split('T')[0]
                };
                this.posts.push(newPost);
                resolve({
                    status: 201,
                    data: newPost,
                    message: 'Post created successfully'
                });
            }, 500);
        });
    }
}

class APIDemo {
    constructor() {
        this.api = new MockAPI();
        this.responseContainer = document.getElementById('responseContainer');
    }

    displayResponse(data) {
        this.responseContainer.innerHTML = `<pre class="success-response">${JSON.stringify(data, null, 2)}</pre>`;
    }

    displayError(error) {
        this.responseContainer.innerHTML = `<pre class="error-response">${JSON.stringify(error, null, 2)}</pre>`;
    }

    clearResponse() {
        this.responseContainer.innerHTML = '<p class="placeholder">API responses will appear here...</p>';
    }

    async getAllUsers() {
        try {
            const response = await this.api.getAllUsers();
            this.displayResponse(response);
        } catch (error) {
            this.displayError(error);
        }
    }

    async getUserById() {
        const id = document.getElementById('userId').value;
        if (!id) {
            alert('Please enter a user ID');
            return;
        }

        try {
            const response = await this.api.getUserById(id);
            this.displayResponse(response);
        } catch (error) {
            this.displayError(error);
        }
    }

    async createUser() {
        const name = document.getElementById('newUserName').value.trim();
        const email = document.getElementById('newUserEmail').value.trim();

        if (!name || !email) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await this.api.createUser(name, email);
            this.displayResponse(response);
            document.getElementById('newUserName').value = '';
            document.getElementById('newUserEmail').value = '';
        } catch (error) {
            this.displayError(error);
        }
    }

    async getAllPosts() {
        try {
            const response = await this.api.getAllPosts();
            this.displayResponse(response);
        } catch (error) {
            this.displayError(error);
        }
    }

    async getPostById() {
        const id = document.getElementById('postId').value;
        if (!id) {
            alert('Please enter a post ID');
            return;
        }

        try {
            const response = await this.api.getPostById(id);
            this.displayResponse(response);
        } catch (error) {
            this.displayError(error);
        }
    }

    async createPost() {
        const title = document.getElementById('postTitle').value.trim();
        const content = document.getElementById('postContent').value.trim();

        if (!title || !content) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await this.api.createPost(title, content);
            this.displayResponse(response);
            document.getElementById('postTitle').value = '';
            document.getElementById('postContent').value = '';
        } catch (error) {
            this.displayError(error);
        }
    }
}

// Initialize the demo
const apiDemo = new APIDemo();
