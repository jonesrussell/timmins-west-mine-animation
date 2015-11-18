'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Stoping = function() {
  var ithBit1  = this.draw.use('Timmins_Loading_Longholes_1', 'images/master.svg');
  var ithBit2  = this.draw.use('Timmins_Loading_Longholes_2', 'images/master.svg');
  var ithBit3  = this.draw.use('Timmins_Loading_Longholes_3', 'images/master.svg');
  var ithBit4  = this.draw.use('Timmins_Loading_Longholes_4', 'images/master.svg');
  var ithBit5  = this.draw.use('Timmins_Loading_Longholes_5', 'images/master.svg');
  var ithBit6  = this.draw.use('Timmins_Loading_Longholes_6', 'images/master.svg');
  var ithBit7  = this.draw.use('Timmins_Loading_Longholes_7', 'images/master.svg');
  var ithBit8  = this.draw.use('Timmins_Loading_Longholes_8', 'images/master.svg');

  var longholes1  = this.draw.use('Yellow_Holes_1', 'images/master.svg');
  var longholes2  = this.draw.use('Yellow_Holes_2', 'images/master.svg');
  var longholes3  = this.draw.use('Yellow_Holes_3', 'images/master.svg');
  var longholes4  = this.draw.use('Yellow_Holes_4', 'images/master.svg');

  this.stoping = this.draw
    .group()
    .attr('id', 'stoping')
  ;
  this.scene.add(this.stoping);

  // ITH Drill holes
  this.ithHolesClip = this.draw
    .rect(1366, 700)
    .move(1000, 450)
  ;
  this.scene.add(this.ithHolesClip);
  this.ithBits = this.draw.group();
  this.ithBits.clipWith(this.ithHolesClip);
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
    .moveClip(980, 550)
  ;
  this.stoping.add(this.scooptramStoping);
  this.scooptramStoping.go();

  // Longholes
  this.longholesClip = this.draw
    .rect(266, 30)
    .move(1000, 492)
  ;
  this.scene.add(this.longholesClip);
  this.longholeBits = this.draw.group();
  this.longholeBits.clipWith(this.longholesClip);
  this.longholeBits
    .add(longholes1)
    .add(longholes2)
    .add(longholes3)
    .add(longholes4)
  ;
  this.scene.add(this.longholeBits);

  /* Longhole Loading */
  var forwardPath = [ 9.5, 9.5, 7 ];
  this.longholesMan = this.draw.longhole(this.longholeBits)
    .move(682, 2.6)
    .setBitsToX(4.8)
    .setBitsToY(-25.3)
    .setForwardPathMaster(forwardPath)
    ;
  this.stoping.add(this.longholesMan);
  this.longholesMan.go();

  this.headings.stoping = this.Heading('STOPING', 'stoping', 4.9, 1220, 525);
  this.sceneHeadings
    .add(this.headings.stoping);

  return this;
};

