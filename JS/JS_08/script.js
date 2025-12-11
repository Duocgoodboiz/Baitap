const API_URL = "https://jsonplaceholder.typicode.com/posts";
let allPosts = [];
let currentIndex = 0;
const ITEMS_PER_PAGE = 5;

const postListEl = document.getElementById("postList");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const errorMsgEl = document.getElementById("errorMessage");

async function fetchPosts() {
  try {
    loadMoreBtn.textContent = "Loading...";
    loadMoreBtn.disabled = true;

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Lỗi kết nối mạng");
    }

    allPosts = await response.json();

    loadMoreBtn.textContent = "Load more";
    loadMoreBtn.disabled = false;

    renderPosts();
  } catch (error) {
    console.error(error);
    errorMsgEl.innerText = "Không tải được dữ liệu, vui lòng thử lại sau.";
    loadMoreBtn.style.display = "none";
  }
}

function renderPosts() {
  const nextPosts = allPosts.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);

  nextPosts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post-item");

    let shortBody = post.body;
    if (shortBody.length > 100) {
      shortBody = shortBody.substring(0, 100) + "...";
    }

    postDiv.innerHTML = `
            <h3 class="post-title">${post.title}</h3>
            <p class="post-body">${shortBody}</p>
        `;

    postListEl.appendChild(postDiv);
  });

  currentIndex += ITEMS_PER_PAGE;

  if (currentIndex >= allPosts.length) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "Đã hiển thị toàn bộ bài viết";
    loadMoreBtn.style.backgroundColor = "#6c757d";
  }
}

loadMoreBtn.addEventListener("click", () => {
  renderPosts();
});

fetchPosts();
