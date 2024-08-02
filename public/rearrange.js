document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('tasklistID');
    const editInput = document.getElementById('editInputID');
    const editButton = document.getElementById('editbuttonID');
    
    const urlParams = new URLSearchParams(window.location.search);
    const task = urlParams.get('task');
    const taskId = urlParams.get('id');

    if (task && taskId) {
        // Display the task to be edited.
        const listItem = document.createElement('li');
    listItem.textContent = `--> ${task}`;
    taskList.appendChild(listItem);

        // Populate the input field with the task
        // editInput.value = task; "this was like a placeholder but there is no need because we already display current task above!"

        // Task Changer Button
        editButton.addEventListener('click', () => {
            const newTask = editInput.value.trim();
            if (newTask) {
                fetch(`/tasks/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ task: newTask, completed: false })
                })
                .then(response => response.json())
                .then(data => {
                    alert('Task updated!');
                    window.location.href = `index.html`;
                })
                .catch(error => {
                    console.error('Error updating task:', error);
                    alert('Failed to update task');
                });
            } else {
                alert('Please enter your task to do!');
            }
        });

        // Delete button
        // const deleteButton = document.createElement('button');
        const deleteButton = document.getElementById('deletebuttonID');
        //deleteButton.textContent = 'Delete the Task';
        deleteButton.addEventListener('click', () => {
            fetch(`/tasks/${taskId}`, {
                method: 'DELETE'
            })
            .then(() => {
                alert('Task deleted!');
                window.location.href = `index.html`;
            })
            .catch(error => {
                console.error('Error deleting task:', error);
                alert('Failed to delete task');
            });
        });
        // listItem.appendChild(deleteButton);
    } else {
        alert('No task to rearrange');
    }
});
