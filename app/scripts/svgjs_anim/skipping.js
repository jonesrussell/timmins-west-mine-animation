'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Skipping = function() {
  this.skipping = this.draw
    .group()
    .attr('id', 'skipping');

  return this;
};

