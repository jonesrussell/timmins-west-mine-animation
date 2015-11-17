'use strict';
/*global SVG */

SVG.RockBreaker = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        build: function() {
          this.t = 500;
          this.strike = 250;
          this.rbArm = this.doc().use('Rock_Breaker_Arm', 'images/master.svg');
          this.rbBit = this.doc().use('Rock_Breaker_Bit', 'images/master.svg');
          var rbCircle = this.doc().use('Rock_Breaker_Circle', 'images/master.svg');
          this.add(this.rbArm)
              .add(this.rbBit)
              .add(rbCircle);

          return this;
      }
    },
    construct: {
      rockBreaker: function() { return this.put(new SVG.RockBreaker).build(); }
    }
});

SVG.extend(SVG.RockBreaker, {
    up: function() {
      this.rbArm
        .animate(this.t)
        .rotate(-0.02)
        .x(0.1)
        .y(-0.1)
      ;
      return this.rbBit
        .animate(this.t)
        .rotate(-0.05)
      ;
    },
    down: function() {
      this.rbArm
        .animate(this.t)
        .rotate(0.02)
        .x(-0.1)
        .y(0.1)
      ;
      return this.rbBit
        .animate(this.t)
        .rotate(0.05)
      ;
    },
    reset: function() {
      this.rbArm
        .animate(this.t)
        .rotate(0)
        .x(0)
        .y(0)
      ;
      return this.rbBit
        .animate(this.t)
        .rotate(0)
      ;
    },
    go: function() {
      var self = this;
      self.up().after(function(){
        self.down().after(function(){
          self.reset().after(function() {
            self.go();
          });
        });
      });
    }
});
