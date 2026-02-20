'use strict';

// --- GLOBAL VARIABLES ---
const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const tableElement = document.getElementById('sales-table');
const footer = document.querySelector('footer');

// We need an array to hold our store objects so the footer function can loop through them
const allStores = [];

// --- 1. CONSTRUCTOR FUNCTION ---
function Store(name, minCust, maxCust, avgCookies) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.cookiesSoldEachHour = [];
  this.dailyTotal = 0;
  
  // Push this new store into the allStores array automatically upon creation
  allStores.push(this);
}

// --- 2. PROTOTYPE METHODS ---

// Math Logic: Generates random customers and calculates cookies per hour
Store.prototype.simulate = function () {
  this.cookiesSoldEachHour = []; 
  this.dailyTotal = 0;

  for (let i = 0; i < hours.length; i++) {
    // Random number between min and max (inclusive)
    let cust = Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
    // Multiply by avg cookies and round up
    let cookies = Math.ceil(cust * this.avgCookies);
    
    this.cookiesSoldEachHour.push(cookies);
    this.dailyTotal += cookies; // Accumulator shorthand
  }
};

// Render Logic: Builds one row (tr) for this specific store
Store.prototype.render = function () {
  this.simulate(); 

  const row = document.createElement('tr');
  tableElement.appendChild(row);

  // Store Name Cell (using th for the row label)
  const nameCell = document.createElement('th');
  nameCell.textContent = this.name;
  row.appendChild(nameCell);

  // Hourly Data Cells (td)
  for (let i = 0; i < this.cookiesSoldEachHour.length; i++) {
    const dataCell = document.createElement('td');
    dataCell.textContent = this.cookiesSoldEachHour[i];
    row.appendChild(dataCell);
  }

  // Daily Total Cell for this store
  const totalCell = document.createElement('td');
  totalCell.textContent = this.dailyTotal;
  row.appendChild(totalCell);
};

// --- 3. STAND-ALONE FUNCTIONS ---

function renderHeaderRow() {
    // Create the head element
    const thead = document.createElement('thead');
    tableElement.appendChild(thead);
    
    const headerRow = document.createElement('tr');
    thead.appendChild(headerRow);

    const emptyHeader = document.createElement('th');
    emptyHeader.textContent = 'Locations'; // Adding a label here like the photo
    headerRow.appendChild(emptyHeader);

    for (let i = 0; i < hours.length; i++) {
        const hourHeader = document.createElement('th');
        hourHeader.textContent = hours[i];
        headerRow.appendChild(hourHeader);
    }

    const totalHeader = document.createElement('th');
    totalHeader.textContent = 'Location Totals';
    headerRow.appendChild(totalHeader);
}

function renderFooterRow() {
    // Create the foot element
    const tfoot = document.createElement('tfoot');
    tableElement.appendChild(tfoot);

    const footerRow = document.createElement('tr');
    tfoot.appendChild(footerRow);

    const footerLabel = document.createElement('th');
    footerLabel.textContent = 'Hourly Totals for All Locations';
    footerRow.appendChild(footerLabel);

    let grandTotal = 0;
    for (let i = 0; i < hours.length; i++) {
        let hourlyTotalAcrossStores = 0;
        for (let j = 0; j < allStores.length; j++) {
            hourlyTotalAcrossStores += allStores[j].cookiesSoldEachHour[i];
        }
        const footerCell = document.createElement('th');
        footerCell.textContent = hourlyTotalAcrossStores;
        footerRow.appendChild(footerCell);
        grandTotal += hourlyTotalAcrossStores;
    }

    const grandTotalCell = document.createElement('th');
    grandTotalCell.textContent = grandTotal;
    footerRow.appendChild(grandTotalCell);
}
// --- 4. EXECUTION ---

// 1. Create the instances (the "new" keyword fills allStores array)
new Store('Seattle', 23, 65, 6.3);
new Store('Tokyo', 3, 24, 1.2);
new Store('Dubai', 11, 38, 3.7);
new Store('Paris', 20, 38, 2.3);
new Store('Lima', 2, 16, 4.6);

// 2. Call the functions in order
renderHeaderRow();

// Loop through allStores to call .render() on each one
for (let i = 0; i < allStores.length; i++) {
  allStores[i].render();
}

renderFooterRow();

// Set the copyright
footer.textContent = '© 2026 Ray\'s Salmon Cookies';