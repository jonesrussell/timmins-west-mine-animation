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

  this.scooptramTimmins = this.draw.image('images/scooptram_timmins.svg', w, h);
  this.scene.add(this.scooptramTimmins);
  this.scooptramTimmins
    .x(-40)
    .animate(6000)
    .x(6)
    .loop()
  ;

  this.headings.stoping = this.Heading('STOPING', 'stoping', 4.9, 1220, 525);

  this.scene
    .add(this.stoping);
  this.sceneHeadings
    .add(this.headings.stoping);

  return this;
};

