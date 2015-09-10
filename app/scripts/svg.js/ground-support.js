'use strict';
/*global SVG */

SVG.GroundSupport = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function(bits) {
      this.gsBits = bits;
      this.gsTruckHole = this.doc().use('GS_Truck_Hole', 'images/master.svg');
      this.gsTruckJacks = this.doc().use('GS_Truck_Jacks', 'images/master.svg');
      this.gsTruckBody = this.doc().use('GS_Truck_Body', 'images/master.svg');
      this.gsTruckTire1 = this.doc().use('GS_Truck_Tire_1', 'images/master.svg');
      this.gsTruckTire2 = this.doc().use('GS_Truck_Tire_2', 'images/master.svg');
      this.gsDrill = this.doc().use('GS_Drill', 'images/master.svg');
      this
        .add(this.gsTruckHole)
        .add(this.gsTruckJacks)
        .add(this.gsTruckBody)
        .add(this.gsTruckTire1)
        .add(this.gsTruckTire2)
        .add(this.gsDrill);
      this.go();

      return this;
    }
  }
  , construct: {
    groundSupport: function(bits) {
      return this.put(new SVG.GroundSupport)
        .build(bits);
    }
  }
});

SVG.extend(SVG.GroundSupport, {
  GSJacksUp: function() {
    return this.gsTruckJacks
      .animate()
      .cy(-1);
  }

  , GSJacksDown: function() {
    return this.gsTruckJacks
      .animate()
      .cy(0);
  }

  , forward: function() {
    if (typeof this.gsTruckForwardPath === 'undefined') {
      this.gsTruckForwardPath = [ 4.5, 6.1, 6, 6, 5, 5, 4, 5, 4, 5 ];
    }

    return this
      .animate()
      .dx(this.gsTruckForwardPath.shift())
    ;
  }

  , down: function() {
    return this
      .animate()
      .dy(0.2)
    ;
  }

  , up: function() {
    return this
      .animate()
      .y(0);
  }

  , GSHoleReset: function() {
    return this.gsTruckHole
      .move(-0.5, 7.7);
  }

  , GSHoleIn: function() {
    this.GSHoleReset();
    this.gsTruckHole.opacity(1);
    return this.gsTruckHole
      .animate()
      .move(0, 0);
  }

  , GSHoleFill: function() {
    return this.gsTruckHole
      .animate()
      .opacity(0)
      .after(function(){

      });
  }

  , GSBitIn: function() {
    if (typeof this.gsCurrentBitIndex === 'undefined') {
      this.gsCurrentBitIndex = 0;
    }
    var bit = this.gsBits.get(this.gsCurrentBitIndex);
    this.gsCurrentBitIndex++;
    return bit
      .animate()
      .opacity(1);
  }

  , GSDrillUp: function() {
    return this.gsDrill
      .animate()
      .opacity(1)
      .cy(0)
      .cx(0);
  }

  , GSDrillDown: function() {
    return this.gsDrill
      .animate()
      .cy(2.2)
      .cx(-0.3);
  }

  , GSTiresForward: function() {
    var x = this.gsTruckTire1.bbox().x + 3.9;
    var y = this.gsTruckTire2.bbox().y + 18.4;
    x = this.gsTruck.bbox().x + 3.9;
    y = this.gsTruck.bbox().y + 18.4;
    return this.gsTruckTire1
      .animate(1000)
      .rotate(360, x, y);
  }

  , go: function() {
    var self = this;
    if (typeof self.GSTruckGoC === 'undefined') {
      self.GSTruckGoMax = 11;
      self.GSTruckGoC = 1;
    }
    this.GSDrillDown().after(function(){
      self.GSHoleFill();
      self.GSBitIn().after(function(){
        if (self.GSTruckGoC >= self.GSTruckGoMax) { return; }
        self.GSJacksUp();
        self.down().after(function(){
  //        self.GSTiresForward();
          self.forward().after(function(){
            self.up(1000, '>', 500);
            self.GSJacksDown().after(function(){
              self.GSHoleIn();
              self.GSDrillUp().after(function(){
                self.GSTruckGoC++;
                self.go();
              });
            });
          });
        });
      });
    });
  }

});
