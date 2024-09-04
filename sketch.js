let size;
let cell;
var cells;
let history = [];

let cols;
let rows;
var allCells;

var position;

function setup() {
  //frameRate(10);
  createCanvas(700, 700);

  cols = 10;
  rows = 10;
  size = floor(width / cols);
  
  //allCells = 0;
  allCells = cols * rows;

  position = createVector(0, 0); //createVector(floor(random(cols)), floor(random(rows)));

  cells = [cols];
  for (var q = 0; q < cols; q++) {
    cells[q] = [rows];
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      cell = new Cell();

      cell.pos = createVector(i * size, j * size);
      cell.index = (j * cols) + i;
      cells[i][j] = cell;
    }
  }
  //allCells--;
  
  textAlign(CENTER, CENTER);
  textSize(size / 5);
}

function draw() {
  cells[position.x][position.y].visited = true;
  cells[position.x][position.y].now = true;

  background(200);

	if (maze() == false) {
    noLoop();
    cells[position.x][position.y].now = false;
    // cells[position.x + 1][position.y].show(size);
    // cells[position.x][position.y + 1].show(size);
    print("end");
	}
  
  var maxDistance = 0;
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (cells[i][j].distance > maxDistance) {
        maxDistance = cells[i][j].distance;
      }
    }
  }  
  
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      cells[i][j].show(size, maxDistance);
    }
  }
    
  // textAlign(CENTER, CENTER);
  // fill(150);
  // text("FPS: " + floor(frameRate()), width / 2, height /2);
}

function maze() {
  cells[position.x][position.y].now = false;

  if (move() == true) {
    history.push(cells[position.x][position.y].index)

    cells[position.x][position.y].visited = true;
    cells[position.x][position.y].now = true;
    cells[position.x][position.y].distance = history.length;
    allCells--;
  } else {
    let lastIndex = history.pop();
    let x = floor(lastIndex % cols);
    let y = floor(lastIndex / cols);

    position = createVector(x, y);

    cells[position.x][position.y].now = true;
    
    if ((position.x == 0) && (position.y == 0)) {
    	return false; 
    }
  }
  
  return true;
}

function move() {
  let dir = [];

  if (position.y - 1 >= 0) {
    if (cells[position.x][position.y - 1].visited != true)
      dir.push("up");
  }

  if (position.x + 1 < cols) {
    if (cells[position.x + 1][position.y].visited != true)
      dir.push("right");
  }

  if (position.y + 1 < rows) {
    if (cells[position.x][position.y + 1].visited != true)
      dir.push("down");
  }

  if (position.x - 1 >= 0) {
    if (cells[position.x - 1][position.y].visited != true)
      dir.push("left");
  }

  if (dir.length == 0) {
    return false;
  }

  let nowGo = random(dir);

  switch (nowGo) {
    case "up":
      cells[position.x][position.y].wallUp = false;
      cells[position.x][position.y - 1].wallDown = false;
      position.y--;
      break;
    case "right":
      cells[position.x][position.y].wallRight = false;
      cells[position.x + 1][position.y].wallLeft = false;
      position.x++;
      break;
    case "down":
      cells[position.x][position.y].wallDown = false;
      cells[position.x][position.y + 1].wallUp = false;
      position.y++;
      break;
    case "left":
      cells[position.x][position.y].wallLeft = false;
      cells[position.x - 1][position.y].wallRight = false;
      position.x--;
      break;
  }

  return true;
}