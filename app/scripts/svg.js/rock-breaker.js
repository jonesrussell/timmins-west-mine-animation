'use strict';
/*global SVG */

SVG.RockBreaker = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        build: function() {
          this.arm = this.doc().image('images/Rock_Breaker_Arm.svg', 1366, 700);
          this.bit = this.doc().image('images/Rock_Breaker_Bit.svg', 1366, 700);
          var circle = this.doc().image('images/Rock_Breaker_Circle.svg', 1366, 700);

          this.t = 500;
          this.strike = 250;

          this.add(this.arm)
            .add(this.bit)
            .add(circle)
          ;

          return this;
      }
    },
    construct: {
      rockBreaker: function() { return this.put(new SVG.RockBreaker).build(); }
    }
});

SVG.extend(SVG.RockBreaker, {
    up: function() {
      this.arm
        .animate(this.t)
        .rotate(-0.02)
        .x(0.1)
        .y(-0.1)
      ;
      return this.bit
        .animate(this.t)
        .rotate(-0.05)
      ;
    },
    down: function() {
      this.arm
        .animate(this.strike)
        .rotate(0.02)
        .x(-0.1)
        .y(0.1)
      ;
      return this.bit
        .animate(this.t)
        .rotate(0.05)
      ;
    },
    reset: function() {
      this.arm
        .animate(this.t)
        .rotate(0)
        .x(0)
        .y(0)
      ;
      return this.bit
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
