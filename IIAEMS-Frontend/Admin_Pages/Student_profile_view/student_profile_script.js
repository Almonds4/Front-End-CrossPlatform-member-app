document.addEventListener("DOMContentLoaded", () => {
    const viewCoursesBtn = document.getElementById("view-courses");
    const viewPurchasesBtn = document.getElementById("view-purchases");
    const sidebarContent = document.getElementById("sidebar-content");
    const mainContent = document.getElementById("main-content");

   
    //Fetch student name
    const studentName = localStorage.getItem("studentName") || "John Doe"; 
    document.getElementById("student-name").textContent = `${studentName}'s Profile`;
 
 
    // Sample data for courses and purchase history
    const courses = [
        { name: "AI & Its Applications ANP 365", modules: [{ name: "Module 1", assignment: "No Assignment", grade: "-" }, { name: "Module 2", assignment: "Written Submission", grade: "75%" }] },
        { name: "UI/UX Design", modules: [{ name: "Module 1", assignment: "Completed", grade: "85%" }] },
        { name: "Sample Course", modules: [{ name: "Module 1", assignment: "No Assignment", grade: "-" }] }
    ];

    const purchases = [
        { item: "ANP Textbook", id: "1033-1", date: "March 8, 2025", cost: "100.00" },
        { item: "Marketing Publication", id: "1034-1", date: "March 8, 2025", cost: "183.39" }
    ];

    // Function to display courses in sidebar
    function showCourses() {
        sidebarContent.innerHTML = "<h3>Courses</h3>";
        courses.forEach((course, index) => {
            const courseElement = document.createElement("div");
            courseElement.classList.add("course-item");
            courseElement.textContent = course.name;
            courseElement.addEventListener("click", () => showModules(course));
            sidebarContent.appendChild(courseElement);
        });
        mainContent.innerHTML = "<p>Select a course to view its modules.</p>";
    }

    // Function to display modules for a selected course
    function showModules(course) {
        mainContent.innerHTML = `
            <h2>${course.name}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Module Name</th>
                        <th>Assignment</th>
                        <th>Grade</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${course.modules.map(module => `
                        <tr>
                            <td>${module.name}</td>
                            <td>${module.assignment}</td>
                            <td>${module.grade}</td>
                            <td>
                                <button class="edit-grade">✏️</button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;

        document.querySelectorAll(".edit-grade").forEach((btn, index) => {
            btn.addEventListener("click", () => editGrade(course.modules[index]));
        });
    }

    // Function to edit a grade
    function editGrade(module) {
        const newGrade = prompt(`Enter new grade for ${module.name}:`, module.grade);
        if (newGrade !== null) {
            module.grade = newGrade + "%";
            showModules(courses.find(c => c.modules.includes(module))); // Refresh the table
        }
    }

    // Function to display purchase history
    function showPurchases() {
        sidebarContent.innerHTML = "<h3>Purchase History</h3>";
        mainContent.innerHTML = `
            <h2>Purchase History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Purchase Item</th>
                        <th>Purchase ID</th>
                        <th>Date</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    ${purchases.map(purchase => `
                        <tr>
                            <td>${purchase.item}</td>
                            <td>${purchase.id}</td>
                            <td>${purchase.date}</td>
                            <td>${purchase.cost}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    }

    
    viewCoursesBtn.addEventListener("click", showCourses);
    viewPurchasesBtn.addEventListener("click", showPurchases);

    // Load courses by default
    showCourses();
});
