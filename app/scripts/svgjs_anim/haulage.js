'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Haulage = function() {
  this.haulage = this.draw
    .group()
    .attr('id', 'haulage')
  ;
  this.scene.add(this.haulage);

  this.dumpTruckHaul = this.draw.dumpTruckHaul();
  this.haulage.add(this.dumpTruckHaul);
  this.dumpTruckHaul.go();

  this.dumpTruckDump = this.draw.dumpTruck();
  this.haulage.add(this.dumpTruckDump);
  this.dumpTruckDump.go();

  this.headings.haulage = this.Heading('Haulage_Video', 'haulage', 3.65, 560, 600);
  this.sceneHeadings.add(this.headings.haulage);

  return this;
};

