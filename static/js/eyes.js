$(function() {

  var container = $('#content')[0];

  Two.Resolution = 24;

  // assign new instance of window level class library "Two" to variable "svgOne"
  var svgOne = new Two({
    // width of container
    width: 400,
    // height of container
    height: 400
  // insert the variable and its configuration into target container
  }).appendTo(container);
  // assign new instance of window level class library "Two" to variable "svgTwo"
  var svgTwo = new Two({
    // width of container
    width: 400,
    // height of container
    height: 400
  // insert the variable and its configuration into target container
  }).appendTo(container);

  // describe variable "eyes" with list of containers as modified by function "makeEye"
  var eyes = [
    makeEye(svgOne),
    makeEye(svgTwo)
  ];

  // render each SVG as DOM element
  eyes[0].domElement = svgOne.renderer.domElement;
  eyes[1].domElement = svgTwo.renderer.domElement;

  // this is a variable that has been assigned the function that manages
  // the rate at which the listener function fires. this variable is called
  // one second after the eyes have finished moving to their destination,
  // thus returning the eyes to their resting position at the center
  var releaseEyes = _.debounce(function() {
    // "_" is variable referring to both eyes
    _.each(eyes, function(eye) {
      // this function clears the eye.ball element
      eye.ball.destination.clear();
    });
  // debounce after one second
}, 1000);

  //
  var $window = $(window)
    .bind('mousemove', mousemove)
    .bind('touchmove', function(e) {
      var touch = e.originalEvent.changedTouches[0];
      mousemove({
        clientX: touch.pageX,
        clientY: touch.pageY
      });
      return false;
    });

  svgOne.bind('update', function() {
    var eye = eyes[0];
    eye.ball.translation.x += (eye.ball.destination.x - eye.ball.translation.x) * 0.0625;
    eye.ball.translation.y += (eye.ball.destination.y - eye.ball.translation.y) * 0.0625;
  }).play();
  svgTwo.bind('update', function() {
    var eye = eyes[1];
    eye.ball.translation.x += (eye.ball.destination.x - eye.ball.translation.x) * 0.0625;
    eye.ball.translation.y += (eye.ball.destination.y - eye.ball.translation.y) * 0.0625;
  }).play();

  function mousemove(e) {

    var mouse = new Two.Vector(e.clientX, e.clientY);
    _.each(eyes, function(eye) {
      var rect = eye.domElement.getBoundingClientRect();
      var center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      var theta = Math.atan2(mouse.y - center.y, mouse.x - center.x);
      var distance = mouse.distanceTo(center);
      var pct = distance / $window.width();
      var radius = 75 * pct;
      eye.ball.destination.set(radius * Math.cos(theta), radius * Math.sin(theta));
    });

    releaseEyes();

  }

  // this function puts the eyes together with inputs "two" and "color"
  function makeEye(two, color) {

    // variable "ball" is an object that contains "retina", "pupil",
    // "reflection", "lid", "points", "midpoint", "topbrow", topMask", "botbrow"
    var ball = two.makeGroup();
    var eye = two.makeGroup();

    var retina = two.makeCircle(0, 0, two.height / 4);
    retina.fill = color || getRandomColor();
    retina.noStroke();

    var pupil = two.makeCircle(0, 0, two.height / 6);
    pupil.fill = '#333';
    pupil.linewidth = 10;
    pupil.noStroke();
    var reflection = two.makeCircle(two.height / 12, - two.height / 12, two.height / 12)
    reflection.fill = 'rgba(255, 255, 255, 0.9)';
    reflection.noStroke();

    var lid = two.makeEllipse(0, 0, two.height / 3, two.height / 4);

    var points = [
      new Two.Vector(0, two.height / 2),
      new Two.Vector(0, 0),
      new Two.Vector(two.width, 0),
      new Two.Vector(two.width, two.height / 2)
    ];
    var midpoint = Math.round(lid.vertices.length / 2) - 1;
    var topbrow = lid.vertices.slice(midpoint).reverse();
    for (var i = 0; i < topbrow.length; i++) {
      var v = topbrow[i];
      points.push(new Two.Vector(v.x + two.width / 2, v.y + two.height / 2));
    }
    for (var i = 0; i < points.length; i++) {
      var v = points[i];
      v.x -= two.width / 2;
      v.y -= two.height / 2;
    }
    var topMask = two.makePath(points);
    topMask.fill = 'white';
    topMask.noStroke();

    points = [
      new Two.Vector(0, two.height / 2),
      new Two.Vector(0, two.height),
      new Two.Vector(two.width, two.height),
      new Two.Vector(two.width, two.height / 2)
    ];
    var botbrow = [lid.vertices[lid.vertices.length - 1]].concat(lid.vertices.slice(0, midpoint + 1));
    for (var i = 0; i < botbrow.length; i++) {
      var v = botbrow[i];
      points.push(new Two.Vector(v.x + two.width / 2, v.y + two.height / 2));
    }
    for (var i = 0; i < points.length; i++) {
      var v = points[i];
      v.x -= two.width / 2;
      v.y -= two.height / 2;
    }
    var botMask = two.makePath(points);
    botMask.fill = 'white';
    botMask.noStroke();

    lid.remove();
    lid = two.makeEllipse(0, 0, two.height / 3, two.height / 4);
    lid.stroke = '#333';
    lid.linewidth = 15;
    lid.noFill();

    ball.add(retina, pupil, reflection);
    ball.destination = new Two.Vector();

    eye.add(ball, topMask, botMask, lid);
    eye.translation.set(two.width / 2, two.height / 2)

    eye.masks = [topbrow, botbrow];
    eye.ball = ball;

    return eye;

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
      + 0.66 + ')';
  }

});
