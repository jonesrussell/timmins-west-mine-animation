'use strict';
/*global SVGjsAnim */

import EventBus from 'eventbusjs';
import { SVGjsAnim } from '../svgjs-anim.js';

export function extendSVGjsAnimWithDevelopment(SVGjsAnim) {
  SVGjsAnim.prototype.Development = function() {
    var gsBit1  = this.draw.use('GS_Bit_6', 'images/master.svg').opacity(0);
    var gsBit2  = this.draw.use('GS_Bit_7', 'images/master.svg').opacity(0);
    var gsBit3  = this.draw.use('GS_Bit_8', 'images/master.svg').opacity(0);
    var gsBit4  = this.draw.use('GS_Bit_9', 'images/master.svg').opacity(0);
    var gsBit5  = this.draw.use('GS_Bit_10', 'images/master.svg').opacity(0);
    var gsBit6  = this.draw.use('GS_Bit_11', 'images/master.svg').opacity(0);
    var gsBit7  = this.draw.use('GS_Bit_12', 'images/master.svg').opacity(0);
    var gsBit8  = this.draw.use('GS_Bit_13', 'images/master.svg').opacity(0);

    this.development = this.draw
      .group()
      .attr('id', 'development');
    this.scene.add(this.development);

    this.gsBits = this.draw.group();
    this.gsBits
      .add(gsBit1)
      .add(gsBit2)
      .add(gsBit3)
      .add(gsBit4)
      .add(gsBit5)
      .add(gsBit6)
      .add(gsBit7)
      .add(gsBit8);
    this.development.add(this.gsBits);

    this.groundSupport = this.draw.groundSupport(this.gsBits);
    this.development.add(this.groundSupport);
    var self = this;
    this.groundSupport.getInPosition().after(function(){
      self.groundSupport.go();
    });

    this.headings.development = this.Heading('GROUND_SUPPORT', 'development', 4.9, 1220, 525);
    this.sceneHeadings
      .add(this.headings.development);

    // Add development-specific elements and animations here
    const developmentHeading = this.development.text('Development').move(50, 50);
    
    // Example animation
    developmentHeading.animate(1000).move(100, 100);
    
    // Add event listeners
    EventBus.addEventListener('development_start', () => {
      // Start development animations
    });
    
    EventBus.addEventListener('development_stop', () => {
      // Stop development animations
    });

    return this;
  };
}

export function initDevelopment(anim) {
  // Create development group
  const development = anim.draw.group().attr({ id: 'development' });
  
  // Add development-specific elements and animations here
  const developmentHeading = development.text('Development').move(50, 50);
  
  // Example animation
  developmentHeading.animate(1000).move(100, 100);
  
  // Add event listeners
  EventBus.addEventListener('development_start', () => {
    // Start development animations
  });
  
  EventBus.addEventListener('development_stop', () => {
    // Stop development animations
  });
}

