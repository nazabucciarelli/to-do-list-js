class Task{
    id;
    description;
    completed;

    constructor(id,description,completed){
        this.id = id;
        this.description = description;
        this.completed = completed;
    }
}

let tasks = [new Task(1,"Go walk the dog",false),new Task(2,"Get the car washed",false),new Task(3,"Do homework",false)]

const addTask = (description) => {
    tasks.push(new Task(tasks[tasks.length].id,description));
}

const deleteTask = (id) => {
    tasks.splice(tasks.find((task) => task.id === id),1);
}

const completeTask = (id) => {
    tasks[id].completed = true;
}

const listTasks = () => {
    const tasksContainer = document.getElementById("tasks-container");

    for(let i = 0; i < tasks.length;i++){
        const taskDiv = document.createElement("div")
        taskDiv.classList.add("task")
        const taskDescription = document.createElement("h3")
        const textNode = document.createTextNode(tasks[i].description)
        taskDescription.appendChild(textNode);

        const buttonContainer = document.createElement("div")

        const deleteButton = document.createElement("button")
        const deleteButtonText = document.createTextNode("Delete")
        deleteButton.appendChild(deleteButtonText)
        deleteButton.addEventListener("click",() => deleteTask(tasks[i].id))

        const doneButton = document.createElement("button")
        const doneButtonText = document.createTextNode("Done")
        doneButton.appendChild(doneButtonText)
    
        taskDiv.appendChild(taskDescription)
        buttonContainer.appendChild(deleteButton)
        buttonContainer.appendChild(doneButton)
        taskDiv.appendChild(buttonContainer);

        tasksContainer.appendChild(taskDiv)
    }
}

listTasks();