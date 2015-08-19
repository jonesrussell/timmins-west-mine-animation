'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Haulage = function() {
  this.haulage = this.draw
    .group()
    .attr('id', 'haulage');

  this.headings.haulage = this.Heading('Haulage_Video', 'haulage', 4.9, 1240, 690);

  this.scene
    .add(this.headings.haulage);

  return this;
};

