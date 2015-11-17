'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Hoisting = function() {
  this.hoisting = this.draw
    .group()
    .attr('id', 'hoisting');
  this.scene.add(this.hoisting);

  this.elevator = this.draw.elevator();
  this.rockBreaker = this.draw.rockBreaker();

  this.hoisting
    .add(this.rockBreaker)
    .add(this.elevator)
  ;

  this.elevator.go();
  this.rockBreaker.go();

  return this;
};

