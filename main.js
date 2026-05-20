// main.js

const i18n = {
    fr: {
        title: "MostaTrip", searchPlaceholder: "Rechercher un lieu...",
        site: "Sites", hebergement: "Hébergements", artisan: "Artisans",
        plage: "Plages", parc: "Parcs", restaurant: "Restaurants",
        administration: "Administrations", services: "Services", banque: "Banques",
        itinerary: "Itinéraire", reserve: "Réserver", order: "Commander",
        guide: "Guide", vtc: "VTC",
        bookingTitle: "Réservation pour ", address: "Adresse"
    },
    ar: {
        title: "مستغانم", searchPlaceholder: "ابحث...",
        site: "مواقع", hebergement: "إقامات", artisan: "حرفيون",
        plage: "شواطئ", parc: "حدائق", restaurant: "مطاعم",
        administration: "إدارات", services: "خدمات", banque: "بنوك",
        itinerary: "مسار", reserve: "حجز", order: "طلب",
        guide: "مرشد", vtc: "نقل",
        bookingTitle: "حجز لـ ", address: "العنوان"
    },
    en: {
        title: "MostaTrip", searchPlaceholder: "Search...",
        site: "Sites", hebergement: "Stays", artisan: "Craftsmen",
        plage: "Beaches", parc: "Parks", restaurant: "Restaurants",
        administration: "Administrations", services: "Services", banque: "Banks",
        itinerary: "Directions", reserve: "Book", order: "Order",
        guide: "Guide", vtc: "Ride",
        bookingTitle: "Booking for ", address: "Address"
    }
};

let currentLang = 'fr';
let currentCategory = 'all';  // accueil aléatoire
let searchTerm = '';

const PLACEHOLDER_IMG = (typeof PLACEHOLDER_IMAGE !== 'undefined') ? PLACEHOLDER_IMAGE : '';

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
        btn.textContent = i18n[lang][btn.dataset.cat] || btn.dataset.cat;
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

function openGuide(place) {
    window.open(`guide.html?lieu=${encodeURIComponent(place.name)}`, '_blank');
}

function openVTC(place) {
    if (place.vtc) {
        window.open(place.vtc, '_blank');
    } else {
        alert("Service VTC non disponible pour ce lieu.");
    }
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
        const shuffled = [...PLACES].sort(() => 0.5 - Math.random());
        const count = Math.floor(Math.random() * 5) + 8;
        listToShow = shuffled.slice(0, count);
    } else {
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
        return `<div class="place-card" data-id="${place.id}" style="animation-delay:${index*0.05}s">
            <img class="place-img" src="${img}" alt="${place.name}" loading="lazy" onerror="this.src='${PLACEHOLDER_IMG}'">
            <div class="place-info">
                <span class="place-category">${i18n[currentLang][place.category] || place.category}</span>
                <h3 class="place-title">${place.name}</h3>
                <p class="place-desc">${place.description||''}</p>
                <div class="place-actions">
                    <button class="btn-secondary btn-itinerary" data-id="${place.id}">${i18n[currentLang].itinerary}</button>
                    ${place.category === 'site' ? `<button class="btn-secondary btn-guide" data-id="${place.id}">${i18n[currentLang].guide}</button>` : ''}
                    ${place.vtc ? `<button class="btn-primary btn-vtc" data-id="${place.id}">${i18n[currentLang].vtc}</button>` : ''}
                    <button class="btn-primary btn-action" data-id="${place.id}">${getActionText(place)}</button>
                </div>
            </div>
        </div>`;
    }).join('');

    document.querySelectorAll('.btn-itinerary').forEach(b => b.addEventListener('click', e => {
        e.stopPropagation();
        const p = PLACES.find(x => x.id === Number(b.dataset.id));
        if(p) openItinerary(p);
    }));
    document.querySelectorAll('.btn-guide').forEach(b => b.addEventListener('click', e => {
        e.stopPropagation();
        const p = PLACES.find(x => x.id === Number(b.dataset.id));
        if(p) openGuide(p);
    }));
    document.querySelectorAll('.btn-vtc').forEach(b => b.addEventListener('click', e => {
        e.stopPropagation();
        const p = PLACES.find(x => x.id === Number(b.dataset.id));
        if(p) openVTC(p);
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
    document.getElementById('detailCategory').textContent = i18n[currentLang][place.category] || place.category;
    document.getElementById('detailDesc').textContent = place.description || '';
    const ae = document.getElementById('detailAddress');
    if (place.address) {
        ae.textContent = i18n[currentLang].address + ' : ' + place.address;
        ae.style.display = 'block';
    } else {
        ae.style.display = 'none';
    }

    const images = place.images && place.images.length ? place.images : [PLACEHOLDER_IMG];
    document.getElementById('detailGallery').innerHTML = images.map(s =>
        `<img src="${s}" class="gallery-img" onerror="this.src='${PLACEHOLDER_IMG}'">`
    ).join('');

    // Gestion des boutons du modal
    document.getElementById('detailItineraire').onclick = () => openItinerary(place);
    const guideBtn = document.getElementById('detailGuide');
    const vtcBtn = document.getElementById('detailVTC');
    const actionBtn = document.getElementById('detailAction');

    // Bouton Guide (uniquement sites)
    if (place.category === 'site') {
        guideBtn.style.display = 'inline-block';
        guideBtn.textContent = i18n[currentLang].guide;
        guideBtn.onclick = () => openGuide(place);
    } else {
        guideBtn.style.display = 'none';
    }

    // Bouton VTC (si lien défini)
    if (place.vtc) {
        vtcBtn.style.display = 'inline-block';
        vtcBtn.textContent = i18n[currentLang].vtc;
        vtcBtn.onclick = () => openVTC(place);
    } else {
        vtcBtn.style.display = 'none';
    }

    // Bouton d'action principal (Réserver / Commander / Itinéraire)
    actionBtn.textContent = getActionText(place);
    actionBtn.onclick = () => openAction(place);

    document.getElementById('detailModal').style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('closeDetailModal').addEventListener('click', () => {
        document.getElementById('detailModal').style.display = 'none';
    });
    window.addEventListener('click', e => {
        if (e.target === document.getElementById('detailModal'))
            document.getElementById('detailModal').style.display = 'none';
    });

    applyLanguage('fr');
    updateActiveCategoryButton();
    renderPlaces();
});
