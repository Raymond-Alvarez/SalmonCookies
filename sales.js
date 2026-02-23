'use strict';

// --- GLOBAL VARIABLES ---
const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const footer = document.querySelector('footer');
const footerElement = document.getElementById('page-footer');
const controlCurve = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
const salesTable = document.getElementById('sales-table');
const staffTable = document.getElementById('staffing-table');

// We need an array to hold our store objects so the footer function can loop through them
const allStores = [];

// --- 1. CONSTRUCTOR FUNCTION ---
function Store(name, minCust, maxCust, avgCookies) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.cookiesSoldEachHour = [];
  this.staffNeededEachHour = []; // array for staffing table
  this.dailyTotal = 0;
  
  // Push this new store into the allStores array automatically upon creation
  allStores.push(this);
}

// --- 2. PROTOTYPE METHODS ---

// Math Logic: Generates random customers and calculates cookies per hour
Store.prototype.simulate = function () {
  this.cookiesSoldEachHour = []; 
  this.staffNeededEachHour = [];
  this.dailyTotal = 0;

  for (let i = 0; i < hours.length; i++) {
    // 3B & 4: Use the control curve to scale max customers    
    let scaledMax = this.maxCust * controlCurve[i];
    // Ensure the max is never smaller than the min
    if (scaledMax < this.minCust) {
        scaledMax = this.minCust;
    }

    // Calculate random customers based on the curve    
    let cust = Math.floor(Math.random() * (scaledMax - this.minCust + 1) + this.minCust);
    // Multiply by avg cookies and round up
    let cookies = Math.ceil(cust * this.avgCookies);
    
    this.cookiesSoldEachHour.push(cookies);
    this.dailyTotal += cookies; // Accumulator shorthand

    // 2A, 2B, 2C: Staffing Logic
    // This now strictly provides 1 staffer per 20 customers.
    // 1-20 customers = 1 staffer
    // 21-40 customers = 2 staffers
    let hourlyStaff = Math.ceil(cust / 20);
    if (hourlyStaff < 1) {
        hourlyStaff = 1;
    }   
    this.staffNeededEachHour.push(hourlyStaff);
}
};

// Render Logic: Builds one row (tr) for this specific store
// RENDER SALES TABLE (Cookies)
Store.prototype.render = function () {
  this.simulate(); 
  const row = document.createElement('tr');
    salesTable.appendChild(row);

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

Store.prototype.renderStaff = function () {
  const row = document.createElement('tr');
  staffTable.appendChild(row);

  const nameCell = document.createElement('th');
  nameCell.textContent = this.name;
  row.appendChild(nameCell);

  let staffTotal = 0; // Define the variable here
  for (let i = 0; i < this.staffNeededEachHour.length; i++) {
    const dataCell = document.createElement('td');
    dataCell.textContent = this.staffNeededEachHour[i];
    row.appendChild(dataCell);
    staffTotal += this.staffNeededEachHour[i];
  }

  const totalCell = document.createElement('td');
  totalCell.textContent = staffTotal;
  row.appendChild(totalCell);
};

// --- 3. STAND-ALONE FUNCTIONS ---

function renderHeaderRow(targetTable) {
    const thead = document.createElement('thead');
    targetTable.appendChild(thead);
    
    const headerRow = document.createElement('tr');
    thead.appendChild(headerRow);

    const emptyHeader = document.createElement('th');
    emptyHeader.textContent = 'Locations';
    headerRow.appendChild(emptyHeader);

    for (let i = 0; i < hours.length; i++) {
        const hourHeader = document.createElement('th');
        hourHeader.textContent = hours[i];
        headerRow.appendChild(hourHeader);
    }

    const totalHeader = document.createElement('th');
    totalHeader.textContent = (targetTable === salesTable) ? 'Location Totals' : 'Staff Totals';
    headerRow.appendChild(totalHeader);
}

function renderFooterRow() {
    // Create the foot element
    const tfoot = document.createElement('tfoot');
    salesTable.appendChild(tfoot);

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

// 2. Build Sales Table
renderHeaderRow(salesTable);
for (let i = 0; i < allStores.length; i++) {
    allStores[i].render(); // This also runs simulate()
}
renderFooterRow(); // This adds the total cookies footer

// 3. Build Staffing Table
renderHeaderRow(staffTable);
for (let i = 0; i < allStores.length; i++) {
    allStores[i].renderStaff();
}

// --- 5. EVENT LISTENER ---

const storeForm = document.getElementById('add-store-form');

function handleSubmit(event) {
    event.preventDefault(); // Stops page from refreshing

    // Extract values from the form inputs
    const name = event.target['location-name'].value;
    const min = parseInt(event.target['min-cust'].value);
    const max = parseInt(event.target['max-cust'].value);
    const avg = parseFloat(event.target['avg-cookies'].value);

    // Create new store instance
    new Store(name, min, max, avg);

    // Clear and Redraw the tables
    salesTable.innerHTML = '';
    staffTable.innerHTML = '';
    
    renderHeaderRow(salesTable);
    for (let i = 0; i < allStores.length; i++) {
        allStores[i].render();
    }
    renderFooterRow();

    renderHeaderRow(staffTable);
    for (let i = 0; i < allStores.length; i++) {
        allStores[i].renderStaff();
    }

    event.target.reset(); // Clears the form for the next entry
}

storeForm.addEventListener('submit', handleSubmit);

// Set the copyright
// footer.textContent = '© 2026 Ray\'s Salmon Cookies';