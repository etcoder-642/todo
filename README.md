# TODO App Documentation

## Introduction

This document provides a comprehensive overview of the TODO application's architecture, functionality, and data flow. It is designed to be understandable by both technical and non-technical audiences. The application allows users to manage projects and tasks.

## Core Functionality

The TODO app allows you to:

* Create and manage projects.
* Create and manage tasks within projects.
* View project and task details.
* Persist data between sessions using local storage.
* Switch between light and dark themes.

## Modules and Components

The application is structured into several modules, each with a specific responsibility.

### 1.  `index.js`

* **Purpose:** This is the main entry point of the application. It initializes the app, loads data, and sets up event listeners.
* **Key Processes:**
    * **Theme Management:**
        * When the page loads, it checks if a theme preference (`'theme'`) is stored in the browser's local storage.
        * If a theme is found:
            * If the theme is 'dark', it applies the dark theme to the page by adding the class `dark-theme` to the `<body>` element and updates the theme-related elements.
            * If the theme is 'light', it removes the `dark-theme` class from the `<body>` element and updates the theme-related elements.
        * This ensures the user's theme preference is persistent across sessions.
    * **Data Loading:**
        * It retrieves the project data from local storage using the key `'taskManager'`.  This data is stored as a JSON string and is parsed into a JavaScript object.
        * If no project data exists in local storage, an empty array is used.
        * The application checks if any projects exist. If no projects exist in the `creator.getProject.projects` array, it loads projects from `storedTaskManager`.
    * **Initial Display:**
        * The `displayProject()` function is called for each project in the loaded data to render the projects on the page.
    * **Event Listeners:**
        * A click event listener is attached to the entire document to handle various user interactions:
            * Clicking a 'Add task' button will open a form to create a new task.
            * Clicking the close button on the form will close the form.
            * Clicking the dark/light theme icons will switch the theme.
        * A submit event listener is attached to the form to handle the submission of new projects and tasks:
            * If the form is in task mode, it creates a new task.
            * If the form is in project mode, it creates a new project.
* **Local Storage:**
    * The `localStorage.getItem('taskManager')` is used to retrieve stored project and task data.
    * The `localStorage.setItem('theme', 'dark' or 'light')` is used to save the user's theme preference.

### 2.  `creator.js`

* **Purpose:** This module is responsible for creating new projects and tasks.  It works in conjunction with the `taskManager.js` module.
* **Key Components and Functions:**
    * `newProject`: An instance of the `taskManager` class.  This object holds all the projects and tasks.
    * `taskCreator()`:
        * This function gathers input values from the task creation form (task name, description, due date, type, and priority).
        * It calls the `createTask()` method of the `taskManager` instance (`newProject`) to create a new task object.
        * The new task is associated with the currently selected project.
        * It calls `creator.storeInLocalStorage()` to save the updated project data to local storage.
        * It returns the newly created task object.
    * `storeInLocalStorage()`:
        * This function serializes the entire project data (including all projects and their associated tasks) into a JSON string.
        * It saves this JSON string to local storage using the key `'taskManager'`.  This ensures that the data is preserved even after the user closes the browser or refreshes the page.
    * `projectCreator()`:
        * This function gathers input values from the project creation form (project name and description).
        * It calls the `createProject()` method of the `taskManager` instance (`newProject`) to create a new project object.
        * It calls `creator.storeInLocalStorage()` to save the updated project data to local storage.
        * It returns the newly created project object.
    * `getProject`: This returns the `newProject` instance of the `taskManager` class, allowing other modules to access and manipulate the project and task data.
* **Data Structures:**
    * Projects and tasks are stored as JavaScript objects within the `taskManager` instance.  The structure is:
        * `Project`: { `projectName`, `projectDescription`, `id`, `tasks`: \[...\] }
        * `Task`: { `title`, `description`, `dueDate`, `type`, `priority`, `status`, `id` }

### 3.  `taskManager.js`

* **Purpose:** This module defines the `taskManager` class, which manages the storage and manipulation of projects and tasks.
* **Key Components and Functions:**
    * `#taskManager`: A private array that stores all project objects.  The `#` prefix indicates that this property is private to the `taskManager` class and cannot be accessed from outside.
    * `createProject(name, desc)`:
        * This method creates a new project object with the given `name` and `desc`.
        * It assigns a unique ID to the project using `crypto.randomUUID()`.
        * It initializes an empty `tasks` array within the project object to store tasks associated with the project.
        * It adds the new project object to the `#taskManager` array.
        * It returns the newly created project object.
    * `createTask(project, title, description, type, dueDate, priority)`:
        * This method creates a new task object with the given details.
        * It finds the project within the `#taskManager` array that matches the provided `project` name.
        * It assigns a unique ID to the task using `crypto.randomUUID()`.
        * It adds the new task object to the `tasks` array of the corresponding project.
        * It returns the newly created task object.
    * `get projects()`:
        * This is a getter method that returns the `#taskManager` array, providing access to the stored project objects.

### 4.  `display.js`

* **Purpose:** This module handles the display of projects and tasks in the user interface.  It updates the HTML elements on the page to reflect the data stored in the `taskManager`.
* **Key Components and Functions:**
    * `dispBox`, `overlay`, `cardWrapper`, `inputList`: These are variables that store references to specific HTML elements in the page.  This optimization prevents the code from having to repeatedly query the DOM.
    * `clearTasks()`: Removes all task cards from the display.
    * `popUpMode()`: Displays the pop-up form (for adding projects or tasks) by setting the `display` property of the `overlay` and `dispBox` elements to `'block'`.
    * `normalMode()`: Hides the pop-up form by setting the `display` property of the `overlay` and `dispBox` elements to `'none'`.
    * `isTaskModeActive`: A boolean variable that tracks whether the application is currently in task creation mode.
    * `newProjectMode()`:
        * This function updates the content of the pop-up form (`inputList`) to display the fields required for creating a new project (project name and description).
        * It also sets the header text of the pop-up form to "Add Project".
    * `newTaskMode()`:
        * This function updates the content of the pop-up form (`inputList`) to display the fields required for creating a new task (task name, description, due date, type, and priority).
        * It also sets the header text of the pop-up form to "Add Task".
    * `displayProject(project)`:
        * This function dynamically creates HTML elements to display a project and its associated tasks.
        * It creates a project card with a header, description, and a container for task cards.
        * It iterates over the tasks array of the project.
        * For each task, it creates a task card with its details (title, description, due date, type, priority, and status).
        * It appends the project card and task cards to the `cardWrapper` element, making them visible on the page.
    * `displayTask(task)`:
        * This function creates the elements to display the task.
        * It adds the task to the `cardWrapper`.
    * `handleDark()`: Applies dark theme to the page.
    * `handleLight()`: Applies light theme to the page.
    * `isSidebarShown`: A boolean to track the state of the sidebar.
    * `toggleSidebar()`: show or hides the sidebar.

## Data Flow and Storage

1.  **Initialization:**
    * When the page loads, `index.js` retrieves project and task data from local storage (if available).
    * If no data is found, the application starts with an empty set of projects.

2.  **Project Creation:**
    * When the user submits the project creation form, `creator.js`'s `projectCreator()` function is called.
    * `projectCreator()` creates a new project object using the `taskManager` class.
    * The new project is added to the `newProject` instance in `creator.js`.
    * `creator.js`'s `storeInLocalStorage()` function is called to save the updated project data to local storage.
    * `display.js`'s `displayProject()` function is called to render the new project in the UI.

3.  **Task Creation:**
    * When the user submits the task creation form, `creator.js`'s `taskCreator()` function is called.
    * `taskCreator()` creates a new task object using the `taskManager` class.
    * The new task is added to the `tasks` array of the corresponding project within the `newProject` instance.
    * `creator.js`'s `storeInLocalStorage()` function is called to save the updated project data to local storage.
    * `display.js`'s `displayTask()` function is called to render the new task in the UI.

4.  **Data Persistence:**
    * All project and task data is stored in the browser's local storage using the key `'taskManager'`.
    * The data is serialized as a JSON string before being stored.
    * This ensures that the data is retained between page loads, providing a persistent user experience.

## User Interface

The user interface consists of the following key elements:

* **Navbar:** Displays the application title and a sidebar toggle.
* **Sidebar:** (If visible) Displays a list of projects.
* **Main Content Area:** Displays project details and task cards.
* **Pop-up Form:** Used for creating new projects and tasks.
* **Task Cards:** Display individual task details.
* **Project Cards**: Displays Project details.

## Key Variables and Data Structures

* `#taskManager`: A private array in the `taskManager` class that stores all project objects.
* `projects`: An array of project objects, where each project object contains:
    * `projectName`: The name of the project.
    * `projectDescription`: The description of the project.
    * `id`: A unique identifier for the project.
    * `tasks`: An array of task objects associated with the project.
* `tasks`: An array of task objects, where each task object contains:
    * `title`: The title of the task.
    * `description`: The description of the task.
    * `dueDate`: The due date of the task.
    * `type`: The type of task.
    * `priority`: The priority of the task.
    * `status`: The completion status of the task.
    * `id`: A unique identifier for the task.
* `localStorage`: The browser's local storage is used to persist project and task data between sessions.  The key `'taskManager'` is used to store the serialized project data, and the key 'theme' is used to store the user's theme preference.

## Scenario: Creating a Project and a Task

Let's consider a scenario where a user creates a project named "Sports" and then adds a task called "Running" to that project. Here's a detailed breakdown of the steps involved:

### 1. Project Creation ("Sports")

* **User Action:** The user clicks the "Add Project" button (or a similar UI element).
* **Display Module:** The `display.js` module's `newProjectMode()` function is called. This function updates the pop-up form to show the fields for project name and description.
* **User Input:** The user enters "Sports" as the project name and provides a description (e.g., "Activities related to sports").
* **Form Submission:** The user clicks the "Submit" button on the form.
* **Event Handling (`index.js`):** The `submit` event listener in `index.js` is triggered.
* **Project Creation (`creator.js`):**
    * The `creator.js` module's `projectCreator()` function is called.
    * `projectCreator()` retrieves the project name ("Sports") and description from the input fields.
    * It calls the `createProject()` method of the `taskManager` class (which is instantiated as `newProject` in `creator.js`).
* **`taskManager.js`:**
    * The `createProject()` method in `taskManager.js` does the following:
        * Creates a new project object:
            ```javascript
            {
              projectName: "Sports",
              projectDescription: "Activities related to sports",
              id: "unique_project_id", //  A unique ID is generated using crypto.randomUUID()
              tasks: [] // An empty array to hold tasks for this project
            }
            ```
        * Adds this project object to the `#taskManager` array (the private array within the `taskManager` instance).
        * Returns the newly created project object.
* **Data Persistence (`creator.js`):**
    * The `creator.js` module's `storeInLocalStorage()` function is called.
    * `storeInLocalStorage()`:
        * Retrieves the updated array of projects (which now includes the "Sports" project) from the `newProject` instance.
        * Serializes this array into a JSON string using `JSON.stringify()`.
        * Saves the JSON string to local storage with the key `'taskManager'`.
* **UI Update (`display.js`):**
    * The `display.js` module's `displayProject()` function is called.
    * `displayProject()` dynamically creates HTML elements (a project card) to represent the "Sports" project and adds it to the main content area of the page.

### 2. Task Creation ("Running")

* **User Action:** The user clicks the "Add Task" button within the "Sports" project's display in the UI.
* **Display Module:** The `display.js` module's `newTaskMode()` function is called. This function updates the pop-up form to show the fields for task details (name, description, due date, etc.).  The application also sets the `isTaskModeActive` to `true`.
* **User Input:** The user enters the task details:
    * Task Name: "Running"
    * Description: "Daily 5km run"
    * Due Date: "2024-07-30"
    * Type: "Daily"
    * Priority: "High"
* **Form Submission:** The user clicks the "Submit" button on the form.
* **Event Handling (`index.js`):** The `submit` event listener in `index.js` is triggered. Because `isTaskModeActive` is true, the code knows it's a task submission.
* **Task Creation (`creator.js`):**
    * The `creator.js` module's `taskCreator()` function is called.
    * `taskCreator()` retrieves the task details from the input fields.
    * It calls the `createTask()` method of the `taskManager` instance (`newProject`) in `creator.js`.
* **`taskManager.js`:**
    * The `createTask()` method in `taskManager.js` does the following:
        * Finds the project object with the name "Sports" in the `#taskManager` array.
        * Creates a new task object:
            ```javascript
            {
              title: "Running",
              description: "Daily 5km run",
              dueDate: "2024-07-30",
              type: "Daily",
              priority: "High",
              status: false, // Initial status is set to false (not completed)
              id: "unique_task_id" // A unique ID is generated
            }
            ```
        * Adds this task object to the `tasks` array of the "Sports" project object.
        * Returns the newly created task object.
* **Data Persistence (`creator.js`):**
    * The `creator.js` module's `storeInLocalStorage()` function is called.
    * `storeInLocalStorage()`:
        * Retrieves the updated array of projects (where the "Sports" project now has a "Running" task in its `tasks` array).
        * Serializes this data into a JSON string.
        * Saves the JSON string to local storage.
* **UI Update (`display.js`):**
    * The `display.js` module's `displayTask()` function is called.
    * `displayTask()` dynamically creates HTML elements (a task card) to represent the "Running" task and adds it to the "Sports" project's display in the UI.

### Summary

In this scenario, the following key actions occur:

* The user interacts with the UI to create a project and a task.
* The `creator.js` module, in conjunction with the `taskManager` class, creates the corresponding data objects (project and task).
* The `taskManager.js` module manages the storage of this data within its internal data structures.
* The `creator.js` module persists the data to local storage, ensuring it is saved between sessions.
* The `display.js` module updates the UI to reflect the newly created project and task.

This detailed explanation should provide a clear understanding of the processes involved in creating projects and tasks within the TODO application.
