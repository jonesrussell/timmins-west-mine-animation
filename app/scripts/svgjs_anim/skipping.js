'use strict';
/*global SVGjsAnim */

import EventBus from 'eventbusjs';

SVGjsAnim.prototype.Skipping = function() {
  this.skipping = this.draw
    .group()
    .attr('id', 'skipping');
  this.scene.add(this.skipping);

  this.skip = this.draw.skip();
  this.skipping.add(this.skip);
  this.skip.go();

  this.headings.skipping = this.Heading('ORE__x26__WASTE_SKIPPING_Video', 'skipping', 4.9, 690, 700);
  this.sceneHeadings.add(this.headings.skipping);

  // Add skipping-specific elements and animations here
  const skippingHeading = this.skipping.text('Skipping').move(50, 50);
  
  // Example animation
  skippingHeading.animate(1000).move(100, 100);
  
  // Add event listeners
  EventBus.addEventListener('skipping_start', () => {
    // Start skipping animations
  });
  
  EventBus.addEventListener('skipping_stop', () => {
    // Stop skipping animations
  });

  return this;
};

export function initSkipping(anim) {
  // Create skipping group
  const skipping = anim.draw.group().attr({ id: 'skipping' });
  
  // Add skipping-specific elements and animations here
  const skippingHeading = skipping.text('Skipping').move(50, 50);
  
  // Example animation
  skippingHeading.animate(1000).move(100, 100);
  
  // Add event listeners
  EventBus.addEventListener('skipping_start', () => {
    // Start skipping animations
  });
  
  EventBus.addEventListener('skipping_stop', () => {
    // Stop skipping animations
  });
}

