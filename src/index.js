"use strict";
import "./style.css";

const btnOpenProject = document.querySelector(".show-add-project");
const btnOpenTask = document.querySelector(".show-add-task");
const btnNewTask = document.querySelector(".btn-add-task");
const inputNewProject = document.querySelector("#input-new-project");
const content = document.querySelector(".content ");
const taskOverlay = document.querySelector(".task-overlay");
const projectOverlay = document.querySelector(".project-overlay");

const inputTitle = document.querySelector("#input-task-title");
const inputDesc = document.querySelector("#input-task-desc");
const inputDate = document.querySelector("#input-task-date");
const inputPriority = document.querySelector("#input-task-priority");
const inputNotes = document.querySelector("#input-task-notes");

//project
const projectFactory = function (newName) {
  let name = newName;
  let task = [];

  return { name, task };
};

function projectController() {
  function createProject(projectName) {
    let project = projectFactory(projectName);
    toStorage(project.name, project.task);
  }

  function toStorage(projectName, obj) {
    window.localStorage.setItem(projectName, obj);
  }

  function removeProject(projectName) {
    window.localStorage.removeItem(projectName);
  }

  return { createProject, removeProject };
}

//task

const taskFactory = function (
  inputTitle,
  inputDesc,
  inputDate,
  inputPriority,
  inputNotes
) {
  let taskTitle = inputTitle;
  let description = inputDesc;
  let dueDate = inputDate;
  let property = inputPriority;
  let notes = inputNotes;

  return { taskTitle, description, dueDate, property, notes };
};

const taskController = function () {};

// submit project

function submitNewProject() {
  btnOpenProject.addEventListener("click", () => {
    projectOverlay.style.display = "block";
  });

  document.querySelector(".btn-add-project").addEventListener("click", () => {
    let newProjectName = document.querySelector("#input-new-project").value;
    projectController().createProject(newProjectName);

    displayProject(newProjectName);
    activeProject();

    projectOverlay.style.display = "none";
  });
}
submitNewProject(); //activation

function displayProject(name) {
  let projectContainer = document.createElement("div");
  projectContainer.classList.add("project");
  let projectName = document.createElement("div");
  projectName.classList.add("project-name");
  projectName.textContent = name;
  let projectRemove = document.createElement("div");
  projectRemove.classList.add("project-remove");
  projectRemove.textContent = "🗑️";

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

function activeProject() {
  let allProjects = document.querySelectorAll(".project");
  allProjects.forEach((project) => {
    project.addEventListener("click", () => {
      allProjects.forEach((element) => {
        element.classList.remove("active");
      });
      project.classList.add("active");
    });
  });
}

//submit task

/* let displayTasks = function () {
  let storage = localStorage.getItem(active);
  const displayDiv = document.querySelector(".tasks");
  displayDiv.textContent = storage;
};
 */

btnOpenTask.addEventListener("click", () => {
  taskOverlay.style.display = "block";
});
/* 
btnNewProject.addEventListener("click", () => {
  projectController.createProject(inputNewProject.value);
  projectOverlay.style.display = "none";
});

btnNewTask.addEventListener("click", () => {
  taskOverlay.style.display = "none";
  toStorage(
    taskFactory(inputTitle, inputDesc, inputDate, inputPriority, inputNotes)
  );
  displayTasks();
});

const makeProject = (name) => {
  let createProject = document.createElement("div");
  createProject.classList.add("project");
  createProject.textContent = name;
  content.appendChild(createProject);
};

let active = "";
function activeProject() {
  const allProjects = document.querySelectorAll(".project");
  allProjects.forEach((project) => {
    project.addEventListener("click", () => {
      active = project.name;
      displayTasks();
    });
  });
}

function toStorage(object) {
  let storage = localStorage.getItem(active);
  if (storage == null) {
    localStorage.setItem(active, JSON.stringify(object));
  } else {
    localStorage.setItem(active, storage + JSON.stringify(object));
  }
}
 */
