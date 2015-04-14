//div on click checks to see if its the right one
//1 min timer
// deviation of color
// color chosen
// changeing grid
// score keeper
// game over with timer
//<span style="background-color: rgb(135, 57, 207); display: none;"></span>

var timeTracker;
var curTime;
var curGrid;
var curDif = 80;
var r = 256;
var g = 256;
var b = 256;
var keyBox = 1;
var score = 0;



var gRI =  function(min, max){
   return Math.floor(Math.random() * (max - min)) + min;};

var makeGrid = function(size){
   var tracker = $('thead');

   for (var i = 1; i <= size; i++) { 
      tracker.after('<tr id="tr'+ i +'"></tr>');
      tracker = $('#tr'+i);
      for (var j = 1; j <= size; j++) { 
         tracker.append('<td id="'+((i-1)*size+j)+'"> </td>');
      }
   }
   $("td").css("width", 500 / size);
   $("td").css("height", 500 / size);
   r = gRI(1, 266);
   g = gRI(1, 266);
   b = gRI(1, 266);
   $("td").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
   keyBox = gRI(1, (size * size + 1));
   var r1;
   var g1;
   var b1;
   if(r < 128){r1 = r + curDif;} else {r1 = r - curDif;} 
   if(g < 128){g1 = g + curDif;} else {g1 = g - curDif;} 
   if(b < 128){b1 = b + curDif;} else {b1 = b - curDif;} 
   $('#' + keyBox).css("background-color", "rgb(" + parseInt(r1, 10) + "," + parseInt(g1, 10) + "," + parseInt(b1, 10) + ")");
   $('#' + keyBox).bind( "click", function() {
      correctButton();
   });
};

var removeGrid = function(size){
   for (i = 1; i <= size; i++) { 
      $('#tr'+ i ).remove();
   }
};



var reset = function(){
   // start timer
   $('#reset').remove();
   curGrid = 2;
   makeGrid(curGrid);
   curTime = 0;
   score = 0;
   $('#timer').text("Time left: " + 60);
   timeTracker = setInterval(function(){timeCounter();} , 1000);
   
};

var timeCounter = function(){
   curTime += 1;
   $('#timer').text("Time left: " + (60 - curTime));
   if(curTime === 60){
      clearInterval(timeTracker);
      removeGrid(curGrid);
      $('#timer').text("Score: " + score);
      $('table').after('<button id="reset">Start</button>');
      $('#reset').bind( "click", function() {
         reset();
      });
   }
      
};

var correctButton = function(){
   removeGrid(curGrid);
   curDif -= curDif * .08;
   if(score%2 === 0){
      curGrid += 1;}
   score += 1;
   makeGrid(curGrid);
}


$(document).ready(function(){

//   clearInterval(timeTracker);

   $('#reset').click(function(){
      reset();
   });
});