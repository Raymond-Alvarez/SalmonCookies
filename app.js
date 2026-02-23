'use strict';

// 1. Target the main container (Only declare this ONCE)
const main = document.getElementById('main-content');
const footer = document.querySelector('footer');

// 2. The Hero Image Section
const heroSection = document.createElement('section');
heroSection.id = 'hero-section';
const salmonImg = document.createElement('img');
salmonImg.src = 'img/salmon.png';
salmonImg.alt = 'A large salmon fish';
heroSection.appendChild(salmonImg);
main.appendChild(heroSection);

// 3. Add a horizontal rule for visual separation
main.appendChild(document.createElement('hr'));

// 4. Data for locations
const locations = [
    { city: 'Seattle', hours: '6am - 7pm', contact: '123-456-7890', address: '2901 3rd Ave #300, Seattle, WA 98121' },
    { city: 'Tokyo', hours: '6am - 7pm', contact: '222-222-2222', address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo, 131-8634' },
    { city: 'Dubai', hours: '6am - 7pm', contact: '333-333-3333', address: '1 Sheikh Mohammed bin Rashid Blvd - Dubai' },
    { city: 'Paris', hours: '6am - 7pm', contact: '444-444-4444', address: '18 Rue de la Paix, 75002 Paris, France' },
    { city: 'Lima', hours: '6am - 7pm', contact: '555-555-5555', address: 'Ca. Gral. Borgono cuadra 8, Miraflores, 15074' }
];

// 5. Generate Location Articles
locations.forEach(store => {
    const storeArticle = document.createElement('article');
    
    const cityTitle = document.createElement('h2');
    cityTitle.textContent = store.city; // This will use the "Righteous" font from your CSS
    storeArticle.appendChild(cityTitle);

    const infoList = document.createElement('ul');
    const items = [`Hours Open: ${store.hours}`, `Contact: ${store.contact}`, `Location: ${store.address}`];
    
    items.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text; // This will use the "Georgia" font from your CSS
        infoList.appendChild(li);
    });

    storeArticle.appendChild(infoList);
    main.appendChild(storeArticle);
});

// NOTE: Removed footer.textContent so your HTML contact info stays visible!