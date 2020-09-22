let grid = new Grid(10);
let matBox = new MatBox(450, 0, 2);
let points;
function setup() {
    createCanvas(800, 400);
    grid.setup();
    points = new Points(grid);
}
function draw(){
    background(0);
    grid.draw();
    points.draw();
    matBox.draw();
}

// mouse control
let curVal = 1.0;
let prevY;

function mouseClicked(){
    matBox.clickEvent(mouseX, mouseY);
}

function mousePressed(){
    prevY=mouseY;
}

function mouseDragged(){
    dy = prevY - mouseY;
    matvals = points.matvals;
    for(var i=0; i < matBox.dim; i++){
        for(var j=0; j < matBox.dim; j++){
            const boxIdx = i + j*matBox.dim;
            if(matBox.boxes[boxIdx].active){
                matvals[i][j]+=dy*0.01;
            }
            matBox.boxes[boxIdx].val = matvals[i][j];
        }
    }
    //curVal += dy * 0.01;
    points.mat = math.matrix(matvals);
    prevY = mouseY;
}
//mouseEvent(dragup / down)