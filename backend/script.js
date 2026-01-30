// API relative path (works on Render + local)
const API = "/tasks";

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// ---------------- LOAD TASKS ----------------
async function loadTasks() {
    try {
        taskList.innerHTML = "";

        const res = await fetch(API);
        if (!res.ok) throw new Error("Fetch failed");

        const tasks = await res.json();

        tasks.forEach(task => {
            const li = document.createElement("li");

            li.style.padding = "8px";
            li.style.marginBottom = "6px";
            li.style.border = "1px solid #ccc";
            li.style.borderRadius = "5px";
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";

            const statusColor = task.status === "Done" ? "green" : "orange";

            li.innerHTML = `
                <span>
                    <b>${task.title}</b> - ${task.description}
                    <span style="color:${statusColor}; font-weight:bold;">
                        [${task.status}]
                    </span>
                </span>
                <span>
                    <button onclick="editTask('${task._id}')">Edit</button>
                    <button onclick="deleteTask('${task._id}')">Delete</button>
                    <button onclick="toggleStatus('${task._id}', '${task.status}')">
                        Toggle
                    </button>
                </span>
            `;

            taskList.appendChild(li);
        });

    } catch (err) {
        console.error("LOAD ERROR:", err);
        alert("Cannot load tasks. Check console.");
    }
}

// ---------------- ADD TASK ----------------
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const status = document.getElementById("status").value;

    if (!title || !description) {
        alert("Title and description required");
        return;
    }

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, status })
        });

        if (!res.ok) throw new Error("POST failed");

        taskForm.reset();
        loadTasks();

    } catch (err) {
        console.error("ADD ERROR:", err);
        alert("Failed to add task");
    }
});

// ---------------- DELETE ----------------
async function deleteTask(id) {
    try {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        loadTasks();
    } catch (err) {
        console.error("DELETE ERROR:", err);
    }
}

// ---------------- TOGGLE STATUS ----------------
async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === "Pending" ? "Done" : "Pending";

    try {
        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });
        loadTasks();
    } catch (err) {
        console.error("TOGGLE ERROR:", err);
    }
}

// ---------------- EDIT ----------------
async function editTask(id) {
    const newTitle = prompt("New title:");
    const newDesc = prompt("New description:");

    if (!newTitle || !newDesc) return;

    try {
        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: newTitle,
                description: newDesc
            })
        });
        loadTasks();
    } catch (err) {
        console.error("EDIT ERROR:", err);
    }
}

// Initial load
loadTasks();
