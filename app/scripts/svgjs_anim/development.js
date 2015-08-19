'use strict';
/*global SVGjsAnim, EventBus */

SVGjsAnim.prototype.Development = function() {
  this.development = this.draw
    .group()
    .attr('id', 'development');

  // IE doesn't read image size
  var w = this.origSceneW;
  var h = this.origSceneH;

  this.scooptramTimmins2 = this.draw.image('images/scooptram_timmins2.svg', w, h);
  this.scene.add(this.scooptramTimmins2);

  this.groundSupport = this.draw.image('images/ground_support.svg', w, h);
  this.scene.add(this.groundSupport);

  this.jumboDrill = this.draw.image('images/jumbo_drill.svg', w, h);
  this.scene.add(this.jumboDrill);

  this.headings.development = this.Heading('Development_Video_1_', 'development', 4.9, 1240, 690);

  this.scene
    .add(this.development)
    .add(this.headings.development);

  return this;
};

