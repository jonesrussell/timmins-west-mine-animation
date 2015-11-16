'use strict';
/*global SVG */

SVG.DumpTruckHaul = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function() {
      this.t = 10000;

      this.rect = this.doc().rect(250, 100);
      this.rect.move(280, 500);
      this.add(this.rect);

      this.body = this.doc().use('Haulage_Dump_Truck_2', 'images/master.svg');
      this.add(this.body);

      this.clipWith(this.rect);

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
    return this.body
      .animate(this.t)
      .x(300)
      .y(-14)
    ;
  }

  , backward: function() {
    return this.body
      .animate(this.t)
      .x(0)
      .y(0)
    ;
  }

  , flip: function() {
    return this.body.scale(-1, 1);
  }

  , go: function() {
    var self = this;
    self.forward().after(function(){
      self.body.rotate(-5);
      self.flip();
      self.backward().after(function(){
        self.flip();
        self.body.rotate(0);
        self.go();
      });
    });
  }

});
