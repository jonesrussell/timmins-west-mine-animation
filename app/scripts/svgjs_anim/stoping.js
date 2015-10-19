'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Stoping = function() {
  this.stoping = this.draw
    .group()
    .attr('id', 'stoping');

  this.ithStoping = this.draw.ithDrill();
  this.stoping.add(this.ithStoping);

  this.scooptramStoping = this.draw.scooptram()
    .move(0, -61.5)
    .setX(54)
  ;
  this.stoping.add(this.scooptramStoping);
  this.scooptramStoping.go();

  this.scene
    .add(this.stoping);

  /* Longholes */
  var longholes = this.draw.use('Loading_Longholes_Static', 'images/master.svg');
  var longholesParts = this.draw.use('Loading_Longholes_Parts', 'images/master.svg');
  this.longholesLegs1 = this.draw.use('Loading_Longholes_Legs_1', 'images/master.svg');
  this.longholesLegs2 = this.draw.use('Loading_Longholes_Legs_2', 'images/master.svg');
  this.longholesLegs3 = this.draw.use('Loading_Longholes_Legs_3', 'images/master.svg');
  this.longholesLegs4 = this.draw.use('Loading_Longholes_Legs_4', 'images/master.svg');
  var longholesLegs = this.draw.group()
    .add(this.longholesLegs1)
    .add(this.longholesLegs2)
    .add(this.longholesLegs3)
    .add(this.longholesLegs4)
  ;
  this.stoping
    .add(longholes)
    .add(longholesParts)
    .add(longholesLegs)
  ;

  this.headings.stoping = this.Heading('STOPING', 'stoping', 4.9, 1220, 525);
  this.sceneHeadings
    .add(this.headings.stoping);

  return this;
};

