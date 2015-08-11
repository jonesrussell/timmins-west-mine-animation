'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Shop = function() {
  this.shop = this.draw
    .group()
    .attr('id', 'shop');

  var svgjsanim = this;

  this.headings.shop = this.draw
    .use('Shop_Video', 'images/headings.svg')
    .move(-150, -667)
    .click(function(){
      svgjsanim.scene
        .animate()
        .transform({ scaleX: 4.9, scaleY: 4.9, cx: 1240, cy: 690 });
    });
  this.scene
    .add(this.headings.shop);

  return this;
};

