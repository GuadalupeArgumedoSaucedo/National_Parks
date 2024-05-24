
// const locationsArray = require("./locationData.js");
// const parkTypesArray = require('./parkTypeData.js');
import {locationArray} from "./locationData.js";
import {parkTypesArray} from "./parkTypeData.js";
import {nationalParksArray} from "./nationalParkData.js";
  // const locationArray1 = require("./locationData.js");
//   require(['./locationData.js'], function (foo) {
//     //foo is now loaded.
// });
// console.log(locationArray);

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

  // Event listeners for radio button changes
  searchLocationRadio.addEventListener("change", toggleSearchOptions);
  searchTypeRadio.addEventListener("change", toggleSearchOptions);
  searchInput.addEventListener("change", updateDropdown);
 
  // Event listener for search button click
  inputSearchButton.addEventListener("click", () => {
    let filteredParks = [];

    // Determine filter criteria based on radio button selection
    if (searchLocationRadio.checked) {
        filteredParks = nationalParksArray.filter(park => park.State === location);

    } else if (searchTypeRadio.checked) {
        filteredParks = nationalParksArray.filter(park => park.ParkType === parkType);
    }

    // Display filtered parks
    displayResults(filteredParks);
  });

  // Initialize dropdown with unique states on page load
//  populateDropdown(searchInput, getUniqueStates(nationalParksArray));
  populateDropdown(searchInput,locationArray);


  // Function to populate dropdown with options
  // function populateDropdown(dropdown, dataArray) {
  //   dropdown.innerHTML = ""; // Clear existing options
  //   dataArray.forEach(item => {
  //       const option = document.createElement("option");
  //       option.value = item;
  //       option.textContent = item;
  //       dropdown.appendChild(option);
  //   });
  // }
    function populateDropdown(inputSearch, dataArray) {
      inputSearch.innerHTML = ""; // Clear existing options
      dataArray.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.text = item;
        inputSearch.appendChild(option);
        if(option.index == 0){
          option.selected = 'true';
          getParks(item);
        }
    });
  } 

  // Function to toggle search options based on radio button selection
  // function toggleSearchOptions() {
  //   if (searchLocationRadio.checked) {
  //       searchLabel.textContent = "Choose State:";
  //       populateDropdown(searchInput, getUniqueStates(nationalParksArray));
  //   } else if (searchTypeRadio.checked) {
  //       searchLabel.textContent = "Choose Park Type:";
  //       populateDropdown(searchInput, parkTypesArray);
  //   }
  // }
  function toggleSearchOptions() {
    if (searchLocationRadio.checked) {
        searchLabel.textContent = "Choose State:";
        populateDropdown(searchInput,locationArray);
        parkTemplate(inputSearch.value);
    } else if (searchTypeRadio.checked) {
        searchLabel.textContent = "Choose Park Type:";
        populateDropdown(searchInput,parkTypesArray);
    }
  }

  function updateDropdown(){
    getParks(searchInput.value);
    //inputSearch.selected = 'true';
  }

  function getParks(selectedItem){
    myParks.innerHTML = "";
    nationalParksArray.forEach(item => {
      if(searchLocationRadio.checked){
        if(item["State"] == selectedItem){
          parkTemplate(item);
        }
      }else if(searchTypeRadio.checked){
        selectedItem = selectedItem.split(" ").pop();
        if(item["LocationName"].split(" ").includes(selectedItem)){
          parkTemplate(item);
        }
      }
        // for(let key in park){
        //   if(park["State"] == "Alabama"){
        //     parkTemplate(park);
        //   }
        // }
      // park.forEach(item => {
      //   if(item.State == selectedItem){
      //     parkTemplate(park);
      //   }
      // });
      //else
    });
  }

//display search by location results
function searchByLocation() {
  let message = `${locationsArray.length} National Park to visit`;
  message += locationsArray.map(parkTemplate).join("");
  document.getElementById("myParks").innerHTML = message;
}

//display search by type results
function searchByType() {
  let message = `${parkTypesArray.length} National Park to visit`;
  message += parkTypesArray.map(parkTemplate).join("");
  document.getElementById("myParks").innerHTML = message;
}

//display park info
function parkTemplate(park) {
  // return `
  //       <div class="card" style="width: 18rem;">
  //       <img src="${park.Image}" class="card-img-top" alt="...">
  //       <div class="card-body">
  //           <h5 class="card-title">${park.LocationName}</h5>
  //           <p class="card-text">${park.State}.</p>
  //           <a href="#" class="btn btn-primary">Go somewhere</a>
  //       </div>
  //       </div>`;

  const card = `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${park.LocationName || ''}</h5>
        <p class="card-text">Address:</span></p>
        <p class="card-text">${park.Address || ''}</p>
        <p class="card-text">${park.City || ''}, ${park.State || ''} ${park.ZipCode || ''}</p>
        <p class="card-text">Phone: ${park.Phone || ''}</p>
        <p class="card-text">Fax: ${park.Fax || ''}</p>
        ${park.Visit ? `<a href="${park.Visit}" class="btn btn-primary">Visit page</a>` : ''}
      </div>
    </div>`;
    myParks.innerHTML += card;
}

// Function to display all national parks
function viewAllParks() {
  // Clear existing content
  myParks.innerHTML = "";

  // Display all national parks
  nationalParksArray.forEach(park => {
      parkTemplate(park);
  });
}

// Add an event listener for "View All" button click
document.getElementById("view-all-button").addEventListener("click", viewAllParks);
