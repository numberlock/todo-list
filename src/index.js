"use strict";
import "./style.css";

const btnOpenProject = document.querySelector(".show-add-project");
const btnOpenTask = document.querySelector(".show-add-task");
const btnNewProject = document.querySelector(".btn-add-project");
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

btnOpenProject.addEventListener("click", () => {
  projectOverlay.style.display = "block";
});

btnOpenTask.addEventListener("click", () => {
  taskOverlay.style.display = "block";
});

btnNewProject.addEventListener("click", () => {
  makeProject(inputNewProject.value);
  projectOverlay.style.display = "none";
  activeProject();
});

btnNewTask.addEventListener("click", () => {
  console.log(inputDate);
  console.log(inputDate.value);
  taskOverlay.style.display = "none";
  taskFanctory(
    inputTitle.value,
    inputDesc.value,
    inputDate.value,
    inputPriority.value,
    inputNotes.value
  );
});

let arrayPos = 0;
let projectArray = [];
const makeProject = (name) => {
  let createProject = document.createElement("div");
  createProject.classList.add("project");
  createProject.dataset.object = arrayPos;
  createProject.textContent = name;
  projectArray.push({ name, arrayPos });
  content.appendChild(createProject);
  console.log(projectArray);
  arrayPos++;
};

let active = ""; //pain
function activeProject() {
  const allProjects = document.querySelectorAll(".project");
  allProjects.forEach((project) => {
    project.addEventListener("click", () => {
      active = project.dataset.object;
      console.log(active);
    });
  });
}
function taskFanctory(title, desc, date, priority, notes) {
  return { title, desc, date, priority, notes };
}

/*   localStorage[
    `${active}`
  ] = `Title: ${title}, Description: ${desc}, Date: ${date}, Priority: ${priority}, Notes: ${notes}`;
 */

/* 
localstorage, json, stringify
      */
