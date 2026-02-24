'use strict';

/* --- 1. THEME TOGGLE LOGIC --- */
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.hasAttribute('data-theme') ? 
            document.body.removeAttribute('data-theme') : 
            document.body.setAttribute('data-theme', 'dark');
    });
}

/* --- 2. ORDER PROCESSING LOGIC --- */
const pendingList = document.getElementById('pending-list');
const filledList = document.getElementById('filled-list');

// Function to handle moving the order
function processOrder(event) {
    // 1. Identify the button's parent (the <li>)
    const orderItem = event.target.parentElement;
    
    // 2. Remove the "Process" button so it can't be clicked again
    event.target.remove();
    
    // 3. Move the <li> from Pending to Filled
    filledList.appendChild(orderItem);
    
    // 4. Add a "Completed" timestamp
    const timestamp = document.createElement('span');
    timestamp.style.fontStyle = 'italic';
    timestamp.style.fontSize = '0.9rem';
    timestamp.style.marginLeft = '10px';
    timestamp.textContent = ' - Processed at ' + new Date().toLocaleTimeString();
    orderItem.appendChild(timestamp);
}

// 5. ATTACH LISTENERS
// Use querySelectorAll to find all buttons with the class 'process-btn'
const processButtons = document.querySelectorAll('.process-btn');
processButtons.forEach(button => {
    button.addEventListener('click', processOrder);
});