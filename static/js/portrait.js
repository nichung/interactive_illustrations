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
    lineRight = portrait.line(
        489.519,
        450.149,
        eyeRight.x,
        eyeRight.y
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
    portrait.mousemove(function (event) {
        lineRight.attr({
            x2: event.pageX,
            y2: event.pageY
        });
    });
})();

// show cursor coordinates
document.getElementById("myPortrait").addEventListener("mousemove", function(event) {
    myFunction(event);
});

function myFunction(e) {
    var x = e.pageX;
    var y = e.pageY;
    var coor = "Coordinates: (" + x + "," + y + ")";
    document.getElementById("coordinates").innerHTML = coor;
}


// eyes
var leftEye = document.querySelector('#left-eye');
var rightEye = document.querySelector('#right-eye');
var leftEyeBall = document.querySelector('#eyeball-left');
var rightEyeBall = document.querySelector('#eyeball-right');
var eyes = ['leftEyeBall', 'rightEyeBall'];

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
