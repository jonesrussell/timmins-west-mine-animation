'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Stoping = function() {
  this.stoping = this.draw
    .group()
    .attr('id', 'stoping')
  ;
  this.scene.add(this.stoping);

  // ITH Drill holes
  this.ithBits = this.draw.group();
  var ithBit1  = this.draw.use('Timmins_Loading_Longholes_1', 'images/master.svg');
  var ithBit2  = this.draw.use('Timmins_Loading_Longholes_2', 'images/master.svg');
  var ithBit3  = this.draw.use('Timmins_Loading_Longholes_3', 'images/master.svg');
  var ithBit4  = this.draw.use('Timmins_Loading_Longholes_4', 'images/master.svg');
  var ithBit5  = this.draw.use('Timmins_Loading_Longholes_5', 'images/master.svg');
  var ithBit6  = this.draw.use('Timmins_Loading_Longholes_6', 'images/master.svg');
  var ithBit7  = this.draw.use('Timmins_Loading_Longholes_7', 'images/master.svg');
  var ithBit8  = this.draw.use('Timmins_Loading_Longholes_8', 'images/master.svg');
  this.ithBits
    .add(ithBit1)
    .add(ithBit2)
    .add(ithBit3)
    .add(ithBit4)
    .add(ithBit5)
    .add(ithBit6)
    .add(ithBit7)
    .add(ithBit8)
  ;
  this.stoping.add(this.ithBits);

  /* In the hole drill */
  this.ithStoping = this.draw.ithDrill(this.ithBits);
  this.stoping.add(this.ithStoping);
  var self = this;
  this.ithStoping.getInPosition().after(function(){
    self.ithStoping.go();
  });

  /* Scooptram */
  this.scooptramStoping = this.draw.scooptram()
    .move(0, -61.5)
    .setX(54)
  ;
  this.stoping.add(this.scooptramStoping);
  this.scooptramStoping.go();

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

