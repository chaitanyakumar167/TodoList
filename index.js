const todoName = document.getElementById("name");
const description = document.getElementById("description");
const submit = document.getElementById("submit");
const pending = document.getElementById("pending");
const completed = document.getElementById("completed");
const url =
  "https://crudcrud.com/api/c73f27a5569b426194a6606f36c68962/todoList";

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let obj = {
    todoName: todoName.value,
    description: description.value,
  };
  axios
    .post(url, obj)
    .then((res) => (obj._id = res.data._id))
    .catch((err) => console.log(err));
  showTodo(obj);
});

function showTodo(obj) {
  let li = document.createElement("li");
  li.className = "list-group-item";
  let del = document.createElement("button");
  let done = document.createElement("button");
  done.className = "btn btn-warning float-right btn-sm";
  del.className = "btn btn-danger btn-sm float-right";
  done.textContent = "✔";
  del.textContent = "X";

  del.onclick = () => {
    let id = obj._id;
    axios
      .delete(`${url}/${id}`)
      .then((res) => {})
      .catch((err) => console.log(err));
    pending.removeChild(li);
  };

  done.onclick = () => {
    let completedLi = li;
    pending.removeChild(li);
    completedLi.removeChild(done);
    completedLi.removeChild(del);

    completed.appendChild(completedLi);
  };
  li.textContent = obj.todoName + " " + " :- " + obj.description;
  li.appendChild(done);
  li.appendChild(del);

  pending.appendChild(li);
}
function showAllTodos() {
  pending.innerHTML = "";
  axios
    .get(url)
    .then((res) => {
      const data = res.data;
      for (let i = 0; i < data.length; i++) {
        showTodo(data[i]);
      }
    })
    .catch((err) => console.log(err));
}

window.addEventListener("DOMContentLoaded", showAllTodos);
