class Grid{
    constructor(_interval){
        this.interval = _interval;
        this.stepNum = 10;
        this.stepSize = 40;
        this.intersections = [];
    }

    setup(){
        for(var i = 1; i < this.stepNum-1; i++){
            for(var j = 1; j < this.stepNum-1; j++){
                var x = this.stepSize * i;
                var y = this.stepSize * j;
                this.intersections.push(createVector(x, y));
            }
        }
    }

    draw(){
        strokeWeight(1);
        stroke(30);
        for(var i = 1; i < this.stepNum; i++){
            line(this.stepSize * i, 0, this.stepSize * i, width);
            line(0, this.stepSize * i, height, this.stepSize * i);
        }

        stroke(40);
        strokeWeight(4);
        line(this.stepSize * 1, 0, this.stepSize * 1, width);
        line(0, this.stepSize * (this.stepNum-1), height, this.stepSize * (this.stepNum-1));

    }
}

class ClickableBox{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.active = false;
        this.val = 0;
    }

    setup(){

    }

    draw(){
        if(this.active)fill(80); //TODO: neon
        else fill(40);
        stroke(0);
        strokeWeight(1);
        rect(this.x, this.y, this.w, this.h);
        fill(200);
        noStroke();
        text(round(this.val,2), this.x+3, this.y+20);
    }
    isInside(x, y){
        if(x >= this.x && x <= this.x+this.w && y >= this.y && y <= this.y+this.h){
            return true;
        }
        else return false;
    }
}

class MatBox{
    constructor(x, y, dim=2){
        this.x = x;
        this.y = y;
        this.dim = dim;
        this.boxes = [];
        for(var i=0; i < this.dim; i++){
            for(var j=0; j < this.dim; j++){
                this.boxes.push(
                    new ClickableBox(this.x+40*i, this.y+40*j, 40, 40)
                );
            }
        }

        for(var i = 0; i < this.dim; i++){
            for(var j = 0; j < this.dim; j++){
                const boxIdx = i + j*this.dim;
                if(i==j)this.boxes[boxIdx].val=1;
            }
        }
    }
    setup(){
    }

    draw(){
        this.boxes.forEach(b => {b.draw();});
    }
    clickEvent(mx, my){
        this.boxes.forEach(b => {if(b.isInside(mx, my))b.active=!b.active;});
    }
}