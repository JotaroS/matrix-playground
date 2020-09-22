class Grid{
    constructor(_interval){
        this.interval = _interval;
        this.stepNum = 10;
        this.intersections = [];
    }

    setup(){
        for(var i = 1; i < this.stepNum-1; i++){
            for(var j = 1; j < this.stepNum-1; j++){
                var x = width / this.interval * i;
                var y = height / this.interval * j;
                this.intersections.push(createVector(x, y));
            }
        }
    }

    draw(){
        strokeWeight(1);
        stroke(50);
        for(var i = 0; i < this.stepNum; i++){
            line(height / this.interval * i, 0, height / this.interval * i, width);
            line(0, width / this.interval * i, height, width / this.interval * i);
        }
    }
}