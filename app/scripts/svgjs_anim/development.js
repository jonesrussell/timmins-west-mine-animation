'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Development = function() {
  this.development = this.draw
    .group()
    .attr('id', 'development');

  // IE doesn't read image size
  var w = this.origSceneW;
  var h = this.origSceneH;

  this.scooptramTimmins2 = this.draw.image('images/scooptram_timmins2.svg', w, h);
  this.development.add(this.scooptramTimmins2);
  this.scooptramTimmins2
    .x(-40)
    .animate(6000)
    .x(6)
    .loop()
  ;

  // Ground Support Bits
  this.gsBits = this.draw.group();
  var gsBit1  = this.draw.use('GS_Bit_8', 'images/master.svg').opacity(0);
  var gsBit2  = this.draw.use('GS_Bit_9', 'images/master.svg').opacity(0);
  var gsBit3  = this.draw.use('GS_Bit_10', 'images/master.svg').opacity(0);
  var gsBit4  = this.draw.use('GS_Bit_11', 'images/master.svg').opacity(0);
  var gsBit5  = this.draw.use('GS_Bit_12', 'images/master.svg').opacity(0);
  var gsBit6  = this.draw.use('GS_Bit_13', 'images/master.svg').opacity(0);
  var gsBit7  = this.draw.use('GS_Bit_14', 'images/master.svg').opacity(0);
  var gsBit8  = this.draw.use('GS_Bit_15', 'images/master.svg').opacity(0);
  var gsBit9  = this.draw.use('GS_Bit_16', 'images/master.svg').opacity(0);
  var gsBit10  = this.draw.use('GS_Bit_17', 'images/master.svg').opacity(0);
  var gsBit11  = this.draw.use('GS_Bit_18', 'images/master.svg').opacity(0);
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
  ;
  this.development.add(this.gsBits);

  // Ground Support Truck
  this.gsTruck = this.draw.groundSupport(this.gsBits)
    .x(-30)
    .attr('id', 'gs-truck');
  this.development.add(this.gsTruck);

  this.jumboDrill = this.draw.image('images/jumbo_drill.svg', w, h);
  this.development.add(this.jumboDrill);
  this.jumboDrill
    .x(-50)
    .animate(5000)
    .x(0)
    .loop()
  ;

  this.headings.development = this.Heading('Development_Video_1_', 'development', 4.9, 1240, 690);

  this.scene
    .add(this.development);
  this.sceneHeadings
    .add(this.headings.development);

  return this;
};

