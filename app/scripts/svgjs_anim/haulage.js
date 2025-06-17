'use strict';
/*global SVGjsAnim */

import EventBus from 'eventbusjs';

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

export function initHaulage(anim) {
  // Create haulage group
  const haulage = anim.draw.group().attr({ id: 'haulage' });
  
  // Add haulage-specific elements and animations here
  const haulageHeading = haulage.text('Haulage').move(50, 50);
  
  // Example animation
  haulageHeading.animate(1000).move(100, 100);
  
  // Add event listeners
  EventBus.addEventListener('haulage_start', () => {
    // Start haulage animations
  });
  
  EventBus.addEventListener('haulage_stop', () => {
    // Stop haulage animations
  });
}

