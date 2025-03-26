document.addEventListener("DOMContentLoaded", function () {
    const addModuleButton = document.getElementById("add-module");
    const modulesContainer = document.getElementById("modules-container");
    const createCourseButton = document.getElementById("create-course");


    //Allows addition of modules
    addModuleButton.addEventListener("click", function () {
        const moduleDiv = document.createElement("div");
        moduleDiv.classList.add("module");

        moduleDiv.innerHTML = `
            <button type="button" class="remove-module">Remove</button>
            <label>Module Title</label>
            <input type="text" name="module-title" placeholder="Enter module title">

            <label>Module Description</label>
            <textarea name="module-description" placeholder="Enter module description"></textarea>

            <label>Module Worksheet</label>
            <input type="file" name="module-worksheet">

            <label>Lesson Video</label>
            <input type="file" name="lesson-video">
        `;

        modulesContainer.appendChild(moduleDiv);

        // Add event listener for remove button
        moduleDiv.querySelector(".remove-module").addEventListener("click", function () {
            moduleDiv.remove();
        });
    });

    document.querySelector(".container").addEventListener("submit", function (event) {
        event.preventDefault();

        // Collect course details
        const courseData = {
            title: document.getElementById("course-title").value,
            description: document.getElementById("course-description").value,
            id: document.getElementById("course-id").value,
            price: document.getElementById("course-price").value,
            modules: []
        };

        // Collect module details
        document.querySelectorAll(".module").forEach(module => {
            const moduleData = {
                title: module.querySelector("[name='module-title']").value,
                description: module.querySelector("[name='module-description']").value,
                worksheet: module.querySelector("[name='module-worksheet']").files[0], 
                video: module.querySelector("[name='lesson-video']").files[0] 
            };
            courseData.modules.push(moduleData);
        });

     
    
        // TODO: Add back-end logic
    ;
    });
});
