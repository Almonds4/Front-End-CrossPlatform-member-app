const modules = document.querySelectorAll(".module");
const modulesContent = document.querySelectorAll(".module-content");

modules.forEach((module) => {
  module.addEventListener("click", function () {
    const assignedContent = document.getElementById(`${module.id}-content`);

    if (!assignedContent) return;

    if (module.classList.contains("active-module")) {
      module.classList.remove("active-module");
      assignedContent.classList.remove("selected-module");
      return;
    }

    modulesContent.forEach((content) =>
      content.classList.remove("selected-module")
    );
    modules.forEach((m) => m.classList.remove("active-module"));

    module.classList.add("active-module");
    assignedContent.classList.add("selected-module");
  });
});
