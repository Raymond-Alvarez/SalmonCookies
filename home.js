'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // 1. THEME TOGGLE
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.hasAttribute('data-theme') ? 
                document.body.removeAttribute('data-theme') : 
                document.body.setAttribute('data-theme', 'dark');
        });
    }

    const main = document.getElementById('main-content');
    if (!main) return;

    // 2. HERO IMAGE ROTATION
    const heroSection = document.createElement('section');
    heroSection.id = 'hero-section';
    
    const heroImg = document.createElement('img');
    const heroImages = [
        'img/salmon.png', 'img/hero2.png', 'img/hero3.png', 
        'img/hero4.png', 'img/hero5.png', 'img/hero6.png', 'img/hero7.png'
    ];

    let currentIndex = 0;
    heroImg.src = heroImages[currentIndex];
    heroImg.alt = 'Salmon Cookies Gallery';
    heroSection.appendChild(heroImg);
    main.appendChild(heroSection);

    // Simple rotation without fade flicker
    setInterval(() => {
        currentIndex = (currentIndex + 1) % heroImages.length;
        heroImg.src = heroImages[currentIndex];
    }, 5000);

    main.appendChild(document.createElement('hr'));

    // 3. CITY DATA
    const locations = [
        { city: 'Seattle', hours: '6am - 7pm', contact: '123-456-7890', address: '2901 3rd Ave #300, Seattle, WA 98121' },
        { city: 'Tokyo', hours: '6am - 7pm', contact: '222-222-2222', address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo, 131-8634' },
        { city: 'Dubai', hours: '6am - 7pm', contact: '333-333-3333', address: '1 Sheikh Mohammed bin Rashid Blvd - Dubai' },
        { city: 'Paris', hours: '6am - 7pm', contact: '444-444-4444', address: '18 Rue de la Paix, 75002 Paris, France' },
        { city: 'Lima', hours: '6am - 7pm', contact: '555-555-5555', address: 'Ca. Gral. Borgono cuadra 8, Miraflores, 15074' }
    ];

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
});