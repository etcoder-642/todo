

export const display = (()=>{
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
                    <option value="">Choose a Type</option>
                    <option value="One Time">One Time</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                </select>
            </li>
            <li>
                <label for="dueDate">Due Date</label>
                <input id="task-date" type="datetime-local" required>
            </li>
            <li>
                <label for="task-priority">Priority</label>
                <select name="type" id="task-priority" required>
                    <option value="">Choose your Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </li>
            <li>
                <button type="submit" class="submit">Add</button>
            </li>
            `
        },
        triggerClickOnNewProject: function(newProjectElement) {
            const clickEvent = new MouseEvent('click', {
                bubbles: true,    // Allows the event to bubble up the DOM tree
                cancelable: true, // Allows the default action of the event to be prevented
                view: window      // Specifies the Window in which the event occurred
              });
            
              // Dispatch the event on the new project element
              newProjectElement.dispatchEvent(clickEvent);            
        },
        displayProject: function(obj){
            const list = document.querySelector('.list')
            const li = document.createElement('li');
            li.classList.add('sidebar-li');
            li.setAttribute('data-project-id', obj.id)
            li.textContent = obj.projectName;

            list.append(li);

            display.triggerClickOnNewProject(li);
        },
        displayTask: function(obj){
            const card = document.querySelector('.basecard');
            const wrapper = document.querySelector('.card-wrapper');
            const clonedCard = card.cloneNode(true);
            const btns = clonedCard.querySelector('.btns');

            clonedCard.style.display = 'block';
            clonedCard.querySelector('header').textContent = obj.title;
            clonedCard.querySelector('#desc').textContent = obj.description;
            clonedCard.querySelector('#priority').textContent = obj.priority;
            clonedCard.querySelector('#type-of-task').textContent = obj.type;
            clonedCard.querySelector('#date').textContent = obj.dueDate;

            clonedCard.setAttribute('data-project-id', obj.id)
            btns.querySelector('.rmv').setAttribute('data-project-id', obj.id)
            btns.querySelector('.complete').setAttribute('data-project-id', obj.id)

            wrapper.appendChild(clonedCard);
        },
        removeCard: function(dataId){
            document.querySelector(`[data-project-id='${dataId}']`).remove();
        },
        completeCard: function(dataId) {
            document.querySelector(`.card[data-project-id='${dataId}']`).style.textDecoration = 'line-through';
        },
        showOrHideCard: function(dataId, element) {
            const card = document.querySelector(`.card[data-project-id='${dataId}']`);
            if(element.textContent === 'Hide'){
                card.querySelector('.card-content').style.display = 'none';
                element.textContent = 'Show';
            }else {
                card.querySelector('.card-content').style.display = 'block';
                element.textContent = 'Hide';
            }
    
        },
        isSidebarShown: true,
        showSideBar: function(){
            if(display.isSidebarShown === true){
                document.querySelector('.sidebar').style.display = 'none';
                document.querySelector('.hidden-sidebar').style.display = 'block';
                document.querySelector('.main').style.gridTemplateColumns = '65px 1fr';
                display.isSidebarShown = false;
            }else{
                document.querySelector('.sidebar').style.display = 'flex';
                document.querySelector('.hidden-sidebar').style.display = 'none';
                document.querySelector('.main').style.gridTemplateColumns = '20% 80%';
                display.isSidebarShown = true;
            }
        }
    }
})()
