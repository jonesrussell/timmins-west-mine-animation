'use strict';
/*global SVG */

SVG.ITHDrill = SVG.invent({
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

      this.parts = this.doc().use('In_The_Hole_Drill_2_', 'images/master.svg');

      this.body = this.doc()
        .group()
        .add(this.parts)
//        .clipWith(this.clip)
      ;
      this.add(this.body);

      return this;
    }
  }
  , construct: {
    ithDrill: function() {
      return this.put(new SVG.ITHDrill)
        .build();
    }
  }
});

SVG.extend(SVG.ITHDrill, {
  setX: function(x) {
    this.driveToX = x;
    return this;
  }
  , go: function() {
    var self = this;
    self.body
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
