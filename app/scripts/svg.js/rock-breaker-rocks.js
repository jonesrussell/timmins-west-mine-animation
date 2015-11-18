'use strict';
/*global SVG */

SVG.RockBreakerRocks = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        build: function() {
          this.rocks = this.doc().use('Rock_Breaker_Rocks', 'images/master.svg');

          this.clip = this.doc()
            .rect(20, 40)
            .move(750, 559)
          ;
          this.add(this.clip);
          this.clipWith(this.clip);

          this.add(this.rocks);

          return this;
      }
    },
    construct: {
      rockBreakerRocks: function() { return this.put(new SVG.RockBreakerRocks).build(); }
    }
});

SVG.extend(SVG.RockBreakerRocks, {
    down: function() {
      return this.rocks
        .animate(5000, '-', 0)
        .y(120)
      ;
    }
    , reset: function() {
      this.rocks.y(0);
      return this;
    }
    , go: function() {
      var self = this;
      self.down().after(function(){
        self.reset();
        self.go();
      });
    }
});

