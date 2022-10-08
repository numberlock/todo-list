export const taskFactory = function (
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

export const taskController = (function () {
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
