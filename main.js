//Global variable declarations.
let canvas = document.getElementById("canvas"); //Reference for the canvas element.
canvas.width = window.innerWidth - 60; // For the width of the canvas
canvas.height = window.innerHeight * 0.6; //For the height of the canvas
let context = canvas.getContext("2d"); //Allows user to draw in 2d
context.fillStyle = "white"; // For the canvas to be white 
context.fillRect(0, 0, canvas.width, canvas.height); //Draws the rectangle for the canvas
let restore_array = []; //For the undo button
let start_index = -1; //For the undo button
let stroke_color = 'black'; //Default stroke color
let stroke_width = "2"; //Default stroke width
let is_drawing = false; //is_drawing function is false by default

function change_color(element) { 
  stroke_color = element.style.background;
} //This function changes stroke color

function change_width(element) {
  stroke_width = element.innerHTML
} //This function changes stroke width

function start(event) { 
  is_drawing = true;
  context.beginPath();
  context.moveTo(getX(event), getY(event));
  event.preventDefault(); //Stops the default action from happening
} //This function is for when the user begins to draw

function draw(event) { 
  if (is_drawing) {
    context.lineTo(getX(event), getY(event));
    context.strokeStyle = stroke_color;
    context.lineWidth = stroke_width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault(); //Stops the default action from happening
} //This function is for when the user is actively drawing

function stop(event) { 
  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  } //This function is for when the user stops drawing
  event.preventDefault(); //Stops the default action from happening
  restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
  start_index += 1; 
}

function getX(event) {
  if (event.pageX == undefined) {return event.targetTouches[0].pageX - canvas.offsetLeft}
  else {return event.pageX - canvas.offsetLeft}
  } // Works out the X position of the click inside the canvas from the X position on the page


function getY(event) {
  if (event.pageY == undefined) {return event.targetTouches[0].pageY - canvas.offsetTop}
  else {return event.pageY - canvas.offsetTop}
} // Works out the Y position of the click inside the canvas from the Y position on the page

//Mobile and desktop Eventlisteners for the start, draw, and stop functions:
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);


function Restore() {
  if (start_index <= 0) {
    Clear()
  } else {
    start_index += -1;
    restore_array.pop();
    if ( event.type != 'mouseout' ) {
      context.putImageData(restore_array[start_index], 0, 0);
    }
  }
}//This function is to undo the most recent path/line drawn. 


function Clear() {
    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
    restore_array = [];
    start_index = -1;
} //This function clears the drawing altogether.
