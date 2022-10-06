export const projectFactory = function (name) {
  let name = name;
  let tasks = [];

  return { name, tasks };
};
