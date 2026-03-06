'use strict';

/* --- 1. GLOBAL DATA --- */
const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const controlCurve = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
const allStores = [];

const salesTable = document.getElementById('sales-table');
const staffingTable = document.getElementById('staffing-table');

/* --- 2. CONSTRUCTOR --- */
function Store(name, minCust, maxCust, avgCookies) {
    this.name = name;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookies = avgCookies;
    this.cookiesSoldEachHour = [];
    this.staffNeededEachHour = [];
    this.dailyTotalCookies = 0;
    allStores.push(this);
}

/* --- 3. PROTOTYPE METHODS --- */
Store.prototype.simulateData = function() {
    this.cookiesSoldEachHour = [];
    this.staffNeededEachHour = [];
    this.dailyTotalCookies = 0;

    for (let i = 0; i < hours.length; i++) {
        let scaledMax = this.maxCust * (controlCurve[i] || 1);
        let cust = Math.floor(Math.random() * (scaledMax - this.minCust + 1) + this.minCust);
        let cookies = Math.ceil(cust * this.avgCookies);
        this.cookiesSoldEachHour.push(cookies);
        this.dailyTotalCookies += cookies;

        let staff = Math.ceil(cust / 20);
        this.staffNeededEachHour.push(staff < 2 ? 2 : staff);
    }
};

/* --- 4. RENDERING FUNCTIONS --- */
function renderRow(targetTable, title, dataArray, finalTotal) {
    const row = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = title;
    row.appendChild(th);

    for (let data of dataArray) {
        const td = document.createElement('td');
        td.textContent = data;
        row.appendChild(td);
    }

    const totalTd = document.createElement('td');
    totalTd.textContent = finalTotal;
    row.appendChild(totalTd);
    targetTable.querySelector('tbody').appendChild(row);
}

function renderHeader(targetTable, totalLabel) {
    const thead = document.createElement('thead');
    const row = document.createElement('tr');
    const corner = document.createElement('th');
    corner.textContent = 'Locations';
    row.appendChild(corner);

    for (let hour of hours) {
        const th = document.createElement('th');
        th.textContent = hour;
        row.appendChild(th);
    }

    const totalTh = document.createElement('th');
    totalTh.textContent = totalLabel;
    row.appendChild(totalTh);
    thead.appendChild(row);
    targetTable.appendChild(thead);
    targetTable.appendChild(document.createElement('tbody'));
}

function renderFooter() {
    const existingFooter = salesTable.querySelector('tfoot');
    if (existingFooter) existingFooter.remove();

    const tfoot = document.createElement('tfoot');
    const row = document.createElement('tr');
    const label = document.createElement('th');
    label.textContent = 'Totals';
    row.appendChild(label);

    let grandTotal = 0;
    for (let i = 0; i < hours.length; i++) {
        let hourlyTotal = 0;
        for (let store of allStores) {
            hourlyTotal += store.cookiesSoldEachHour[i];
        }
        const td = document.createElement('th');
        td.textContent = hourlyTotal;
        row.appendChild(td);
        grandTotal += hourlyTotal;
    }

    const grandTotalTd = document.createElement('th');
    grandTotalTd.textContent = grandTotal;
    row.appendChild(grandTotalTd);
    tfoot.appendChild(row);
    salesTable.appendChild(tfoot);
}

/* --- 5. INITIALIZATION --- */
function buildTables() {
    salesTable.innerHTML = '';
    renderHeader(salesTable, 'Daily Location Total');
    staffingTable.innerHTML = '';
    renderHeader(staffingTable, 'For the Day');

    allStores.forEach(store => {
        store.simulateData();
        renderRow(salesTable, store.name, store.cookiesSoldEachHour, store.dailyTotalCookies);
        let staffTotal = store.staffNeededEachHour.reduce((a, b) => a + b, 0);
        renderRow(staffingTable, store.name, store.staffNeededEachHour, staffTotal);
    });
    renderFooter();
}

// 1. Create Initial Stores
new Store('Seattle', 23, 65, 6.3);
new Store('Tokyo', 3, 24, 1.2);
new Store('Dubai', 11, 38, 3.7);
new Store('Paris', 20, 38, 2.3);
new Store('Lima', 2, 16, 4.6);

// 2. The Safety Check (This runs on page load)
if (salesTable && staffingTable) {
    buildTables();
}

/* --- 6. EVENT LISTENER (Form Submission) --- */
const storeForm = document.getElementById('add-store-form');

if (storeForm) {
    storeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = event.target['location-name'].value;
        const min = parseInt(event.target['min-cust'].value);
        const max = parseInt(event.target['max-cust'].value);
        const avg = parseFloat(event.target['avg-cookies'].value);

        if (max < min) {
            alert("Maximum customers cannot be less than minimum customers!");
            return;
        }

        let existingStore = allStores.find(store => store.name.toLowerCase() === name.toLowerCase());

        if (existingStore) {
            existingStore.minCust = min;
            existingStore.maxCust = max;
            existingStore.avgCookies = avg;
        } else {
            new Store(name, min, max, avg);
        }

        buildTables(); // Re-render tables with new data
        event.target.reset();
    });
}