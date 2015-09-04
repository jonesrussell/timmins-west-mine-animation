'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Hoisting = function() {
  this.hoisting = this.draw
    .group()
    .attr('id', 'hoisting');
  this.scene.add(this.hoisting);

  // IE doesn't read image size
  var w = this.origSceneW;
  var h = this.origSceneH;

  this.skip = this.draw.skip(0, 0);
  this.elevator = this.draw.elevator();
  this.dumpTruck = this.draw.image('images/truck.svg', w, h);
  this.rockBreaker = this.draw.image('images/rock_breaker.svg', w, h);

  this.hoisting
    .add(this.dumpTruck)
    .add(this.rockBreaker)
    .add(this.skip)
    .add(this.elevator);

  this.elevator.go();
  this.skip.go();
//    this.truck.go();
//    this.rockBreaker.go();

  return this;
};

