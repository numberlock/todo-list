const taskFactory = function () {
  let title = inputTitle;
  let description = inputDesc;
  let dueDate = inputDate;
  let property = inputPriority;
  let notes = inputNotes;

  return { title, description, dueDate, property, notes };
};
