document.addEventListener('DOMContentLoaded', () => {
    console.log("dynamicProfiles.js: DOMContentLoaded event fired"); // Debugging log

    fetch('data/profiles.json')
        .then(response => {
            console.log("dynamicProfiles.js: fetch('data/profiles.json') - Response received:", response); // Debugging log
            if (!response.ok) {
                console.error("dynamicProfiles.js: fetch('data/profiles.json') - HTTP error!", response.status, response.statusText); // Log HTTP errors
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(profileData => {
            console.log("dynamicProfiles.js: fetch('data/profiles.json') - JSON data loaded successfully:", profileData); // Debugging log

            const contentArea = document.querySelector('.content');
            console.log("dynamicProfiles.js: contentArea element:", contentArea); // Debugging log

            if (!contentArea) {
                console.error("dynamicProfiles.js: Error! contentArea element not found in HTML."); // Error if contentArea is null
                return; // Stop execution if contentArea is missing
            }

            profileData.forEach((profile, index) => {
                console.log("dynamicProfiles.js: Processing profile:", profile.name, "index:", index); // Debugging log for each profile

                const profileCardHTML = `
                    <a href="profile.html?id=${index}" class="profile-card-link">
                        <div class="profile-card ${profile.newProfile ? 'new-profile' : ''} ${profile.popularProfile ? 'popular-profile' : ''}">
                            <div class="profile-image">
                                <img src="${profile.profilePic}" alt="${profile.name.split(',')[0]}" class="profile-pic">
                                ${profile.newProfile ? '<span class="new-badge">NEW</span>' : ''}
                                ${profile.popularProfile ? `<span class="popular-badge">${profile.popularCount} <i class="fas fa-fire"></i></span>` : ''}
                                <span class="online-indicator"></span>
                            </div>
                            <div class="profile-details">
                                <div class="profile-header">
                                    <span class="name">${profile.name}</span>
                                </div>
                                <p class="description">${profile.description}</p>
                                <div class="languages">
                                    <span class="speaks">SPEAKS <img src="${profile.speaksFlag}" alt="US Flag"></span>
                                    <span class="practices">PRACTICES <img src="${profile.practicesFlag}" alt="Flag"> ${profile.level ? `<span class="level">${profile.level}</span>` : ''}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                `;
                contentArea.innerHTML += profileCardHTML;
            });

            console.log("dynamicProfiles.js: Profile card generation completed."); // Debugging log

            // Search functionality (if you have it here) ...
            // ...
        })
        .catch(error => {
            console.error("dynamicProfiles.js: Error during fetch or JSON parsing:", error); // More detailed error log
            const contentArea = document.querySelector('.content');
            if (contentArea) {
                contentArea.innerHTML = '<p>Failed to load profiles. Please try again later.</p>';
            }
        });
});