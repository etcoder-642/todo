export default class taskManager {
  #taskManager = [];

  createProject(name, desc) {
    this.#taskManager.push({
      projectName: name,
      projectDescrption: desc,
      id: crypto.randomUUID(),
      tasks: [],
    });
    return this.#taskManager[this.#taskManager.length - 1];
  }

  createTask(project, title, description, type, dueDate, priority) {
    for (let i = 0; i < this.#taskManager.length; i++) {
      if (project === this.#taskManager[i].projectName) {
        this.#taskManager[i].tasks.push({
          title,
          description,
          dueDate,
          type,
          priority,
          status: false,
          id: crypto.randomUUID(),
        });
        return this.#taskManager[i].tasks[
          this.#taskManager[i].tasks.length - 1
        ];
      }
    }
    console.log("OOPS! you haven't created this project.");
  }

  get projects() {
    return this.#taskManager;
  }
}
