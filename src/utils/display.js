

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
