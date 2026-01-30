const API = "http://localhost:5000/tasks"; // backend URL
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Load tasks from backend
async function loadTasks() {
    taskList.innerHTML = "";
    const res = await fetch(API);
    const tasks = await res.json();

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.style.padding = "8px";
        li.style.marginBottom = "5px";
        li.style.border = "1px solid #ccc";
        li.style.borderRadius = "5px";
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";

        // Color based on status
        const statusColor = task.status === "Done" ? "green" : "orange";

        li.innerHTML = `
            <span>
                <b>${task.title.replace(/'/g,"\\'")}</b> - ${task.description.replace(/'/g,"\\'")} 
                <span style="color:${statusColor}; font-weight:bold;">[${task.status}]</span>
            </span>
            <span>
                <button onclick="editTask('${task._id}', '${task.title.replace(/'/g,"\\'")}', '${task.description.replace(/'/g,"\\'")}')">Edit</button>
                <button onclick="deleteTask('${task._id}')">Delete</button>
                <button onclick="toggleStatus('${task._id}', '${task.status}')">Toggle Status</button>
            </span>
        `;
        taskList.appendChild(li);
    });
}

// Add new task
taskForm.addEventListener("submit", async e => {
    e.preventDefault();
    const newTask = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        status: document.getElementById("status").value
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
    });

    taskForm.reset();
    loadTasks();
});

// Delete task
async function deleteTask(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadTasks();
}

// Toggle status
async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === "Pending" ? "Done" : "Pending";

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
    });

    loadTasks();
}

// Edit task
async function editTask(id, oldTitle, oldDescription) {
    const newTitle = prompt("Update title:", oldTitle);
    const newDesc = prompt("Update description:", oldDescription);

    if (newTitle && newDesc) {
        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle, description: newDesc })
        });
        loadTasks();
    }
}

// Load tasks initially
loadTasks();
