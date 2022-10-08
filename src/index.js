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
  if (document.querySelector(".active") === null) {
    alert("Select a project!");
  } else {
    taskOverlay.style.display = "block";
  }
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

  function toStorage(projectName, obj) {
    window.localStorage.setItem(projectName, JSON.stringify(obj));
  }

  return { getProject, createTask, toStorage };
})();

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

const createEditTaskOverlay = (function () {
  const htmlDiv = document.querySelector(".edit-task");

  //form
  const editTaskOverlay = document.createElement("div");
  editTaskOverlay.classList.add("edit-task-overlay");

  const editTaskModel = document.createElement("div");
  editTaskModel.classList.add("edit-task-model");

  //object

  const labelForName = document.createElement("label");
  labelForName.for = "edit-task-title";
  labelForName.textContent = "Task Title:";
  const editInputName = document.createElement("input");
  editInputName.id = "edit-task-title";

  const labelForDesc = document.createElement("label");
  labelForDesc.for = "edit-task-desc";
  labelForDesc.textContent = "Description:";
  const editInputDesc = document.createElement("input");
  editInputDesc.id = "edit-task-desc";

  const labelForDate = document.createElement("label");
  labelForDate.for = "edit-task-date";
  labelForDate.textContent = "Due Date:";
  const editInputDate = document.createElement("input");
  editInputDate.type = "date";
  editInputDate.id = "edit-task-date";

  const labelForPrio = document.createElement("label");
  labelForPrio.for = "edit-task-prio";
  labelForPrio.textContent = "Task Priority:";
  const editInputPrio = document.createElement("select");
  editInputPrio.id = "edit-task-prio";
  const optionHigh = document.createElement("option");
  optionHigh.value = "high";
  optionHigh.textContent = "High";
  const optionMedium = document.createElement("option");
  optionMedium.value = "medium";
  optionMedium.textContent = "Medium";
  const optionLow = document.createElement("option");
  optionLow.value = "low";
  optionLow.textContent = "Low";

  const labelForNotes = document.createElement("label");
  labelForNotes.for = "edit-task-notes";
  labelForNotes.textContent = "Notes:";

  const editInputNotes = document.createElement("input");
  editInputNotes.id = "edit-task-notes";

  const editButton = document.createElement("button");
  editButton.textContent = "Change";
  editButton.classList.add("editButtonSubmit");

  //append
  htmlDiv.appendChild(editTaskOverlay);
  editTaskOverlay.appendChild(editTaskModel);
  editInputPrio.append(optionHigh, optionMedium, optionLow);
  editTaskModel.append(
    labelForName,
    editInputName,
    labelForDesc,
    editInputDesc,
    labelForDate,
    editInputDate,
    labelForPrio,
    editInputPrio,
    labelForNotes,
    editInputNotes,
    editButton
  );
})();

const displayTasks = function () {
  let localProject = taskController.getProject();
  let tasks = localProject.task;

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

  for (let i = 0; i < tasks.length; i++) {
    const name = tasks[i].taskTitle;
    const desc = tasks[i].description;
    const date = tasks[i].dueDate;
    const priority = tasks[i].priority;
    const notes = tasks[i].notes;

    generateTasks(name, desc, date, priority, notes, i);
  }
};

// submit project

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
