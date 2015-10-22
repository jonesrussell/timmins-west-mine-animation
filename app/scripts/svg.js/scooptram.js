'use strict';
/*global SVG */

SVG.Scooptram = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function() {
      this.driveToX = 96;
/*      this.clip = this.doc()
        .rect(1366, 700)
        .move(1000, 0)
      ;
      this.add(this.clip);*/
      this.scooptramPile = this.doc()
        .use('Scooptram_Development_Pile', 'images/master.svg')
        .opacity(0)
      ;
      this.scooptramParts = this.doc()
        .use('Scooptram_Development_Parts', 'images/master.svg')
      ;
      this.scooptram = this.doc()
        .group()
        .add(this.scooptramPile)
        .add(this.scooptramParts)
//        .clipWith(this.clip)
      ;
      this.add(this.scooptram);

      return this;
    }
  }
  , construct: {
    scooptram: function() {
      return this.put(new SVG.Scooptram)
        .build();
    }
  }
});

SVG.extend(SVG.Scooptram, {
  setX: function(x) {
    this.driveToX = x;
    return this;
  }
  , go: function() {
    var self = this;
    this.scooptram
      .animate(12000)
      .x(self.driveToX)
      .loop(1000, true)
      .during(function(){
        var r = this.fx.situation.reversing;
        if (typeof r === 'undefined' || !r) {
          self.scooptramPile.opacity(0);
        } else {
          self.scooptramPile.opacity(1);
        }
      })
    ;
  }

});
