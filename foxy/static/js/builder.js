// make all .brick elements draggable using plain js

const bricks = document.querySelectorAll('.brick');

bricks.forEach((brick) => {
    // add the draggable attribute to each brick
    brick.setAttribute('draggable', 'true');
});
