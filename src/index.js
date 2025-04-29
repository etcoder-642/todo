import './styles/main.css'

class taskManager{
    #taskManager = [];

    createProject(name){
        this.#taskManager.push({project: name, tasks: []})
    }

    createTask(project, title, description, dueDate, priority){
        for(let i=0;i<this.#taskManager.length;i++){
            if(project === this.#taskManager[i].project){
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
        return [...this.#taskManager];
    }
}


const display = (()=>{
    return {
        popUpMode: function(){
            document.querySelector('.overlay').style.display = 'block';
            document.querySelector('.displayBox').style.display = 'block';
        },
        normalMode: function(){
            document.querySelector('.overlay').style.display = 'none';
            document.querySelector('.displayBox').style.display = 'none';
        },
        displayTask: function(obj){
            const card = document.querySelector('.basecard');
            const wrapper = document.querySelector('.card-wrapper');
            const clonedCard = card.cloneNode(true);

            clonedCard.querySelector('header').textContent = obj.title;
            clonedCard.querySelector('#desc').textContent = obj.description;
            clonedCard.querySelector('.priority').textContent = obj.priority;
            clonedCard.querySelector('#date').textContent = obj.dueDate;

            wrapper.appendChild(clonedCard);
        }
    }
})()

function taskCreator(){
    const taskName = document.querySelector('#task-name');
    const taskDesc = document.querySelector('#task-description');
    const taskType = document.querySelector('#task-type');
    const taskDate = document.querySelector('#task-date');
    const taskPrio = document.querySelector('#task-priority');

    const newTask = new taskManager();
    newTask.createProject('project');
    let returnTask = newTask.createTask('project', taskName.value, taskDesc.value, taskDate.value, taskPrio.value);

    return returnTask;
}


document.addEventListener('click', (e)=>{
    if(e.target.className.includes('navbar-btn')){
        display.popUpMode();
    }else if(e.target.className.includes('close-displayBox')){
        display.normalMode();
    }
})



document.addEventListener('submit', (e)=>{

    if(e.target.className.includes('displayBox')){
        e.preventDefault();
        display.displayTask(taskCreator());
        display.normalMode();
        }
})


