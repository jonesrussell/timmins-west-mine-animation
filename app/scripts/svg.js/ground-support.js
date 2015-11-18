'use strict';
/*global SVG */

SVG.GroundSupport = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function(bits) {
      this.truckHole = this.doc().use('GS_Truck_Hole', 'images/master.svg');
      this.truckJacks = this.doc().use('GS_Truck_Jacks', 'images/master.svg');
      this.truckBody = this.doc().use('GS_Truck_Body', 'images/master.svg');
      this.truckTire1 = this.doc().use('GS_Truck_Tire_1', 'images/master.svg');
      this.truckTire2 = this.doc().use('GS_Truck_Tire_2', 'images/master.svg');
      this.gsDrill = this.doc().use('GS_Drill', 'images/master.svg');
      this.bits = bits;
      this.t = 1000;

      this.add(this.truckHole)
        .add(this.truckJacks)
        .add(this.truckBody)
        .add(this.truckTire1)
        .add(this.truckTire2)
        .add(this.gsDrill)
      ;

      this.reset();
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
  reset: function() {
    this.truckForwardPath = [
      5.6 // bit 1
      , 5.3 // bit 2
      , 4.8 // bit 3
      , 6.1 // bit 4
      , 6 // bit 5
      , 5.8 // bit 6
      , 5.1 // bit 7
      , 5 // bit 8
      , 4 // bit 9
      , 5 // bit 10
      , 4.5 // bit 11
      , 4.6 // bit 12
//        , 5 // bit 13
    ];
    this.truckGoMax = 13;
    this.goCounter = 1;
    this.bitIndex = 0;
    this.c = 1;
    this.bits.each(function() {
        this.animate()
          .opacity(0);
    });
    return this.x(0);
  }
  , jacksUp: function() {
    return this.truckJacks
      .animate(this.t)
      .cy(-1);
  }

  , jacksDown: function() {
    return this.truckJacks
      .animate(this.t)
      .cy(0);
  }

  , forward: function() {
    this.c++;
    return this
      .animate(this.t)
      .dx(this.truckForwardPath.shift())
    ;
  }

  , down: function() {
    return this
      .animate(this.t)
      .dy(0.2)
    ;
  }

  , up: function() {
    return this
      .animate(this.t)
      .y(0);
  }

  , holeReset: function() {
    return this.truckHole
      .move(-0.5, 7.7);
  }

  , holeIn: function() {
    this.holeReset();
    this.truckHole.opacity(1);
    return this.truckHole
      .animate(this.t)
      .move(0, 0);
  }

  , holeFill: function() {
    return this.truckHole
      .animate(this.t)
      .opacity(0)
      .after(function(){

      });
  }

  , bitIn: function() {
    var bit = this.bits.get(this.bitIndex);
    this.bitIndex++;
    return bit
      .animate(this.t)
      .opacity(1);
  }

  , drillUp: function() {
    return this.gsDrill
      .animate(this.t)
      .opacity(1)
      .y(0)
      .x(0);
  }

  , drillDown: function() {
    return this.gsDrill
      .animate(this.t)
      .y(2.2)
      .x(-0.3);
  }

  , tiresForward: function() {
    var x = this.truckTire1.bbox().x + 3.9;
    var y = this.truckTire2.bbox().y + 18.4;
    x = this.truck.bbox().x + 3.9;
    y = this.truck.bbox().y + 18.4;
    return this.truckTire1
      .animate(1000)
      .rotate(360, x, y);
  }

  , isEnded: function() {
    return this.goCounter >= this.truckGoMax;
  }

  , go: function() {
    var self = this;
    this.drillDown().after(function(){
      self.holeFill();
      self.bitIn().after(function(){
        // Because of initial svg placement, this is the logical ending
        if (self.isEnded()) {
          self.reset();
          self.go();
          return;
        }
        self.jacksUp();
        self.down().after(function(){
  //        self.tiresForward();
          self.forward().after(function(){
            self.up(1000, '>', 500);
            self.jacksDown().after(function(){
              self.holeIn();
              self.drillUp().after(function(){
                self.goCounter++;
                self.go();
              });
            });
          });
        });
      });
    });
  }

});
