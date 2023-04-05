function runProject() {
    preview = document.getElementById('preview');
    preview.contentWindow.location.reload();
}

function saveProject() {
    // send entire innerHTML of #workspace to /api/save    
    workspace = document.getElementById('workspace');
    workspaceHTML = workspace.innerHTML;

    // now add a value attribute to all inputs so that they can be saved
    inputs = workspace.querySelectorAll('input');
    inputs.forEach((input) => {
        input.setAttribute('value', input.value);
    });

    workspaceHTML = workspace.innerHTML;

    fetch(`/api/save/${window.projectCode}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'html': workspaceHTML
        })
    })
}

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'Enter') {
        runProject();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        saveProject();
    }
});

window.addEventListener('load', () => {
    // if there is no cookie with name 'project', create one
    if (!getCookie('project')) {
        // come up with a random name for the project
        window.projectCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        setCookie('project', window.projectCode);
    }

    if (!window.location.search.split('?project=')[1]) {
        window.history.pushState(null, null, '?project=' + getCookie('project'));
    }

    window.projectCode = window.location.search.split('?project=')[1];

    // load saved project from /api/load
    fetch(`/api/load/${window.projectCode}`)
    .then(response => response.json())
    .then(data => {
        workspace = document.getElementById('workspace');
        workspace.innerHTML = data.html;
    });
});
