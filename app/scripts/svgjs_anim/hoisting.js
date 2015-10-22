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

  this.elevator = this.draw.elevator();
  this.dumpTruck = this.draw.image('images/truck.svg', w, h);
  this.rockBreaker = this.draw.use('Rock_Breaker', 'images/master.svg');

  this.hoisting
    .add(this.dumpTruck)
    .add(this.rockBreaker)
    .add(this.elevator);

  this.elevator.go();

  return this;
};

