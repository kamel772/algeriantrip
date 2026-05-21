// main.js

const i18n = {
    fr: {
        title: "MostaTrip", searchPlaceholder: "Rechercher un lieu...",
        site: "Sites", hebergement: "Hébergements", artisan: "Artisans",
        loisirs: "Loisirs", culture: "Culture", nature: "Nature",
        restaurant: "Restaurants", administration: "Administrations",
        services: "Services", banque: "Banques",
        itinerary: "Itinéraire", reserve: "Réserver", order: "Commander",
        guide: "Guide", vtc: "VTC",
        address: "Adresse", reviews: "Avis", noReviews: "Aucun avis pour le moment.",
        leaveReview: "Laisser un avis", send: "Envoyer"
    },
    ar: {
        title: "مستغانم", searchPlaceholder: "ابحث...",
        site: "مواقع", hebergement: "إقامات", artisan: "حرفيون",
        loisirs: "ترفيه", culture: "ثقافة", nature: "طبيعة",
        restaurant: "مطاعم", administration: "إدارات",
        services: "خدمات", banque: "بنوك",
        itinerary: "مسار", reserve: "حجز", order: "طلب",
        guide: "مرشد", vtc: "نقل",
        address: "العنوان", reviews: "آراء", noReviews: "لا توجد آراء بعد.",
        leaveReview: "أضف رأيك", send: "إرسال"
    },
    en: {
        title: "MostaTrip", searchPlaceholder: "Search...",
        site: "Sites", hebergement: "Stays", artisan: "Craftsmen",
        loisirs: "Leisure", culture: "Culture", nature: "Nature",
        restaurant: "Restaurants", administration: "Administrations",
        services: "Services", banque: "Banks",
        itinerary: "Directions", reserve: "Book", order: "Order",
        guide: "Guide", vtc: "Ride",
        address: "Address", reviews: "Reviews", noReviews: "No reviews yet.",
        leaveReview: "Leave a review", send: "Send"
    }
};

let currentLang = 'fr';
let currentCategory = 'all';
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
        const adv = document.getElementById('advancedFilters');
        if (adv) {
            adv.style.display = currentCategory === 'hebergement' ? 'flex' : 'none';
        }
        renderPlaces();
    });
});

document.getElementById('searchInput').addEventListener('input', e => {
    searchTerm = e.target.value.toLowerCase();
    renderPlaces();
});

['filterStars', 'filterWifi', 'filterPool'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', () => renderPlaces());
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
    if (place.category === 'site' || place.category === 'culture' || place.category === 'nature') return i18n[currentLang].guide;
    return i18n[currentLang].itinerary;
}

function openAction(place) {
    incrementView(place.id);
    if (place.category === 'hebergement') {
        if (typeof showBookingForm === 'function') showBookingForm(place);
        else alert("Formulaire de réservation non disponible.");
    } else if (place.category === 'artisan') {
        if (typeof showBookingForm === 'function') showBookingForm(place);
        else alert("Formulaire de commande non disponible.");
    } else if (place.category === 'site' || place.category === 'culture' || place.category === 'nature') {
        openGuide(place);
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
            if (currentCategory === 'hebergement') {
                const stars = document.getElementById('filterStars')?.value;
                const wifi = document.getElementById('filterWifi')?.value;
                const pool = document.getElementById('filterPool')?.value;
                if (stars && p.stars != stars) return false;
                if (wifi === 'oui' && !p.wifi) return false;
                if (pool === 'oui' && !p.pool) return false;
            }
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

function stopAudio() {
    const audio = document.querySelector('#detailModal audio');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.remove();
    }
}

function submitReview(placeId) {
    const rating = parseInt(document.getElementById('reviewRating').value);
    const author = document.getElementById('reviewAuthor').value.trim();
    const text = document.getElementById('reviewText').value.trim();
    if (!author || !text) {
        alert('Veuillez saisir votre nom et votre avis.');
        return;
    }
    const newReview = { rating, author, text, date: new Date().toISOString() };
    const stored = JSON.parse(localStorage.getItem('reviews_' + placeId) || '[]');
    stored.push(newReview);
    localStorage.setItem('reviews_' + placeId, JSON.stringify(stored));
    const p = PLACES.find(p => p.id === placeId);
    if (p) {
        if (!p.reviews) p.reviews = [];
        p.reviews.push(newReview);
        let points = parseInt(localStorage.getItem('citytrip_points') || '0');
        points += 10;
        localStorage.setItem('citytrip_points', points);
        showDetailModal(p);
    }
}

function showDetailModal(place) {
    stopAudio();

    document.getElementById('detailName').textContent = place.name;
    document.getElementById('detailCategory').textContent = i18n[currentLang][place.category] || place.category;

    const images = place.images && place.images.length ? place.images : [PLACEHOLDER_IMG];
    document.getElementById('detailGallery').innerHTML = images.map(s =>
        `<img src="${s}" class="gallery-img" onerror="this.src='${PLACEHOLDER_IMG}'">`
    ).join('');

    let detailsHTML = `<p>${place.description||''}</p>`;

    if (place.audio) {
        detailsHTML += `<div style="margin:15px 0; background:#f5f0e8; padding:12px; border-radius:12px;">
            <span style="font-weight:600;">🎧 Écouter l'histoire</span>
            <audio controls style="width:100%; margin-top:8px;">
                <source src="${place.audio}" type="audio/mpeg">
                Votre navigateur ne supporte pas l'audio.
            </audio>
        </div>`;
    }

    if (place.story) {
        detailsHTML += `<div style="margin:15px 0; background:#fff; padding:15px; border-radius:12px; border-left:4px solid #C8785A;">
            <h3 style="color:#C8785A; margin-bottom:8px;">📖 Histoire & Culture</h3>
            <p style="line-height:1.6; color:#4E3E33;">${place.story}</p>
        </div>`;
    }

    detailsHTML += '<div style="margin:15px 0;"><h3 style="color:#C8785A;">⭐ ' + i18n[currentLang].reviews + '</h3>';
    const storedReviews = JSON.parse(localStorage.getItem('reviews_' + place.id) || '[]');
    const allReviews = (place.reviews || []).concat(storedReviews);
    if (allReviews.length > 0) {
        allReviews.forEach(r => {
            let stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
            detailsHTML += `<div style="background:#fff; padding:10px; border-radius:8px; margin:5px 0; border:1px solid #eee;">
                <strong>${stars}</strong> <em>${r.author}</em>
                <p>${r.text}</p>
            </div>`;
        });
    } else {
        detailsHTML += '<p style="color:#666;">' + i18n[currentLang].noReviews + '</p>';
    }
    detailsHTML += '</div>';

    detailsHTML += `<div style="margin:10px 0;">
        <h4>${i18n[currentLang].leaveReview}</h4>
        <select id="reviewRating" style="width:100%; padding:8px; margin:5px 0; border-radius:8px; border:1px solid #ddd;">
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
            <option value="2">★★☆☆☆ (2)</option>
            <option value="1">★☆☆☆☆ (1)</option>
        </select>
        <input type="text" id="reviewAuthor" placeholder="Votre nom" style="width:100%; padding:8px; margin:5px 0; border-radius:8px; border:1px solid #ddd;">
        <textarea id="reviewText" rows="2" placeholder="Votre avis..." style="width:100%; padding:8px; margin:5px 0; border-radius:8px; border:1px solid #ddd;"></textarea>
        <button onclick="submitReview(${place.id})" style="background:#C8785A; color:white; padding:10px 20px; border:none; border-radius:20px; cursor:pointer;">${i18n[currentLang].send}</button>
    </div>`;

    document.getElementById('detailDesc').innerHTML = detailsHTML;

    const ae = document.getElementById('detailAddress');
    if (place.address) {
        ae.textContent = i18n[currentLang].address + ' : ' + place.address;
        ae.style.display = 'block';
    } else {
        ae.style.display = 'none';
    }

    document.getElementById('detailItineraire').onclick = () => openItinerary(place);
    const guideBtn = document.getElementById('detailGuide');
    const vtcBtn = document.getElementById('detailVTC');
    const actionBtn = document.getElementById('detailAction');

    if (place.category === 'site') {
        guideBtn.style.display = 'inline-block';
        guideBtn.textContent = i18n[currentLang].guide;
        guideBtn.onclick = () => openGuide(place);
    } else {
        guideBtn.style.display = 'none';
    }

    if (place.vtc) {
        vtcBtn.style.display = 'inline-block';
        vtcBtn.textContent = i18n[currentLang].vtc;
        vtcBtn.onclick = () => openVTC(place);
    } else {
        vtcBtn.style.display = 'none';
    }

    actionBtn.textContent = getActionText(place);
    actionBtn.onclick = () => openAction(place);

    document.getElementById('detailModal').style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('closeDetailModal').addEventListener('click', () => {
        stopAudio();
        document.getElementById('detailModal').style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('detailModal')) {
            stopAudio();
            document.getElementById('detailModal').style.display = 'none';
        }
    });

    // Mode sombre manuel
    const darkBtn = document.getElementById('darkModeToggle');
    let isDark = localStorage.getItem('darkMode') === 'true';

    function applyDarkMode() {
        if (isDark) {
            document.body.classList.add('dark-mode');
            if (darkBtn) darkBtn.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            if (darkBtn) darkBtn.textContent = '🌙';
        }
    }

    if (darkBtn) {
        darkBtn.addEventListener('click', () => {
            isDark = !isDark;
            localStorage.setItem('darkMode', isDark);
            applyDarkMode();
        });
    }
    applyDarkMode();

    // Widget météo
    fetch('https://api.open-meteo.com/v1/forecast?latitude=35.9315&longitude=0.0895&current_weather=true')
        .then(r => r.json())
        .then(data => {
            const w = data.current_weather;
            const emoji = w.weathercode <= 1 ? '☀️' : w.weathercode <= 3 ? '⛅' : w.weathercode <= 6 ? '🌧️' : '🌩️';
            document.getElementById('weatherWidget').innerHTML = `${emoji} Mostaganem : ${w.temperature}°C – Vent ${w.windspeed} km/h`;
        })
        .catch(() => {
            document.getElementById('weatherWidget').innerHTML = '🌤️ Météo indisponible';
        });

    applyLanguage('fr');
    updateActiveCategoryButton();
    renderPlaces();
});
