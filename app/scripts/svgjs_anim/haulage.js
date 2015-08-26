'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Haulage = function() {
  this.haulage = this.draw
    .group()
    .attr('id', 'haulage');

  // IE doesn't read image size
  var w = this.origSceneW;
  var h = this.origSceneH;

  this.zimba = this.draw.image('images/zimba_longhole.svg', w, h);
  this.scene.add(this.zimba);
  this.zimba
    .x(-30)
    .animate(6000)
    .x(6)
    .loop()
  ;

  this.scooptram = this.draw.image('images/scooptram.svg', w, h);
  this.scene.add(this.scooptram);
  this.scooptram
    .x(-30)
    .animate(6000)
    .x(6)
    .loop()
  ;

  this.headings.haulage = this.Heading('Haulage_Video', 'haulage', 4.4, 325, 530);

  this.scene
    .add(this.haulage);

  this.sceneHeadings
    .add(this.headings.haulage);

  return this;
};

