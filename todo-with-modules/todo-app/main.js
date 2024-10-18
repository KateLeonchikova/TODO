import { createTodoApp } from './view.js';

const container = document.getElementById('todo-app');

export function runTodoApp(title, owner) {
  initializeStorage(title, owner, 'local')

  let changeStorageBtn = document.querySelector(".btn-change");

  changeStorageBtn.addEventListener('click', () => {
    container.innerHTML = '';
    if (changeStorageBtn.innerHTML === "Перейти на серверное хранилище") {
      changeStorageBtn.innerHTML = 'Перейти на локальное хранилище';
      initializeStorage(title, owner, 'api')
    } else {
      changeStorageBtn.textContent = 'Перейти на серверное хранилище';
      initializeStorage(title, owner, 'local')
    }
  });
}

async function initializeStorage(title, owner, storage) {
  try {
    const module = await import(`./${storage}.js`);
    const todoItemList = await module.getTodoList(owner);
    createTodoApp(container, {
      title,
      owner,
      todoItemList,
      onCreateFormSubmit: module.createTodoItem,
      onDoneClick: module.switchTodoItemDone,
      onDeleteClick: module.deleteTodoItem,
    });
  } catch (error) {
    console.error(`Error initializing ${storage} storage:`, error);
  }
}



