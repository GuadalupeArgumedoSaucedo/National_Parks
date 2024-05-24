"use strict";

window.onload = function() {
  var radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(function(radio) {
      radio.checked = false;
  });
};

// Import data arrays
import { locationArray } from "./locationData.js";
import { parkTypesArray } from "./parkTypeData.js";
import { nationalParksArray } from "./nationalParkData.js";

// DOM element references
const searchSection = document.getElementById("search-section");
const inputSearch = document.getElementById("input-search");
const searchInput = document.getElementById("search-input");
const inputSearchButton = document.getElementById("input-search-button");
const searchLocation = document.getElementById("search-by-location");
const searchLocationRadio = document.getElementById("search-by-location-radio");
const searchType = document.getElementById("search-by-type");
const searchTypeRadio = document.getElementById("search-by-type-radio");
const resultSection = document.getElementById("results-section");
const myParks = document.getElementById("my-parks");
const searchLabel = document.getElementById("search-label");

// Event listeners
searchLocationRadio.addEventListener("change", toggleSearchOptions);
searchTypeRadio.addEventListener("change", toggleSearchOptions);
searchInput.addEventListener("change", updateDropdown);
inputSearchButton.addEventListener("click", () => {
  let filteredParks = [];

  if (searchLocationRadio.checked) {
    // Filtering parks based on selected location
    filteredParks = nationalParksArray.filter(park => park.State === location);

  } else if (searchTypeRadio.checked) {
    // Filtering parks based on selected park type
    filteredParks = nationalParksArray.filter(park => park.ParkType === parkType);
  }

  // Displaying filtered parks
  displayResults(filteredParks);
});

// Populating dropdown
populateDropdown(searchInput, locationArray);

// Populating the dropdown menu 
function populateDropdown(inputSearch, dataArray) {
  inputSearch.innerHTML = "";
  dataArray.forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.text = item;
    inputSearch.appendChild(option);
    if (option.index == 0) {
      option.selected = 'true';
      getParks(item);
    }
  });
}

// Search options based on radio button
function toggleSearchOptions() {
  if (searchLocationRadio.checked) {
    searchLabel.textContent = "Choose State:";
    populateDropdown(searchInput, locationArray);
    parkTemplate(searchInput.value);
  } else if (searchTypeRadio.checked) {
    searchLabel.textContent = "Choose Park Type:";
    populateDropdown(searchInput, parkTypesArray);
  }
}

// Update dropdown menu
function updateDropdown() {
  getParks(searchInput.value);
}

// Fetch parks
function getParks(selectedItem) {
  myParks.innerHTML = "";
  nationalParksArray.forEach(item => {
    if (searchLocationRadio.checked) {
      if (item["State"] == selectedItem) {
        parkTemplate(item);
      }
    } else if (searchTypeRadio.checked) {
      selectedItem = selectedItem.split(" ").pop();
      if (item["LocationName"].split(" ").includes(selectedItem)) {
        parkTemplate(item);
      }
    }
  });
}

// Function for searching parks by location
function searchByLocation() {
  let message = `${locationsArray.length} National Park to visit`;
  message += locationsArray.map(parkTemplate).join("");
  document.getElementById("myParks").innerHTML = message;
}

// Function for searching parks by type
function searchByType() {
  let message = `${parkTypesArray.length} National Park to visit`;
  message += parkTypesArray.map(parkTemplate).join("");
  document.getElementById("myParks").innerHTML = message;
}

// Template for displaying park information
function parkTemplate(park) {
  const card = `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${park.LocationName || ''}</h5>
        <p class="card-text">Address:</span></p>
        <p class="card-text">${park.Address || ''}</p>
        <p class="card-text">${park.City || ''}, ${park.State || ''} ${park.ZipCode || ''}</p>
        <p class="card-text">Phone: ${park.Phone || ''}</p>
        <p class="card-text">Fax: ${park.Fax || ''}</p>
        ${park.Visit ? `<a href="${park.Visit}" class="btn btn-primary" target="_blank">Visit page</a>` : ''}
      </div>
    </div>`;
  myParks.innerHTML += card;
}

// Function for viewing all parks
function viewAllParks() {
  myParks.innerHTML = "";
  nationalParksArray.forEach(park => {
    parkTemplate(park);
  });
}

// Event listener for viewing all parks button
document.getElementById("view-all-button").addEventListener("click", viewAllParks);

