'use strict';
/*global SVGjsAnim */

import { SVG } from '@svgdotjs/svg.js';
import EventBus from 'eventbusjs';

export function initShop(anim) {
  // Create shop group
  const shop = anim.draw.group().attr({ id: 'shop' });
  
  // Add shop-specific elements and animations here
  const shopHeading = shop.text('Shop').move(50, 50);
  
  // Example animation
  shopHeading.animate(1000).move(100, 100);
  
  // Add event listeners
  EventBus.addEventListener('shop_start', () => {
    // Start shop animations
  });
  
  EventBus.addEventListener('shop_stop', () => {
    // Stop shop animations
  });
}

SVGjsAnim.prototype.Shop = function() {
  this.shop = this.draw
    .group()
    .attr('id', 'shop');

  this.headings.shop = this.Heading('Shop_Video', 'shop', 4.9, 650, 550);

  this.scene
    .add(this.shop);
  this.sceneHeadings
    .add(this.headings.shop);

  return this;
};

