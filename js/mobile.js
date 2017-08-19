"use strict";

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;
ctx.lineCap = "round";
ctx.lineWidth = 5;
ctx.shadowBlur = 15;

function Segment(x, y, angle, angleSize, radius) {
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.angleSize = angleSize;
  this.r = radius;
  this.x1 = 0;
  this.y1 = 0;
  this.x2 = 0;
  this.y2 = 0;
  this.color = "hsl(" + angle * 180 / Math.PI + ", 80%, 60%)";
}

Segment.prototype.draw = function () {
  ctx.save();
  ctx.fillStyle = this.color;
  ctx.strokeStyle = this.color;
  ctx.shadowColor = this.color;

  // Put origin at the center of the flower
  ctx.translate(this.x, this.y);
  // Now we can rotate around origin
  ctx.rotate(this.angle);

  // That way we don't need to think when
  // drawing each segment. Just draw because
  // it is already rotated for us
  ctx.beginPath();
  var x = Math.cos(this.angleSize / 2) * this.r;
  var y = Math.sin(this.angleSize / 2) * this.r;
  ctx.moveTo(x, -y);
  ctx.bezierCurveTo(this.x1, this.y1, this.x2, this.y2, x, y);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(this.x1, this.y1, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(this.x2, this.y2, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  var factor = 1.4;
  this.x1 = Math.cos(tick) * this.r * factor;
  this.y1 = Math.sin(tick) * this.r * factor;
  this.x2 = Math.cos(-tick) * this.r * factor;
  this.y2 = Math.sin(-tick) * this.r * factor;
};

function Flower(x, y) {
  this.x = x;
  this.y = y;
  this.numSegments = Math.round(Math.random() * 10 + 5);

  // Make it fit on screen.
  var radius = Math.min(w, h) / 3;

  // Divide a whole turn equally between
  // all the segments.
  var angleForEachSegment = Math.PI * 2 / this.numSegments;
  this.segments = [];
  for (var i = 0; i < this.numSegments; i++) {
    var angle = i * angleForEachSegment;
    var s = new Segment(this.x, this.y, angle, angleForEachSegment, radius);
    this.segments.push(s);
  }
}

Flower.prototype.draw = function () {
  this.segments.forEach(function (s) {
    return s.draw();
  });
};

var f = new Flower(w / 2, h / 2);
var tick = 0;

function animation() {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, w, h);
  f.draw();
  tick += 0.01;
}

animation();
