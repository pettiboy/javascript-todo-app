const list = document.getElementById("todo-list");
const form = document.getElementById("todo-form");
const todoText = document.getElementById("todo-text");

let todos = [];

function saveTodosInMemory() {
  console.log("saving in memory");
  localStorage.setItem("todosInMemory", JSON.stringify(todos));
}

function renderTodos() {
  // empty HTML inside the list
  list.innerHTML = "";

  // loop over all todos
  todos.forEach((todo) => {
    if (todo.complete === false) {
      renderTodo(todo);
    }
  });
}

function renderTodo(todo) {
  list.innerHTML += `
        <li>
          <div class="form-check">
            <input onclick="completeTodo(${todo.id});" class="form-check-input" type="checkbox" />
            <label class="form-check-label" for="flexCheckDefault">
              ${todo.text}
            </label>
          </div>
        </li>
      `;
}

function addTodo(todo) {
  todos.push({
    id: todo.id,
    text: todo.text,
    complete: todo.complete,
  });
  renderTodo(todo);
  saveTodosInMemory();
}

function completeTodo(removeId) {
  //Find index of specific object using findIndex method.
  todoIndex = todos.findIndex((todo) => todo.id == removeId);

  //Update object's name property.
  todos[todoIndex].complete = true;

  // Just to wait for a sec before re rendering
  setTimeout(function () {
    saveTodosInMemory();
    renderTodos();
  }, 1000);
}

// listen for form to be submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo({
    id: todos.length + 1,
    text: todoText.value,
    complete: false,
  });

  // reset value of input field
  todoText.value = "";
});

// on page load - the following functions will run
todos = JSON.parse(localStorage.getItem("todosInMemory")) || [];
renderTodos();
