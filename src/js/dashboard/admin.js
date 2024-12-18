// Select table elements
const activeTagsTableBody = document.querySelector("#active-tags-table-body");
const inactiveTagsTableBody = document.querySelector("#inactive-tags-table-body");
const appDataTable = {
  totalPhotos: document.querySelector("#totalPhotos"),
  adminCount: document.querySelector("#adminCount"),
  userCount: document.querySelector("#userCount"),
  clientCount: document.querySelector("#clientCount"),
  sessionCount: document.querySelector("#sessionCount"),
};

// TODO: add a searchable tag feature for quickly find a tag

// testing mock data - remove after testing
// import { mockData } from '../../../extra/mockData.js';

// Fetch and display admin data
const fetchAdminData = async () => {
  console.log("Fetching admin data...");
  try {
    const response = await fetch("/api/dataFetch");
    if (!response.ok) throw new Error("Failed to fetch admin data");
    
    const { activeTags, inactiveTags, adminData } = await response.json();
    // testing mock data - remove after testing
    // const { activeTags, inactiveTags, adminData } = mockData;
    
    // Populate Tag Data Table
    const populateTagTable = (tableBody, tags) => {
      tableBody.innerHTML = ""; 
      Object.entries(tags).forEach(([tag, count]) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${tag}</td><td>${count}</td>`;
        tableBody.appendChild(row);
      });
    };
    
    populateTagTable(activeTagsTableBody, activeTags);
    populateTagTable(inactiveTagsTableBody, inactiveTags);
    
    // Populate App Data Table
    appDataTable.totalPhotos.textContent = adminData.totalPhotos || "N/A";
    appDataTable.adminCount.textContent = adminData.totalAdmins || "N/A";
    appDataTable.userCount.textContent = adminData.totalUsers || "N/A";
    appDataTable.clientCount.textContent = adminData.totalClients || "N/A";
    appDataTable.sessionCount.textContent = adminData.totalAppointments || "N/A";
    
  } catch (error) {
    console.error("Error fetching admin data:", error);
    
    // Display error messages
    activeTagsTableBody.innerHTML = `<tr><td colspan="2">Error fetching tag counts</td></tr>`;
    inactiveTagsTableBody.innerHTML = "<tr><td colspan='2'>Error fetching tag counts</td></tr>";
    Object.values(appDataTable).forEach(cell => {
      cell.textContent = "Error";
    });
  }
};

// Export function
export { fetchAdminData };
