'use strict';
/*global SVG */

SVG.RockBreaker = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        build: function() {
          this.arm = this.doc().use('Rock_Breaker_Arm', 'images/master.svg');
          this.bit = this.doc().use('Rock_Breaker_Bit', 'images/master.svg');
          var circle = this.doc().use('Rock_Breaker_Circle', 'images/master.svg');

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
