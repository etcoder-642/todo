import './styles/main.css'
import { creator } from './utils/creator';
import { display } from './utils/display';

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





