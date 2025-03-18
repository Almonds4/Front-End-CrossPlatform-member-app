const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  //Collecting all the relative elements
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  //Menu open and close functionality
  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");

    caret.classList.toggle("caret-rotate");

    menu.classList.toggle("menu-open");
  });

  //Select functionality
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
    });
  });
});

const posts = document.querySelectorAll(".post");

posts.forEach((post) => {
  const content = post.querySelector(".post-content");

  //Allows post to be expanded to see content
  post.addEventListener("click", function () {
    //If post clicked is already active -> closes post
    if (this.classList.contains("active-post")) {
      this.classList.remove("active-post", "post-open");
      content.style.height = "0";
      content.style.opacity = "0";
      return;
    }

    //Removes active setting from other post when opening new post
    posts.forEach((p) => {
      p.classList.remove("active-post", "post-open");
      p.querySelector(".post-content").style.height = "0";
      p.querySelector(".post-content").style.opacity = "0";
    });

    //Adds active
    this.classList.add("active-post", "post-open");
    content.style.height = content.scrollHeight + "px";
    content.style.opacity = "1";
  });
});
