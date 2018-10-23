// localStorage.setItem('userToDoItems', JSON.stringify(userItems))
// const ddd = JSON.parse(localStorage.getItem('userToDoItems'))
// ddd => array of objects

const todoList = document.getElementById("todo-list");
let listChildNodes = todoList.childNodes;
const LOCAL_STORAGE_NAME = 'userToDoItems';
let userItems = [];
if (localStorage.getItem(LOCAL_STORAGE_NAME)) {
  userItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
};
const editForm = document.getElementById("edit-form");
const editedTitle = document.getElementById("edited-title");
const editedDescription = document.getElementById("edited-description");

// create list item
function createListItem(title, description) {

  const item = document.createElement("li");

  const itemTitle = document.createElement("h4");
  itemTitle.textContent = title;
  item.appendChild(itemTitle);

  if (description) {
    const itemDescription = document.createElement("p");
    itemDescription.textContent = description;
    item.appendChild(itemDescription);
  }

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.textContent = "Edit Item";
  editButton.onclick = editItem;
  item.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete Item";
  deleteButton.onclick = removeItem;
  item.appendChild(deleteButton);

  todoList.appendChild(item);
}

// ad new item from the form
function addNewItem(e) {
  e.preventDefault();
  const { target: { elements: { title, description } } } = e;
  if (title.value && description.value) {
    createListItem(title.value, description.value);
    userItems.push({
      'title': title.value,
      'description': description.value
    });
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(userItems));
    title.value = "";
    description.value = "";
  } else {
    alert("Please fill the fields");
  }
}

// remove the item from the list
function removeItem(event) {
  const array = Array.prototype.slice.call(listChildNodes);
  const desiredItem = array.indexOf(event.target.parentNode);
  todoList.children[desiredItem].remove();
  userItems.splice(desiredItem, 1);
}

// edit item in the list
function editItem(event) {
  const parent = event.target.parentNode;
  const array = Array.prototype.slice.call(listChildNodes);
  const desiredItem = array.indexOf(parent);
  editedTitle.value = userItems[desiredItem].title;
  editedDescription.value = userItems[desiredItem].description;
  editForm.classList.add('toggled');
}

function saveEditedItem(e) {
  const newTitle = editedTitle.value;
  const newDescription = editedDescription.value;
  if (editedTitle.value && editedDescription.value) {
    editedTitle.value = '';
    editedDescription.value = '';
    editForm.classList.remove('toggled');
  } else {
    alert("Please fill the fields");
  }
}

for (let i = 0; i < userItems.length; i++) {
  createListItem(userItems[i].title, userItems[i].description);
}
