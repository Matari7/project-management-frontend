document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
    fetchDocuments();
    fetchProjects();
    fetchTasks();
    fetchMessages();
});

async function login() {
    const username = document.getElementById('auth-username').value;
    const password = document.getElementById('auth-password').value;

    try {
        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        document.getElementById('auth-response').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:7000/users');
        const users = await response.json();
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.username} - ${user.email}`;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchDocuments() {
    try {
        const response = await fetch('http://localhost:5000/documents');
        const documents = await response.json();
        const documentList = document.getElementById('document-list');
        documentList.innerHTML = '';
        documents.forEach(doc => {
            const li = document.createElement('li');
            li.textContent = `${doc.title} - ${doc.content}`;
            documentList.appendChild(li);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchProjects() {
    try {
        const response = await fetch('http://localhost:8000/projects');
        const projects = await response.json();
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = '';
        projects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = `${project.name} - ${project.description}`;
            projectList.appendChild(li);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:9000/tasks');
        const tasks = await response.json();
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.title} - ${task.description}`;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendMessage() {
    const username = document.getElementById('collab-username').value;
    const message = document.getElementById('collab-message').value;

    try {
        const response = await fetch('http://localhost:4001/collab/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, message })
        });
        const data = await response.json();
        fetchMessages();  // Refresh the messages
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchMessages() {
    try {
        const response = await fetch('http://localhost:4001/collab/messages');
        const messages = await response.json();
        const messageList = document.getElementById('message-list');
        messageList.innerHTML = '';
        messages.forEach(msg => {
            const li = document.createElement('li');
            li.textContent = `${msg.username}: ${msg.message} (at ${new Date(msg.timestamp).toLocaleTimeString()})`;
            messageList.appendChild(li);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
