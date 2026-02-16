'use strict';

// locations logic
const locations = [
    {
        city: 'Seattle',
        hours: '6am - 7pm',
        contact: '123-456-7890',
        address: '2901 3rd Ave #300, Seattle, WA 98121'
    },
    {
        city: 'Tokyo',
        hours: '6am - 7pm',
        contact: '222-222-2222',
        address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo, 131-8634'
    },
    {
        city: 'Dubai',
        hours: '6am - 7pm',
        contact: '333-333-3333',
        address: '1 Sheikh Mohoammed bin Rashid Blvd - Dubai'
    },
    {
        city: 'Lima',
        hours: '6am - 7pm',
        contact: '555-555-5555',
        address: 'Ca. Gral. Borgono cuadra 8, MIraflores, 15074'
    }
];

// 1. Target our entry points
const header = document.getElementById('page-header');
const main = document.getElementById('main-content');
const footer = document.querySelector('footer');

// 2. create and Style the Header/H!
const h1 = document.createElement('h1');
h1.textContent = "Welcome to Ray's Salmon Cookies!";

// Aesthetic styles (Colors/Fonts)- Header 
header.style.backgroundColor = '#111'; //Dark background
header.style.color = '#ff7f67';
h1.style.fontFamily = 'cursive, sans-serif';
h1.style.margin = '20px 0';

// LAYOUT STYLES (The "Skeleton")
header.style.display = 'flex';
header.style.flexDirection = 'column';
header.style.alignItems = 'center';
header.style.padding = '0'; 

header.appendChild(h1);

// 3. Create the Navigation (Hero Buttons)
const nav = document.createElement('nav');

nav.style.backgroundColor = '#ff7f67';
nav.style.width = '100%';
nav.style.padding = '10px 0';
nav.style.textAlign = 'left';


header.appendChild(nav);

// Utility function to create buttons/links
function createNavLink(text, href) {
    const link = document.createElement('a');
    link.textContent = text;
    link.setAttribute('href', href);
        
// Styling the "Buttons"
link.style.margin = '0 15px';
link.style.color = 'blue';
link.style.textDecoration = 'none';
link.style.fontSize = '1.2rem';

nav.appendChild(link);
}

createNavLink('Home', 'index.html');
createNavLink('Sales Data', 'sales.html');
    
// 4. Create the Hero Image Section
const heroSection = document.createElement('section');
const salmonImg = document.createElement('img');

salmonImg.setAttribute('src', 'img/salmon.png');
salmonImg.setAttribute('alt', 'A large s    almon fish');
salmonImg.style.width = '80%';
salmonImg.style.display = 'block';
salmonImg.style.margin = '20px auto';

heroSection.appendChild(salmonImg);
main.appendChild(heroSection);



// Divider Line
const divider = document.createElement('hr');

// Styling the Line 
divider.style.border = 'none';
divider.style.borderTop = '1px solid #999';
divider.style.width = '97%';
divider.style.margin = '0 auto';

// Styling the Space (below the line)
divider.style.marginTop = '80px';
divider.style.marginBottom = '40px';
main.appendChild(divider);

// Loop through array to create article blocks each location object

for (let i = 0; i < locations.length; i++) {
    const store = locations[i];

    // Create the container
    const storeArticle = document.createElement('article'); 
    storeArticle.style.marginBottom = '20px';
    storeArticle.style.textAlign = 'left';

    // City Header
    const cityTitle = document.createElement('h2');
    cityTitle.textContent = store.city;
    cityTitle.style.fontSize = '2rem';
    cityTitle.style.fontFamily = 'cursive, sans-serif';
    cityTitle.style.marginBottom = '-10px';
    // cityTitle.style.marginLeft = '35px';
    storeArticle.appendChild(cityTitle);

    // Info List
    const infoList = document.createElement('ul');
    infoList.style.listStyle = 'none'; //Removes bullets to match image
    infoList.style.padding = '0';
    // infoList.style.marginLeft = '20px';

    //Create line items for Hours, Contact, and Address
    const hoursLi = document.createElement('li');
    hoursLi.textContent = `Hours Open: ${store.hours}`;

    const contactLi = document.createElement('li');
    contactLi.textContent = `Contact: ${store.contact}`;

    const addressLi = document.createElement('li');
    addressLi.textContent = `Location: ${store.address}`;

    // Append all info
    infoList.appendChild(hoursLi);
    infoList.appendChild(contactLi);
    infoList.appendChild(addressLi);
    storeArticle.appendChild(infoList);

    main.appendChild(storeArticle);
}

// Match image's gray footer
footer.style.backgroundColor = '#ccc'; // Light Gray
footer.style.textAlign = 'center';
footer.style.padding = '30px';
footer.style.marginTop = '80px';
footer.style.borderTop = '1px solid #999';
footer.textContent = '© 2026 Ray\'s Salmon Cookies';
