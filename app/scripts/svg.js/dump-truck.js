'use strict';
/*global SVG */

SVG.DumpTruck = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function() {
      this.t = 1000;

      this.body = this.doc().use('Haulage_Dump_Truck_1', 'images/master.svg');
      this.add(this.body);

      return this;
    }
  }
  , construct: {
    dumpTruck: function() {
      return this.put(new SVG.DumpTruck)
        .build();
    }
  }
});

SVG.extend(SVG.DumpTruck, {
  forward: function() {
    return this
      .animate(this.t)
      .dx(-100)
    ;
  }

  , backward: function() {
    return this
      .animate(this.t)
      .dx(0)
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
