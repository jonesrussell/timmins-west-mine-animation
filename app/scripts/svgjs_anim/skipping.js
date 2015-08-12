'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Skipping = function() {
  this.skipping = this.draw
    .group()
    .attr('id', 'skipping');

  var svgjsanim = this;

  this.headings.skipping = this.draw
    .use('ORE__x26__WASTE_SKIPPING_Video', 'images/headings.svg')
    .move(-150, -667)
    .click(function(){
      svgjsanim.scene
        .animate()
        .transform({ scaleX: 4.9, scaleY: 4.9, cx: 690, cy: 675 });
    });
  this.scene
    .add(this.headings.skipping);

  return this;
};

