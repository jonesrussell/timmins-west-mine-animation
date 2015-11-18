'use strict';
/*global SVG */

SVG.Scooptram = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function() {
      this.scooptramPile = this.doc().image('images/Scooptram_Development_Pile.svg', 1366, 700).opacity(0);
      this.scooptramParts = this.doc().image('images/Scooptram_Development_Parts.svg', 1366, 700);

      this.driveToX = 96;
      this.clip = this.doc()
        .rect(100, 50)
        .move(0, 0)
      ;
      this.add(this.clip);
      this.clipWith(this.clip);

      this.scooptram = this.doc()
        .group()
        .add(this.scooptramPile)
        .add(this.scooptramParts)
      ;
      this.add(this.scooptram);

      return this;
    }
  }
  , construct: {
    scooptram: function() {
      return this.put(new SVG.Scooptram).build();
    }
  }
});

SVG.extend(SVG.Scooptram, {
  setX: function(x) {
    this.driveToX = x;
    return this;
  }
  , moveClip: function(x, y) {
    this.clip.move(x, y);
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
