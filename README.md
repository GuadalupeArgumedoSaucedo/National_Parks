# National_Parks
 National parks and Mountains information
![image](https://github.com/GuadalupeArgumedoSaucedo/National_Parks/assets/166437700/4ff76ec9-d2f0-4fc5-b979-7630688e966b)
![image](https://github.com/GuadalupeArgumedoSaucedo/National_Parks/assets/166437700/e4de073e-19c6-4fb4-84f1-168a9cd6a40c)
![image](https://github.com/GuadalupeArgumedoSaucedo/National_Parks/assets/166437700/be388e6d-523d-4a8d-9a70-761a562744ff)
![image](https://github.com/GuadalupeArgumedoSaucedo/National_Parks/assets/166437700/c071ba7d-76be-4d35-9ac7-7ca0e6d859df)
![image](https://github.com/GuadalupeArgumedoSaucedo/National_Parks/assets/166437700/619ac349-8cc8-4987-866f-4a7fa81978a8)
![image](https://github.com/GuadalupeArgumedoSaucedo/National_Parks/assets/166437700/d5d97e99-9d23-46c2-899a-265ddd93136c)

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




