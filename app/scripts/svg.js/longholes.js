'use strict';
/*global SVG */

SVG.Longhole = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function(bits) {
      var longholesPartsTC = this.doc().image('images/TC_Loading_Longholes_Parts.svg', 1366, 700);
      this.longholesTCLegs1 = this.doc().image('images/TC_Loading_Longholes_Legs_1.svg', 1366, 700);
      this.longholesTCLegs2 = this.doc().image('images/TC_Loading_Longholes_Legs_2.svg', 1366, 700);
      this.longholesTCLegs3 = this.doc().image('images/TC_Loading_Longholes_Legs_3.svg', 1366, 700);
      this.longholesTCLegs4 = this.doc().image('images/TC_Loading_Longholes_Legs_4.svg', 1366, 700);

      this.bits = bits;
      this.bitsToX = 8.8;
      this.bitsToY = -46.9;
      this.t = 2000;

      this.forwardPathMaster = [
        5.4 // dynamite 1
        , 7.3 // dynamite 2
      ];
      this.forwardPath = [];

      var longholesTCMan = this.doc()
        .group()
        .add(longholesPartsTC)
        .add(this.longholesTCLegs1)
        .add(this.longholesTCLegs2)
        .add(this.longholesTCLegs3)
        .add(this.longholesTCLegs4)
      ;

      this.clip = this.doc()
        .rect(50, 20)
        .move(317, 480)
      ;
      this.add(this.clip);
      this.clipWith(this.clip);

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
  setForwardPathMaster: function(path) {
    this.forwardPathMaster = path;
    this.reset();
    return this;
  }
  , setForwardPath: function() {
    this.forwardPath = this.forwardPathMaster.slice();
    return this;
  }
  , moveClip: function(x, y) {
    this.clip.move(x, y);
    return this;
  }
  , setBitsToX: function(n) {
    this.bitsToX = n;
    return this;
  }
  , setBitsToY: function(n) {
    this.bitsToY = n;
    return this;
  }
  , reset: function() {
    this.setForwardPath();
    this.goMax = this.forwardPath.length;
    this.goCounter = 0;
    this.bitIndex = 0;
    this.showHoles();
    return this;
  }
 , forward: function() {
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
  , holeIn: function() {
    var bit = this.bits.get(this.bitIndex);
    this.bitIndex++;
    return bit
      .animate(this.t)
      .y(this.bitsToY)
      .x(this.bitsToX)
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
  }
  , isEnded: function() {
    return this.goCounter > this.goMax;
  }
  , go: function() {
    var self = this;
    self.holeIn().after(function(){
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
        self.forward().after(function(){
          self.go();
        });
      }
    });
  }

});
