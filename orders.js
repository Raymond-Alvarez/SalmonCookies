'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. SELECT ELEMENTS --- */
    // This is the container where orders will move to
    const filledList = document.getElementById('filled-list');
    // Selecting all buttons that start in the "Pending" section
    const processButtons = document.querySelectorAll('.process-btn');

    /* --- 2. ORDER PROCESSING LOGIC --- */
    function processOrder(event) {
        // Find the <li> that contains the button clicked
        const orderItem = event.target.parentElement;
        
        // 1. Remove the "Process" button immediately
        event.target.remove(); 
        
        if (filledList) {
            // 2. Move the <li> from Pending to the Filled rectangular box
            filledList.appendChild(orderItem);
            
            // 3. Create the Success Marker (Checkmark + Time)
            const statusSpan = document.createElement('span');
            
            // \u2714 is the Unicode for the Heavy Check Mark
            statusSpan.textContent = ' \u2714 Processed at ' + new Date().toLocaleTimeString();
            
            // 4. Style the Checkmark Line
            statusSpan.style.display = 'block'; 
            statusSpan.style.fontSize = '0.85rem';
            statusSpan.style.marginTop = '8px';
            statusSpan.style.color = '#2e7d32'; // Success Green
            statusSpan.style.fontWeight = 'bold';
            statusSpan.style.fontStyle = 'italic';
            
            // Add the checkmark to the order item
            orderItem.appendChild(statusSpan);
        }
    }

    /* --- 3. ATTACH EVENT LISTENERS --- */
    // Loop through every "Process Order" button found on the page
    processButtons.forEach(button => {
        button.addEventListener('click', processOrder);
    });

});