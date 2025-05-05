import './styles/main.css'
import { creator } from './utils/creator';
import { display } from './utils/display';

document.addEventListener('DOMContentLoaded', ()=>{
    if(('theme' in localStorage)){
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            display.handleDark();
        }else {
            document.body.classList.remove('dark-theme');
            display.handleLight();
        }    
    }

    let storedTaskManager = [];

    storedTaskManager = JSON.parse(localStorage.getItem('taskManager'));

    if(creator.getProject.projects.length === 0){
        for(let i = 0;i<= storedTaskManager.length-1;i++){
            creator.getProject.projects.push(storedTaskManager[i]);
        }
    }
    const mainArr = creator.getProject.projects;


    for(let i=0;i<=mainArr.length-1;i++){
        display.displayProject(mainArr[i])
    }

})

document.addEventListener('click', (e)=>{
    const list = document.querySelector('.list');
    const projects = creator.getProject.projects;

    if(e.target.classList.contains('content-header-btn')){
        display.newTaskMode();
        display.isTaskModeActive = true;
        display.popUpMode();
    }else if(e.target.classList.contains('close-displayBox')){
        display.normalMode();
    }else if(e.target.classList.contains('sidebar-btn')){
        display.isTaskModeActive = false;
        display.popUpMode();
        display.newProjectMode();
    }else if(e.target.classList.contains('sidebar-li')){
        const liArray = list.querySelectorAll('li');
        liArray.forEach(li => {
            li.style.background = '';
        });
        e.target.style.background = 'var(--teritiary-green)';

        creator.currentProject = e.target.textContent;

        for(let i = 0; i <= creator.getProject.projects.length -1; i++){
            if(creator.getProject.projects[i].id === e.target.dataset.projectId){
                display.clearTasks();
                creator.getProject.projects[i].tasks.forEach(tasks => {
                    display.displayTask(tasks);
                });
            }
        }
    }else if(e.target.classList.contains('rmv')){
        function removeAndShift(array, indexToRemove) {
            if (indexToRemove >= 0 && indexToRemove < array.length) {
              array.splice(indexToRemove, 1); // Remove 1 element at indexToRemove
            } else {
              console.error("Invalid index");
            }
        }  
        // first it tries to identify in which project it is in by looping through 
        // ... all the projects finding the one which matches with creator.currentProject.          
        for(let i = 0; i<= projects.length - 1; i++){
            if(projects[i].projectName === creator.currentProject){
                // then it loops through the tasks and tries to find the task which have the 
                // ... same [data-project-id] with the .rmv button
                for(let j = 0; j <= projects[i].tasks.length -1; j++){
                    if(projects[i].tasks[j].id === e.target.dataset.projectId){
                        display.removeCard(e.target.dataset.projectId);
                        removeAndShift(projects[i].tasks, j)
                    }
                }
            }
        }
        creator.storeInLocalStorage();
    }else if(e.target.classList.contains('complete')){
        for(let i = 0; i<= projects.length - 1; i++){
            if(projects[i].projectName === creator.currentProject){
                for(let j = 0; j <= projects[i].tasks.length -1; j++){
                    if(projects[i].tasks[j].id === e.target.dataset.projectId){
                        display.completeCard(e.target.dataset.projectId);
                        projects[i].tasks[j].status = true;
                        console.log(projects)
                    }
                }                                
            }
        }

        creator.storeInLocalStorage();
    }else if(e.target.classList.contains('show-content')){
        let currentElement = e.target;

        while (currentElement && !currentElement.classList.contains('card')) {
            currentElement = currentElement.parentElement;
          }
    
        display.showOrHideCard(currentElement.dataset.projectId, e.target)
    }else if(e.target.classList.contains('icon-list')){
        display.showSideBar();
    }else if(e.target.classList.contains('dark')){
        display.handleDark();
    }else if(e.target.classList.contains('light')){
        display.handleLight();
    }
})



document.addEventListener('submit', (e)=>{

    if(e.target.classList.contains('displayBox')){
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

if(!('taskManager' in localStorage)){
    creator.getProject.createProject('Learn Coding', 'career related');
    creator.getProject.createTask('Learn Coding','Odin Project','take the Odin Project Lessons daily', 'daily', '12-06-2024 11:30:03', 'Medium');
    creator.getProject.createTask('Learn Coding','finish toDO app',"the todo App is a versatile web app that let's users to add tasks projects and manage their life decisions efficiently.", 'One Time', '6-05-2024 11:30:03', 'High');
    creator.getProject.createTask('Learn Coding','do leet code question','test my DSL skill and take some leet code questions to stregthen my coding muscles', 'daily', '12-06-2024 11:30:03', 'Low');

    localStorage.setItem('taskManager', '');
    localStorage.setItem('taskManager', JSON.stringify(creator.getProject.projects))
}

