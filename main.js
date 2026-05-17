// main.js

const i18n = {
    fr: {
        title: "MostaTrip", searchPlaceholder: "Rechercher un lieu...",
        site: "Sites", hebergement: "Hébergements", loisirs: "Loisirs",
        culture: "Culture", artisan: "Artisans", restaurant: "Restaurants",
        administration: "Administrations", services: "Services", banque: "Banques",
        all: "Tous", itinerary: "Itinéraire", reserve: "Réserver", order: "Commander",
        hotel: "Hôtel", auberge: "Auberge", residence: "Résidence", particulier: "Particulier",
        musee: "Musée", theatre: "Théâtre",
        bookingTitle: "Réservation pour ", address: "Adresse"
    },
    ar: {
        title: "مستغانم", searchPlaceholder: "ابحث...",
        site: "مواقع", hebergement: "إقامات", loisirs: "ترفيه",
        culture: "ثقافة", artisan: "حرفيون", restaurant: "مطاعم",
        administration: "إدارات", services: "خدمات", banque: "بنوك",
        all: "الكل", itinerary: "مسار", reserve: "حجز", order: "طلب",
        hotel: "فندق", auberge: "نزل", residence: "إقامة", particulier: "خاص",
        musee: "متحف", theatre: "مسرح",
        bookingTitle: "حجز لـ ", address: "العنوان"
    },
    en: {
        title: "MostaTrip", searchPlaceholder: "Search...",
        site: "Sites", hebergement: "Stays", loisirs: "Leisure",
        culture: "Culture", artisan: "Craftsmen", restaurant: "Restaurants",
        administration: "Administrations", services: "Services", banque: "Banks",
        all: "All", itinerary: "Directions", reserve: "Book", order: "Order",
        hotel: "Hotel", auberge: "Inn", residence: "Residence", particulier: "Private",
        musee: "Museum", theatre: "Theater",
        bookingTitle: "Booking for ", address: "Address"
    }
};

let currentLang = 'fr';
let currentCategory = 'all';  // Accueil : mélange aléatoire
let searchTerm = '';

function incrementView(placeId) {
    try {
        const stats = JSON.parse(localStorage.getItem('mostatrip_stats') || '{}');
        stats[placeId] = (stats[placeId] || 0) + 1;
        localStorage.setItem('mostatrip_stats', JSON.stringify(stats));
    } catch(e) {}
}

function applyLanguage(lang) {
    currentLang = lang;
    document.getElementById('appTitle').textContent = i18n[lang].title;
    document.getElementById('searchInput').placeholder = i18n[lang].searchPlaceholder;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        const cat = btn.dataset.cat;
        btn.textContent = i18n[lang][cat] || cat;
    });
    updateActiveCategoryButton();
    renderPlaces();
}

function updateActiveCategoryButton() {
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === currentCategory);
    });
}

document.querySelectorAll('.lang-selector button').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
});

document.getElementById('filterToggle').addEventListener('click', () => {
    document.getElementById('categoryFilters').classList.toggle('visible');
});

document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentCategory = btn.dataset.cat;
        updateActiveCategoryButton();
        renderPlaces();
    });
});

document.getElementById('searchInput').addEventListener('input', e => {
    searchTerm = e.target.value.toLowerCase();
    renderPlaces();
});

function openItinerary(place) {
    if (!place.latitude || !place.longitude) {
        alert("Coordonnées non disponibles.");
        return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}&destination_place=${encodeURIComponent(place.name)}`;
    window.open(url, '_blank');
}

function getActionText(place) {
    if (place.category === 'hebergement') return i18n[currentLang].reserve;
    if (place.category === 'artisan') return i18n[currentLang].order;
    return i18n[currentLang].itinerary;
}

function openAction(place) {
    incrementView(place.id);
    if (place.category === 'hebergement' || place.category === 'artisan') {
        if (typeof showBookingForm === 'function') showBookingForm(place);
        else alert("Formulaire de réservation non disponible.");
    } else {
        openItinerary(place);
    }
}

const PLACEHOLDER_IMG = window.PLACEHOLDER_IMAGE || '';

function renderPlaces() {
    const container = document.getElementById('placesList');
    if (!container) return;
    document.querySelectorAll('.skeleton-card').forEach(s => s.remove());

    if (!PLACES || !PLACES.length) {
        container.innerHTML = '<p style="text-align:center;padding:20px;">Aucun lieu trouvé.</p>';
        return;
    }

    let listToShow = [];

    if (currentCategory === 'all') {
        // Accueil : mélange aléatoire de 8 à 12 lieux
        const shuffled = [...PLACES].sort(() => 0.5 - Math.random());
        const count = Math.floor(Math.random() * 5) + 8;
        listToShow = shuffled.slice(0, count);
    } else {
        // Filtre par catégorie + recherche
        listToShow = PLACES.filter(p => {
            if (p.category !== currentCategory) return false;
            if (searchTerm && !p.name.toLowerCase().includes(searchTerm) && !(p.description||'').toLowerCase().includes(searchTerm)) return false;
            return true;
        });
    }

    if (listToShow.length === 0) {
        container.innerHTML = '<p style="text-align:center;padding:20px;">Aucun résultat</p>';
        return;
    }

    container.innerHTML = listToShow.map((place, index) => {
        const img = (place.images && place.images.length) ? place.images[0] : PLACEHOLDER_IMG;
        let catLabel = i18n[currentLang][place.category] || place.category;
        if (place.subcategory && i18n[currentLang][place.subcategory]) {
            catLabel = i18n[currentLang][place.subcategory];
        }
        return `<div class="place-card" data-id="${place.id}" style="animation-delay:${index*0.05}s">
            <img class="place-img" src="${img}" alt="${place.name}" loading="lazy" onerror="this.src='${PLACEHOLDER_IMG}'">
            <div class="place-info"><span class="place-category">${catLabel}</span>
            <h3 class="place-title">${place.name}</h3><p class="place-desc">${place.description||''}</p>
            <div class="place-actions"><button class="btn-secondary btn-itinerary" data-id="${place.id}">${i18n[currentLang].itinerary}</button>
            <button class="btn-primary btn-action" data-id="${place.id}">${getActionText(place)}</button></div></div></div>`;
    }).join('');

    document.querySelectorAll('.btn-itinerary').forEach(b => b.addEventListener('click', e => {
        e.stopPropagation();
        const p = PLACES.find(x => x.id === Number(b.dataset.id));
        if(p) openItinerary(p);
    }));
    document.querySelectorAll('.btn-action').forEach(b => b.addEventListener('click', e => {
        e.stopPropagation();
        const p = PLACES.find(x => x.id === Number(b.dataset.id));
        if(p) openAction(p);
    }));
    document.querySelectorAll('.place-card').forEach(c => c.addEventListener('click', () => {
        const p = PLACES.find(x => x.id === Number(c.dataset.id));
        if(p) { incrementView(p.id); showDetailModal(p); }
    }));
}

function showDetailModal(place) {
    document.getElementById('detailName').textContent = place.name;
    let catLabel = i18n[currentLang][place.category] || place.category;
    if (place.subcategory && i18n[currentLang][place.subcategory]) {
        catLabel = i18n[currentLang][place.subcategory];
    }
    document.getElementById('detailCategory').textContent = catLabel;
    document.getElementById('detailDesc').textContent = place.description || '';
    const addressEl = document.getElementById('detailAddress');
    if (place.address) {
        addressEl.textContent = `${i18n[currentLang].address} : ${place.address}`;
        addressEl.style.display = 'block';
    } else {
        addressEl.style.display = 'none';
    }
    
    const images = place.images && place.images.length ? place.images : [PLACEHOLDER_IMG];
    document.getElementById('detailGallery').innerHTML = images.map(src => 
        `<img src="${src}" class="gallery-img" onerror="this.src='${PLACEHOLDER_IMG}'">`
    ).join('');
    
    document.getElementById('detailItineraire').onclick = () => openItinerary(place);
    const actionBtn = document.getElementById('detailAction');
    actionBtn.textContent = getActionText(place);
    actionBtn.onclick = () => openAction(place);
    
    document.getElementById('detailModal').style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('closeDetailModal').addEventListener('click', () => {
        document.getElementById('detailModal').style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('detailModal')) {
            document.getElementById('detailModal').style.display = 'none';
        }
    });
    applyLanguage('fr');
    updateActiveCategoryButton();
    renderPlaces();
});