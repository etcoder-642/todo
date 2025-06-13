import taskManager from "./taskManager";

export const creator = (() => {
  const newProject = new taskManager();
  return {
    currentProject: "project",
    taskCreator: function () {
      const taskName = document.querySelector("#task-name");
      const taskDesc = document.querySelector("#task-description");
      const taskDate = document.querySelector("#task-date");
      const taskType = document.querySelector("#task-type");
      const taskPrio = document.querySelector("#task-priority");

      let returnTask = newProject.createTask(
        creator.currentProject,
        taskName.value,
        taskDesc.value,
        taskType.value,
        taskDate.value,
        taskPrio.value,
      );
      creator.storeInLocalStorage();

      console.log(returnTask);
      console.log(taskManager.projects);
      return returnTask;
    },
    storeInLocalStorage: function () {
      localStorage.setItem("taskManager", "");
      localStorage.setItem(
        "taskManager",
        JSON.stringify(creator.getProject.projects),
      );
    },
    projectCreator: function () {
      const projectName = document.querySelector("#project-name");
      const projectDesc = document.querySelector("#project-description");

      const returnedValue = newProject.createProject(
        projectName.value,
        projectDesc.value,
      );
      creator.storeInLocalStorage();
      return returnedValue;
    },
    getProject: newProject,
  };
})();
