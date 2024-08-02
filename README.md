# To-Do List Application

## Project Description
This is a simple To-Do List application that allows users to add, edit, rearrange, and delete tasks. The project is built using HTML, CSS, and JavaScript for the frontend, and Node.js with SQLite for the backend.

## Features
- Add new tasks
- Mark tasks as completed
- Edit and rearrange tasks
- Delete tasks
- Tasks are saved in an SQLite database

## Installation

### Prerequisites
- Node.js installed on your machine

### Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/username/repository.git
    cd repository
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the server**:
    ```bash
    node index.js
    ```

4. **Open the application**:
    Open your browser and go to `http://localhost:3000`

## Usage

1. **Add a new task**:
    - Enter your task in the input field and click "Add Task".
  
2. **Mark a task as completed**:
    - Click the checkbox next to a task to mark it as completed. Click again to unmark.

3. **Edit a task**:
    - Click the "Rearrange" button next to a task. Enter the new task text and click "Submit Changes".

4. **Delete a task**:
    - Click the "Delete" button next to a task to remove it.

## Backend API

### Endpoints

- **GET /tasks**
    - Retrieves all tasks
    - Response:
      ```json
      [
        {
          "id": 1,
          "task": "Example task",
          "completed": false
        }
      ]
      ```

- **POST /tasks**
    - Adds a new task
    - Request Body:
      ```json
      {
        "task": "New task"
      }
      ```
    - Response:
      ```json
      {
        "id": 2,
        "task": "New task",
        "completed": false
      }
      ```

- **PUT /tasks/:id**
    - Updates a task
    - Request Body:
      ```json
      {
        "task": "Updated task",
        "completed": true
      }
      ```
    - Response:
      ```json
      {
        "id": 1,
        "task": "Updated task",
        "completed": true
      }
      ```

- **DELETE /tasks/:id**
    - Deletes a task
    - Response:
      ```json
      {
        "result": true
      }
      ```

## Files Overview

### `index.html`
The main HTML file for displaying the to-do list.

### `rearrange.html`
The HTML file for editing and rearranging tasks.

### `style.css`
Main stylesheet for the to-do list application.

### `rearrange.css`
Stylesheet for the rearrange task page.

### `script.js`
Main JavaScript file for handling task addition, completion, and deletion.

### `rearrange.js`
JavaScript file for handling task editing and rearrangement.

### `index.js`
Node.js server file that handles API requests and serves the frontend files.

### `database.db`
SQLite database file that stores the tasks.

## Notes
- Ensure that Node.js is installed on your machine.
- Follow the setup instructions carefully to run the application.
- The application runs on port 3000 by default. Make sure this port is available on your machine.
