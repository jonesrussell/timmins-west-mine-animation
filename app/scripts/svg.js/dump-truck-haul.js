'use strict';
/*global SVG */

SVG.DumpTruckHaul = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function() {
      this.body = this.doc().use('Haulage_Dump_Truck_2', 'images/master.svg');
      this.add(this.body);

      this.t = 13000;

      this.clip = this.doc().rect(210, 100);
      this.clip.move(320, 500);
      this.add(this.clip);
      this.clipWith(this.clip);

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
  reset: function() {
    return this.body.x(0).y(0);
  }
  , forward: function() {
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
//    this.clip.scale(-1, 1);
//    return this.body.scale(-1, 1);
    return this.scale(-1, 1);
  }

  , go: function() {
    var self = this;
    self.forward().after(function(){
//      self.body.rotate(-5);
//      self.flip();
//      self.backward().after(function(){
//        self.flip();
//        self.body.rotate(0);
        self.reset();
        self.go();
//      });
    });
  }

});
