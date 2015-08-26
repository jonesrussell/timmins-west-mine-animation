'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Shop = function() {
  this.shop = this.draw
    .group()
    .attr('id', 'shop');

  this.headings.shop = this.Heading('Shop_Video', 'shop', 4.9, 1240, 690);

  this.scene
    .add(this.shop);
  this.sceneHeadings
    .add(this.headings.shop);

  return this;
};

