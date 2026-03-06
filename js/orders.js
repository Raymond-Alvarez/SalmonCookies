'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const pendingList = document.getElementById('pending-list');
    const filledList = document.getElementById('filled-list');

    function loadOrders() {
        const savedOrders = JSON.parse(localStorage.getItem('allOrders')) || [];
        
        // Clear the current list to prevent duplicates
        pendingList.innerHTML = '';

        savedOrders.forEach((order, index) => {
            if (order.status === 'pending') {
                const li = document.createElement('li');
                li.className = 'order-row';
                li.innerHTML = `
                    <span><strong>Order #${order.id}</strong>: ${order.customer} - ${order.details}</span>
                    <button class="process-btn" data-index="${index}">Process Order</button>
                `;
                pendingList.appendChild(li);
            }
        });

        // Re-attach event listeners to the new buttons
        const buttons = document.querySelectorAll('.process-btn');
        buttons.forEach(btn => btn.addEventListener('click', processOrder));
    }

    function processOrder(event) {
        const index = event.target.getAttribute('data-index');
        let allOrders = JSON.parse(localStorage.getItem('allOrders'));
        
        // Update status in memory
        allOrders[index].status = 'filled';
        allOrders[index].processedTime = new Date().toLocaleTimeString();
        
        // Save back to storage and refresh the UI
        localStorage.setItem('allOrders', JSON.stringify(allOrders));
        renderFilledOrder(allOrders[index]);
        loadOrders(); // Refresh pending list
    }

    function renderFilledOrder(order) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>Order #${order.id}: ${order.customer}</span>
            <span> \u2714 Processed at ${order.processedTime}</span>
        `;
        filledList.appendChild(li);
    }

    // Initial Load
    loadOrders();
});