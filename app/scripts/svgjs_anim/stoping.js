'use strict';
/*global SVGjsAnim, EventBus */

SVGjsAnim.prototype.Stoping = function() {
  this.stoping = this.draw
    .group()
    .attr('id', 'stoping');

  this.headings.stoping = this.Heading('STOPING', 'stoping', 4.9, 1240, 490);

  this.scene
    .add(this.stoping)
    .add(this.headings.stoping);

  return this;
};

