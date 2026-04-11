document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const allowMultipleCheckbox = document.getElementById('allow-multiple');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            const allowMultiple = allowMultipleCheckbox.checked;

            if (!allowMultiple && !isActive) {
                // Close other items if not allowing multiple
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
            }

            // Toggle current item
            item.classList.toggle('active');
        });
    });
});
