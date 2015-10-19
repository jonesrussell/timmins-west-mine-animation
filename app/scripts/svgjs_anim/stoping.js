'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Stoping = function() {
  this.stoping = this.draw
    .group()
    .attr('id', 'stoping');

  this.ithStoping = this.draw.ithDrill();
  this.stoping.add(this.ithStoping);

  this.scooptramStoping = this.draw.scooptram()
    .move(0, -61.5)
    .setX(54)
  ;
  this.stoping.add(this.scooptramStoping);
  this.scooptramStoping.go();

  this.scene
    .add(this.stoping);

  this.headings.stoping = this.Heading('STOPING', 'stoping', 4.9, 1220, 525);
  this.sceneHeadings
    .add(this.headings.stoping);

  return this;
};

