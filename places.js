/*
 * Auteur : BENAICHA KAMEL
 * Projet : Mostatrip
 * Date de création : 22 AVRIL 2026
 * Contact : benaichakamelkat@ghmail.com / 0771703536
 * Tous droits réservés.
 */
// places.js

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231E88E5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='white'%3EMostaTrip%3C/text%3E%3C/svg%3E";

function normalizeImages(images) {
    if (!images || !Array.isArray(images) || images.length === 0) return [PLACEHOLDER_IMAGE];
    return images.map(img => {
        if (typeof img !== 'string') return PLACEHOLDER_IMAGE;
        if (img.startsWith('/storage/emulated/0/MostaTrip/') || img.startsWith('/storage/emulated/0/Mostatrip/')) {
            let relative = img.replace(/^\/storage\/emulated\/0\/MostaTrip\//i, '');
            relative = relative.replace(/^\/storage\/emulated\/0\/Mostatrip\//i, '');
            return `./${relative}`;
        }
        return img;
    });
}

window.PLACEHOLDER_IMAGE = PLACEHOLDER_IMAGE;

const PLACES = [
    // ========== HÉBERGEMENTS (HÔTELS) ==========
    {
        id: 1, name: "AZ Hôtels Montana", category: "hebergement", subcategory: "hotel",
        description: "Hôtel 3 étoiles avec piscine et vue mer. Situé à 5 min de la plage.",
        phone: "+213 45 22 33 44", address: "Bd du Front de Mer, Mostaganem",
        images: normalizeImages(["./images/hotelmontana/images (11).jpeg", "./images/hotelmontana/images (10).jpeg", "./images/hotelmontana/158826344.jpg"]),
        latitude: 35.9545, longitude: 0.0947
    },
    {
        id: 18, name: "Al Mansour Palace", category: "hebergement", subcategory: "hotel",
        description: "Hôtel prestigieux avec spa, piscine et restaurants.",
        phone: "+213 561 65 76 26", address: "Sablette, Mazagran, Mostaganem",
        images: normalizeImages(["./images/al mansour/images (8).jpeg"]),
        latitude: 35.88470, longitude: 0.04662
    },
    {
        id: 19, name: "AZ Hotel Le Zephyr Mostaganem", category: "hebergement", subcategory: "hotel",
        description: "Hôtel moderne en bord de mer.",
        phone: "+213 45 420 260", address: "ZET Sablettes section 04 propriété N° 234, Mazagran, Mostaganem",
        images: normalizeImages(["./images/azhotelzephyr/unnamed (10).jpg"]),
        latitude: 35.88958, longitude: 0.04971
    },
    {
        id: 22, name: "Palacio Hotel", category: "hebergement", subcategory: "hotel",
        description: "Hôtel urbain avec design moderne.",
        phone: "+213 45 416 470", address: "28 Rue Bensikaddour Mohamed, Mostaganem 27000",
        images: normalizeImages(["/storage/emulated/0/Mostatrip/images/hotelpalacio/images (10).jpeg"]),
        latitude: 35.92966, longitude: 0.08731
    },
    {
        id: 23, name: "Abada Hotel Mostaganem", category: "hebergement", subcategory: "hotel",
        description: "Hôtel familial à Mazagran.",
        phone: "+213 45 420 185", address: "Lot N°37, Mazagran 27000",
        images: normalizeImages(["/storage/emulated/0/Mostatrip/images/hotelabada/images (10).jpeg"]),
        latitude: 35.89156, longitude: 0.04874
    },
    {
        id: 24, name: "Hotel Cote Ouest", category: "hebergement", subcategory: "hotel",
        description: "Hôtel situé aux Sablettes, proche de la plage.",
        phone: "+213 45 420 193", address: "Sablettes, Mazagran",
        images: normalizeImages(["./images/hotelcoteouest/images (10).jpeg"]),
        latitude: 35.89163, longitude: 0.04856
    },
    {
        id: 26, name: "Hôtel Les Palmiers", category: "hebergement", subcategory: "hotel",
        description: "Hôtel simple en zone urbaine.",
        phone: "+213 45 308 459", address: "Mostaganem 27000",
        images: normalizeImages(["./images/hotellespalmiers/images (11).jpeg"]),
        latitude: 35.92329, longitude: 0.07719
    },
    // ========== HÉBERGEMENTS (AUBERGES) ==========
    {
        id: 27, name: "BORDJ ELMOULOUK", category: "hebergement", subcategory: "auberge",
        description: "Hôtel avec architecture traditionnelle.",
        phone: "+213 45 352 052", address: "Route d'Oran, Mazagran",
        images: normalizeImages(["./images/hotelbordjelmoulouk/images (11).jpeg"]),
        latitude: 35.90290, longitude: 0.06556
    },
    {
        id: 30, name: "فندق الصالحين", category: "hebergement", subcategory: "auberge",
        description: "Petit hôtel local, option économique.",
        phone: "+213 77 088 3213", address: "Mostaganem",
        images: normalizeImages([]),
        latitude: 35.93114, longitude: 0.09094
    },
    // ========== HÉBERGEMENTS (RÉSIDENCES) ==========
    {
        id: 25, name: "Elbahrinne complexe touristique", category: "hebergement", subcategory: "residence",
        description: "Complexe balnéaire raffiné pour séjour détente et élégance.",
        phone: "+213 55 775 2210", address: "Mazagran, Mostaganem",
        images: normalizeImages(["./images/elbahrayn/94664433.jpg"]),
        latitude: 35.88852, longitude: 0.04904
    },
    {
        id: 28, name: "Centre De Loisirs El mountazah", category: "hebergement", subcategory: "residence",
        description: "Centre touristique avec hébergement.",
        phone: "+213 45 420 298", address: "Lot N°42, Mazagran",
        images: normalizeImages(["./images/hotelelmoutazah/FB_IMG_1777205161675.jpg"]),
        latitude: 35.89242, longitude: 0.05064
    },

    // ========== ARTISANS ==========
    {
        id: 3, name: "Kralitsa", category: "artisan",
        description: "Produits cosmétiques naturels.",
        phone: "+213 0770756138", address: "Direction de l'artisanat, Mostaganem",
        images: normalizeImages(["./images/artisanat/kralitsa/20260423_141315.jpg", "./images/artisanat/kralitsa/20260423_141302.jpg"]),
        latitude: 35.929769, longitude: 0.086308
    },

    // ========== LOISIRS (PLAGES + PARCS) ==========
    {
        id: 4, name: "Plage Les Sablettes", category: "loisirs",
        description: "Plage de sable fin.",
        address: "Corniche Les Sablettes, Mostaganem",
        images: normalizeImages(["./images/les Sablettes/images (11).jpeg","./images/les Sablettes/images (8).jpeg","./images/les Sablettes/images (12).jpeg"]),
        latitude: 35.894049, longitude: 0.047490
    },
    { id: 41, name: "Plage de Sidi Mejdoub", category: "loisirs", description: "Appréciée des familles pour son accessibilité.", address: "Kharouba", images: normalizeImages(["./images/sidimejdoub/Plage_Sidi_Mejdoub.jpg"]), latitude: 35.9664, longitude: 0.0924 },
    { id: 42, name: "La Salamandre", category: "loisirs", description: "Quartier incontournable avec promenade et restaurants.", address: "Salamandre", images: normalizeImages(["./images/slamandre/images (12).jpeg"]), latitude: 35.9189, longitude: 0.0610 },
    { id: 43, name: "Plage de Stidia", category: "loisirs", description: "Plage familiale aux eaux peu profondes.", address: "Commune de Stidia", images: normalizeImages(["./images/stidia/images (12).jpeg"]), latitude: 35.8340, longitude: -0.0132 },
    { id: 44, name: "Plage de Sonagther", category: "loisirs", description: "Plage sauvage de sable fin idéale pour les familles.", address: "Aizeb", images: normalizeImages(["./images/plagesonagther/images (12).jpeg"]), latitude: 36.0074, longitude: 0.1210 },
    { id: 45, name: "Plage Sakhra", category: "loisirs", description: "Cadre naturel sauvage bordé de forêts.", address: "Commune Benabdelmalek Remdane", images: normalizeImages(["./images/sakhra/image.jpg"]), latitude: 36.05223, longitude: 0.1531 },
    { id: 46, name: "Plage de Cap Ivi 1&2", category: "loisirs", description: "Dunes de sable doré plongeant dans une mer cristalline.", address: "Mostaganem", images: normalizeImages(["./images/capivi/images (12).jpeg"]), latitude: 36.1113, longitude: 0.2191 },
    { id: 47, name: "Plage de Clovis", category: "loisirs", description: "Plage sauvage bordée de pins et genévriers.", address: "Commune de Abdelmalek Remdane", images: normalizeImages(["./images/clovis/images (12).jpeg"]), latitude: 36.1299, longitude: 0.2763 },
    { id: 48, name: "Plage de Hadjadj 1&2", category: "loisirs", description: "Destination balnéaire très prisée.", address: "Ben Abdelmalek Ramdane", images: normalizeImages(["./images/hadjadj/20260427_120217.jpg"]), latitude: 36.1437, longitude: 0.3022 },
    { id: 76, name: "Plage de Kef Lasfer", category: "loisirs", description: "Spot sauvage mêlant falaises et eaux cristallines.", address: "Commune de Sidi Lakhder", images: normalizeImages(["./images/kaflesfer/images (12).jpeg"]), latitude: 36.1870, longitude: 0.3408 },
    { id: 77, name: "Plage Petit Port", category: "loisirs", description: "Mélange unique de port de pêche et station balnéaire.", address: "Commune de Sidi Lakhdar", images: normalizeImages(["./images/ptitport/images (13).jpeg"]), latitude: 36.2101, longitude: 0.3944 },
    {
        id: 8, name: "Parc El Aarsa", category: "loisirs",
        description: "Parc créé en 1963 offrant une vue imprenable sur la mer Méditerranée.",
        address: "Centre-ville, Mostaganem",
        images: normalizeImages(["./images/mostaganem-bg.jpg"]),
        latitude: 35.930, longitude: 0.090
    },
    {
        id: 9, name: "Parc d'attractions Mostaland", category: "loisirs",
        description: "Parc de loisirs avec manèges, jeux et espaces verts.",
        phone: "+213 45 40 11 22", address: "Route de Mazagran, Mostaganem",
        images: normalizeImages(["./images/mostaland/unnamed (3).jpg", "./images/mostaland/images.webp", "./images/mostaland/unnamed (2).jpg"]),
        latitude: 35.9552, longitude: 0.1000
    },

    // ========== CULTURE ==========
    {
        id: 5, name: "Mosquée de la Tobana", category: "culture", subcategory: "musee",
        description: "Construite en 1340 par le sultan mérinide. Minaret hexagonal unique, classée monument historique depuis 1979.",
        phone: "+213 45 30 12 34", address: "Centre ville Mostaganem",
        images: normalizeImages(["./images/mosquée el merini/lmsjd_lmryny_ltyq.jpg", "./images/tijdit/images (18).jpeg"]),
        latitude: 35.932, longitude: 0.088
    },
    {
        id: 15, name: "Mausolée du Bey Mostapha Bouchlaghem", category: "culture", subcategory: "musee",
        description: "Sanctuaire ottoman restauré après l'indépendance.",
        address: "Quartier Tigditt",
        images: normalizeImages(["./images/bouchlaghem/bouchlaghem.jpg"]),
        latitude: 35.9325, longitude: 0.0885
    },
    {
        id: 31, name: "Centre de Mémoire de Sidi Ali (ex-Cassaigne)", category: "culture", subcategory: "musee",
        description: "Ancien centre de détention colonial, aujourd'hui musée historique.",
        address: "Commune de Sidi Ali (ex-Cassaigne)",
        images: normalizeImages(["./images/campsidiali/images (12).jpeg"]),
        latitude: 36.0994, longitude: 0.4212
    },
    {
        id: 38, name: "Site archéologique de Quiza", category: "culture", subcategory: "musee",
        description: "Fondé par les Phéniciens, développé par les Romains. Témoin majeur de l'histoire antique.",
        address: "Belatar",
        images: normalizeImages(["./images/quiza/1_1.jpg", "./images/quiza/images (13).jpeg"]),
        latitude: 36.0287, longitude: 0.2173
    },

    // ========== SITES HISTORIQUES ==========
    {
        id: 10, name: "Palais du Bey", category: "site",
        description: "Ancien palais ottoman du XVIIIe siècle, devenu musée du folklore, restauré en 1998.",
        phone: "+213 45 30 12 34", address: "Place du 1er Novembre, Mostaganem",
        images: normalizeImages(["./images/dar el kaid/darelkaid4.jpg", "./images/dar el kaid/darelkaid3.jpg", "./images/dar el kaid/darelkaid1.jpg"]),
        latitude: 35.932, longitude: 0.088
    },
    {
        id: 6, name: "Fort de l'Est", category: "site",
        description: "Fortification ottomane restaurée par Hamid al-Abd.",
        address: "Route du Fort, Mostaganem",
        images: normalizeImages(["./images/Fort de l'est/images (6).jpeg", "./images/Fort de l'est/images (8).jpeg", "./images/Fort de l'est/images (10).jpeg"]),
        latitude: 35.934231, longitude: 0.096425
    },
    {
        id: 7, name: "Grande Mosquée El-Badr", category: "site",
        description: "Mosquée emblématique de Mostaganem, architecture moderne et traditionnelle.",
        address: "Cité El Badr, Mostaganem",
        images: normalizeImages(["./images/mosquée elbadr/téléchargement (1).jpeg"]),
        latitude: 35.928, longitude: 0.085
    },
    {
        id: 16, name: "Dar Hamid el Abdi", category: "site",
        description: "Résidence historique de Hamid Al Abed, chef influent du XVIe siècle.",
        address: "vieille ville",
        images: normalizeImages(["./images/darhamidelabdi/dr_hmyd_lbd_1.jpg"]),
        latitude: 35.9315, longitude: 0.0875
    },
    {
        id: 40, name: "Vieille ville (Tijdit)", category: "site",
        description: "Quartier le plus ancien de Mostaganem, cœur spirituel avec la Zaouïa al-Alaouia.",
        address: "Tidjdit",
        images: normalizeImages(["./images/tijdit/images (15).jpeg","./images/tijdit/masjid_alalawi_outside_02.jpg","./images/tijdit/images (13).jpeg","./images/tijdit/مسجد_الزاوية_العلاوية_بمستغانم_الجزائرية.jpg"]),
        latitude: 35.9310, longitude: 0.0890
    },
    { id: 39, name: "Mazagran (site historique)", category: "site", description: "Bataille de 1840.", address: "Mazagran", images: normalizeImages([]), latitude: 35.8850, longitude: 0.0450 },

    // ========== RESTAURANTS ==========
    {
        id: 11, name: "Restaurant Le Pêcheur", category: "restaurant",
        description: "Spécialités de poissons frais et fruits de mer.",
        phone: "+213 45 33 44 55", address: "Port de Mostaganem",
        images: normalizeImages(["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"]),
        latitude: 35.938, longitude: 0.100
    },

    // ========== ADMINISTRATIONS ==========
    { id: 50, name: "Siège de la Wilaya", category: "administration", description: "Services de la wilaya et cité administrative.", phone: "213 (0) 45 35 35 35", address: "Rue Abdelkader Bouaza, Mostaganem (27000)", images: normalizeImages(["./images/wilaya/images (12).jpeg"]), latitude: 35.9257, longitude: 0.08191 },
    { id: 51, name: "La Direction du tourisme et de l'artisanat", category: "administration", description: "Organisme public chargé de promouvoir le tourisme.", phone: "213 (0) 45 35 71 60", address: "Cité Administrative, Salamandre, Mostaganem", images: normalizeImages(["./images/dta mostaganem/images (12).jpeg"]), latitude: 35.9195, longitude: 0.0653 },
    { id: 52, name: "La Direction de la Culture et des Arts de Mostaganem", category: "administration", description: "Gestion du patrimoine et des activités culturelles.", phone: "+213 0 45 41 78 95", address: "Boulevard Ould Aissa Belkacem, Mostaganem", images: normalizeImages(["./images/direction culture/images (12).jpeg"]), latitude: 35.9290, longitude: 0.0870 },
    { id: 53, name: "CNAS Mostaganem", category: "administration", description: "Assurances sociales.", phone: "+213 45 20 00 30", address: "Quartier administratif", images: normalizeImages([]), latitude: 35.9295, longitude: 0.0865 },
    { id: 54, name: "CASNOS Mostaganem", category: "administration", description: "Sécurité sociale.", phone: "+213 45 20 00 40", address: "Quartier administratif", images: normalizeImages([]), latitude: 35.9298, longitude: 0.0860 },
    { id: 55, name: "Centre des Impôts", 
category: "administration", 
description: "Services fiscaux.", 
phone: "+213 45 20 00 50", 
address: "Bd 1er Novembre", 
images: normalizeImages(["./images/centreimpot/20260502_221618.jpg"]), 
latitude: 35.9305, 
longitude: 0.0880 },

    // ========== SERVICES ==========
    { id: 60, name: "Commissariat Central", category: "services", description: "Police nationale.", phone: "17", address: "Centre-ville", images: normalizeImages([]), latitude: 35.9310, longitude: 0.0895 },
    { id: 61, name: "Gendarmerie Nationale", category: "services", description: "Brigade territoriale.", phone: "1055", address: "Route nationale", images: normalizeImages([]), latitude: 35.9280, longitude: 0.0910 },
    { id: 62, name: "Hôpital Central", category: "services", description: "Urgences 24h/24.", phone: "+213 45 20 00 70", address: "Bd de l'Hôpital", images: normalizeImages([]), latitude: 35.9290, longitude: 0.0920 },
    { id: 63, name: "Clinique El Amel", category: "services", description: "Clinique privée polyvalente.", phone: "+213 45 20 00 80", address: "Salamandre", images: normalizeImages([]), latitude: 35.9210, longitude: 0.0655 },
    { id: 64, name: "Pharmacie Centrale", category: "services", description: "Pharmacie de garde.", phone: "+213 45 20 00 90", address: "Rue Didouche Mourad", images: normalizeImages([]), latitude: 35.9315, longitude: 0.0888 },

    // ========== BANQUES ==========
    { id: 70, name: "Banque Centrale (BNA)", category: "banque", description: "Services bancaires.", phone: "+213 45 20 01 00", address: "Bd 1er Novembre", images: normalizeImages([]), latitude: 35.9310, longitude: 0.0880 },
    { id: 71, name: "Société Générale Algérie", category: "banque", description: "Banque internationale.", phone: "+213 45 20 01 10", address: "Centre-ville", images: normalizeImages([]), latitude: 35.9315, longitude: 0.0875 },
    { id: 72, name: "Assurance CAAT", category: "banque", description: "Compagnie d'assurances.", phone: "+213 45 20 01 20", address: "Bd du Front de Mer", images: normalizeImages([]), latitude: 35.9320, longitude: 0.0890 }
];

window.PLACES = PLACES;

window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = PLACEHOLDER_IMAGE;
    }
}, true);
