//here is what is actually taking place (the main)
var a_canvas = document.getElementById("a");
var context = a_canvas.getContext("2d");

// Draw the grid

var canvas_width= context.canvas.clientWidth;
var canvas_height= context.canvas.clientHeight;
var line_unit = canvas_width * (1/3);
setup_tictactoe();

var pyoutput={"winning_letter":null,"is_winner":false};

var turn = 1;
var gameboard= [[null,null,null],[null,null,null],[null,null,null]];


a_canvas.addEventListener('click', function(evt) {
  if (pyoutput["is_winner"]==false){
    var click_position = get_click_position(a_canvas, evt);
    var selected_box = which_box(click_position.x, click_position.y);
    if (gameboard[selected_box.rownum-1][selected_box.colnum-1]==null){
      turn++;
      draw_XO(selected_box,turn);
      send_gameboard(gameboard);
    };
  };
  if (pyoutput["is_winner"]){
    play_again();
  };
});


//if (pyoutput["is_winner"]){

  //secondclick_function = function(){
//  var click_position = get_click_position(a_canvas,event);
//  if (is_inside(click_position, click_text, text_canvasx,text_canvasy)){
  //  play_again()};

//  a_canvas.addEventListener('click', function(){
//    play_again();
//  });
//};




//here are all required functions


// vertical line 1 & line
function setup_tictactoe(){
  context.beginPath();
  context.moveTo(line_unit, 0);
  context.lineTo(line_unit, canvas_height);
  context.stroke();
  context.moveTo(line_unit*2,0);
  context.lineTo(line_unit*2, canvas_height);
  context.stroke();

//horizontal line 1 & 2
  context.moveTo(0, line_unit);
  context.lineTo(canvas_width, line_unit);
  context.stroke();

  context.moveTo(0, line_unit * 2);
  context.lineTo(canvas_width, line_unit * 2);
  context.stroke();
};
// assign each box as an object
function box(colnum, rownum) {
  this.colnum= colnum;
  this.rownum= rownum;
  this.max_x= line_unit * colnum;
  this.min_x= line_unit * (colnum - 1);
  this.mid_x = (this.min_x + this.max_x)/2;
  this.max_y= line_unit * rownum;
  this.min_y= line_unit * (rownum - 1);
  this.mid_y = (this.min_y + this.max_y)/2;
  this.boxnum= colnum + (rownum - 1)*3;
};

function which_box(x,y) {
  var max_col = Math.ceil(x/line_unit);
  var min_col = max_col - 1;
  var max_row = Math.ceil(y/line_unit);
  var min_row = max_row - 1;
  return new box(max_col,max_row);
};

function get_click_position(canvas, clickevent) {
  var canvas_rect = canvas.getBoundingClientRect();
  return {
    x: clickevent.clientX - canvas_rect.left,
    y: clickevent.clientY - canvas_rect.top
  };
};

function draw_XO(selected_box, turn) {
    if ((turn-1)%2 > 0) {
      context.moveTo(selected_box.min_x, selected_box.min_y);
      context.lineTo(selected_box.max_x, selected_box.max_y);
      context.stroke();
      context.moveTo(selected_box.max_x, selected_box.min_y);
      context.lineTo(selected_box.min_x, selected_box.max_y);
      context.stroke();
      gameboard[selected_box.rownum-1][selected_box.colnum-1]="X";
    };
    if ((turn-1)%2 == 0) {
      context.beginPath();
      context.arc(selected_box.mid_x, selected_box.mid_y, (selected_box.mid_x - selected_box.min_x), 0, 2*Math.PI);
      context.stroke();
      gameboard[selected_box.rownum-1][selected_box.colnum-1]="O";
    };
  };


function send_gameboard(data2) {
  //this is for passing board info to python
  $.ajax({
    data: JSON.stringify(data2),
    type : 'POST',
    url : '/test2',
    success: function(response){
      pyoutput= JSON.parse(response);
      //if (pyoutput["is_winner"]) {
      if (pyoutput["is_winner"] == "draw") game_is_draw();
      if (pyoutput["is_winner"] == true) game_over();
      //if (pyoutput["is_winner"]=="draw"){
        //game_is_draw();
      },
  });
};


function game_over(){
  context.clearRect(0,0, canvas_width, canvas_height);
  context.font = "20px Verdana";
  context.textAlign="center";
  context.fillText("Game Over! " + pyoutput["winning_letter"] + " won", canvas_width/2, canvas_height/(2));
  //set up play again button; first i have to figure out its coordinates
  context.font= "10px Verdana";
  click_text="Play Again?"
  text_canvasx= canvas_width/2
  text_canvasy= canvas_height/1.5
  context.fillText(click_text, text_canvasx, text_canvasy)
  };

function play_again(){
  context.clearRect(0,0, canvas_width, canvas_height);
  setup_tictactoe();
  pyoutput["is_winner"]=false;
  gameboard = [[null,null,null],[null,null,null],[null,null,null]];
  turn = 1;
};

function is_inside(click_position, click_text, text_canvasx, text_canvasy){
  text_width= context.measureText(click_text).width;
  console.log(text_width)
  text_height= context.measureText(click_text).height;
  console.log(text_height)
  text_minX= (canvas_width/2) - text_width;
  text_maxX= (canvas_width*2) - text_minX;
  text_minY= (canvas_height) + text_height/2;
  text_maxY= text_minY + text_height/2;
  return (click_position.x>text_minX && click_position.x<text_maxX && click_position.y>text_minY
  && click_position.y<textminY)
  };


function main_program(){
  if (pyoutput["is_winner"]==false){
    a_canvas.addEventListener('click', function(evt) {
      var click_position = get_click_position(a_canvas, evt);
      var selected_box = which_box(click_position.x, click_position.y);
      if (gameboard[selected_box.rownum-1][selected_box.colnum-1]==null){
        turn++;
        draw_XO(selected_box,turn);
        send_gameboard(gameboard);
      };
    });
  };
};

function game_is_draw(){
  context.clearRect(0,0, canvas_width, canvas_height);
  context.font = "20px Verdana";
  context.textAlign="center";
  context.fillText("It's a Draw!", canvas_width/2, canvas_height/(2));
  //set up play again button; first i have to figure out its coordinates
  context.font= "10px Verdana";
  click_text="Play Again?";
  text_canvasx= canvas_width/2;
  text_canvasy= canvas_height/1.5;
  context.fillText(click_text, text_canvasx, text_canvasy)
};



// ----------------------------------------------------------------- done with tictactoe ----------------------
