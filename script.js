let myLeads = []; // Initialize an empty array to store leads

// Gets the different elements from the html file
const inputBtn = document.getElementById("input-btn");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); // Retrieve leads from local storage and parse JSON

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage; // Assign retrieved leads to myLeads array if they exist
  render(myLeads);
}

inputBtn.addEventListener("click", function () {
  let url = input.value; // Get the value entered in the input field
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url; // Prepend "https://" to the URL if it doesn't start with it
  }
  myLeads.push(url);
  input.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads)); // Store the updated myLeads array in local storage

  render(myLeads);
});

deleteBtn.addEventListener("click", function () {
  localStorage.clear(); // Clear the entire local storage
  window.location.reload();
  render(myLeads);
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = ""; // Initialize an empty string to store the list items
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
        <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
        </a>
    </li>
    `; // Append each lead as a list item with an anchor tag
  }
  ul.innerHTML = listItems;
}
