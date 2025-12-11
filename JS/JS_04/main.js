let todos = [
  { id: 1, title: "Học HTML/CSS", completed: true },
  { id: 2, title: "Học JavaScript cơ bản", completed: false },
  { id: 3, title: "Làm bài tập To-do List", completed: false },
];

function addTodo(title) {
  if (title.trim() === "") {
    alert("Vui lòng nhập tên công việc!");
    return;
  }
  const newTodo = {
    id: Date.now(),
    title: title,
    completed: false,
  };
  todos.push(newTodo);
}

function deleteTodo(id) {
  todos = todos.filter((item) => item.id !== id);
}

function toggleTodo(id) {
  let todo = todos.find((item) => item.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
}

function getCompletedTodos() {
  return todos.filter((item) => item.completed === true);
}

function getPendingTodos() {
  return todos.filter((item) => item.completed === false);
}

function render(listToRender = todos) {
  const ul = document.getElementById("todoList");
  ul.innerHTML = "";
  listToRender.forEach((item) => {
    let li = document.createElement("li");
    if (item.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
            <span onclick="handleToggle(${item.id})">${item.title}</span>
            <button class="btn-delete" onclick="handleDelete(${item.id})">Xóa</button>
        `;

    ul.appendChild(li);
  });
}

function handleAdd() {
  let input = document.getElementById("taskInput");
  addTodo(input.value);
  input.value = "";
  render();
}

function handleDelete(id) {
  if (confirm("Bạn có chắc muốn xóa không?")) {
    deleteTodo(id);
    render();
  }
}

function handleToggle(id) {
  toggleTodo(id);
  render();
}

function filterTasks(type) {
  let list;
  if (type === "completed") {
    list = getCompletedTodos();
  } else if (type === "pending") {
    list = getPendingTodos();
  } else {
    list = todos;
  }
  render(list);
}

render();
