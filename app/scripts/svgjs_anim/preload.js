'use strict';
/*global SVGjsAnim, mill */

import { SVG } from '@svgdotjs/svg.js';
import EventBus from 'eventbusjs';

SVGjsAnim.prototype.images = [
  'images/master.svg'
];

SVGjsAnim.prototype.preloadedImages = false;

SVGjsAnim.prototype.preloadFinish = function() {
    mill.howManyLoaded++;
    if (mill.howManyImages ===  mill.howManyLoaded) {
        mill.preloadedImages = true;
    }
};

SVGjsAnim.prototype.preload = function() {
    this.howManyImages = this.images.length;
    this.howManyLoaded = 0;
    while (this.images.length > 0) {
        var img = document.createElement('img');
        img.src = this.images.shift();
        img.addEventListener('load', this.preloadFinish);
    }
};

export function initPreload(anim) {
  const preload = anim.draw.group().attr({ id: 'preload' });
  
  // Add preload-specific elements and animations here
  const preloadHeading = preload.text('Preload').move(50, 50);
  
  // Example animation
  preloadHeading.animate(1000).move(100, 100);
  
  // Add event listeners
  EventBus.addEventListener('preload_start', () => {
    // Start preload animations
  });
  
  EventBus.addEventListener('preload_stop', () => {
    // Stop preload animations
  });
}


