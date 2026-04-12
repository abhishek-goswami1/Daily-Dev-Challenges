class NotificationSystem {
    constructor() {
        this.container = document.getElementById('notification-container');
        this.placementSelect = document.getElementById('placement-select');
        this.duration = 5000;

        this.init();
    }

    init() {
        this.placementSelect.addEventListener('change', (e) => {
            this.container.className = `notification-container ${e.target.value}`;
            // Clear existing notifications when switching placement to avoid confusion
            this.container.innerHTML = '';
        });
    }

    show(type, title, message) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        notification.innerHTML = `
            <div class="notification-icon">${icons[type]}</div>
            <div class="notification-body">
                <div class="notification-title">${title}</div>
                <div class="notification-text">${message}</div>
            </div>
            <button class="notification-close">&times;</button>
            <div class="progress-bar"></div>
        `;

        this.container.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.remove(notification));

        // Auto remove after duration
        setTimeout(() => {
            if (notification.parentElement) {
                this.remove(notification);
            }
        }, this.duration);
    }

    remove(notification) {
        notification.classList.add('removing');
        notification.addEventListener('animationend', () => {
            notification.remove();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const system = new NotificationSystem();

    const config = {
        success: { title: 'Success!', msg: 'Your profile has been updated successfully.' },
        error: { title: 'Error Occurred', msg: 'Failed to connect to the server. Please check your internet.' },
        warning: { title: 'Warning', msg: 'Your storage is 90% full. Consider upgrading your plan.' },
        info: { title: 'Information', msg: 'A new system update is available for download.' }
    };

    document.getElementById('btn-success').addEventListener('click', () => {
        system.show('success', config.success.title, config.success.msg);
    });

    document.getElementById('btn-error').addEventListener('click', () => {
        system.show('error', config.error.title, config.error.msg);
    });

    document.getElementById('btn-warning').addEventListener('click', () => {
        system.show('warning', config.warning.title, config.warning.msg);
    });

    document.getElementById('btn-info').addEventListener('click', () => {
        system.show('info', config.info.title, config.info.msg);
    });
});
