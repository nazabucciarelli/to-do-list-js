class Task {
    id;
    description;
    completed;
    deleted;

    constructor(id, description, completed, deleted) {
        this.id = id;
        this.description = description;
        this.completed = completed;
        this.deleted = deleted;
    }
}

let tasks = [new Task(1, "Go walk the dog", false, true), new Task(2, "Get the car washed", true, false), new Task(3, "Do homework", false, false)];
let select = document.getElementById("taskTypeSelect");

const addTask = () => {
    let inputElement = document.getElementById("description-input");
    tasks.push(new Task(tasks[tasks.length -1].id +1, inputElement.value, false, false));
    inputElement.value = ""
    listTasks();
}

const deleteTask = (id) => {
    let task = document.getElementById("task-" + id);
    tasks.filter((t) => t.id === id)[0].deleted = true;
    task.classList.add("hidden");
}

const completeTask = (id) => {
    let task = tasks.filter((t) => t.id === id)[0].completed = true;
    task.completed = true;
    let taskElement = document.getElementById("task-" + id);
    taskElement.classList.add("hidden")
}

const listTasks = () => {
    const tasksContainer = document.getElementById("tasks-container");
    while (tasksContainer.firstChild) {
        tasksContainer.removeChild(tasksContainer.firstChild);
    }
    let completedTasks = select.value;
    let addTaskContainer = document.getElementById("add-task-container");
    completedTasks === "true" ? addTaskContainer.classList.add("hidden"): addTaskContainer.classList.remove("hidden");
    const filteredTasks = tasks.filter((task) => completedTasks === "false" ? task.completed === false : task.completed === true)

    for (let i = 0; i < filteredTasks.length; i++) {
        if (filteredTasks[i].deleted) {
            continue;
        }
        let task = filteredTasks[i];
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.setAttribute("id", "task-" + task.id);
        const taskDescription = document.createElement("h3");
        const textNode = document.createTextNode(task.description);
        taskDescription.appendChild(textNode);

        const taskCompleted = document.createElement("p");
        const taskCompletedTextNode = document.createTextNode(completedTasks === "true" ? "Completed" : "Pending");
        taskCompleted.appendChild(taskCompletedTextNode);

        const buttonContainer = document.createElement("div");

        const deleteButton = document.createElement("button");
        const deleteButtonText = document.createTextNode("Delete");
        deleteButton.appendChild(deleteButtonText);
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        const doneButton = document.createElement("button");
        const doneButtonText = document.createTextNode("Done");
        doneButton.appendChild(doneButtonText);
        doneButton.addEventListener("click",() => completeTask(task.id))

        taskDiv.appendChild(taskDescription);
        taskDiv.appendChild(taskCompleted);
        buttonContainer.appendChild(deleteButton);
        completedTasks === "true" ? taskCompleted.classList.add("green") :buttonContainer.appendChild(doneButton);
        taskDiv.appendChild(buttonContainer);

        tasksContainer.appendChild(taskDiv);
    }
}

select.addEventListener("change", () => {
    listTasks();
})

document.getElementById("add-task-button").addEventListener("click", () => {addTask()})
listTasks();
