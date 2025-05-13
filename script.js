const submitButton = document.querySelector("button[type='submit']");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const task = document.querySelector("form input");
  const inputValue = task.value;
  if (!inputValue) {
    alert("Please enter a valid task");
    console.error("Invalid input");
    return;
  }
  task.value = ""; //to clear the input field after adding todo
  addTodo(inputValue);
});

function addTodo(inputValue, isCompleted = false) {
  const todoList = document.querySelector(".todo-list");
  const todo = document.createElement("div");
  todo.className = "todo";

  // Generate a unique ID for the to-do
  const uniqueId = Date.now();
  todo.id = uniqueId;

  todo.innerHTML = `
    <div class="todo-left">
      <button class="radio" id="radio-${uniqueId}"></button>
      <span>${inputValue}</span>
    </div>
    <button id="delete-${uniqueId}"><img src="./images/icon-cross.svg"></button>
  `;
  todoList.append(todo);

  // Attach event listener to the newly created radio button
  const radioBtn = todo.querySelector(".radio");
  const todoText = radioBtn.nextElementSibling;

  // Set the initial state based on isCompleted
  if (isCompleted) {
    const check = document.createElement("img");
    check.src = "./images/icon-check.svg";
    radioBtn.appendChild(check);
    todoText.style.textDecoration = "line-through";
    todoText.style.color = "hsl(235, 19%, 35%)";
    radioBtn.classList.add("fill");
  }

  radioBtn.addEventListener("click", () => {
    const check = document.createElement("img");

    if (!radioBtn.hasChildNodes()) {
      check.src = "./images/icon-check.svg";
      radioBtn.appendChild(check);
      todoText.style.textDecoration = "line-through";
      todoText.style.color = "hsl(235, 19%, 35%)";
    } else {
      todoText.style.textDecoration = "none";
      radioBtn.removeChild(radioBtn.firstElementChild);
      todoText.style.color = "inherit";
    }
    radioBtn.classList.toggle("fill");
    saveTasksToLocalStorage();
  });

  const todoCount = document.querySelector("footer > p");
  // Attach event listener to the newly created delete button
  const deleteBtn = todo.querySelector(`#delete-${uniqueId}`);
  deleteBtn.addEventListener("click", () => {
    todoList.removeChild(deleteBtn.parentElement);
    todoCount.innerText = `${todoList.childElementCount} items left`;
    saveTasksToLocalStorage();
  });

  todoCount.innerText = `${todoList.childElementCount} items left`;
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  const todos = [];
  document.querySelectorAll(".todo").forEach((todo) => {
    const todoText = todo.querySelector(".todo-left > span").textContent;
    const isCompleted = todo
      .querySelector(".todo-left > .radio")
      .classList.contains("fill");
    todos.push({ text: todoText, completed: isCompleted });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach((todo) => addTodo(todo.text, todo.completed));
//   setTheme("dark");
});

document
  .querySelector("footer > button")
  .addEventListener("click", () => {
    let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (savedTodos.length === 0) {
      alert("nothing to clear");
      return;
    }
    const uncompletedTodos = savedTodos.filter((todo) => {
      if (!todo.completed) {
        return todo;
      }
    });
    localStorage.setItem("todos", JSON.stringify(uncompletedTodos));
    savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    document.querySelector(".todo-list").innerHTML = "";
    savedTodos.forEach((todo) => addTodo(todo.text, todo.completed));
    const todoCount = document.querySelector("footer > p");
    todoCount.innerText = `${savedTodos.length} items left`;
  });

//   function setActiveView(view) {
//     const allTodos = document.querySelectorAll(".todo");
//     const viewBtns = document.querySelectorAll(".filter");

//     viewBtns.forEach((btn)=>{
//         if (btn.dataset.view === view) {
//             btn.classList.add("active");
//         }
//         else btn.classList.remove("active");
//     });


//   }

//   document.querySelectorAll(".filter")
//   .forEach((btn)=>{
//     btn.addEventListener('click',()=>{
//         const view = btn.dataset.view;
//         setActiveView(view);
//     });
//   });


const toggleThemeBtn = document.querySelector(".toggle-theme-btn");
toggleThemeBtn.addEventListener('click',()=>{
    const img = toggleThemeBtn.querySelector("img");
    
    document.body.classList.toggle('light-body');
    document.querySelector(".hero-background").classList.toggle('background-img-toggle');
    if (window.innerWidth >= 425) {
        document.querySelector(".hero-background").classList.toggle('background-img-toggle-large');
    }
    document.querySelector("form").classList.toggle("main-light");
    document.querySelector("form > button").classList.toggle("light-btn");
    document.querySelector(".todo-list-container").classList.toggle("main-light");
    document.querySelector("footer").classList.toggle("main-light");
    if (document.body.classList.contains('light-body')) {
        img.src = "./images/icon-moon.svg";
    }
    else {
        img.src = "./images/icon-sun.svg";
    }
    
    
});

function setTheme(mode) {
    if (mode == "dark") {
        
    }
}