document.addEventListener('DOMContentLoaded', () => {

    const container = document.querySelector('.container');
    const heading = container.querySelector('h1');
    const inputButton = document.getElementById('inputID');
    const addButton = document.getElementById('addbuttonID');
    const taskList = document.getElementById('tasklistID');

    //FUNCTIONALITY(input, addButton, taskList) previosly constructed while styling.

    // function addTask(){

    //     const task = inputButton.value.trim();

    //     if(task){

    //         createTask(task);
    //         inputButton.value = '';

    //     }else{
    //         alert('Please enter your task to do!');
    //     }

    // }

    // function createTask(task) {
    //     // Create a new list item
    //     const listItem = document.createElement('li');
    //     // listItem.style.backgroundColor = '#fff';
    //     // listItem.style.padding = '10px';
    //     // listItem.style.marginBottom = '10px';
    //     // listItem.style.borderRadius = '5px';
    //     // listItem.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    //     // listItem.style.display = 'flex';
    //     // listItem.style.alignItems = 'center';

    //     // Create a checkbox and append it to the list item
    //     const checkbox = document.createElement('input');
    //     checkbox.type = 'checkbox';
    //     // checkbox.style.marginRight = '10px';
    //     // checkbox.style.width = '20px';
    //     // checkbox.style.height = '20px';
    //     checkbox.addEventListener('change', () => {
    //         if (checkbox.checked) {
    //             listItem.style.textDecoration = 'line-through';
    //         } else {
    //             listItem.style.textDecoration = 'none';
    //         }
    //     });
        
    //     listItem.appendChild(checkbox);

    //     // Create a text node and append it to the list item
    //     const textNode = document.createTextNode(task);
    //     listItem.appendChild(textNode);

    //     // Add a "Delete" button
    //     const deleteButton = document.createElement('button');
    //     deleteButton.textContent = 'Delete';
    //     deleteButton.style.justifyContent = 'right';
    //     deleteButton.addEventListener('click', () => {
    //         listItem.remove(); // Remove the task when delete button is clicked
    //     });
    //     listItem.appendChild(deleteButton);

    //     // Append the new list item to the task list
    //     taskList.appendChild(listItem);

    //     const rearrangeButton = document.createElement('button');
    //     rearrangeButton.textContent = 'Rearrange';
    //     rearrangeButton.style.marginLeft = '110px';
    //     //rearrangeButton.style.marginRight = '20px';
    //     rearrangeButton.addEventListener('click', () => {
    //         window.location.href = `rearrange.html?task=${encodeURIComponent(task)}`;
    //     });
    //     listItem.appendChild(rearrangeButton);

    // }

    addButton.addEventListener("click", addTask);

    inputButton.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach(task => {
            createTaskElement(task.id, task.task, task.completed);
        });
    });

// Görev ekle

    function addTask() {
        const task = inputButton.value.trim();

        if (task) {
            fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: task })
            })
            .then(response => response.json())
            .then(data => {
                createTaskElement(data.id, data.task, data.completed);
                inputButton.value = '';
            });
        } else {
            alert('Please insert the task first!');
        }
    }

    function createTaskElement(id, task, completed) {
        const listItem = document.createElement('li');

        // Checkbox oluştur ve liste öğesine ekle
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.addEventListener('change', () => {
            fetch(`/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: task, completed: checkbox.checked })
            });
            // checkbox.addEventListener('change', () => {
            //     if (checkbox.checked) {
            //         listItem.style.textDecoration = 'line-through';
            //     } else {
            //         listItem.style.textDecoration = 'none';
            //     }
            // });  it makes line-through for all of them even buttons not looking nice so commented out.
        });
        listItem.appendChild(checkbox);

        

        // Metin düğümünü oluştur ve liste öğesine ekle
        const textNode = document.createTextNode(task);
        listItem.appendChild(textNode);

        // Rearrange dugmesi:

        const rearrangeButton = document.createElement('button');
        rearrangeButton.textContent = 'Rearrange';
        rearrangeButton.addEventListener('click', () => {
            window.location.href = `rearrange.html?task=${encodeURIComponent(task)}&id=${id}`;
        });
        listItem.appendChild(rearrangeButton);

        // Silme düğmesi ekle
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            fetch(`/tasks/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                listItem.remove();
            });
        });
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
        listItem.style.textDecoration = completed ? 'line-through' : 'none';
    }



});
