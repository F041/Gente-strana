document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const profileCards = document.querySelectorAll('.profile-card');

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();

        profileCards.forEach(card => {
            const cardText = card.textContent.toLowerCase(); // Get all text content of the card
            if (cardText.includes(searchTerm)) {
                card.style.display = 'flex'; // Show card if it matches
            } else {
                card.style.display = 'none'; // Hide card if it doesn't match
            }
        });
    });

    // Review Button Functionality REMOVED

});