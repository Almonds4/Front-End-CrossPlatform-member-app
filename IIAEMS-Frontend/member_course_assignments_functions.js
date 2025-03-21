const courses = document.querySelectorAll(".course");
const coursesContent = document.querySelectorAll(".course-content");

courses.forEach((course) => {
  course.addEventListener("click", function () {
    const assignedContent = document.getElementById(`${course.id}-content`);

    if (!assignedContent) return;

    if (course.classList.contains("active-course")) {
      course.classList.remove("active-course");
      assignedContent.classList.remove("selected-course");
      return;
    }

    coursesContent.forEach((content) =>
      content.classList.remove("selected-course")
    );
    courses.forEach((c) => c.classList.remove("active-course"));

    course.classList.add("active-course");
    assignedContent.classList.add("selected-course");
  });
});
