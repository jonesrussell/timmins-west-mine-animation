'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Skipping = function() {
  this.skipping = this.draw
    .group()
    .attr('id', 'skipping');
  this.scene.add(this.skipping);

  this.headings.skipping = this.Heading('ORE__x26__WASTE_SKIPPING_Video', 'skipping', 4.9, 690, 700);
  this.sceneHeadings.add(this.headings.skipping);

  return this;
};

