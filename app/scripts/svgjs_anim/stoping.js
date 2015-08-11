'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Stoping = function() {
  this.stoping = this.draw
    .group()
    .attr('id', 'stoping');

  var svgjsanim = this;

  this.headings.stoping = this.draw
    .use('STOPING', 'images/headings.svg')
    .move(-150, -667)
    .click(function(){
      svgjsanim.scene
        .animate()
        .transform({ scaleX: 4.9, scaleY: 4.9, cx: 1240, cy: 490 });
    });
  this.scene
    .add(this.headings.stoping);

  return this;
};

