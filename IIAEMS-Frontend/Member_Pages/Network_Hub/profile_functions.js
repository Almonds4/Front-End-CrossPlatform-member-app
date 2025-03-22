//Purpose of JS is to make it so a normal view of the profile would show up as divs
//If the user is checking their own profile, the divs will turn into inputs, and the save changes button would appear

document.addEventListener("DOMContentLoaded", () => {
  //Placement of IF logic to check whether it is the users profile
  function convertDivsToInputs() {
    document.querySelectorAll(".profile-value").forEach((div) => {
      if (div.classList.contains("big-profile-value")) {
        const input = document.createElement("textarea");
        input.type = "text";
        input.value = div.innerHTML.trim();
        input.classList = div.classList;
        input.style.cssText = div.style.cssText;
        input.id = div.id;
        input.setAttribute("rows", "3");

        div.replaceWith(input);
      } else {
        const input = document.createElement("input");
        input.type = "text";
        input.value = div.innerHTML.trim();
        input.classList = div.classList;
        input.style.cssText = div.style.cssText;
        input.id = div.id;

        div.replaceWith(input);
      }
    });
  }
  convertDivsToInputs();

  const link_section = document.querySelector(".links");
  const link_input = document.createElement("input");
  link_section.appendChild(link_input);
  link_input.classList.toggle("profile-value");
  const current_link = document.querySelector(".clickable-value");
  link_input.value = current_link.getAttribute("href");

  const uploadPFP = document.getElementById("pfp-label");
  uploadPFP.style.display = "block";
});
