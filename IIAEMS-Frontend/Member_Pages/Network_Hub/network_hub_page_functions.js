document.addEventListener("DOMContentLoaded", function () {
  const createPostBtn = document.querySelector(".btn-primary[href='#']");
  const postList = document.getElementById("post-list");
  const lightbox = document.getElementById("post-lightbox");
  const closeBtn = document.querySelector(".close-lightbox");
  const postForm = document.getElementById("post-form");

  // Open the lightbox when "Create a Post" is clicked
  createPostBtn.addEventListener("click", function (e) {
    e.preventDefault();
    lightbox.classList.add("show");
  });

  // Close the lightbox
  closeBtn.addEventListener("click", function () {
    lightbox.classList.remove("show");
  });

  // Handle form submission
  postForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const title = document.getElementById("post-title").value;
    const username = document.getElementById("post-username").value;
    const tags = document.getElementById("post-tags").value;
    const description = document.getElementById("post-description").value;
    const image = document.getElementById("post-image").files[0];

    // Generate a random post ID
    const postId = "post-" + Math.floor(Math.random() * 100000);

    // Create post element
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.setAttribute("data-post-id", postId);

    let imageHTML = "";
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      imageHTML = `<img src="${imageUrl}" alt="Post Image">`;
    }

    postElement.innerHTML = `
      <h3>${title}</h3>
      <p>Posted by: ${username}</p>
      <p>Tags: ${tags}</p>
      <div class="post-content">
        <p>${description}</p>
        ${imageHTML}
      </div>
      <div class="post-btns">
        <button><i class="fa-solid fa-envelope"></i></button>
        <button><i class="fa-solid fa-flag"></i></button>
      </div>
    `;



    // Append post to post list
    postList.appendChild(postElement);

    // Clear the form
    postForm.reset();

    // Close the lightbox
    lightbox.classList.remove("show");
  });


  postList.addEventListener("click", function (event) {
    const clickedPost = event.target.closest(".post"); // Find the closest post that was clicked
  
    if (!clickedPost) return; // If the click was outside a post, do nothing
  
    const content = clickedPost.querySelector(".post-content");
  
    // If the clicked post is already active -> close it
    if (clickedPost.classList.contains("active-post")) {
      clickedPost.classList.remove("active-post", "post-open");
      content.style.height = "0";
      content.style.opacity = "0";
      return;
    }
  
    // Remove 'active-post' from all other posts
    document.querySelectorAll(".post").forEach((p) => {
      if (p !== clickedPost) {
        p.classList.remove("active-post", "post-open");
        p.querySelector(".post-content").style.height = "0";
        p.querySelector(".post-content").style.opacity = "0";
      }
    });
  
    // Activate the clicked post
    clickedPost.classList.add("active-post", "post-open");
    content.style.height = content.scrollHeight + "px";
    content.style.opacity = "1";
  });
  

});



