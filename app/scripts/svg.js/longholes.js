'use strict';
/*global SVG */

SVG.Longhole = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function(bits) {
      this.bits = bits;
      this.bitsToX = 8.8;
      this.bitsToY = -46.9;
      this.driveToX = 96;
      this.t = 2000;

      var longholesPartsTC = this.doc().use('TC_Loading_Longholes_Parts', 'images/master.svg');
      this.longholesTCLegs1 = this.doc().use('TC_Loading_Longholes_Legs_1', 'images/master.svg');
      this.longholesTCLegs2 = this.doc().use('TC_Loading_Longholes_Legs_2', 'images/master.svg');
      this.longholesTCLegs3 = this.doc().use('TC_Loading_Longholes_Legs_3', 'images/master.svg');
      this.longholesTCLegs4 = this.doc().use('TC_Loading_Longholes_Legs_4', 'images/master.svg');

      var longholesTCMan = this.doc().group()
        .add(longholesPartsTC)
        .add(this.longholesTCLegs1)
        .add(this.longholesTCLegs2)
        .add(this.longholesTCLegs3)
        .add(this.longholesTCLegs4)
      ;

      this.body = this.doc()
        .group()
        .add(longholesTCMan)
      ;
      this.add(this.body);

      this.reset();
      return this;
    }
  }
  , construct: {
    longhole: function(bits) {
      return this.put(new SVG.Longhole).build(bits);
    }
  }
});

SVG.extend(SVG.Longhole, {
  reset: function() {
    this.forwardPath = [
      5.4 // dynamite 1
      , 7.3 // dynamite 2
    ];
    this.goMax = this.forwardPath.length;
    this.goCounter = 0;
    this.bitIndex = 0;
    this.c = 0;
    this.showHoles();
    return this;
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
  , holeDown: function() {
    console.log('holeDown()');
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
//    self.forward().after(function(){
      self.holeDown().after(function(){
        self.forward().after(function(){
          self.goCounter++;
          if (self.isEnded()) {
            self.backward().after(function(){
              self.hideHoles().after(function(){
                self.reset();
                  self.go();
              });
            });
          }
          else {
            self.go();
          }
        });
      });
//    });
  }

});
