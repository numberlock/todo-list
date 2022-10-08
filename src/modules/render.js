export const createEditTaskOverlay = function () {
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
};
