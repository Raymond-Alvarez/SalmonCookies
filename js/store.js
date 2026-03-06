'use strict';

// 1. Select the form from store.html
const orderForm = document.getElementById('public-order-form');

// 2. Add the event listener for submission
if (orderForm) {
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // 3. Create the order object using form input values
        const newOrder = {
            id: Math.floor(1000 + Math.random() * 9000),
            customer: event.target['full-name'].value,
            // Combines cookie and swag counts for the details string
            details: `${event.target['cookies'].value} Dozen Cookies, ${event.target['swag'].value} Swag Items`,
            status: 'pending'
        };

        // 4. Retrieve existing orders from localStorage or start a new array
        const allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];
        
        // 5. Add the new order to the list
        allOrders.push(newOrder);
        
        // 6. Save the updated list back to the browser's memory
        localStorage.setItem('allOrders', JSON.stringify(allOrders));

        // 7. Redirect the user to the processing page to see the new order
        window.location.href = 'order-processing.html';
    });
}