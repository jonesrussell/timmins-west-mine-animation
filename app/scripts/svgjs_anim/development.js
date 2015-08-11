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
      console.log('development');
      console.log(svgjsanim.scene.transform());
      console.log(this);
      svgjsanim.scene
        .move(-3700, -1100)
        .scale(4);
      console.log(svgjsanim.scene.transform());
    });
  this.scene
    .add(this.headings.development);

  this.headings.mucking = this.draw
    .use('Mucking', 'images/headings.svg')
    .move(-150, -667)
    .click(function(){
      svgjsanim.scene
        .move(-3700, -1100)
        .scale(5);
    });
  this.scene
    .add(this.headings.mucking);



  return this;
};

