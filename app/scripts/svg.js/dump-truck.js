'use strict';
/*global SVG */

SVG.DumpTruck = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function() {
      this.t = 8000;

      this.clip = this.doc().rect(100, 50);
      this.clip.move(700, 530);
      this.add(this.clip);
      this.clipWith(this.clip);

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
    return this.body
      .animate(this.t)
      .x(0)
      .y(0)
    ;
  }

  , backward: function() {
    return this.body
      .animate(this.t)
      .x(90)
      .y(-4)
    ;
  }

  , go: function() {
    var self = this;
    self.backward().after(function(){
      self.forward().after(function(){
        self.go();
      });
    });
  }

});
