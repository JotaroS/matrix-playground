function toCartesian(vec){
    ret = createVector();
}

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.diameter = 5;
    }

    toScreen(x, y){
        return createVector(40*x + 40, height - 40 * y - 40); //TODO: hardcoded
    }
    draw(M){
        strokeWeight(0);
        fill(140, 104, 255);
        const b = [this.x, this.y];
        const w = math.multiply(M, b);//w = Mv, M:2x2, v=1x2
        //console.log(w)
        let v = this.toScreen(w.subset(math.index(0)),w.subset(math.index(1)));
        ellipse(v.x, v.y, this.diameter, this.diameter);
    }
}

class Points{
    constructor(grid){
        //this.intersections = grid.intersections;
        this.points = [];
        this.matvals = [[1,0],[0,1]];
        this.mat=math.matrix([[1,0],[0,1]]);
        for(var i = 0; i < 10; i++){
            for(var j = 0; j < 10; j++){
                this.points.push(new Point(i, j));
            }
        }
    }
    draw(){
        this.points.forEach(p=>{ p.draw(this.mat); });
    }
}