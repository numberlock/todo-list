"use strict";
import "./style.css";
import { projectController } from "./modules/project";
import { taskController } from "./modules/task";
import { createEditTaskOverlay } from "./modules/render";

const btnOpenProject = document.querySelector(".show-add-project");
const btnOpenTask = document.querySelector(".show-add-task");
const btnNewTask = document.querySelector(".btn-add-task");
const content = document.querySelector(".content ");
const taskOverlay = document.querySelector(".task-overlay");
const projectOverlay = document.querySelector(".project-overlay");

const inputTitle = document.querySelector("#input-task-title");
const inputDesc = document.querySelector("#input-task-desc");
const inputDate = document.querySelector("#input-task-date");
const inputPriority = document.querySelector("#input-task-priority");
const inputNotes = document.querySelector("#input-task-notes");

createEditTaskOverlay();

btnOpenTask.addEventListener("click", () => {
  if (document.querySelector(".active") === null) {
    alert("Select a project!");
  } else {
    taskOverlay.style.display = "block";
  }
});

btnNewTask.addEventListener("click", () => {
  taskController.createTask(
    inputTitle,
    inputDesc,
    inputDate,
    inputPriority,
    inputNotes
  );
  clearTaks();
  displayTasks();

  taskOverlay.style.display = "none";
});

function clearTaks() {
  let container = document.querySelector(".tasks");
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }
}

const displayTasks = function () {
  let localProject = taskController.getProject();
  let tasks = localProject.task;

  for (let i = 0; i < tasks.length; i++) {
    const name = tasks[i].taskTitle;
    const desc = tasks[i].description;
    const date = tasks[i].dueDate;
    const priority = tasks[i].priority;
    const notes = tasks[i].notes;

    generateTasks(name, desc, date, priority, notes, i);
  }

  function generateTasks(name, desc, date, priority, notes, index) {
    const tasksContainer = document.querySelector(".tasks");

    const removeFromLocalArray = function () {
      tasks.splice(Number(index), 1);
      taskController.toStorage(localProject.name, localProject);
      clearTaks();
      displayTasks();
    };

    const updateTasks = function (index) {
      const title = document.querySelector("#edit-task-title");
      const desc = document.querySelector("#edit-task-desc");
      const date = document.querySelector("#edit-task-date");
      const prio = document.querySelector("#edit-task-prio");
      const notes = document.querySelector("#edit-task-notes");

      tasks[index].taskTitle = title.value;
      tasks[index].description = desc.value;
      tasks[index].dueDate = date.value;
      tasks[index].priority = prio.value;
      tasks[index].notes = notes.value;

      taskController.toStorage(localProject.name, localProject);
      clearTaks();
      displayTasks();
    };

    const editTasks = function () {
      let openTaskOverlay = document.querySelector(".edit-task-overlay");
      const index = this.dataset.index;

      openTaskOverlay.style.display = "block";

      const button = document.querySelector(".editButtonSubmit");
      button.addEventListener("click", () => {
        openTaskOverlay.style.display = "none";
        updateTasks(index);
      });
    };

    const divContainer = document.createElement("div");
    divContainer.classList.add(`indi-task-container`);
    const divName = document.createElement("div");
    divName.textContent = `Task Title: ${name}`;
    const divDesc = document.createElement("div");
    divDesc.textContent = `Description: ${desc}`;
    const divDate = document.createElement("div");
    divDate.textContent = `Due Date: ${date}`;
    const divPriority = document.createElement("div");
    divPriority.textContent = `Priority: ${priority}`;
    const divNotes = document.createElement("div");
    divNotes.textContent = `Notes: ${notes}`;
    const divIcons = document.createElement("div");
    divIcons.classList.add("task-icons");
    const editTask = document.createElement("i");
    editTask.dataset.index = index;
    editTask.classList.add("glyphicon", "glyphicon-pencil", "editTaskButton");
    const removeTask = document.createElement("i");
    removeTask.classList.add("glyphicon", "glyphicon-remove");

    removeTask.addEventListener("click", removeFromLocalArray);
    editTask.addEventListener("click", editTasks);

    tasksContainer.appendChild(divContainer);
    divContainer.append(
      divName,
      divDesc,
      divDate,
      divPriority,
      divNotes,
      divIcons
    );
    divIcons.append(editTask, removeTask);
  }
};

(function submitNewProject() {
  btnOpenProject.addEventListener("click", () => {
    projectOverlay.style.display = "block";
  });

  document.querySelector(".btn-add-project").addEventListener("click", () => {
    let newProjectName = document.querySelector("#input-new-project").value;
    projectController.createProject(newProjectName);

    displayProject(newProjectName);
    activeProject();

    projectOverlay.style.display = "none";
  });
})();

function displayProject(name) {
  let projectContainer = document.createElement("div");
  projectContainer.classList.add("project");
  let projectName = document.createElement("div");
  projectName.classList.add("project-name");
  projectName.textContent = name;
  let projectRemove = document.createElement("i");
  projectRemove.classList.add(
    "project-remove",
    "glyphicon",
    "glyphicon-remove"
  );

  removeProject(projectRemove, projectContainer, name);
  projectContainer.append(projectName, projectRemove);
  content.appendChild(projectContainer);
}

function removeProject(projectRemove, projectContainer, name) {
  projectRemove.addEventListener("click", () => {
    window.localStorage.removeItem(`${name}`);
    content.removeChild(projectContainer);
  });
}

const activeProject = function () {
  let allProjects = document.querySelectorAll(".project");
  allProjects.forEach((project) => {
    project.addEventListener("click", () => {
      allProjects.forEach((element) => {
        element.classList.remove("active");
      });
      project.classList.add("active");
      clearTaks();
      displayTasks();
    });
  });
};

const defaultProject = (function () {
  if (localStorage.length === 0) projectController.createProject("Default");
})();

const loadProjects = (function () {
  const localProject = window.localStorage;
  for (let i = 0; i < localProject.length; i++) {
    displayProject(localProject.key(i));
  }
  activeProject();
})();
