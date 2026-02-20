'use strict';

const main = document.getElementById('main-content');
const footer = document.querySelector('footer');

const locations = [
    { city: 'Seattle', hours: '6am - 7pm', contact: '123-456-7890', address: '2901 3rd Ave #300, Seattle, WA 98121' },
    { city: 'Tokyo', hours: '6am - 7pm', contact: '222-222-2222', address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo, 131-8634' },
    { city: 'Dubai', hours: '6am - 7pm', contact: '333-333-3333', address: '1 Sheikh Mohoammed bin Rashid Blvd - Dubai' },
    { city: 'Paris', hours: '6am - 7pm', contact: '444-444-4444', address: '18 Rue de la Paix, 75002 Paris, France' },
    { city: 'Lima', hours: '6am - 7pm', contact: '555-555-5555', address: 'Ca. Gral. Borgono cuadra 8, MIraflores, 15074' }
];


const heroSection = document.createElement('section');
const salmonImg = document.createElement('img');
salmonImg.src = 'img/salmon.png';
salmonImg.alt = 'A large salmon fish';
heroSection.appendChild(salmonImg);
main.appendChild(heroSection);

main.appendChild(document.createElement('hr'));

locations.forEach(store => {
    const storeArticle = document.createElement('article');
    const cityTitle = document.createElement('h2');
    cityTitle.textContent = store.city;
    storeArticle.appendChild(cityTitle);

    const infoList = document.createElement('ul');
    const items = [`Hours Open: ${store.hours}`, `Contact: ${store.contact}`, `Location: ${store.address}`];
    
    items.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        infoList.appendChild(li);
    });

    storeArticle.appendChild(infoList);
    main.appendChild(storeArticle);
});

footer.textContent = '© 2026 Ray\'s Salmon Cookies';