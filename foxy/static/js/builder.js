// make all .brick elements draggable using plain js

const bricks = document.querySelectorAll('.brick');

bricks.forEach((brick) => {
    // add the draggable attribute to each brick
});

'use strict';

$ = function (id) { return document.getElementById(id); };

dragula([$('sidebar'), $('workspace')], {
  copy: function (el, source) {
    return source === $('sidebar');
  },
  accepts: function (el, target) {
    return target !== $('sidebar');
  }
});
