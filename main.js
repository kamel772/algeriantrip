<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>MostaTrip • Mostaganem</title>
    <link rel="stylesheet" href="style.css">
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#1E88E5">
</head>
<body class="theme-chic-plage">
    <div class="app-container">
        <header class="header">
            <div class="lang-selector">
                <button data-lang="ar">AR</button>
                <button data-lang="fr">FR</button>
                <button data-lang="en">EN</button>
            </div>
            <h1 id="appTitle">MostaTrip</h1>
            <button id="darkModeToggle" style="background:rgba(255,255,255,0.2); border:none; color:white; font-size:1.2rem; padding:4px 10px; border-radius:30px; cursor:pointer; margin-right:6px;">🌙</button>
            <button class="filter-toggle" id="filterToggle">☰</button>
        </header>

        <div class="search-bar">
            <input type="text" id="searchInput" placeholder="Rechercher un lieu...">
        </div>

        <div id="weatherWidget" style="text-align:center; padding:8px; background:#e3f2fd; font-size:0.9rem; border-bottom:1px solid #bbdefb;">
            ☀️ Chargement météo...
        </div>

        <div id="advancedFilters" style="display:none; padding:10px 16px; background:#fafafa; border-bottom:1px solid #eee; gap:10px; overflow-x:auto;">
            <select id="filterStars" style="padding:8px; border-radius:20px; border:1px solid #ddd;">
                <option value="">⭐ Toutes étoiles</option>
                <option value="5">5 étoiles</option>
                <option value="4">4 étoiles</option>
                <option value="3">3 étoiles</option>
                <option value="2">2 étoiles</option>
                <option value="1">1 étoile</option>
            </select>
            <select id="filterWifi" style="padding:8px; border-radius:20px; border:1px solid #ddd;">
                <option value="">📶 Wifi</option>
                <option value="oui">Avec Wifi</option>
            </select>
            <select id="filterPool" style="padding:8px; border-radius:20px; border:1px solid #ddd;">
                <option value="">🏊 Piscine</option>
                <option value="oui">Avec piscine</option>
            </select>
        </div>

        <div class="category-filters" id="categoryFilters">
            <button class="cat-btn" data-cat="site">Sites</button>
            <button class="cat-btn" data-cat="hebergement">Hébergements</button>
            <button class="cat-btn" data-cat="artisan">Artisans</button>
            <button class="cat-btn" data-cat="loisirs">Loisirs</button>
            <button class="cat-btn" data-cat="culture">Culture</button>
            <button class="cat-btn" data-cat="nature">🌲 Nature</button>
            <button class="cat-btn" data-cat="restaurant">Restaurants</button>
            <button class="cat-btn" data-cat="administration">Administrations</button>
            <button class="cat-btn" data-cat="services">Services</button>
            <button class="cat-btn" data-cat="banque">Banques</button>
        </div>

        <div class="places-list" id="placesList"></div>

        <div class="modal" id="detailModal">
            <div class="modal-content">
                <span class="close-modal" id="closeDetailModal">&times;</span>
                <h2 id="detailName"></h2>
                <span id="detailCategory" class="badge"></span>
                <div id="detailDesc"></div>
                <div id="detailAddress" class="detail-address"></div>
                <div class="gallery-container" id="detailGallery"></div>
                <div class="detail-actions">
                    <button id="detailItineraire" class="btn-secondary">Itinéraire</button>
                    <button id="detailGuide" class="btn-secondary" style="display:none;">Guide</button>
                    <button id="detailVTC" class="btn-primary" style="display:none;">VTC</button>
                    <button id="detailAction" class="btn-primary">Réserver</button>
                </div>
            </div>
        </div>

        <div class="modal" id="bookingModal">
    <div class="modal-content">
        <span class="close-modal" id="closeBookingModal">&times;</span>
        <h2>Réservation pour <span id="bookingPlaceName"></span></h2>
        <form id="bookingForm">
            <input type="text" name="name" placeholder="Votre nom" required>
            <input type="email" name="email" placeholder="Votre email" required>
            <input type="tel" name="phone" placeholder="Téléphone">
            <input type="date" name="date">
            <textarea name="message" placeholder="Message (optionnel)" rows="3"></textarea>
            <button type="submit" class="btn-primary">Envoyer</button>
        </form>
    </div>
</div>
    <script src="places.js"></script>
    <script src="main.js"></script>
    <script src="booking.js"></script>
    <script>
        (function() {
            var s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            s.async = true;
            document.head.appendChild(s);
        })();
    </script>
</body>
</html>
