'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Haulage = function() {
  this.haulage = this.draw
    .group()
    .attr('id', 'haulage');

  var svgjsanim = this;

  this.headings.haulage = this.draw
    .use('Haulage_Video', 'images/headings.svg')
    .move(-150, -667)
    .click(function(){
      svgjsanim.scene
        .animate()
        .transform({ scaleX: 4.9, scaleY: 4.9, cx: 1240, cy: 690 });
    });
  this.scene
    .add(this.headings.haulage);

  return this;
};

