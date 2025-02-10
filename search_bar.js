document.addEventListener('DOMContentLoaded', () => {
    const filterButton = document.getElementById('filter-button');
    const filterOptionsDiv = document.getElementById('filter-options');
    const applyFiltersButton = document.getElementById('apply-filters-button');
    const genderFilterSelect = document.getElementById('gender-filter');
    const ageFilterSelect = document.getElementById('age-filter');
    let isFilterOptionsVisible = false; // Track filter options visibility

    // Toggle filter options visibility when filter button is clicked
    filterButton.addEventListener('click', () => {
        isFilterOptionsVisible = !isFilterOptionsVisible;
        filterOptionsDiv.style.display = isFilterOptionsVisible ? 'block' : 'none';
    });

    // Function to apply filters and re-render profiles (you'll expand this)
    applyFiltersButton.addEventListener('click', () => {
        const selectedGender = genderFilterSelect.value;
        const selectedAgeRange = ageFilterSelect.value;

        console.log("Filters applied:", { gender: selectedGender, ageRange: selectedAgeRange }); // For now, just log filters

        filterOptionsDiv.style.display = 'none'; // Hide filter options after applying
        isFilterOptionsVisible = false;

        // In the next steps, you will:
        // 1. Get the original profileData (from dynamicProfiles.js, or re-fetch if needed)
        // 2. Filter the profileData based on selectedGender and selectedAgeRange
        // 3. Clear the existing profile cards in <main class="content">
        // 4. Re-generate and re-insert the filtered profile cards into <main class="content">
    });

    // Initially hide filter options on page load (if not already hidden by inline style)
    filterOptionsDiv.style.display = 'none';
});