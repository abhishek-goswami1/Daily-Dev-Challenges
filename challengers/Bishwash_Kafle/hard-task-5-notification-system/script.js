// Notification System
class NotificationSystem {
    constructor(containerId = 'notification-container') {
        this.container = document.getElementById(containerId);
        this.notifications = [];
        this.init();
    }
    
    init() {
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        document.getElementById('success-btn').addEventListener('click', () => {
            this.show('Success!', 'Your action was completed successfully.', 'success');
        });
        
        document.getElementById('error-btn').addEventListener('click', () => {
            this.show('Error!', 'Something went wrong. Please try again.', 'error');
        });
        
        document.getElementById('info-btn').addEventListener('click', () => {
            this.show('Information', 'Please note that this is an informational message.', 'info');
        });
        
        document.getElementById('warning-btn').addEventListener('click', () => {
            this.show('Warning!', 'Please be careful and review your action.', 'warning');
        });
        
        document.getElementById('custom-btn').addEventListener('click', () => {
            this.showCustom();
        });
    }
    
    show(title, message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        const notificationId = Date.now();
        notification.className = `notification ${type}`;
        notification.id = `notification-${notificationId}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            info: 'ⓘ',
            warning: '⚠'
        };
        
        notification.innerHTML = `
            <div class="notification-icon">${icons[type]}</div>
            <div class="notification-content">
                <div class="notification-title">${this.escapeHtml(title)}</div>
                <div class="notification-message">${this.escapeHtml(message)}</div>
            </div>
            <button class="notification-close" aria-label="Close notification">×</button>
            <div class="notification-progress"></div>
        `;
        
        this.container.appendChild(notification);
        this.notifications.push(notificationId);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.remove(notificationId);
        });
        
        if (duration > 0) {
            const progressBar = notification.querySelector('.notification-progress');
            progressBar.style.animation = `progress ${duration}ms linear forwards`;
            
            setTimeout(() => {
                this.remove(notificationId);
            }, duration);
        }
    }
    
    showCustom() {
        const title = document.getElementById('title').value || 'Notification';
        const message = document.getElementById('message').value || 'No message provided';
        const type = document.getElementById('type').value || 'info';
        const duration = parseInt(document.getElementById('duration').value) || 5000;
        
        this.show(title, message, type, duration);
    }
    
    remove(notificationId) {
        const notification = document.getElementById(`notification-${notificationId}`);
        
        if (notification) {
            notification.classList.add('removing');
            
            setTimeout(() => {
                notification.remove();
                this.notifications = this.notifications.filter(id => id !== notificationId);
            }, 300);
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    removeAll() {
        this.notifications.forEach(id => {
            this.remove(id);
        });
    }
}

// Initialize notification system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.notificationSystem = new NotificationSystem();
});
