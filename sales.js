'use strict';

const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// 1. Target entry points
const header = document.getElementById('page-header');
const main = document.getElementById('main-content');
const footer = document.querySelector('footer');

// 2. Build Header & Navigation
const h1 = document.createElement('h1');
h1.textContent = "Welcome to Ray's Salmon Cookies!";

header.style.backgroundColor = '#111';
header.style.color = '#ff7f67';
h1.style.fontFamily = 'cursive, sans-serif';
h1.style.margin = '20px 0';

header.style.display = 'flex';
header.style.flexDirection = 'column';
header.style.alignItems = 'center';
header.style.padding = '0'; 
header.appendChild(h1);

const nav = document.createElement('nav');

nav.style.backgroundColor = '#ff7f67';
nav.style.width = '100%';
nav.style.padding = '10px 0';
nav.style.textAlign = 'left';

header.appendChild(nav);

function createNavLink(text, href) {
    const link = document.createElement('a');
    link.textContent = text;
    link.setAttribute('href', href);

    link.style.margin = '0 15px';
    link.style.color = 'blue';
    link.style.textDecoration = 'none';
    link.style.fontSize = '1.2rem';
    nav.appendChild(link);
}
createNavLink('Home', 'index.html');
createNavLink('Sales Data', 'sales.html');

// --- 3. SALES LOGIC ---

// Since we are using object literals, we define each one with its unique data
const seattle = {
    name: 'Seattle', minCust: 23, maxCust: 65, avgCookies: 6.3,
    cookiesSoldEachHour: [], dailyTotal: 0,
    simulate: function() {
        this.cookiesSoldEachHour = []; // Clear array for refresh
        this.dailyTotal = 0;
        for (let i = 0; i < hours.length; i++) {
            let cust = Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
            let cookies = Math.ceil(cust * this.avgCookies);
            this.cookiesSoldEachHour.push(cookies);
            this.dailyTotal += cookies;
        }
    },
    render: function() {
        this.simulate();
        const article = document.createElement('article');
        article.style.padding = '20px';
        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        article.appendChild(h2);
        const ul = document.createElement('ul');
        ul.style.listStyle = 'none';
        ul.style.padding = '0';
        for (let i = 0; i < hours.length; i++) {
            const li = document.createElement('li');
            li.textContent = `${hours[i]}: ${this.cookiesSoldEachHour[i]} cookies`;
            ul.appendChild(li);
        }
        const totalLi = document.createElement('li');
        totalLi.textContent = `Total: ${this.dailyTotal} cookies`;
        totalLi.style.fontWeight = 'bold';
        ul.appendChild(totalLi);
        article.appendChild(ul);
        main.appendChild(article);
    }
};

// ... Repeat the object pattern for Tokyo (3, 24, 1.2), Dubai (11, 38, 3.7), Paris (20, 38, 2.3), Lima (2, 16, 4.6) ...

// 4. EXECUTION
seattle.render();
// tokyo.render();
// dubai.render(); etc.

// 5. FOOTER
footer.style.backgroundColor = '#ccc';
footer.style.textAlign = 'center';
footer.style.padding = '30px';
footer.style.marginTop = '80px';
footer.style.borderTop = '1px solid #999';
footer.textContent = '© 2026 Ray\'s Salmon Cookies';