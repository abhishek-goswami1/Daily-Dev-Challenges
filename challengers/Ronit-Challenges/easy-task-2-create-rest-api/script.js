// Mock Database
const mockDatabase = {
    users: [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Frontend' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Backend' },
        { id: 3, name: 'Carol White', email: 'carol@example.com', department: 'DevOps' },
        { id: 4, name: 'David Brown', email: 'david@example.com', department: 'Design' },
        { id: 5, name: 'Eve Davis', email: 'eve@example.com', department: 'QA' }
    ],
    nextId: 6
};

// Mock API Class
class MockRestAPI {
    constructor() {
        this.baseDelay = 300; // Simulate network delay
    }

    async simulateNetworkDelay() {
        return new Promise(resolve => setTimeout(resolve, this.baseDelay + Math.random() * 200));
    }

    displayResponse(status, data) {
        const statusEl = document.getElementById('responseStatus');
        const dataEl = document.getElementById('responseData');

        statusEl.textContent = status;
        statusEl.className = 'response-status ' + (status.includes('200') || status.includes('201') ? 'success' : 'error');
        dataEl.textContent = JSON.stringify(data, null, 2);
    }

    async fetchUsers() {
        try {
            await this.simulateNetworkDelay();
            const response = {
                status: 200,
                message: 'Success',
                data: mockDatabase.users,
                count: mockDatabase.users.length
            };
            this.displayResponse('✅ GET /users - 200 OK', response);
        } catch (error) {
            this.displayResponse('❌ Error: ' + error.message, { error: error.message });
        }
    }

    async fetchUserById() {
        try {
            const userId = parseInt(document.getElementById('userId').value);

            if (!userId || userId < 1 || userId > 5) {
                throw new Error('Please enter a valid User ID (1-5)');
            }

            await this.simulateNetworkDelay();
            const user = mockDatabase.users.find(u => u.id === userId);

            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }

            const response = {
                status: 200,
                message: 'Success',
                data: user
            };
            this.displayResponse(`✅ GET /users/${userId} - 200 OK`, response);
        } catch (error) {
            this.displayResponse('❌ Error: ' + error.message, { error: error.message });
        }
    }

    async createUser() {
        try {
            const name = document.getElementById('newName').value.trim();
            const email = document.getElementById('newEmail').value.trim();

            if (!name || !email) {
                throw new Error('Name and Email are required');
            }

            if (!this.isValidEmail(email)) {
                throw new Error('Invalid email format');
            }

            await this.simulateNetworkDelay();

            const newUser = {
                id: mockDatabase.nextId++,
                name: name,
                email: email,
                department: 'New Department'
            };

            mockDatabase.users.push(newUser);

            const response = {
                status: 201,
                message: 'User created successfully',
                data: newUser
            };

            document.getElementById('newName').value = '';
            document.getElementById('newEmail').value = '';

            this.displayResponse('✅ POST /users - 201 Created', response);
        } catch (error) {
            this.displayResponse('❌ Error: ' + error.message, { error: error.message });
        }
    }

    async updateUser() {
        try {
            const userId = parseInt(document.getElementById('updateId').value);
            const name = document.getElementById('updateName').value.trim();

            if (!userId || userId < 1 || userId > 10) {
                throw new Error('Please enter a valid User ID');
            }

            if (!name) {
                throw new Error('Name is required');
            }

            await this.simulateNetworkDelay();

            const user = mockDatabase.users.find(u => u.id === userId);

            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }

            user.name = name;

            const response = {
                status: 200,
                message: 'User updated successfully',
                data: user
            };

            document.getElementById('updateId').value = '';
            document.getElementById('updateName').value = '';

            this.displayResponse('✅ PUT /users/' + userId + ' - 200 OK', response);
        } catch (error) {
            this.displayResponse('❌ Error: ' + error.message, { error: error.message });
        }
    }

    async deleteUser() {
        try {
            const userId = parseInt(document.getElementById('deleteId').value);

            if (!userId || userId < 1 || userId > 10) {
                throw new Error('Please enter a valid User ID');
            }

            await this.simulateNetworkDelay();

            const index = mockDatabase.users.findIndex(u => u.id === userId);

            if (index === -1) {
                throw new Error(`User with ID ${userId} not found`);
            }

            const deletedUser = mockDatabase.users.splice(index, 1)[0];

            const response = {
                status: 200,
                message: 'User deleted successfully',
                data: deletedUser
            };

            document.getElementById('deleteId').value = '';

            this.displayResponse('✅ DELETE /users/' + userId + ' - 200 OK', response);
        } catch (error) {
            this.displayResponse('❌ Error: ' + error.message, { error: error.message });
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Initialize API
const api = new MockRestAPI();
