const API_URL = "https://jsonplaceholder.typicode.com/users";

const loadBtn = document.getElementById("loadBtn");
const userListEl = document.getElementById("userList");
const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const statusMsg = document.getElementById("statusMessage");
const submitBtn = document.getElementById("submitBtn");

loadBtn.addEventListener("click", async () => {
  try {
    loadBtn.textContent = "Đang tải...";
    loadBtn.disabled = true;

    const response = await fetch(API_URL);
    const users = await response.json();

    renderUserList(users);
  } catch (error) {
    console.error("Lỗi tải danh sách:", error);
    alert("Không thể tải danh sách user!");
  } finally {
    loadBtn.textContent = "Tải danh sách";
    loadBtn.disabled = false;
  }
});

function renderUserList(users) {
  userListEl.innerHTML = "";

  users.forEach((user) => {
    const li = document.createElement("li");
    li.className = "user-item";
    li.innerHTML = `
            <h4>${user.name}</h4>
            <p>📧 ${user.email}</p>
        `;
    userListEl.appendChild(li);
  });
}

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    showMessage("Vui lòng điền đầy đủ thông tin!", "error");
    return;
  }

  const newUser = {
    name: name,
    email: email,
  };

  try {
    submitBtn.textContent = "Đang xử lý...";
    submitBtn.disabled = true;

    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (response.ok) {
      const dataResponse = await response.json();

      showMessage("✅ Tạo user thành công!", "success");
      addNewUserToUI(dataResponse);

      nameInput.value = "";
      emailInput.value = "";
    } else {
      throw new Error("Server trả về lỗi");
    }
  } catch (error) {
    console.error(error);
    showMessage("❌ Có lỗi xảy ra, vui lòng thử lại.", "error");
  } finally {
    submitBtn.textContent = "Tạo User";
    submitBtn.disabled = false;
  }
});

function showMessage(msg, type) {
  statusMsg.textContent = msg;
  statusMsg.className = type;
  setTimeout(() => {
    statusMsg.textContent = "";
    statusMsg.className = "";
  }, 3000);
}

function addNewUserToUI(user) {
  if (userListEl.querySelector(".empty-msg")) {
    userListEl.innerHTML = "";
  }

  const li = document.createElement("li");
  li.className = "user-item";
  li.style.backgroundColor = "#e8f5e9";
  li.innerHTML = `
        <h4>${user.name} <span style="font-size: 12px; color: green">(Mới)</span></h4>
        <p>📧 ${user.email}</p>
    `;

  userListEl.prepend(li);
}
