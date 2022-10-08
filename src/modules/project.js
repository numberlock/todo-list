export const projectFactory = function (newName) {
  let name = newName;
  let task = [];

  return { name, task };
};

export const projectController = (function () {
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
