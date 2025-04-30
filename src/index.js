import './styles/main.css'

class taskManager{
    #taskManager = [];

    createProject(name, desc){
        this.#taskManager.push({
            projectName: name,
            projectDescrption: desc,
            id: crypto.randomUUID(),
            tasks: []
        })
            return this.#taskManager[
                this.#taskManager.length - 1
            ];
    }

    createTask(project, title, description, dueDate, priority){
        for(let i=0;i<this.#taskManager.length;i++){
            if(project === this.#taskManager[i].projectName){
                this.#taskManager[i].tasks.push({title,
                    description,
                    dueDate,
                    priority,
                    id: crypto.randomUUID()
                });
                return this.#taskManager[i].tasks[
                    this.#taskManager[i].tasks.length - 1
                  ];
            }
        }
        console.log("OOPS! you haven't created this project.")
    }

    get projects(){
        return this.#taskManager;
    }
}


const display = (()=>{
    const dispBox = document.querySelector('.displayBox');
    const overlay = document.querySelector('.overlay');
    const cardWrapper = document.querySelector('.card-wrapper');
    const inputList = dispBox.querySelector('ul');

    return {
        clearTasks: function () {
            const taskCards = cardWrapper.querySelectorAll('.card:not(:first-child)');
            taskCards.forEach(card => card.remove());
        },
        popUpMode: function(){
            overlay.style.display = 'block';
            dispBox.style.display = 'block';
        },
        normalMode: function(){
            overlay.style.display = 'none';
            dispBox.style.display = 'none';
        },
        isTaskModeActive: false,
        newProjectMode: function(){
            inputList.innerHTML = `
            <li> 
                <input type="text" id="project-name" placeholder="Name of the Project" required>
            </li>
            <li>
                <textarea name="description" id="project-description" placeholder="Description for your Project" required></textarea>
            </li>
            <li>
                <button type="submit" class="submit">Add</button>
            </li>
            `
            dispBox.querySelector('header').textContent = 'Add Project';
        },
        newTaskMode: function(){
            inputList.innerHTML = `
                        <li> 
                <input type="text" id="task-name" placeholder="Name of the Task" required>
            </li>
            <li>
                <textarea name="description" id="task-description" placeholder="description for your task" required></textarea>
            </li>
            <li>
                <label for="task-type">Type of the Task</label>
                <select name="type" id="task-type" required>
                    <option value="">One Time</option>
                    <option value="">Daily</option>
                    <option value="">Weekly</option>
                </select>
            </li>
            <li>
                <label for="dueDate">Due Date</label>
                <input id="task-date" type="datetime-local" required>
            </li>
            <li>
                <label for="task-priority">Priority</label>
                <input type="range" required id="task-priority">
            </li>
            <li>
                <button type="submit" class="submit">Add</button>
            </li>
            `
        },
        displayProject: function(obj){
            const list = document.querySelector('.list')
            const li = document.createElement('li');
            li.classList.add('sidebar-li');
            li.setAttribute('data-project-id', obj.id)
            li.textContent = obj.projectName;

            list.append(li);
        },
        displayTask: function(obj){
            const card = document.querySelector('.basecard');
            const wrapper = document.querySelector('.card-wrapper');
            const clonedCard = card.cloneNode(true);

            clonedCard.style.display = 'block';
            clonedCard.querySelector('header').textContent = obj.title;
            clonedCard.querySelector('#desc').textContent = obj.description;
            clonedCard.querySelector('#priority').textContent = obj.priority;
            clonedCard.querySelector('#date').textContent = obj.dueDate;

            wrapper.appendChild(clonedCard);
        }
    }
})()


const creator = (()=>{
    const newProject = new taskManager();
    return {
        currentProject: 'project',
        taskCreator: function(){
            const taskName = document.querySelector('#task-name');
            const taskDesc = document.querySelector('#task-description');
            const taskDate = document.querySelector('#task-date');
            const taskPrio = document.querySelector('#task-priority');
        
            let returnTask = newProject.createTask(creator.currentProject, taskName.value, taskDesc.value, taskDate.value, taskPrio.value);
        
            console.log(returnTask)
            console.log(taskManager.projects)
            return returnTask;        
        },
        projectCreator: function(){
            const projectName = document.querySelector('#project-name');
            const projectDesc = document.querySelector('#project-description');
        
            return newProject.createProject(projectName.value, projectDesc.value);
        },
        getProject: newProject,
    }
})()


document.addEventListener('click', (e)=>{
    const list = document.querySelector('.list');
    if(e.target.className.includes('content-header-btn')){
        display.newTaskMode();
        display.isTaskModeActive = true;
        display.popUpMode();
    }else if(e.target.className.includes('close-displayBox')){
        display.normalMode();
    }else if(e.target.className.includes('sidebar-btn')){
        display.isTaskModeActive = false;
        display.popUpMode();
        display.newProjectMode();
    }else if(e.target.className.includes('sidebar-li')){
        const liArray = list.querySelectorAll('li');
        liArray.forEach(li => {
            li.style.background = '';
        });
        e.target.style.background = '#ecefca';

        creator.currentProject = e.target.textContent;
        console.log(creator.currentProject)

        for(let i = 0; i <= creator.getProject.projects.length -1; i++){
            if(creator.getProject.projects[i].id === e.target.dataset.projectId){
                display.clearTasks();
                creator.getProject.projects[i].tasks.forEach(tasks => {
                    display.displayTask(tasks);
                    console.log('yeah we made it!')
                });
            }
        }
    }
})



document.addEventListener('submit', (e)=>{

    if(e.target.className.includes('displayBox')){
        if(display.isTaskModeActive === true){
            e.preventDefault();
            display.displayTask(creator.taskCreator());
            console.log(creator.getProject.projects)
            display.normalMode();    
        }else{
            e.preventDefault();
            display.displayProject(creator.projectCreator());
            display.normalMode();
        }
    }
})





