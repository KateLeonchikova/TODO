export function getTodoList(owner) {
  let localStorageData = localStorage.getItem(owner);
  if (localStorageData !== null && localStorageData !== '') {
    return JSON.parse(localStorageData);
  }
  return [];
}

export function createTodoItem({ owner, name }) {
  let todoList = getTodoList(owner);

  let newItem = {
    id: generateID(todoList),
    owner,
    name,
    done: false,
  };

  todoList.push(newItem);
  localStorage.setItem(owner, JSON.stringify(todoList));
  return newItem;
}

export function switchTodoItemDone({ todoItem }) {
  todoItem.done = !todoItem.done;
  const todoList = getTodoList(todoItem.owner);
  const index = todoList.findIndex(item => item.id === todoItem.id);
  if (index !== -1) {
    todoList[index] = todoItem;
  }
  localStorage.setItem(todoItem.owner, JSON.stringify(todoList));
}

export function deleteTodoItem({ element, todoItem }) {
  const todoList = getTodoList(todoItem.owner);
  if (confirm('Вы уверены?')) {
    element.remove();

    for (let i = 0; i < todoList.length; i++) {
      if (todoItem.id === todoList[i].id) {
        todoList.splice(i, 1);
      }
    }
    localStorage.setItem(todoItem.owner, JSON.stringify(todoList));
  }
}

function generateID(arr) {
  let maxID = 0;
  for (let item of arr) {
    if (item.id > maxID) {
      maxID = item.id;
    }
  }
  return maxID + 1;
};
