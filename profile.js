document.addEventListener('DOMContentLoaded', () => {
    // Get the profile ID from the URL (we'll pass it in the URL later)
    const urlParams = new URLSearchParams(window.location.search);
    const profileId = urlParams.get('id'); // e.g., ?id=0, ?id=1, etc.

    if (profileId === null) {
        // No profile ID in URL, handle error (redirect back or show error message)
        console.error("No profile ID provided in URL.");
        document.querySelector('.profile-page-content').innerHTML = '<p>Profile not found.</p>'; // Simple error message
        return;
    }

    fetch('data/profiles.json') // Fetch profile data
        .then(response => response.json())
        .then(profileData => {
            const profile = profileData[profileId]; // Get profile data based on ID

            if (!profile) {
                // Profile ID not found in data
                console.error(`Profile with ID ${profileId} not found.`);
                document.querySelector('.profile-page-content').innerHTML = '<p>Profile not found.</p>';
                return;
            }

            // Populate profile page elements
            document.getElementById('profile-page-image').src = profile.profilePic;
            document.getElementById('profile-page-image').alt = profile.name.split(',')[0];
            document.getElementById('profile-page-name').textContent = profile.name;
            document.getElementById('profile-page-description').textContent = profile.description;
            document.getElementById('profile-page-speaks-flag').src = profile.speaksFlag;
            document.getElementById('profile-page-practices-flag').src = profile.practicesFlag;
            document.getElementById('profile-page-level').textContent = profile.level || ''; // Handle cases where level might be missing
            document.getElementById('profile-page-bio').textContent = profile.bio || 'No bio available.'; // Use bio from profile data, or default message
        })
        .catch(error => {
            console.error('Error fetching profiles:', error);
            document.querySelector('.profile-page-content').innerHTML = '<p>Failed to load profile data.</p>';
        });
});