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

  // Ground Support Truck
  this.gsTruck = this.draw.group().x(-30);
  this.gsTruckHole  = this.draw.use('GS_Truck_Hole', 'images/master.svg', w, h);
  this.gsTruckJacks  = this.draw.use('GS_Truck_Jacks', 'images/master.svg', w, h);
  this.gsTruckBody  = this.draw.use('GS_Truck_Body', 'images/master.svg', w, h);
  this.gsTruckTire1  = this.draw.use('GS_Truck_Tire_1', 'images/master.svg', w, h);
  this.gsTruckTire2  = this.draw.use('GS_Truck_Tire_2', 'images/master.svg', w, h);
  this.gsDrill = this.draw.use('GS_Drill', 'images/master.svg', w, h);
  this.gsTruck
    .add(this.gsTruckHole)
    .add(this.gsTruckJacks)
    .add(this.gsTruckBody)
    .add(this.gsTruckTire1)
    .add(this.gsTruckTire2)
    .add(this.gsDrill);
  this.development.add(this.gsTruck);
  this.GSTruckGo();

  // Ground Support Bits
  this.gsBits = this.draw.group();
  var gsBit1  = this.draw.use('GS_Bit_1', 'images/master.svg', w, h).opacity(0);
  var gsBit2  = this.draw.use('GS_Bit_2', 'images/master.svg', w, h).opacity(0);
  var gsBit3  = this.draw.use('GS_Bit_3', 'images/master.svg', w, h).opacity(0);
  var gsBit4  = this.draw.use('GS_Bit_4', 'images/master.svg', w, h).opacity(0);
  var gsBit5  = this.draw.use('GS_Bit_5', 'images/master.svg', w, h).opacity(0);
  var gsBit6  = this.draw.use('GS_Bit_6', 'images/master.svg', w, h).opacity(0);
  var gsBit7  = this.draw.use('GS_Bit_7', 'images/master.svg', w, h).opacity(0);
  var gsBit8  = this.draw.use('GS_Bit_8', 'images/master.svg', w, h).opacity(0);
  var gsBit9  = this.draw.use('GS_Bit_9', 'images/master.svg', w, h).opacity(0);
  var gsBit10  = this.draw.use('GS_Bit_10', 'images/master.svg', w, h).opacity(0);
  var gsBit11  = this.draw.use('GS_Bit_11', 'images/master.svg', w, h).opacity(0);
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

SVGjsAnim.prototype.GSJacksUp = function() {
  return this.gsTruckJacks
    .animate()
    .cy(-1);
};

SVGjsAnim.prototype.GSJacksDown = function() {
  return this.gsTruckJacks
    .animate()
    .cy(0);
};

SVGjsAnim.prototype.GSTruckForward = function() {
  if (typeof this.gsTruckForwardPath === 'undefined') {
    this.gsTruckForwardPath = [ 4.5, 6.1, 6, 6, 5, 5, 4, 5, 4, 5 ];
  }

  return this.gsTruck
    .animate()
    .dx(this.gsTruckForwardPath.shift());
  ;
};

SVGjsAnim.prototype.GSTruckDown = function() {
  return this.gsTruck
    .animate()
    .dy(0.2);
};

SVGjsAnim.prototype.GSTruckUp = function() {
  return this.gsTruck
    .animate()
    .y(0);
};

SVGjsAnim.prototype.GSHoleReset = function() {
  return this.gsTruckHole
    .move(-0.5, 7.7);
};

SVGjsAnim.prototype.GSHoleIn = function() {
  this.GSHoleReset();
  this.gsTruckHole.opacity(1);
  return this.gsTruckHole
    .animate()
    .move(0, 0);
};

SVGjsAnim.prototype.GSHoleFill = function() {
  return this.gsTruckHole
    .animate()
    .opacity(0)
    .after(function(){

    });
};

SVGjsAnim.prototype.GSBitIn = function() {
  if (typeof this.gsCurrentBitIndex === 'undefined') {
    this.gsCurrentBitIndex = 0;
  }
//  console.log(this.gsCurrentBitIndex);
  var bit = this.gsBits.get(this.gsCurrentBitIndex);
//  console.log(bit);
  this.gsCurrentBitIndex++;
  return bit
    .animate()
    .opacity(1);
};

SVGjsAnim.prototype.GSDrillUp = function() {
  return this.gsDrill
    .animate()
    .opacity(1)
    .cy(0)
    .cx(0);
};

SVGjsAnim.prototype.GSDrillDown = function() {
  return this.gsDrill
    .animate()
    .cy(2.2)
    .cx(-0.3);
};

SVGjsAnim.prototype.GSTiresForward = function() {
  var x = this.gsTruckTire1.bbox().x + 3.9;
  var y = this.gsTruckTire2.bbox().y + 18.4;
  x = this.gsTruck.bbox().x + 3.9;
  y = this.gsTruck.bbox().y + 18.4;
//  console.log(x);
//  console.log(y);
  return this.gsTruckTire1
    .animate(1000)
    .rotate(360, x, y);
};

SVGjsAnim.prototype.GSTruckGo = function() {
  var self = this;
  if (typeof self.GSTruckGoC === 'undefined') {
    self.GSTruckGoMax = 11;
    self.GSTruckGoC = 1;
  }
  this.GSDrillDown().after(function(){
    self.GSHoleFill();
    console.log(self.GSTruckGoC);
    console.log(self.GSTruckGoMax);
    console.log('bar');
    self.GSBitIn().after(function(){
      if (self.GSTruckGoC >= self.GSTruckGoMax) { return; }
      self.GSJacksUp();
      self.GSTruckDown().after(function(){
//        self.GSTiresForward();
        self.GSTruckForward().after(function(){
          self.GSTruckUp(1000, '>', 500);
          self.GSJacksDown().after(function(){
            self.GSHoleIn();
            self.GSDrillUp().after(function(){
              self.GSTruckGoC++;
              self.GSTruckGo();
            });
          });
        });
      });
    });
  });
};

