'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Development = function() {
  this.development = this.draw
    .group()
    .attr('id', 'development');

  this.scooptramDevelopment = this.draw.scooptram()
    .moveClip(1000, 550)
  ;
  this.development.add(this.scooptramDevelopment);
  this.scooptramDevelopment.go();

  // Ground Support Bits
  this.gsBits = this.draw.group();
  var gsBit1  = this.draw.use('GS_Bit_6', 'images/master.svg').opacity(0);
  var gsBit2  = this.draw.use('GS_Bit_7', 'images/master.svg').opacity(0);
  var gsBit3  = this.draw.use('GS_Bit_8', 'images/master.svg').opacity(0);
  var gsBit4  = this.draw.use('GS_Bit_9', 'images/master.svg').opacity(0);
  var gsBit5  = this.draw.use('GS_Bit_10', 'images/master.svg').opacity(0);
  var gsBit6  = this.draw.use('GS_Bit_11', 'images/master.svg').opacity(0);
  var gsBit7  = this.draw.use('GS_Bit_12', 'images/master.svg').opacity(0);
  var gsBit8  = this.draw.use('GS_Bit_13', 'images/master.svg').opacity(0);
  var gsBit9  = this.draw.use('GS_Bit_14', 'images/master.svg').opacity(0);
  var gsBit10  = this.draw.use('GS_Bit_15', 'images/master.svg').opacity(0);
  var gsBit11  = this.draw.use('GS_Bit_16', 'images/master.svg').opacity(0);
  var gsBit12  = this.draw.use('GS_Bit_17', 'images/master.svg').opacity(0);
  var gsBit13  = this.draw.use('GS_Bit_18', 'images/master.svg').opacity(0);
  this.gsBits
    .add(gsBit1)
    .add(gsBit2)
    .add(gsBit3)
    .add(gsBit4)
    .add(gsBit5)
    .add(gsBit6)
    .add(gsBit7)
    .add(gsBit8)
    .add(gsBit9)
    .add(gsBit10)
    .add(gsBit11)
    .add(gsBit12)
    .add(gsBit13)
  ;
  this.development.add(this.gsBits);

  // Ground Support Truck
  this.gsTruck = this.draw.groundSupport(this.gsBits)
    .attr('id', 'gs-truck');
  this.development.add(this.gsTruck);
  this.gsTruck.go();

  this.jumboDrill = this.draw.jumboDrill();
  this.development.add(this.jumboDrill);

  this.headings.development = this.Heading('Development_Video_1_', 'development', 4.9, 1240, 690);

  this.scene
    .add(this.development);
  this.sceneHeadings
    .add(this.headings.development);

  return this;
};

