const bricks = document.querySelectorAll('.brick');

bricks.forEach((brick) => {
    
});

// Remove brick on Delete key pressed
document.addEventListener('keydown', (event) => {
    if (event.key === 'Delete') {
        const brick = document.querySelector('.brick:hover');
        if (brick) { brick.classList.add('remove'); }
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Delete') {
        // remove every brick with class remove
        const bricks = document.querySelectorAll('.brick.remove');
        bricks.forEach((brick) => {
            brick.remove();
        });
    }
});

'use strict';

$ = function (id) { return document.getElementById(id); };

dragula([$('sidebar'), $('workspace')], {
  copy: function (el, source) {
    return source === $('sidebar');
  },
  accepts: function (el, target) {
    return target !== $('sidebar') && el.classList.contains('brick');
  }
});
