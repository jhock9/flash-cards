// Select table elements
const tagCountsTableBody = document.querySelector("#tag-counts-table-body");
const appDataTable = {
  totalPhotos: document.querySelector("#totalPhotos"),
  adminCount: document.querySelector("#adminCount"),
  userCount: document.querySelector("#userCount"),
  clientCount: document.querySelector("#clientCount"),
  sessionCount: document.querySelector("#sessionCount"),
};

// Fetch and display admin data
const fetchAdminData = async () => {
  console.log("Fetching admin data...");
  try {
    const response = await fetch("/api/dataFetch");
    if (!response.ok) throw new Error("Failed to fetch admin data");
    
    const { tagCounts, adminData } = await response.json();
    
    // Populate Tag Counts Table
    tagCountsTableBody.innerHTML = ""; // Clear previous data
    Object.entries(tagCounts).forEach(([tag, count]) => {
      const row = document.createElement("tr");
      
      const tagCell = document.createElement("td");
      tagCell.textContent = tag;
      
      const countCell = document.createElement("td");
      countCell.textContent = count;
      
      row.appendChild(tagCell);
      row.appendChild(countCell);
      tagCountsTableBody.appendChild(row);
    });
    
    // Populate App Data Table
    appDataTable.totalPhotos.textContent = adminData.totalPhotos || "N/A";
    appDataTable.adminCount.textContent = adminData.totalAdmins || "N/A";
    appDataTable.userCount.textContent = adminData.totalUsers || "N/A";
    appDataTable.clientCount.textContent = adminData.totalClients || "N/A";
    appDataTable.sessionCount.textContent = adminData.totalAppointments || "N/A";
    
    // Show tables if they were hidden
    document.querySelector("#tag-counts-table").classList.remove("hide");
    document.querySelector("#app-data-table").classList.remove("hide");
    
  } catch (error) {
    console.error("Error fetching admin data:", error);
    
    // Display error messages
    tagCountsTableBody.innerHTML = `<tr><td colspan="2">Error fetching tag counts</td></tr>`;
    Object.values(appDataTable).forEach(cell => {
      cell.textContent = "Error";
    });
  }
};

// Export function
export { fetchAdminData };
