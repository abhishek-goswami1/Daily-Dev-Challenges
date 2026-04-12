const alerts = document.getElementById('alerts');
const infoBtn = document.getElementById('infoBtn');
const successBtn = document.getElementById('successBtn');
const errorBtn = document.getElementById('errorBtn');

function createAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button type="button" aria-label="Dismiss notification">×</button>
    `;

    const dismissBtn = alert.querySelector('button');
    dismissBtn.addEventListener('click', () => alert.remove());

    alerts.prepend(alert);

    setTimeout(() => {
        if (document.body.contains(alert)) {
            alert.remove();
        }
    }, 5000);
}

infoBtn.addEventListener('click', () => createAlert('info', 'This is an informational notification.'));
successBtn.addEventListener('click', () => createAlert('success', 'Your action completed successfully.'));
errorBtn.addEventListener('click', () => createAlert('error', 'Something went wrong.'));
