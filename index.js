const todoList = document.getElementById("todo-list");
let listChildNodes = todoList.childNodes;
const LOCAL_STORAGE_NAME = "userToDoItems";
let userItems = [];
if (localStorage.getItem(LOCAL_STORAGE_NAME)) {
  userItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
};
const editForm = document.getElementById("edit-form");
const editedTitle = document.getElementById("editedTitle");
const editedDescription = document.getElementById("editedDescription");

// create list item
function createListItem(title, description) {
  const item = document.createElement("li");

  const itemTitle = document.createElement("h4");
  itemTitle.textContent = title;
  item.appendChild(itemTitle);

  const itemDescription = document.createElement("p");
  itemDescription.textContent = description;
  item.appendChild(itemDescription);

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

// add new item from the form
function addNewItem(e) {
  e.preventDefault();
  const { target: { elements: { newTitle, newDescription } } } = e;
  if (newTitle.value && newDescription.value) {
    createListItem(newTitle.value, newDescription.value);
    // update array
    userItems.push({
      "title": newTitle.value,
      "description": newDescription.value
    });
    // update localStorage
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(userItems));
    // reset inputs
    newTitle.value = "";
    newDescription.value = "";
  } else {
    alert("Please fill all the fields");
  }
}

// remove the item from the list
function removeItem(e) {
  // create array from html collection and get desired ID number
  const array = Array.prototype.slice.call(listChildNodes);
  const desiredItem = array.indexOf(e.target.parentNode);
  // remove from html list
  todoList.children[desiredItem].remove();
  // remove from array and update localStorage
  userItems.splice(desiredItem, 1);
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(userItems));
}

// edit item in the list
function editItem(e) {
  const parent = e.target.parentNode;
  // create array from html collection and get desired ID number
  const array = Array.prototype.slice.call(listChildNodes);
  const desiredItem = array.indexOf(parent);
  // get needed values from array and place them inside inputs
  editedTitle.value = userItems[desiredItem].title;
  editedDescription.value = userItems[desiredItem].description;
  // add ID to dataset for future needs
  editForm.dataset.itemId = desiredItem;
  // show form for editing
  editForm.classList.add("toggled");
}

function saveEditedItem(e) {
  e.preventDefault();
  const { target: { elements: { editedTitle, editedDescription } } } = e;
  if (editedTitle.value && editedDescription.value) {
    // get the ID from from dataset
    const idNumber = editForm.dataset.itemId;
    // update html list
    listChildNodes[idNumber].childNodes[0].textContent = editedTitle.value;
    listChildNodes[idNumber].childNodes[1].textContent = editedDescription.value;
    // update array
    userItems[idNumber].title = editedTitle.value;
    userItems[idNumber].description = editedDescription.value;
    // update localStorage
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(userItems));
    // reset inputs
    editedTitle.value = "";
    editedDescription.value = "";
    // hide form for editing
    editForm.classList.remove("toggled");
    // remove dataset from the form
    delete editForm.dataset.itemId;
  } else {
    alert("Please fill the fields");
  }
}

// generate html list from localStorage items
for (let i = 0; i < userItems.length; i++) {
  createListItem(userItems[i].title, userItems[i].description);
}
