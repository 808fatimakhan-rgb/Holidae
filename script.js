 /* HOLIDAE — script.js

   What this file does:
   1. Switches between pages (Home, Destinations, etc.)
   2. Opens/closes the mobile menu
   3. Opens/closes the booking popup
   4. Opens/closes the gallery lightbox
   5. Validates the contact form */


/* 1. PAGE SWITCHING
   
   All pages are in the HTML but hidden with CSS.
   This function shows the one you click on
   and hides all the others. */

// List of all page IDs
// FIX 1: Added 'booking' to the pages array so showPage('booking') works correctly
const pages = ['home', 'destinations', 'packages', 'gallery', 'contact', 'booking'];

function showPage(pageId) {

    // Loop through every page and hide it
    pages.forEach(function(id) {
        document.getElementById('page-' + id).classList.remove('active');
    });

    // Show only the page we want
    document.getElementById('page-' + pageId).classList.add('active');

    // Scroll back to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* 2. MOBILE MENU
   
   Toggles the dropdown menu open/closed
   when the hamburger ☰ is clicked.
============================================= */
function toggleMenu() {
    // Get the mobile menu element
    var menu = document.getElementById('mobileMenu');

    // Toggle means: if it has the class "open", remove it. If not, add it.
    menu.classList.toggle('open');
}


/* =============================================
   3. BOOKING POPUP
   
   Opens and closes the "Booking Received" popup.
============================================= */

// FIX 2: Replaced alert() with openPopup() so the nice popup shows instead of a browser alert
document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    openPopup();
    this.reset();
});

function openPopup() {
    var overlay = document.getElementById('popupOverlay');
    overlay.classList.add('open');

    // Prevent scrolling the page behind the popup
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    var overlay = document.getElementById('popupOverlay');
    overlay.classList.remove('open');

    // Allow scrolling again
    document.body.style.overflow = '';
}

// Close the popup if user clicks on the dark background (not the white box)
document.getElementById('popupOverlay').addEventListener('click', function(event) {
    // event.target = what the user actually clicked
    // "this" = the overlay itself
    if (event.target === this) {
        closePopup();
    }
});


/* =============================================
   4. GALLERY LIGHTBOX
   
   When a gallery image is clicked,
   shows it fullscreen.
============================================= */
function openLightbox(element) {
    // Get the <img> inside the clicked gallery item
    var imgSrc = element.querySelector('img').src;

    // Put that image into the lightbox
    document.getElementById('lightboxImg').src = imgSrc;

    // Show the lightbox
    document.getElementById('lightbox').classList.add('open');

    // Prevent scrolling behind the lightbox
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}


/* =============================================
   5. CONTACT FORM VALIDATION
   
   When the form is submitted, we check:
   - First name is at least 2 characters
   - Last name is at least 2 characters
   - Email looks like a real email
   - Message is at least 10 characters
   
   If everything is valid → show the popup.
   If something is wrong → show error messages.
============================================= */
document.getElementById('contactForm').addEventListener('submit', function(event) {

    // Stop the form from actually submitting (which would reload the page)
    event.preventDefault();

    // We'll track if everything is valid
    var isValid = true;

    // --- Check First Name ---
    var firstName = document.getElementById('firstName');
    var fgFirstName = document.getElementById('fg-firstname');

    if (firstName.value.trim().length < 2) {
        // Show error
        fgFirstName.classList.add('has-error');
        isValid = false;
    } else {
        // Remove error if it was there before
        fgFirstName.classList.remove('has-error');
    }

    // --- Check Last Name ---
    var lastName = document.getElementById('lastName');
    var fgLastName = document.getElementById('fg-lastname');

    if (lastName.value.trim().length < 2) {
        fgLastName.classList.add('has-error');
        isValid = false;
    } else {
        fgLastName.classList.remove('has-error');
    }

    // --- Check Email ---
    // This pattern checks it has an @ and a dot
    // var email = document.getElementById('email');
    // var fgEmail = document.getElementById('fg-email');
    // var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (!emailPattern.test(email.value.trim())) {
    //     fgEmail.classList.add('has-error');
    //     isValid = false;
    // } else {
    //     fgEmail.classList.remove('has-error');
    // }

    // --- Check Message ---
    var message = document.getElementById('message');
    var fgMessage = document.getElementById('fg-message');

    if (message.value.trim().length < 10) {
        fgMessage.classList.add('has-error');
        isValid = false;
    } else {
        fgMessage.classList.remove('has-error');
    }

    // --- If everything is valid, show success popup ---
    if (isValid) {
        openPopup();
        // Optional: reset the form after successful submit
        this.reset();
    }
});


/* =============================================
   KEYBOARD SUPPORT
   
   Press the Escape key to close
   the popup or lightbox.
============================================= */
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePopup();
        closeLightbox();
    }
});
