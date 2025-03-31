document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown");
  const searchInput = document.querySelector(".search");
  const courseList = document.querySelector(".course-list");
  const statusRadios = document.querySelectorAll('input[name="status"]');

  dropdowns.forEach((dropdown) => {
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");

    // Open/Close dropdown menu
    select.addEventListener("click", () => {
      select.classList.toggle("select-clicked");
      caret.classList.toggle("caret-rotate");
      menu.classList.toggle("menu-open");
    });

    // Handle selecting an option
    options.forEach((option) => {
      option.addEventListener("click", () => {
        selected.innerText = option.innerText;
        select.classList.remove("select-clicked");
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open");

        options.forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");

        const activeFilter = option.innerText.toLowerCase();
        filterCourses(activeFilter, searchInput.value.toLowerCase());
      });
    });
  });

  searchInput.addEventListener("input", () => {
    const activeFilter = document.querySelector(".selected").innerText.toLowerCase();
    filterCourses(activeFilter, searchInput.value.toLowerCase());
  });

  function filterCourses(activeFilter, searchTerm) {
    const courses = document.querySelectorAll(".course");

    courses.forEach((course) => {
      const title = course.querySelector(".course-title").innerText.toLowerCase();
      const tags = course.dataset.tags.toLowerCase();

      const matchesSearch = title.includes(searchTerm);
      const matchesFilter = activeFilter === "none" || activeFilter === "all" || activeFilter === "" || tags.includes(activeFilter);

      // Show only if both search and filter match
      course.style.display = matchesSearch && matchesFilter ? "flex" : "none";
    });
  }

  // Sample course data
  const courses = [
    {
      title: "Medical Fundamentals",
      instructor: "Dr. Smith",
      description: "An introduction to medical sciences and patient care.",
      status: "complete",
      grade: 85,
      tags: ["Medical", "Health"],
      img: "member_portal_images/volunteer_icon.png"
    },
    {
      title: "Software Engineering",
      instructor: "Jane Doe",
      description: "Learn coding best practices and software design patterns.",
      status: "incomplete",
      grade: 72,
      tags: ["Technology", "Engineering"],
      img: "member_portal_images/volunteer_icon.png"
    },
    {
      title: "Modern Art History",
      instructor: "Emily Clark",
      description: "A study of art movements from the 19th century to today.",
      status: "complete",
      grade: 90,
      tags: ["History", "Arts"],
      img: "member_portal_images/volunteer_icon.png"
    },
    {
      title: "Introduction to Architecture",
      instructor: "John Architects",
      description: "Fundamentals of architectural design and structure.",
      status: "incomplete",
      grade: 80,
      tags: ["Architecture", "Design"],
      img: "member_portal_images/volunteer_icon.png"
    }
  ];

  function renderCourses() {
    courseList.innerHTML = "";
  
    const selectedStatus = document.querySelector('input[name="status"]:checked')?.value || "all";
  
    courses.forEach(course => {
      if (selectedStatus === "all" || course.status === selectedStatus) {
        const courseElement = document.createElement("div");
        courseElement.classList.add("course");
  
        // Set data-tags attribute
        courseElement.setAttribute("data-tags", course.tags.join(", "));
  
        // Determine background colors for status and grade
        const statusColor = course.status === "complete" ? "rgba(0, 128, 0, 0.5)" : "rgba(255, 0, 0, 0.5)";
        let gradeColor = "rgba(255, 0, 0, 0.7)"; 
  
        if (course.grade > 80) {
          gradeColor = "rgba(0, 128, 0, 0.5)"; 
        } else if (course.grade >= 65) {
          gradeColor = "rgba(255, 255, 0, 0.5)"; 
        } else if (course.grade >= 51) {
          gradeColor = "rgba(212, 160, 23, 0.5)"; 
        }
  
        courseElement.innerHTML = `
          <div class="course-img">
            <img alt="Course Cover Image" src="${course.img}">
          </div>
          <div class="course-content">
            <h4 class="course-title">${course.title}</h4>
            <p class="instructor-name">${course.instructor}</p>
            <p class="course-description">${course.description}</p>
            <p class="module-tracker">0/n Hours Logged 0/n Modules Completed</p>
          </div>
          <div class="course-attributes">
            <div class="completion" style="background-color: ${statusColor};" data-status="${course.status}">
              ${course.status === "complete" ? "Complete" : "Incomplete"}
            </div>
            <div class="grade" style="background-color: ${gradeColor};">
              Grade: ${course.grade}%
            </div>
          </div>
          <div class="course-tags">
            ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join(" ")}
          </div>
        `;
  
        courseList.appendChild(courseElement);
      }
    });
  }
  

  // Event listener for status filter
  statusRadios.forEach(radio => {
    radio.addEventListener("change", renderCourses);
  });

  renderCourses();
});
