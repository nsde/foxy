function runProject() {
    preview = document.getElementById('preview');
    preview.contentWindow.location.reload();
}

function saveProject() {
    // send entire innerHTML of #workspace to /api/save    
    workspace = document.getElementById('workspace');
    workspaceHTML = workspace.innerHTML;

    fetch('/api/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'html': workspaceHTML
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
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

window.onload = function () {
    // if there is no cookie with name 'project', create one
    if (!getCookie('project')) {
        // check URL arg 'project'
        if (window.location.search) {
            // window.projectCode = window.location.search.split('=')[1];
            // setCookie('project', window.projectCode);
        } else {
            // come up with a random name for the project
            window.projectCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            setCookie('project', window.projectCode);
        
            window.projectCode = getCookie('project');
            // change address bar url without reloading page
            window.history.pushState(null, null, '?project=' + window.projectCode);
        }
    }

    // load saved project from /api/load
    fetch('/api/load')
    .then(response => response.json())
    .then(data => {
        workspace = document.getElementById('workspace');
        workspace.innerHTML = data.html;
    });
};
