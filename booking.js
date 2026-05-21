// booking.js

const bookingI18n = {
    fr: {
        title: "Réservation pour",
        name: "Votre nom",
        email: "Votre email",
        phone: "Téléphone",
        date: "Date",
        message: "Message (optionnel)",
        send: "Envoyer",
        alertFields: "Veuillez remplir tous les champs obligatoires.",
        alertSuccess: "✅ Réservation envoyée !",
        alertLocal: "📋 Réservation enregistrée localement."
    },
    ar: {
        title: "حجز لـ",
        name: "الاسم",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        date: "التاريخ",
        message: "رسالة (اختياري)",
        send: "إرسال",
        alertFields: "الرجاء ملء جميع الحقول الإلزامية.",
        alertSuccess: "✅ تم إرسال الحجز !",
        alertLocal: "📋 تم تسجيل الحجز محليًا."
    },
    en: {
        title: "Booking for",
        name: "Your name",
        email: "Your email",
        phone: "Phone",
        date: "Date",
        message: "Message (optional)",
        send: "Send",
        alertFields: "Please fill in all required fields.",
        alertSuccess: "✅ Booking sent!",
        alertLocal: "📋 Booking saved locally."
    }
};

let currentPlaceForBooking = null;

function getBookingLang() {
    return (typeof currentLang !== 'undefined') ? currentLang : 'fr';
}

function showBookingForm(place) {
    currentPlaceForBooking = place;
    const lang = getBookingLang();
    document.getElementById('bookingPlaceName').textContent = place.name;
    document.getElementById('bookingModal').querySelector('h2').innerHTML = 
        bookingI18n[lang].title + ' <span id="bookingPlaceName">' + place.name + '</span>';
    
    // Traduire les placeholders
    const form = document.getElementById('bookingForm');
    form.querySelector('input[name="name"]').placeholder = bookingI18n[lang].name;
    form.querySelector('input[name="email"]').placeholder = bookingI18n[lang].email;
    form.querySelector('input[name="phone"]').placeholder = bookingI18n[lang].phone;
    form.querySelector('input[name="date"]').placeholder = bookingI18n[lang].date;
    form.querySelector('textarea[name="message"]').placeholder = bookingI18n[lang].message;
    form.querySelector('button[type="submit"]').textContent = bookingI18n[lang].send;
    
    document.getElementById('bookingModal').style.display = 'flex';
}

function hideBookingForm() {
    document.getElementById('bookingModal').style.display = 'none';
    currentPlaceForBooking = null;
}

function submitBooking(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const lang = getBookingLang();
    
    const booking = {
        place_id: currentPlaceForBooking.id,
        place_name: currentPlaceForBooking.name,
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone') || '',
        date: formData.get('date') || '',
        message: formData.get('message') || '',
        timestamp: new Date().toISOString()
    };

    if (!booking.name || !booking.email) {
        alert(bookingI18n[lang].alertFields);
        return;
    }

    try {
        const existing = JSON.parse(localStorage.getItem('mostatrip_bookings') || '[]');
        existing.push(booking);
        localStorage.setItem('mostatrip_bookings', JSON.stringify(existing));
    } catch (e) {}

    if (typeof emailjs !== 'undefined') {
        emailjs.send('service_xxxxxx', 'template_xxxxxx', {
            to_email: booking.email,
            place_name: booking.place_name,
            customer_name: booking.name,
            booking_date: booking.date || 'Non spécifiée',
            message: booking.message
        }).then(() => {
            alert(bookingI18n[lang].alertSuccess);
        }).catch(() => {
            alert(bookingI18n[lang].alertLocal);
        });
    } else {
        alert(bookingI18n[lang].alertLocal);
    }

    hideBookingForm();
    form.reset();
}

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('closeBookingModal');
    if (closeBtn) closeBtn.addEventListener('click', hideBookingForm);
    
    const modal = document.getElementById('bookingModal');
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) hideBookingForm();
    });
    
    const form = document.getElementById('bookingForm');
    if (form) form.addEventListener('submit', submitBooking);
});
