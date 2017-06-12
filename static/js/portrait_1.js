(function () {

    var portrait = Snap.select("#portraitSVG");
    var eyeRight = portrait.select("#eyeball-right");
    var eyeLeft = portrait.select("#eyeball-left");

    lineLeft = portrait.line(
        219.141,
        447.36,
        eyeLeft.x,
        eyeLeft.y
    ).attr({
        stroke: "#ffff00",
        strokeWidth: 5,
        strokeLinecap: "round",
        strokeDasharray: "10 20 10 20"
    });

    portrait.mousemove(function (event) {
        lineLeft.attr({
            x2: event.pageX - 150,
            y2: event.pageY + 10
        });
    });
})();

function writeMessage(canvas, message) {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '18pt Calibri';
  context.fillStyle = 'black';
  context.fillText(message, 10, 25);
}
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  writeMessage(canvas, message);
}, false);

// eyes
var leftEye = document.querySelector('#left-eye');
var rightEye = document.querySelector('#right-eye');
var leftEyeBall = document.querySelector('#eyeball-left');
var rightEyeBall = document.querySelector('#eyeball-right');
var eyes = ['svgOne', 'svgTwo'];

// ears
var rightEar = document.querySelector('#ear-right')
var leftEar = document.querySelector('#ear-left')
var ears = ['rightEar', 'leftEar']

// nose
var nose = document.querySelector('#nose');

// hair
var leftHair = document.querySelector('#hair-left');
var rightHair = document.querySelector('#hair-right');
var topHair = document.querySelector('#hair-top');
var hair = ['leftHair', 'rightHair', 'topHair'];

nose.onclick = function() {
  leftHair.style.fill = getRandomColor();
  rightHair.style.fill = getRandomColor();
  topHair.style.fill = getRandomColor();
}

leftEar.onclick = function() {
  leftEyeBall.style.fill = getRandomColor();
  rightEyeBall.style.fill = getRandomColor();
}

// describe function that creates random colors at load
function getRandomColor() {
// outputs in 'rgba(255, 255, 255, opacity_value)' format
  return 'rgba('
    // use Math.floor to round down to the nearest integer the
    // output of Math.random multiplied by 255, followed by a comma
    + Math.floor(Math.random() * 255) + ','
    + Math.floor(Math.random() * 255) + ','
    + Math.floor(Math.random() * 255) + ','
    // constant opacity_value of .66
    + 1 + ')';
}
