'use strict';
/*global SVGjsAnim */

import { SVG } from '@svgdotjs/svg.js';
import EventBus from 'eventbusjs';

SVGjsAnim.prototype.Hoisting = function() {
  this.hoisting = this.draw
    .group()
    .attr('id', 'hoisting')
  ;
  this.scene.add(this.hoisting);

  this.elevator = this.draw.elevator();
  this.rockBreaker = this.draw.rockBreaker();
  this.rockBreakerRocks = this.draw.rockBreakerRocks();

  this.hoisting
    .add(this.rockBreaker)
    .add(this.rockBreakerRocks)
    .add(this.elevator)
  ;

  this.elevator.go();
  this.rockBreaker.go();
  this.rockBreakerRocks.go();

  // Add hoisting-specific elements and animations here
  const hoistingHeading = this.hoisting.text('Hoisting').move(50, 50);
  
  // Example animation
  hoistingHeading.animate(1000).move(100, 100);
  
  // Add event listeners
  EventBus.addEventListener('hoisting_start', () => {
    // Start hoisting animations
  });
  
  EventBus.addEventListener('hoisting_stop', () => {
    // Stop hoisting animations
  });

  return this;
};

export function initHoisting(anim) {
  const hoisting = anim.draw.group().attr({ id: 'hoisting' });
  
  // Add hoisting-specific elements and animations here
  const hoistingHeading = hoisting.text('Hoisting').move(50, 50);
  
  // Example animation
  hoistingHeading.animate(1000).move(100, 100);
  
  // Add event listeners
  EventBus.addEventListener('hoisting_start', () => {
    // Start hoisting animations
  });
  
  EventBus.addEventListener('hoisting_stop', () => {
    // Stop hoisting animations
  });
}

