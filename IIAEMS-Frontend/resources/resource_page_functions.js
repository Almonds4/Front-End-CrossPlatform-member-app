document.addEventListener("DOMContentLoaded", function () {
  // JavaScript code inside this event listener will run as soon as the HTML structure is ready.

  const dropdowns = document.querySelectorAll(".dropdown");


  dropdowns.forEach((dropdown) => {
    // Collecting all the relative elements
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");

    // Menu open and close functionality
    select.addEventListener("click", () => {
      select.classList.toggle("select-clicked");
      caret.classList.toggle("caret-rotate");
      menu.classList.toggle("menu-open");
    });

    // Select functionality
    options.forEach((option) => {
      option.addEventListener("click", () => {
        selected.innerText = option.innerText;
        select.classList.remove("select-clicked");
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open");

        options.forEach((option) => {
          option.classList.remove("active");
        });

        option.classList.add("active");

        // FILTER FUNCTIONALITY 
        const activeFilter = option.innerText.toLowerCase();
        filterResources(activeFilter, searchInput.value.toLowerCase());
      });
    });

    // SEARCH FUNCTIONALITY 
    const searchInput = document.querySelector(".search");

    searchInput.addEventListener("input", () => {
      const activeFilter = selected.innerText.toLowerCase();
      filterResources(activeFilter, searchInput.value.toLowerCase());
    });

    function filterResources(activeFilter, searchTerm) {
      const resources = document.querySelectorAll(".resource");
    
      resources.forEach((resource) => {
        const title = resource.querySelector("#resource-name").innerText.toLowerCase();
        const tags = resource.dataset.tags.toLowerCase();
    
        if (
          (activeFilter === "none" || activeFilter === "" || activeFilter === "all" || !activeFilter) &&
          title.includes(searchTerm)
        ) {
          resource.style.display = "block";
        } else if (tags.includes(activeFilter) && title.includes(searchTerm)) {
          resource.style.display = "block";
        } else {
          resource.style.display = "none";
        }
      });
    
      paginate();
    }
    
  });

  //Applies No filter and no search on page load
  filterResources("none", "");

  // Pagination Logic
  const resources = document.querySelectorAll(".resource"); // Get all resource items
  const prevBtn = document.getElementById("prev"); // Previous button
  const nextBtn = document.getElementById("next"); // Next button
  const pageNumberDisplay = document.getElementById("page-number"); // Page number display
  const totalPagesDisplay = document.getElementById("total-pages"); // Total pages display

  const itemsPerPage = 6; // Items per page (can be adjusted as needed)
  const totalPages = Math.ceil(resources.length / itemsPerPage); // Calculate total pages
  let currentPage = 1; // Current page

  // Function to display the resources for the current page
  function paginate() {
    let visibleResources = [...resources].filter(
      (resource) => resource.style.display === "block"
    );

    let totalPages = Math.ceil(visibleResources.length / itemsPerPage);
    currentPage = Math.min(currentPage, totalPages) || 1;

    // Hide all resources first
    resources.forEach((resource) => (resource.style.display = "none"));

    // Show only the resources for the current page
    visibleResources
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .forEach((resource) => (resource.style.display = "block"));

    // Update page number display
    pageNumberDisplay.textContent = `Page ${currentPage}`;

    // Update total pages display
    totalPagesDisplay.textContent = `of ${totalPages}`;

    // Disable Previous button on first page
    prevBtn.disabled = currentPage === 1;

    // Disable Next button on last page
    nextBtn.disabled = currentPage === totalPages;
  }

  // Add event listener for "Previous" button
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      paginate();
    }
  });

  // Add event listener for "Next" button
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      paginate();
    }
  });

  // Initial display of resources for the first page
  paginate();
});

// Dynamic resource adding for back-end

const books = [
  {
    title: "Book 1",
    file: "book1.pdf",
    tags: ["Engineering", "Medical"],
    description: "hdsajdjkashdasjk",
  },
  {
    title: "Book 2",
    file: "book2.pdf",
    tags: ["Technology", "Computer science"],
    description: "sjakdhasdsa",
  },
  {
    title: "Book 3",
    file: "book3.pdf",
    tags: ["Arts", "History"],
    description: "sjakdhasdsa",
  },
];

const bookList = document.querySelector(".grid-container");

books.forEach((book) => {
  let listItem = document.createElement("div");
  listItem.dataset.tags = book.tags.join(", ");
  listItem.classList.add("resource");
  listItem.innerHTML = ` 
          <h2 id="resource-name">${book.title}</h2>
          <img id="resource-cover" src="resource_catalogue_images/book-cover-stock-photo.png" alt="Resource Cover">
          <div id="resource-description"> ${book.title} </div>
          <div id="resource-tags">${book.tags.join(", ")}</div>`;
  bookList.appendChild(listItem);
});
