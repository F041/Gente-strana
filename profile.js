document.addEventListener('DOMContentLoaded', () => {
    console.log("profile.js: DOMContentLoaded event fired on profile.html"); // Debugging log - Is profile.js running?

    // Get the profile ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const profileId = urlParams.get('id');
    console.log("profile.js: Profile ID from URL:", profileId); // Debugging log - Is profileId being retrieved?

    if (profileId === null) {
        console.error("profile.js: No profile ID provided in URL.");
        document.querySelector('.profile-page-content').innerHTML = '<p>Profile not found (No ID in URL).</p>';
        return;
    }

    fetch('data/profiles.json')
        .then(response => {
            console.log("profile.js: fetch('data/profiles.json') - Response received:", response); // Debugging log - Fetch response
            if (!response.ok) {
                console.error("profile.js: fetch('data/profiles.json') - HTTP error!", response.status, response.statusText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(profileData => {
            console.log("profile.js: fetch('data/profiles.json') - JSON data loaded successfully:", profileData); // Debugging log - JSON data

            const profile = profileData[profileId];
            console.log("profile.js: Profile data for ID", profileId, ":", profile); // Debugging log - Profile data for this ID

            if (!profile) {
                console.error(`profile.js: Profile with ID ${profileId} not found in data.`);
                document.querySelector('.profile-page-content').innerHTML = '<p>Profile not found (ID not in data).</p>';
                return;
            }

            // Populate profile page elements
            const profileImage = document.getElementById('profile-page-image');
            const profileName = document.getElementById('profile-page-name');
            const profileDescription = document.getElementById('profile-page-description');
            const profileSpeaksFlag = document.getElementById('profile-page-speaks-flag');
            const profilePracticesFlag = document.getElementById('profile-page-practices-flag');
            const profileLevel = document.getElementById('profile-page-level');
            const profileBio = document.getElementById('profile-page-bio');

            console.log("profile.js: HTML elements:", { // Debugging log - HTML elements found?
                profileImage, profileName, profileDescription, profileSpeaksFlag, profilePracticesFlag, profileLevel, profileBio
            });


            if (profileImage) profileImage.src = profile.profilePic;
            if (profileImage) profileImage.alt = profile.name.split(',')[0];
            if (profileName) profileName.textContent = profile.name;
            if (profileDescription) profileDescription.textContent = profile.description;
            if (profileSpeaksFlag) profileSpeaksFlag.src = profile.speaksFlag;
            if (profilePracticesFlag) profilePracticesFlag.src = profile.practicesFlag;
            if (profileLevel) profileLevel.textContent = profile.level || '';
            if (profileBio) profileBio.textContent = profile.bio || 'No bio available.';

            console.log("profile.js: Profile page population completed."); // Debugging log - Population done

        })
        .catch(error => {
            console.error("profile.js: Error during fetch or JSON parsing:", error);
            document.querySelector('.profile-page-content').innerHTML = '<p>Failed to load profile data.</p>';
        });
});