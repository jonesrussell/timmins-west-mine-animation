'use strict';
/*global SVG */

SVG.ITHDrill = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function(bits) {
      this.parts = this.doc().use('In_The_Hole_Drill_Parts', 'images/master.svg');
      this.drill = this.doc().use('In_The_Hole_Drill_Bits', 'images/master.svg');

      this.bits = bits;
      this.driveToX = 96;
      this.t = 2000;
      this.clip = this.doc().rect(100, 40)
          .move(1000, 448)
      ;
      this.add(this.clip);
      this.clipWith(this.clip);

      this.body = this.doc()
        .group()
        .add(this.drill)
        .add(this.parts)
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
      5.9 // bit 1
      , 10.3 // bit 2
      , 8.3 // bit 3
      , 8.2 // bit 4
      , 9.7 // bit 5
      , 8.5 // bit 6
      , 8.5 // bit 7
      , 8.6 // bit 8
    ];
    this.goMax = this.forwardPath.length;
    this.goCounter = 0;
    this.bitIndex = 0;
    this.c = 0;
    this.showHoles();
    return this;
  }
 , getInPosition: function() {
    return this.body
      .animate(3000)
      .x(20)
    ;
  }
 , forward: function() {
    this.c++;
    return this.body
      .animate(this.t)
      .dx(this.forwardPath.shift())
    ;
  }
  , backward: function() {
    return this.body
      .animate(5000)
      .x(0)
    ;
  }
  , drillDown: function() {
    return this.drill
      .animate(this.t)
      .y(25)
      .x(-5)
    ;
  }
  , drillUp: function() {
    return this.drill
      .animate(this.t)
      .opacity(1)
      .y(0)
      .x(0)
    ;
  }
  , holeDown: function() {
    var bit = this.bits.get(this.bitIndex);
    this.bitIndex++;
    return bit
      .animate(this.t)
      .y(25)
      .x(-5)
    ;
  }
  , holeUp: function() {
    return this.drill
      .animate(this.t)
      .opacity(1)
      .y(0)
      .x(0)
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
          self.goCounter++;
          if (self.isEnded()) {
            self.backward().after(function(){
              self.hideHoles().after(function(){
                self.reset();
                self.getInPosition().after(function(){
                  self.go();
                });
              });
            });
          }
          else {
            self.go();
          }
        });
      });
    });
  }

});
