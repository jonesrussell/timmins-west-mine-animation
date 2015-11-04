'use strict';
/*global SVG */

SVG.Zimba = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function(bits) {
      this.bits = bits;
      this.bitsToX = -8.8;
      this.bitsToY = 46.9;
      this.driveToX = 96;
      this.t = 2000;
      this.clip = this.doc()
        .rect(90, 70)
        .move(295, 423)
      ;
      this.add(this.clip);
      this.clipWith(this.clip);

      this.parts = this.doc().use('TC_Zimba_Longhole_Parts', 'images/master.svg');
      this.drill = this.doc().use('TC_Zimba_Longhole_Drill', 'images/master.svg');

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
    zimba: function(bits) {
      return this.put(new SVG.Zimba).build(bits);
    }
  }
});

SVG.extend(SVG.Zimba, {
  reset: function() {
    this.forwardPath = [
      //0.9 // bit 1
      11.2 // bit 2
      , 7.3 // bit 3
      , 10 // bit 4
      , 6 // bit 5
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
      .animate(5000)
      .x(55)
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
      .cy(this.bitsToY)
      .cx(this.bitsToX)
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
      .cy(this.bitsToY)
      .cx(this.bitsToX)
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
