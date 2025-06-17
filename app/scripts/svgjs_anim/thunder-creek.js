'use strict';
/*global SVGjsAnim */

import EventBus from 'eventbusjs';
import { SVGjsAnim } from '../svgjs-anim.js';

SVGjsAnim.prototype.ThunderCreek = function() {
  var zimbaBit2  = this.draw.use('TC_Loading_Longholes_Top_2', 'images/master.svg');
  var zimbaBit3  = this.draw.use('TC_Loading_Longholes_Top_3', 'images/master.svg');
  var zimbaBit4  = this.draw.use('TC_Loading_Longholes_Top_4', 'images/master.svg');
  var zimbaBit5  = this.draw.use('TC_Loading_Longholes_Top_5', 'images/master.svg');
  var tcLongholes1  = this.draw.use('TC_Yellow_Holes_1', 'images/master.svg');
  var tcLongholes2  = this.draw.use('TC_Yellow_Holes_2', 'images/master.svg');
  var tcLongholes3  = this.draw.use('TC_Yellow_Holes_3', 'images/master.svg');

  this.thunderCreek = this.draw
    .group()
    .attr('id', 'thunderCreek');
  this.scene.add(this.thunderCreek);

  // Zimba Drill holes
  this.zimbaHolesClip = this.draw
    .rect(266, 100)
    .move(200, 434)
  ;
  this.scene.add(this.zimbaHolesClip);
  this.zimbaBits = this.draw.group();
  this.zimbaBits.clipWith(this.zimbaHolesClip);
  this.zimbaBits
    .add(zimbaBit2)
    .add(zimbaBit3)
    .add(zimbaBit4)
    .add(zimbaBit5)
  ;
  this.thunderCreek.add(this.zimbaBits);

  // Zimba
  this.zimba = this.draw.zimba(this.zimbaBits);
  this.thunderCreek.add(this.zimba);
  var self = this;
  this.zimba.getInPosition().after(function(){
    self.zimba.go();
  });

  // Longholes
  this.tcLongholesClip = this.draw
    .rect(266, 100)
    .move(200, 441)
  ;
  this.scene.add(this.tcLongholesClip);
  this.tcLongholeBits = this.draw.group();
  this.tcLongholeBits.clipWith(this.tcLongholesClip);
  this.tcLongholeBits
    .add(tcLongholes1)
    .add(tcLongholes2)
    .add(tcLongholes3)
  ;
  this.scene.add(this.tcLongholeBits);

  /* Longhole Loading */
  this.tcLongholesMan = this.draw.longhole(this.tcLongholeBits);
  this.thunderCreek.add(this.tcLongholesMan);
  this.tcLongholesMan.go();

  /* Scooptram */
  this.scooptramTC = this.draw.scooptram()
    .move(-700, -42.5)
    .setX(50)
    .moveClip(975, 550)
  ;
  this.thunderCreek.add(this.scooptramTC);
  this.scooptramTC.go();

  this.headings.thunderCreek = this.Heading('Haulage_Video', 'thunderCreek', 3.65, 560, 600);
  this.sceneHeadings
    .add(this.headings.thunderCreek);

  return this;
};

export function initThunderCreek(anim) {
  // Create thunder creek group
  const thunderCreek = anim.draw.group().attr({ id: 'thunder-creek' });
  
  // Add thunder creek specific elements and animations here
  const thunderCreekHeading = thunderCreek.text('Thunder Creek').move(50, 50);
  
  // Example animation
  thunderCreekHeading.animate(1000).move(100, 100);
  
  // Add event listeners
  EventBus.addEventListener('thunder_creek_start', () => {
    // Start thunder creek animations
  });
  
  EventBus.addEventListener('thunder_creek_stop', () => {
    // Stop thunder creek animations
  });
}

