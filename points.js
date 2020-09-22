class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.diameter = 5;
    }
    draw(){
        strokeWeight(0);
        fill(140, 104, 255);
        ellipse(this.x, this.y, diameter, diameter);
    }
}

class Points{
    constructor(grid){
        this.intersections = grid.intersections;
        this.points = [];

        this.intersections.forEach(p => {this.points.push(new Point(p.x, p.y))});
        
    }
    draw(){
        this.points.forEach(p=>{ p.draw(); console.log(p) });
    }
}