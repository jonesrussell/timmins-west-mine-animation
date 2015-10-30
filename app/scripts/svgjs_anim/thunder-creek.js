'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.ThunderCreek = function() {
  this.thunderCreek = this.draw
    .group()
    .attr('id', 'thunderCreek');
  this.scene.add(this.thunderCreek);

  /* Zimba */
  this.zimbaDrill = this.draw.use('TC_Zimba_Longhole_Drill', 'images/master.svg');
  this.zimbaParts = this.draw.use('TC_Zimba_Longhole_Parts', 'images/master.svg');
  this.zimba = this.draw
    .group()
    .add(this.zimbaDrill)
    .add(this.zimbaParts)
  ;
  this.thunderCreek.add(this.zimba);
  this.zimba
    .animate(6000)
    .x(100)
    .loop()
  ;

  /* Longholes */
  var longholesTC = this.draw.use('TC_Loading_Longholes_Static', 'images/master.svg');
  var longholesPartsTC = this.draw.use('TC_Loading_Longholes_Parts', 'images/master.svg');
  this.longholesTCLegs1 = this.draw.use('TC_Loading_Longholes_Legs_1', 'images/master.svg');
  this.longholesTCLegs2 = this.draw.use('TC_Loading_Longholes_Legs_2', 'images/master.svg');
  this.longholesTCLegs3 = this.draw.use('TC_Loading_Longholes_Legs_3', 'images/master.svg');
  this.longholesTCLegs4 = this.draw.use('TC_Loading_Longholes_Legs_4', 'images/master.svg');
  var longholesTCLegs = this.draw.group()
    .add(this.longholesTCLegs1)
    .add(this.longholesTCLegs2)
    .add(this.longholesTCLegs3)
    .add(this.longholesTCLegs4)
  ;
  this.thunderCreek
    .add(longholesTC)
    .add(longholesPartsTC)
    .add(longholesTCLegs)
  ;

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

