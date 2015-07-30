'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Development = function() {
  this.development = this.draw
    .group()
    .attr('id', 'development');

  this.skip = this.draw.skip(0, 0);
  this.development.add(this.skip);

  // IE doesn't read image size
  var w = this.origSceneW;
  var h = this.origSceneH;

  this.dumpTruck = this.draw.image('images/truck.svg', w, h);
  this.scene.add(this.dumpTruck);

/*  this.dumpTruck = this.draw.image('images/truck.svg', w, h);
  this.scene.add(this.dumpTruck);

  this.dumpTruck = this.draw.image('images/truck.svg', w, h);
  this.scene.add(this.dumpTruck);*/

  return this;
};

