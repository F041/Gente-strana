document.addEventListener('DOMContentLoaded', () => {
    fetch('data/profiles.json')
        .then(response => response.json())
        .then(profileData => {
            const contentArea = document.querySelector('.content');

            profileData.forEach((profile, index) => { // Get index in forEach
                const profileCardHTML = `
                    <a href="profile.html?id=${index}" class="profile-card-link">  <!-- Link added here -->
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
                    </a> <!-- Closing link tag -->
                `;
                contentArea.innerHTML += profileCardHTML;
            });

            // Search functionality remains the same (if you kept it in dynamicProfiles.js)
            // ... search functionality code ...

        })
        .catch(error => { /* ... error handling ... */ });
});