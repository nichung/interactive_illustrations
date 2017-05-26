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
