let grid = new Grid(10);
let matBox = new MatBox(450, 0, 3);
let points;
let homoModeButton;
let homographySelectMode = false;
let homoPoints = new HomoPoints();

let debugMessage = "";

function setup() {
    createCanvas(800, 400);
    grid.setup();
    points = new Points(grid,3);
    
    homoModeButton = new ClickableBox(450, 150, 250, 30);
    homoModeButton.text = "start homography transform";
}
function draw(){
    background(0);
    grid.draw();
    points.draw();
    matBox.draw();

    homoModeButton.draw();
    homoPoints.draw();

    //debugMessage
    fill(255);
    text(debugMessage, 100, height);
}

// mouse control
let curVal = 1.0;
let prevY;
function mouseClicked(){
    if(homographySelectMode){
        let v = createVector(mouseX, mouseY);
        homoPoints.points.push(v);
        if(homoPoints.points.length >= 4){
            homoMat = computeHomography();
            homographySelectMode = false;
            homoPoints.reset();
            homoModeButton.active = false;
            debugMessage = "";
        }
    }
    else{
        matBox.clickEvent(mouseX, mouseY);
        if(homoModeButton.isInside(mouseX, mouseY)){
            debugMessage = "select four points to transform";
            homographySelectMode = true;
            homoModeButton.active = true;
        }
    }
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

function computeHomography(){

    let x0 = 0;
    let y0 = 0;
    let x1 = 10;
    let y1 = 0;
    let x2 = 0;
    let y2 = 10;
    let x3 = 10;
    let y3 = 10;

    homoPoints.toGrid();
    let _x0 = homoPoints._points[0].x;
    let _y0 = homoPoints._points[0].y;
    let _x1 = homoPoints._points[1].x;
    let _y1 = homoPoints._points[1].y;
    let _x2 = homoPoints._points[2].x;
    let _y2 = homoPoints._points[2].y;
    let _x3 = homoPoints._points[3].x;
    let _y3 = homoPoints._points[3].y;

    const M = math.matrix([
        [x0, y0, 1, 0, 0, 0, -x0*_x0, -y0*_x0],
        [0, 0, 0, x0, y0, 1, -x0*_y0, -y0*_y0],
        [x1, y1, 1, 0, 0, 0, -x1*_x1, -y1*_x1],
        [0, 0, 0, x1, y1, 1, -x1*_y1, -y1*_y1],
        [x2, y2, 1, 0, 0, 0, -x2*_x2, -y2*_x2],
        [0, 0, 0, x2, y2, 1, -x2*_y2, -y2*_y2],
        [x3, y3, 1, 0, 0, 0, -x3*_x3, -y3*_x3],
        [0, 0, 0, x3, y3, 1, -x3*_y3, -y3*_y3]
    ]);

    const _x = [_x0, _y0, _x1, _y1, _x2, _y2, _x3, _y3];
    const Minv = math.inv(M);
    const h = math.multiply(Minv, _x)._data; // 1x8 value;
    h.push(1);
    let matvals = matBox.setValue(h);
    points.mat = math.matrix(matvals);
    points.matvals = matvals;
    for(var i=0; i < matBox.dim; i++){
        for(var j=0; j < matBox.dim; j++){
            const boxIdx = i + j*matBox.dim;
            matBox.boxes[boxIdx].val = matvals[i][j];
        }
    }
    return;
}
//mouseEvent(dragup / down)