'use strict';

// /* --- 1. THEME TOGGLE LOGIC --- */
// const themeToggle = document.getElementById('theme-toggle');
// if (themeToggle) {
//     themeToggle.addEventListener('click', () => {
//         document.body.hasAttribute('data-theme') ? 
//             document.body.removeAttribute('data-theme') : 
//             document.body.setAttribute('data-theme', 'dark');
//     });
// }

/* --- 2. GLOBAL VARIABLES & DATA --- */
const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const controlCurve = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
const salesTable = document.getElementById('sales-table');
const staffTable = document.getElementById('staffing-table');
const allStores = [];

/* --- 3. CONSTRUCTOR FUNCTION --- */
function Store(name, minCust, maxCust, avgCookies) {
    this.name = name;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookies = avgCookies;
    this.cookiesSoldEachHour = [];
    this.staffNeededEachHour = [];
    this.dailyTotal = 0;
    allStores.push(this);
}

/* --- 4. PROTOTYPE METHODS --- */
Store.prototype.simulate = function () {
    this.cookiesSoldEachHour = []; 
    this.staffNeededEachHour = [];
    this.dailyTotal = 0;

    for (let i = 0; i < hours.length; i++) {
        let scaledMax = this.maxCust * (controlCurve[i] || 1);
        if (scaledMax < this.minCust) scaledMax = this.minCust;

        let cust = Math.floor(Math.random() * (scaledMax - this.minCust + 1) + this.minCust);
        let cookies = Math.ceil(cust * this.avgCookies);
        
        this.cookiesSoldEachHour.push(cookies);
        this.dailyTotal += cookies;

        let hourlyStaff = Math.ceil(cust / 20);
        this.staffNeededEachHour.push(hourlyStaff < 2 ? 2 : hourlyStaff); 
    }
};

Store.prototype.render = function (targetTable) {
    this.simulate(); 
    const row = document.createElement('tr');
    targetTable.appendChild(row);

    const nameCell = document.createElement('th');
    nameCell.textContent = this.name;
    row.appendChild(nameCell);

    for (let i = 0; i < this.cookiesSoldEachHour.length; i++) {
        const dataCell = document.createElement('td');
        dataCell.textContent = this.cookiesSoldEachHour[i];
        row.appendChild(dataCell);
    }

    const totalCell = document.createElement('td');
    totalCell.textContent = this.dailyTotal;
    row.appendChild(totalCell);
};

Store.prototype.renderStaff = function (targetTable) {
    const row = document.createElement('tr');
    targetTable.appendChild(row);

    const nameCell = document.createElement('th');
    nameCell.textContent = this.name;
    row.appendChild(nameCell);

    let staffTotal = 0;
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

/* --- 5. TABLE HELPER FUNCTIONS --- */
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
    const tfoot = document.createElement('tfoot');
    salesTable.appendChild(tfoot);
    const footerRow = document.createElement('tr');
    tfoot.appendChild(footerRow);

    const footerLabel = document.createElement('th');
    footerLabel.textContent = 'Hourly Totals';
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

/* --- 6. EXECUTION --- */
new Store('Seattle', 23, 65, 6.3);
new Store('Tokyo', 3, 24, 1.2);
new Store('Dubai', 11, 38, 3.7);
new Store('Paris', 20, 38, 2.3);
new Store('Lima', 2, 16, 4.6);

function buildTables() {
    // Clear the tables completely
    salesTable.innerHTML = '';
    staffTable.innerHTML = '';
    
    // Build Sales Table
    renderHeaderRow(salesTable);
    const salesBody = document.createElement('tbody');
    salesTable.appendChild(salesBody);
    allStores.forEach(store => store.render(salesBody));
    renderFooterRow();

    // Build Staffing Table
    renderHeaderRow(staffTable);
    const staffBody = document.createElement('tbody');
    staffTable.appendChild(staffBody);
    allStores.forEach(store => store.renderStaff(staffBody));
}

buildTables();

/* --- 7. EVENT LISTENER --- */
const storeForm = document.getElementById('add-store-form');
if (storeForm) {
    storeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Use elements[id] for cleaner access
        const name = event.target['location-name'].value;
        const min = parseInt(event.target['min-cust'].value);
        const max = parseInt(event.target['max-cust'].value);
        const avg = parseFloat(event.target['avg-cookies'].value);

        // Input validation check
        if (max < min) {
            alert("Maximum customers cannot be less than minimum customers!");
            return;
        }

        new Store(name, min, max, avg);
        buildTables();
        event.target.reset();
    });
}