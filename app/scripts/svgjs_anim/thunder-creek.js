'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.ThunderCreek = function() {
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
  var zimbaBit1  = this.draw.use('TC_Loading_Longholes_Top_1', 'images/master.svg');
  var zimbaBit2  = this.draw.use('TC_Loading_Longholes_Top_2', 'images/master.svg');
  var zimbaBit3  = this.draw.use('TC_Loading_Longholes_Top_3', 'images/master.svg');
  var zimbaBit4  = this.draw.use('TC_Loading_Longholes_Top_4', 'images/master.svg');
  var zimbaBit5  = this.draw.use('TC_Loading_Longholes_Top_5', 'images/master.svg');
  this.zimbaBits
    .add(zimbaBit1)
    .add(zimbaBit2)
    .add(zimbaBit3)
    .add(zimbaBit4)
    .add(zimbaBit5)
  ;
  this.thunderCreek.add(this.zimbaBits);

  /* Zimba */
  this.zimba = this.draw.zimba(this.zimbaBits);
  this.thunderCreek.add(this.zimba);
  var self = this;
  this.zimba.getInPosition().after(function(){
    self.zimba.go();
  });

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

