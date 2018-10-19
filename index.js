let sampleItems = [
  {
    "id": 1,
    "title": "first one",
    "description": "first description"
  },
  {
    "id": 2,
    "title": "second one",
    "description": "second description"
  },
  {
    "id": 3,
    "title": "third one",
    "description": "third description"
  }
]

const todoList = document.getElementById('todo-list');
let userItems = [];

const createListItem = (title, description) => {
  const userItemsCount = userItems.length;

  const item = document.createElement('li');
  item.classList.add('todo-item');
  item.dataset.itemId = userItemsCount;

  const itemTitle = document.createElement('h4');
  itemTitle.classList.add('todo-item__title');
  itemTitle.textContent = title;
  item.appendChild(itemTitle);

  const itemDescription = document.createElement('p');
  itemDescription.classList.add('todo-item__description');
  itemDescription.textContent = description;
  item.appendChild(itemDescription);

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.textContent = 'Delete Item';
  deleteButton.dataset.deleteId = userItemsCount;
  deleteButton.onclick = removeItem;
  item.appendChild(deleteButton);

  todoList.appendChild(item);

  const currentItem = userItems[userItemsCount] = {};
  currentItem.id = userItemsCount;
  currentItem.title = title;
  currentItem.description = description;
}

for (let i = 0; i < sampleItems.length; i++) {
  createListItem(sampleItems[i].title, sampleItems[i].description);
}

function addNewItem () {
  const newTitle = document.getElementById('new-item__title');
  const newDescription = document.getElementById('new-item__description');
  createListItem(newTitle.value, newDescription.value);
  newTitle.value = '';
  newDescription.value = '';
}

function removeItem(event) {
  const idNumber = event.target.dataset.deleteId;
  userItems.splice(idNumber, 1);
  // todoList.childNodes.
}
