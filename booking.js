// booking.js

let currentPlaceForBooking = null;

function showBookingForm(place) {
    currentPlaceForBooking = place;
    document.getElementById('bookingPlaceName').textContent = place.name;
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
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }

    try {
        const existing = JSON.parse(localStorage.getItem('mostatrip_bookings') || '[]');
        existing.push(booking);
        localStorage.setItem('mostatrip_bookings', JSON.stringify(existing));
        console.log('Réservation sauvegardée localement.');
    } catch (e) {
        console.warn('Erreur localStorage:', e);
    }

    if (typeof emailjs !== 'undefined') {
        emailjs.send('service_xxxxxx', 'template_xxxxxx', {
            to_email: booking.email,
            place_name: booking.place_name,
            customer_name: booking.name,
            booking_date: booking.date || 'Non spécifiée',
            message: booking.message
        }).then(() => {
            alert(' Réservation envoyée !');
        }).catch(err => {
            console.warn('EmailJS error:', err);
            alert(' Réservation enregistrée localement.');
        });
    } else {
        alert(' Réservation enregistrée localement.');
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