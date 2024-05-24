"use strict";

// Import mountain data array
import { mountainsArray } from "./mountainData.js";

// DOM element references
const mountainDropdownSelect = document.getElementById("mountain-dropdown-select");
const searchButton = document.getElementById("search-button");
const myMountains = document.getElementById("my-mountains");

// Function to populate dropdown menu
function populateDropdown(inputSearch, dataArray) {
    inputSearch.innerHTML = ""; 
    dataArray.forEach(item => {
        const option = document.createElement("option");
        option.value = item.name; // Setting option value to mountain name
        option.text = item.name; // Setting option text to mountain name
        inputSearch.appendChild(option);
    });
}

// Event listener for search button click
searchButton.addEventListener("click", () => {
    // Filtering mountains based on selected mountain name
    const selectedMountain = mountainDropdownSelect.value;
    const filteredMountains = mountainsArray.filter(mountain => mountain.name === selectedMountain);
    // Displaying filtered mountains
    myMountains.innerHTML = filteredMountains.map(mountainTemplate).join('');
});

// Populating dropdown menu (when DOM content is loaded)
document.addEventListener("DOMContentLoaded", function() {
    populateDropdown(mountainDropdownSelect, mountainsArray);
});

// Function to generate card for mountain
function mountainTemplate(mountain) {
  // Fetching sunrise data for the mountain
  //let mySunrise = getSunsetForMountain(mountain.coords.lat, mountain.coords.lng);
  return `
      <div class="mountain">
          <img class="mountain-photo" src="/images/${mountain.img}" alt="${mountain.name}">
          <h2 class="mountain-name">${mountain.name} <span class="species">(${mountain.elevation} feet)</span></h2>
          <h4 class="mountain-desc">${mountain.desc}</h4>
          <p><strong>Effort:</strong> ${mountain.effort}</p>
          <p><strong>Coordinates:</strong> lat: ${mountain.coords.lat}, lng: ${mountain.coords.lng}</p>
      </div>
  `;
}
/*
<strong>Sunrise:</strong> ${mySunrise}

// Displaying total number of mountains and mountain list in the HTML
document.getElementById("mountains").innerHTML = `
  <h1 class="app-title"> ${mountainsArray.length} Mountains to climb</h1>
  ${mountainsArray.map(mountainTemplate).join("")}
  <p class="footer">These ${
    mountainsArray.length
  } mountains were added recently. Check back soon for updates.</p>
`;

// Function to fetch sunrise data for a given location (lat, lng)
async function getSunsetForMountain(lat, lng) {
  let response = await fetch(`https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today`);
  let data = await response.json();
  return data;
}

// Function to load mountain data into dropdown menu
function loadData() {
  var down = document.getElementById("mountain");
  for (let i = 0; i < mountainsArray.length; i++) {
    var optn = mountainsArray[i];
    var el = document.createElement("option");
    el.textContent = optn;
    el.value = optn;
    down.appendChild(el);
  }
  down.innerHTML = "Elements Added";
}
*/
