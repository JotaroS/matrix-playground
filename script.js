let grid = new Grid(10);
let points = new Points(grid);

function setup() {
    createCanvas(400, 400);
    grid.setup();
}
function draw(){
    background(0);
    grid.draw();
    points.draw();
    //unitGrid.draw();

    //if(2dmat mode)
        // matrix.draw();
    // else if(homographymode)
        // matrix3d.draw();
    // instruction.draw();
}

//mouseEvent(dragup / down)