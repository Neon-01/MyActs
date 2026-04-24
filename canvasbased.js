const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let circles = [];
let selected = null;
let isDragging = false;

// DRAW ALL CIRCLES
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = (c === selected) ? "red" : "blue";
    ctx.fill();
  });
}

// CHECK IF CLICK IS INSIDE CIRCLE
function isInsideCircle(x, y, c) {
  return Math.sqrt((x - c.x) ** 2 + (y - c.y) ** 2) <= c.r;
}

// CLICK (ADD OR SELECT)
canvas.addEventListener("mousedown", function(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  selected = null;

  circles.forEach(c => {
    if (isInsideCircle(x, y, c)) {
      selected = c;
    }
  });

  if (selected) {
    isDragging = true;
    console.log("Circle selected");
  } else {
    circles.push({ x, y, r: 20 });
    console.log("Circle added");
  }

  draw();
});

// DRAG MOVE
canvas.addEventListener("mousemove", function(e) {
  if (!isDragging || !selected) return;

  const rect = canvas.getBoundingClientRect();
  selected.x = e.clientX - rect.left;
  selected.y = e.clientY - rect.top;

  draw();
});

// STOP DRAG
canvas.addEventListener("mouseup", function() {
  isDragging = false;
});

// DELETE SELECTED
document.addEventListener("keydown", function(e) {
  if (e.key === "Delete" && selected) {
    circles = circles.filter(c => c !== selected);
    selected = null;
    console.log("Circle deleted");
    draw();
  }
});

// RESIZE WITH SCROLL
canvas.addEventListener("wheel", function(e) {
  if (!selected) return;

  e.preventDefault();

  if (e.deltaY < 0) {
    selected.r += 2;
    console.log("Circle enlarged");
  } else {
    selected.r = Math.max(5, selected.r - 2);
    console.log("Circle reduced");
  }

  draw();
});

// INITIAL DRAW
draw();