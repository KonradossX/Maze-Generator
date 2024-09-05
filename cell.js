class Cell {
	
	constructor() {
		this.wallUp = true; //floor(random(2)); //true;
		this.wallRight = true; //floor(random(2));
		this.wallDown = true; //floor(random(2));
		this.wallLeft = true; //floor(random(2));
    
    this.visited = false; //floor(random(2));
    this.now = false;
		
  	this.pos = createVector(0,0);
    this.index = 0;
    
    this.distance = 0;
	}
	
	show(size, maxDistance) {
    let lineSize = floor(size / 20);
    strokeWeight(lineSize * 2);
    
    if(this.visited) {
      noStroke();
      //fill(255);
      var color = 200 * (this.distance / maxDistance);
      fill(50, 255 - color, 0);
    	rect(this.pos.x + lineSize, this.pos.y + lineSize, size - 2 * lineSize, size - 2 * lineSize);
    	
      noStroke();
  		fill(color);
  		text(this.distance, this.pos.x + size / 2, this.pos.y + size / 2);
    }
    
    if(this.now) {
      noStroke();
      fill(100);
    	rect(this.pos.x + lineSize, this.pos.y + lineSize, size - 2 * lineSize, size - 2 * lineSize);
    }
    
    stroke(0);
    
    if (this.wallUp) {
      line(this.pos.x, this.pos.y, this.pos.x + size, this.pos.y);
    }
    
    if (this.wallRight) {
      line(this.pos.x + size, this.pos.y, this.pos.x + size, this.pos.y + size);
    }
    
    if (this.wallDown) {
      line(this.pos.x, this.pos.y + size, this.pos.x + size, this.pos.y + size);
    }
    
    if (this.wallLeft) {
      line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + size);
    }
	}
}