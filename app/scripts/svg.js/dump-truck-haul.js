'use strict';
/*global SVG */

SVG.DumpTruckHaul = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function() {
      this.t = 10000;

      this.body = this.doc().use('Haulage_Dump_Truck_2', 'images/master.svg');
      this.add(this.body);

      return this;
    }
  }
  , construct: {
    dumpTruckHaul: function() {
      return this.put(new SVG.DumpTruckHaul)
        .build();
    }
  }
});

SVG.extend(SVG.DumpTruckHaul, {
  forward: function() {
    return this
      .animate(this.t)
      .x(300)
      .y(-14)
    ;
  }

  , backward: function() {
    return this
      .animate(this.t)
      .x(0)
      .y(0)
    ;
  }

  , go: function() {
    var self = this;
    self.forward().after(function(){
      self.backward().after(function(){
        self.go();
      });
    });
  }

});
