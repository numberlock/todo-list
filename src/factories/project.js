export const projectFactory = function (newName) {
  let name = newName;
  let tasks = [];

  return { name, tasks };
};

const projectController = function () {
  function createProject(projectName) {
    let project = projectFactory(projectName);
  }

  function toStorage(projectName, Obj) {
    window.localStorage.setItem(projectName, JSON.stringify(Obj));
  }
};
