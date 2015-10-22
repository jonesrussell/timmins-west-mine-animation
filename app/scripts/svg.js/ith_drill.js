'use strict';
/*global SVG */

SVG.ITHDrill = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function(bits) {
      this.bits = bits;
      this.driveToX = 96;
      this.t = 500;
/*      this.clip = this.doc()
        .rect(1366, 700)
        .move(1000, 0)
      ;
      this.add(this.clip);*/

      this.parts = this.doc().use('In_The_Hole_Drill_Parts', 'images/master.svg');
      this.drill = this.doc().use('In_The_Hole_Drill_Bits', 'images/master.svg');

      this.body = this.doc()
        .group()
        .add(this.drill)
        .add(this.parts)
//        .clipWith(this.clip)
      ;
      this.add(this.body);

      this.reset();
      return this;
    }
  }
  , construct: {
    ithDrill: function(bits) {
      return this.put(new SVG.ITHDrill).build(bits);
    }
  }
});

SVG.extend(SVG.ITHDrill, {
  reset: function() {
    this.forwardPath = [
      25.9 // bit 1
      , 10.3 // bit 2
      , 8.3 // bit 3
      , 8.2 // bit 4
      , 9.7 // bit 5
      , 8.5 // bit 6
      , 8.5 // bit 7
      , 8.6 // bit 8
      , 8.5 // bit 9
    ];
    this.goMax = 9;
    this.goCounter = 1;
    this.bitIndex = 0;
    this.c = 1;
    return this.x(0);
  }
 , forward: function() {
    this.c++;
    return this
      .animate(this.t)
      .dx(this.forwardPath.shift())
    ;
  }
  , backward: function() {
    return this
      .animate(5000)
      .x(0)
    ;
  }
  , drillDown: function() {
    return this.drill
      .animate(this.t)
      .cy(22.2)
      .cx(-4.5)
    ;
  }
  , drillUp: function() {
    return this.drill
      .animate(this.t)
      .opacity(1)
      .cy(0)
      .cx(0)
    ;
  }
  , holeDown: function() {
    var bit = this.bits.get(this.bitIndex);
    this.bitIndex++;
    return bit
      .animate(this.t)
      .cy(22.2)
      .cx(-4.5)
    ;
  }
  , holeUp: function() {
    return this.drill
      .animate(this.t)
      .opacity(1)
      .cy(0)
      .cx(0)
    ;
  }
  , showHoles: function() {
    this.bits.each(function() {
      this.move(0, 0);
    });
    return this.bits.opacity(1);
  }
  , hideHoles: function() {
    return this.bits.animate(1000, '>', 2000).opacity(0);
/*    this.bits.each(function() {
      var self = this;
      self.animate().opacity(0).after(function(){
        self.move(0, 0);
      });
    });*/
  }
  , isEnded: function() {
    return this.goCounter >= this.goMax;
  }
  , go: function() {
    var self = this;
    self.forward().after(function(){
      self.holeDown();
      self.drillDown().after(function(){
        self.drillUp().after(function(){
          console.log('isEnded()', self.isEnded());
          self.goCounter++;
          if (self.isEnded()) {
            self.reset();
          }
          self.go();
        });
      });
    });
  }

});
