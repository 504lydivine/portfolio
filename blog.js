document.getElementById('saveProject').addEventListener('click', saveProject);

function saveProject() {
    const title = document.getElementById('projectTitle').value;
    const date =document.getElementById('date').value;
    const description = document.getElementById('projectDescription').value;
    

    if (title && description && date) {
        const project = {
            title: title,
            date:date,
            description: description
        };

        // Get the current projects from localStorage
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        
        // Add the new project to the array
        projects.push(project);
        
        // Save the updated projects array back to localStorage
        localStorage.setItem('projects', JSON.stringify(projects));

        // Clear input fields
        document.getElementById('projectTitle').value = '';
        document.getElementById('date').value='';
        document.getElementById('projectDescription').value = '';

        // Refresh the project list
        displayProjects();
    } else {
        alert('Please fill out both fields!');
    }
}

function displayProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const projectList = document.getElementById('projectList');
    
    // Clear the current list
    projectList.innerHTML = '';

    // Add each project to the list
    projects.forEach((project, index) => {
        const listItem = document.createElement('div');
         listItem.className='data';
        listItem.innerHTML = `${project.title}<br><br>${project.description}<br><br>${project.date}`;


        // Optional: Add a delete button
        const deleteButton = document.createElement('button');
        
        deleteButton.className='delete';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            deleteProject(index);
        };
        
        listItem.appendChild(deleteButton);
        projectList.appendChild(listItem);
    });
}

function deleteProject(index) {
    // Retrieve projects, remove the selected one, and save back to localStorage
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
    
    // Refresh the project list
    displayProjects();
}

// Display projects on page load
document.addEventListener('DOMContentLoaded', displayProjects);