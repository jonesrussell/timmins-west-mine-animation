'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Development = function() {
  this.development = this.draw
    .group()
    .attr('id', 'development');

  // IE doesn't read image size
  var w = this.origSceneW;
  var h = this.origSceneH;

  this.scooptramTimmins2 = this.draw.image('images/scooptram_timmins2.svg', w, h);
  this.scene.add(this.scooptramTimmins2);
  this.scooptramTimmins2
    .x(-40)
    .animate(6000)
    .x(6)
    .loop()
  ;

//  this.groundSupport = this.draw.image('images/ground_support.svg', w, h);
  var use  = this.draw.use('GS_Truck_Body', 'images/ground_support.svg', w, h)
  console.log(use);
  this.scene.add(use);
//  this.scene.add(this.groundSupport);
//  this.groundSupport
//    .x(-30)
//    .animate(6000)
//    .x(21)
//    .loop()
  ;

  this.jumboDrill = this.draw.image('images/jumbo_drill.svg', w, h);
  this.scene.add(this.jumboDrill);
  this.jumboDrill
    .x(-50)
    .animate(5000)
    .x(0)
    .loop()
  ;

  this.headings.development = this.Heading('Development_Video_1_', 'development', 4.9, 1240, 690);

  this.scene
    .add(this.development);
  this.sceneHeadings
    .add(this.headings.development);

  return this;
};

