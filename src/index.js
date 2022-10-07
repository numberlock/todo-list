"use strict";
import "./style.css";

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

//project
const projectFactory = function (newName) {
  let name = newName;
  let task = [];

  return { name, task };
};

const projectController = (function () {
  function createProject(projectName) {
    let project = projectFactory(projectName);
    toStorage(project.name, project);
  }

  function toStorage(projectName, obj) {
    window.localStorage.setItem(projectName, JSON.stringify(obj));
  }

  function removeProject(projectName) {
    window.localStorage.removeItem(projectName);
  }

  return { createProject, removeProject };
})();

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
  let priority = inputPriority;
  let notes = inputNotes;

  return { taskTitle, description, dueDate, priority, notes };
};

btnOpenTask.addEventListener("click", () => {
  taskOverlay.style.display = "block";
});

const taskController = (function () {
  function getProject() {
    const selectedProject = document.querySelector(".active");
    const projectName = selectedProject.textContent;

    return JSON.parse(window.localStorage.getItem(projectName));
  }

  function createTask(
    inputTitle,
    inputDesc,
    inputDate,
    inputPriority,
    inputNotes
  ) {
    let project = getProject();
    let tasks = taskFactory(
      inputTitle.value,
      inputDesc.value,
      inputDate.value,
      inputPriority.value,
      inputNotes.value
    );
    project.task.push(tasks);

    toStorage(project.name, project);
  }

  function updateTask(
    inputTitle,
    inputDesc,
    inputDate,
    inputPriority,
    inputNotes
  ) {
    let project = getProject();
    let projectTasks = project.task[index];

    projectTasks.taskName = inputTitle.value;
    projectTasks.description = inputDesc.value;
    projectTasks.dueDate = inputDate.value;
    projectTasks.priority = inputPriority.value;
    projectTasks.notes = inputNotes.value;
    projectTasks.taskName = inputTitle.value;

    toStorage(project.name, project);
  }

  function toStorage(projectName, obj) {
    window.localStorage.setItem(projectName, JSON.stringify(obj));
  }

  function deleteTask(index) {
    let project = getProject();
    project.task.splice(Number(index), 1);

    toStorage(project.name, project);
  }

  return { createTask, deleteTask, updateTask, toStorage };
})();

btnNewTask.addEventListener("click", () => {
  taskController.createTask(
    inputTitle,
    inputDesc,
    inputDate,
    inputPriority,
    inputNotes
  );

  taskOverlay.style.display = "none";
});

function displayTasks() {
  const selectedProject = document.querySelector(".active");
  const projectName = selectedProject.textContent;
  let localProject = JSON.parse(window.localStorage.getItem(projectName));
  let tasks = localProject.task;

  function generateTasks(name, desc, date, priority, notes, index) {
    const tasksContainer = document.querySelector(".tasks");

    const removeFromLocalArray = function () {
      tasks.splice(Number(index), 1);
      taskController.toStorage(projectName, localProject);
    };

    const divContainer = document.createElement("div");
    const divName = document.createElement("div");
    divName.textContent = name;
    const divDesc = document.createElement("div");
    divDesc.textContent = desc;
    const divDate = document.createElement("div");
    divDate.textContent = date;
    const divPriority = document.createElement("div");
    divPriority.textContent = priority;
    const divNotes = document.createElement("div");
    divNotes.textContent = notes;
    const divIcons = document.createElement("div");
    const editTask = document.createElement("i");
    editTask.classList.add("glyphicon", "glyphicon-pencil");
    const removeTask = document.createElement("i");
    removeTask.classList.add("glyphicon", "glyphicon-remove");

    removeTask.addEventListener("click", removeFromLocalArray);

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

  for (let i = 0; i < tasks.length; i++) {
    const name = tasks[i].taskTitle;
    const desc = tasks[i].description;
    const date = tasks[i].dueDate;
    const priority = tasks[i].priority;
    const notes = tasks[i].notes;

    generateTasks(name, desc, date, priority, notes, i);
  }
}

// submit project

function submitNewProject() {
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
}
submitNewProject(); //activation

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

function activeProject() {
  let allProjects = document.querySelectorAll(".project");
  allProjects.forEach((project) => {
    project.addEventListener("click", () => {
      allProjects.forEach((element) => {
        element.classList.remove("active");
      });
      project.classList.add("active");
      displayTasks();
    });
  });
}
