'use strict';
/*global SVG */

SVG.ScooptramDevelopment = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function() {
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

      this.go();
      return this;
    }
  }
  , construct: {
    scooptramDevelopment: function() {
      return this.put(new SVG.ScooptramDevelopment)
        .build();
    }
  }
});

SVG.extend(SVG.ScooptramDevelopment, {
  go: function() {
    var self = this;
    this.scooptram
      .animate(12000)
      .x(96)
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
