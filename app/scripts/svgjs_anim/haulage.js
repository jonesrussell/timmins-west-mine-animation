'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Haulage = function() {
  this.haulage = this.draw
    .group()
    .attr('id', 'haulage')
  ;

  this.dumpTruckDump = this.draw.dumpTruck();
  this.haulage.add(this.dumpTruckDump);
  this.dumpTruckDump.go();

  this.scene
    .add(this.haulage)
  ;

  this.headings.haulage = this.Heading('Haulage_Video', 'haulage', 3.65, 560, 600);
  this.sceneHeadings.add(this.headings.haulage);

  return this;
};

