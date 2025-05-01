import './styles/main.css'
import { creator } from './utils/creator';
import { display } from './utils/display';

document.addEventListener('click', (e)=>{
    const list = document.querySelector('.list');
    const projects = creator.getProject.projects;

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
    }else if(e.target.className.includes('rmv')){
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
                // ...[data-project-id] with the .rmv button
                for(let j = 0; j <= projects[i].tasks.length -1; j++){
                    if(projects[i].tasks[j].id === e.target.dataset.projectId){
                        display.removeCard(e.target.dataset.projectId);
                        removeAndShift(projects[i].tasks, j)
                        console.log(creator.getProject.projects);
                    }
                }
            }
        }
    }else if(e.target.className.includes('complete')){
        for(let i = 0; i<= projects.length - 1; i++){
            if(projects[i].projectName === creator.currentProject){
                for(let j = 0; j <= projects[i].tasks.length -1; j++){
                    if(projects[i].tasks[j].id === e.target.dataset.projectId){
                        display.completeCard(e.target.dataset.projectId)
                    }
                }                                
            }
        }

    }else if(e.target.className.includes('show-content')){
        const dataId = e.target.parentElement

        let currentElement = e.target;

        while (currentElement && !currentElement.classList.contains('card')) {
            currentElement = currentElement.parentElement;
          }
    
        display.showOrHideCard(currentElement.dataset.projectId, e.target)
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


display.displayProject(creator.getProject.createProject('Learn Coding', 'career related'));
display.displayTask(creator.getProject.createTask('Learn Coding','Odin Project','take the Odin Project Lessons daily', 'daily', '12-06-2024 11:30:03', 'High'));





