// Notification System
class NotificationSystem {
    constructor(containerId = 'notificationContainer') {
        this.container = document.getElementById(containerId);
        this.notifications = [];
    }

    show(type, title, message, duration = 4000) {
        const notificationId = `notif-${Date.now()}`;
        
        const notification = document.createElement('div');
        notification.id = notificationId;
        notification.className = `notification ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ',
            warning: '⚠'
        };

        const titles = {
            success: 'Success',
            error: 'Error',
            info: 'Info',
            warning: 'Warning'
        };

        notification.innerHTML = `
            <div class="notification-icon">${icons[type]}</div>
            <div class="notification-content">
                <div class="notification-title">${title || titles[type]}</div>
                <div class="notification-message">${message}</div>
            </div>
            <span class="notification-close" onclick="notificationSystem.remove('${notificationId}')">×</span>
            <div class="notification-progress" style="animation-duration: ${duration}ms"></div>
        `;

        this.container.appendChild(notification);
        this.notifications.push(notificationId);

        // Auto remove after duration
        setTimeout(() => {
            this.remove(notificationId);
        }, duration);

        return notificationId;
    }

    remove(notificationId) {
        const notification = document.getElementById(notificationId);
        if (notification) {
            notification.classList.add('removing');
            setTimeout(() => {
                notification.remove();
                this.notifications = this.notifications.filter(id => id !== notificationId);
            }, 300);
        }
    }

    success(message, title = 'Success', duration = 4000) {
        return this.show('success', title, message, duration);
    }

    error(message, title = 'Error', duration = 4000) {
        return this.show('error', title, message, duration);
    }

    info(message, title = 'Info', duration = 4000) {
        return this.show('info', title, message, duration);
    }

    warning(message, title = 'Warning', duration = 4000) {
        return this.show('warning', title, message, duration);
    }

    clearAll() {
        this.notifications.forEach(id => this.remove(id));
    }
}

// Initialize notification system
const notificationSystem = new NotificationSystem();

// Function to show notification from form
function showNotification() {
    const type = document.getElementById('notifType').value;
    const message = document.getElementById('notifMessage').value;
    const duration = parseInt(document.getElementById('notifDuration').value);

    if (message.trim()) {
        notificationSystem.show(type, null, message, duration);
    } else {
        notificationSystem.warning('Please enter a message', 'Warning', 3000);
    }
}

// Quick notification functions
function quickNotification(type, message) {
    notificationSystem.show(type, null, message, 4000);
}

// Show multiple notifications
function showMultipleNotifications() {
    const messages = [
        { type: 'info', message: 'Processing your request...' },
        { type: 'success', message: 'File uploaded successfully!' },
        { type: 'warning', message: 'Some changes may not be saved.' },
        { type: 'error', message: 'Failed to connect to server.' }
    ];

    messages.forEach((item, index) => {
        setTimeout(() => {
            notificationSystem.show(item.type, null, item.message, 5000);
        }, index * 500);
    });
}

// Keyboard shortcut to clear all (Ctrl + Shift + X)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'X') {
        notificationSystem.clearAll();
    }
});
