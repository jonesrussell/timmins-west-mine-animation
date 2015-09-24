'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Stoping = function() {
  this.stoping = this.draw
    .group()
    .attr('id', 'stoping');

  // IE doesn't read image size
  var w = this.origSceneW;
  var h = this.origSceneH;

  this.holeDrill = this.draw.image('images/hole_drill.svg', w, h);
  this.scene.add(this.holeDrill);
  this.holeDrill
    .x(-40)
    .animate(6000)
    .x(6)
    .loop()
  ;

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

