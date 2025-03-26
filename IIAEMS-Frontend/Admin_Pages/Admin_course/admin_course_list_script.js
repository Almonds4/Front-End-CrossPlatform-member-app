
document.addEventListener("DOMContentLoaded", () => {
    
    const courseList = document.getElementById("courseList");
    const pagination = document.getElementById("pagination");
    
    let courses = []; // This will hold all courses
    const itemsPerPage = 3;
    let currentPage = 1;
    
    // Function to render courses based on the current page
    function renderCourses() {
        courseList.innerHTML = "";
        let start = (currentPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedCourses = courses.slice(start, end);
    
        paginatedCourses.forEach(course => {
            const courseItem = document.createElement("div");
            courseItem.classList.add("course-item");
            courseItem.setAttribute("data-topic", `${course.topic}`);
            courseItem.innerHTML = `
                <div class="course-cover"></div>
                <div class="course-details">
                    <h3 class="course-title">${course.title}</h3>
                    <p>${course.description}</p>
                    <span class="course-price">CA $${course.price}</span>
                </div>
                <button class="edit-course">Edit</button>
            `;
            courseList.appendChild(courseItem);
        });
    
        renderPagination();
    }
    
    // Function to render pagination
    function renderPagination() {
        pagination.innerHTML = "";
        let pageCount = Math.ceil(courses.length / itemsPerPage);
        
        for (let i = 1; i <= pageCount; i++) {
            let pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.classList.add("page-btn");
            if (i === currentPage) pageButton.classList.add("active");
            
            pageButton.addEventListener("click", () => {
                currentPage = i;
                renderCourses();
            });
    
            pagination.appendChild(pageButton);
        }
    }
    
    // Function to add a new course
    function addCourse(title, description, price, topic) {
        courses.push({ title, description, price, topic });
        renderCourses();
    }
    
    // Sample data
    addCourse("Course 1", "Description for course 1", "18.49", "Computer Science");
    addCourse("Course 2", "Description for course 2", "22.99", "Business");
    addCourse("Course 3", "Description for course 3", "15.00", "Computer Science"); 
    
    // Initial render
    renderCourses();
    
    document.getElementById("search").addEventListener("input", function() {
        let query = this.value.toLowerCase();
        let filteredCourses = courses.filter(course => 
            course.title.toLowerCase().includes(query) || 
            course.description.toLowerCase().includes(query)
        );
        
        currentPage = 1; // Reset to first page when searching
        renderFilteredCourses(filteredCourses);
    });
    
    function renderFilteredCourses(filteredCourses) {
        courseList.innerHTML = "";
        let start = (currentPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedCourses = filteredCourses.slice(start, end);
    
        paginatedCourses.forEach(course => {
            const courseItem = document.createElement("div");
            courseItem.classList.add("course-item");
            courseItem.innerHTML = `
                <div class="course-cover"></div>
                <div class="course-details">
                    <h3 class="course-title">${course.title}</h3>
                    <p>${course.description}</p>
                    <span class="course-price">CA $${course.price}</span>
                </div>
                <button class="edit-course">Edit</button>
            `;
            courseList.appendChild(courseItem);
        });
    
        renderPagination(filteredCourses);
    }
    
    function renderPagination(filteredCourses = courses) {
        pagination.innerHTML = "";
        let pageCount = Math.ceil(filteredCourses.length / itemsPerPage);
        
        for (let i = 1; i <= pageCount; i++) {
            let pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.classList.add("page-btn");
            if (i === currentPage) pageButton.classList.add("active");
            
            pageButton.addEventListener("click", () => {
                currentPage = i;
                renderFilteredCourses(filteredCourses);
            });
    
            pagination.appendChild(pageButton);
        }
    }
    document.getElementById("applyFilter").addEventListener("click", applyFilters);
    
    function applyFilters() {
        const selectedTopic = document.querySelector('input[name="topic"]:checked')?.value || "";
        const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
        const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
    
        const filteredCourses = courses.filter(course => {
            const matchesTopic = selectedTopic ? course.topic === selectedTopic : true;
            const price = parseFloat(course.price);
            const matchesPrice = price >= minPrice && price <= maxPrice;
            
            return matchesTopic && matchesPrice;
        });
    
        currentPage = 1; // Reset to the first page after filtering
        renderFilteredCourses(filteredCourses);
    }
    
    
    function renderFilteredCourses(filteredCourses) {
        courseList.innerHTML = "";
        let start = (currentPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedCourses = filteredCourses.slice(start, end);
    
        paginatedCourses.forEach(course => {
            const courseItem = document.createElement("div");
            courseItem.classList.add("course-item");
            courseItem.innerHTML = `
                <div class="course-cover"></div>
                <div class="course-details">
                    <h3 class="course-title">${course.title}</h3>
                    <p>${course.description}</p>
                    <span class="course-price">CA $${course.price}</span>
                </div>
                <button class="edit-course">Edit</button>
            `;
            courseList.appendChild(courseItem);
        });
    
        renderPagination(filteredCourses);
    }
    
    
        const popup = document.createElement("div");
        popup.id = "editPopup";
        popup.innerHTML = `
            <div id="popupContent">
                <h3>Edit Course</h3>
                <label>Title: <input type="text" id="editTitle"></label>
                <label>Description: <textarea id="editDescription"></textarea></label>
                <label>Price: <input type="number" id="editPrice" min="0"></label>
                <button id="saveEdit">Save</button>
                <button id="closePopup">Cancel</button>
            </div>
        `;
        document.body.appendChild(popup);
        popup.style.display = "none";
    
        let currentCourseIndex = null;
    
        // Show the popup when edit is clicked
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("edit-course")) {
                const courseItem = event.target.closest(".course-item");
                const index = Array.from(courseList.children).indexOf(courseItem);
                currentCourseIndex = index + (currentPage - 1) * itemsPerPage;
    
                const course = courses[currentCourseIndex];
    
                document.getElementById("editTitle").value = course.title;
                document.getElementById("editDescription").value = course.description;
                document.getElementById("editPrice").value = course.price;
    
                popup.style.display = "block";
            }
        });
    
        // Save the edited values
        document.getElementById("saveEdit").addEventListener("click", () => {
            if (currentCourseIndex !== null) {
                courses[currentCourseIndex].title = document.getElementById("editTitle").value;
                courses[currentCourseIndex].description = document.getElementById("editDescription").value;
                courses[currentCourseIndex].price = document.getElementById("editPrice").value;
    
                popup.style.display = "none";
                renderCourses(); // Re-render courses to reflect changes
            }
        });
    
        // Close the popup
        document.getElementById("closePopup").addEventListener("click", () => {
            popup.style.display = "none";
        });
    });
    
    