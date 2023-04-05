// Color brick red on Delete key pressed
document.addEventListener('keydown', (event) => {
    if (event.key === 'Delete') {
        const brick = document.querySelector('.brick:hover');
        if (brick) {
            brick.classList.add('remove');
            brick.style.cursor = 'not-allowed';
        }
    }
});

// Remove brick on Delete key released
document.addEventListener('keyup', (event) => {
    if (event.key === 'Delete') {
        // remove every brick with class remove
        const bricks = document.querySelectorAll('.brick.remove');
        bricks.forEach((brick) => {
            brick.remove();
        });
        saveProject();
    }
});


// Save project on every keyup, but only after 500ms of inactivity
let timeout = null;
document.addEventListener('keyup', function (e) {
    clearTimeout(timeout);

    timeout = setTimeout(function () {
        saveProject();
    }, 1000);
});

'use strict';

$ = function (id) { return document.getElementById(id); };


dragula([$('sidebar'), $('workspace')], {
    copy: function (el, source) {
        return source === $('sidebar') && el.classList.contains('brick');
    },
    accepts: function (el, target) {
        return target !== $('sidebar') && el.classList.contains('brick');
    }
}).on('drop', function (el, target, source, sibling) {
    saveProject();
});
