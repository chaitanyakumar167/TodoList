const todoName = document.getElementById("name");
const description = document.getElementById("description");
const submit = document.getElementById("submit");
const pending = document.getElementById("pending");
const completed = document.getElementById("completed");
const url =
  "https://crudcrud.com/api/c5b4c865ad5148798b74d1b4197eff5c/todoList";

submit.addEventListener("click", showPost);
async function showPost(e) {
  e.preventDefault();
  let obj = {
    todoName: todoName.value,
    description: description.value,
  };

  let res = await axios.post(url, obj).catch((err) => console.log(err));
  if (res) {
    obj._id = res.data._id;
  }
  showTodo(obj);
}

function showTodo(obj) {
  let li = document.createElement("li");
  li.className = "list-group-item";
  let del = document.createElement("button");
  let done = document.createElement("button");
  done.className = "btn btn-warning float-right btn-sm";
  del.className = "btn btn-danger btn-sm float-right";
  done.textContent = "✔";
  del.textContent = "X";

  del.onclick = async function () {
    let id = obj._id;
    await axios.delete(`${url}/${id}`).catch((err) => console.log(err));
    pending.removeChild(li);
  };

  done.onclick = async function () {
    let completedLi = li;
    let id = obj._id;
    delete obj._id;
    await axios.delete(`${url}/${id}`).catch((err) => console.log(err));
    await axios
      .post(
        "https://crudcrud.com/api/c5b4c865ad5148798b74d1b4197eff5c/completed",
        obj
      )
      .catch((err) => console.log(err));

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
async function showAllTodos() {
  pending.innerHTML = "";
  let res = await axios.get(url).catch((err) => console.log(err));
  if (res) {
    const data = res.data;
    for (let i = 0; i < data.length; i++) {
      showTodo(data[i]);
    }
  }
}

window.addEventListener("DOMContentLoaded", showAllTodos);
window.addEventListener("DOMContentLoaded", showAllCompletedTodos);
function showCompletedTodo(obj) {
  let li = document.createElement("li");
  li.className = "list-group-item";

  li.textContent = obj.todoName + " " + " :- " + obj.description;

  completed.appendChild(li);
}

async function showAllCompletedTodos() {
  pending.innerHTML = "";
  let res = await axios
    .get("https://crudcrud.com/api/c5b4c865ad5148798b74d1b4197eff5c/completed")
    .catch((err) => console.log(err));
  if (res) {
    const data = res.data;
    for (let i = 0; i < data.length; i++) {
      showCompletedTodo(data[i]);
    }
  }
}
