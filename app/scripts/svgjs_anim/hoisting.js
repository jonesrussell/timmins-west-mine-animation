'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Hoisting = function() {
//  var elements = this.draw.set();
//  var animations = this.draw.set();
  this.hoisting = this.draw
    .group()
    .attr('id', 'hoisting');

  this.skip = this.draw.skip(0, 0);
  this.hoisting.add(this.skip);

  this.elevator = this.draw.elevator(0, 0);
  this.scene.add(this.elevator);

/*  this.truck = this.draw.truck(600, 530)
    .scale(0.1)
    .setDumpAt(630, 530);
  this.scene.add(this.truck);*/

  // IE doesn't read image size
  var w = this.origSceneW;
  var h = this.origSceneH;

  this.dumpTruck = this.draw.image('images/truck.svg', w, h);
  this.scene.add(this.dumpTruck);

/*  this.rockBreaker = this.draw.rockBreaker(690, 575)
    .scale(0.1);
  this.scene.add(this.rockBreaker);*/

  this.rockBreaker = this.draw.image('images/rock_breaker.svg', w, h);
  this.scene.add(this.rockBreaker);

  this.getHoist = function() {
    return this.hoisting;
  };

  this.go = function() {
    this.skip.go();
    this.elevator.go();
//    this.truck.go();
//    this.rockBreaker.go();
  };

  return this;
};

