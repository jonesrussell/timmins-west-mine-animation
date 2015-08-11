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

  this.groundSupport = this.draw.image('images/ground_support.svg', w, h);
  this.scene.add(this.groundSupport);

  this.jumboDrill = this.draw.image('images/jumbo_drill.svg', w, h);
  this.scene.add(this.jumboDrill);

  var svgjsanim = this;

  this.headings.development = this.draw
    .use('Development_Video_1_', 'images/headings.svg')
    .move(-150, -667)
    .click(function(){
      console.log(svgjsanim.scene.transform());
      svgjsanim.scene
        .animate()
        .transform({ scaleX: 4.9, scaleY: 4.9, cx: 1240, cy: 690 });
      console.log(svgjsanim.scene.transform());
    });
  this.scene
    .add(this.headings.development);

  return this;
};

