'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Hoisting = function() {
  this.hoisting = this.draw
    .group()
    .attr('id', 'hoisting')
  ;
  this.scene.add(this.hoisting);

  this.elevator = this.draw.elevator();
  this.rockBreaker = this.draw.rockBreaker();
  this.rockBreakerRocks = this.draw.rockBreakerRocks();

  this.hoisting
    .add(this.rockBreaker)
    .add(this.rockBreakerRocks)
    .add(this.elevator)
  ;

  this.elevator.go();
  this.rockBreaker.go();
  this.rockBreakerRocks.go();

  return this;
};

