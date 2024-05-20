document.addEventListener("DOMContentLoaded", () => {
    const searchByLocationRadio = document.getElementById("search-by-location");
    const searchByTypeRadio = document.getElementById("search-by-type");
    const searchLabel = document.getElementById("search-label");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
    const resultsDiv = document.getElementById("results");

    const locationsArray = ["California", "Texas", "Florida"]; // Example data
    const parkTypesArray = ["National Park", "Historic Site", "Monument"]; // Example data
    const nationalParksArray = [
        {
            LocationName: "Yosemite National Park",
            State: "California",
            ParkType: "National Park",
            Image: "yosemite.jpg"
        },
        {
            LocationName: "Big Bend National Park",
            State: "Texas",
            ParkType: "National Park",
            Image: "bigbend.jpg"
        }
        // Add more park data here
    ];

    // Initialize the dropdown with location data
    populateDropdown(searchInput, locationsArray);

    // Event listeners for radio buttons to show/hide search options
    searchByLocationRadio.addEventListener("change", toggleSearchOptions);
    searchByTypeRadio.addEventListener("change", toggleSearchOptions);

    function toggleSearchOptions() {
        if (searchByLocationRadio.checked) {
            searchLabel.textContent = "Choose State:";
            populateDropdown(searchInput, locationsArray);
        } else if (searchByTypeRadio.checked) {
            searchLabel.textContent = "Choose Park Type:";
            populateDropdown(searchInput, parkTypesArray);
        }
    }

    searchButton.addEventListener("click", () => {
        let filteredParks = [];

        if (searchByLocationRadio.checked) {
            const location = searchInput.value;
            filteredParks = nationalParksArray.filter(park => park.State === location);
        } else if (searchByTypeRadio.checked) {
            const parkType = searchInput.value;
            filteredParks = nationalParksArray.filter(park => park.ParkType === parkType);
        }

        displayResults(filteredParks);
    });

    function displayResults(parks) {
        const message = `<h2>${parks.length} National Parks to visit</h2><br><br>`;
        const parksHtml = parks.map(parkTemplate).join("");
        resultsDiv.innerHTML = message + parksHtml;
    }

    function parkTemplate(park) {
        return `
            <div class="card" style="width: 18rem;">
                <img src="${park.Image}" class="card-img-top" alt="${park.LocationName}">
                <div class="card-body">
                    <h5 class="card-title">${park.LocationName}</h5>
                    <p class="card-text">${park.State}.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>`;
    }

    function populateDropdown(dropdown, dataArray) {
        dropdown.innerHTML = ""; // Clear existing options
        dataArray.forEach(item => {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            dropdown.appendChild(option);
        });
    }
});

 /*
 document.addEventListener("DOMContentLoaded", () => {
    const statesButton = document.getElementById("statesbutton");
    const parkButton = document.getElementById("parkbutton");

    statesButton.addEventListener("change", () => {
        searchLocation();
    });

    parkButton.addEventListener("change", () => {
        searchType();
    });

    function searchLocation() {
        // Replace this console.log statement with your actual search location function
        console.log("Search location function executed.");
    }

    function searchType() {
        // Replace this console.log statement with your actual search type function
        console.log("Search type function executed.");
    }
});
*/