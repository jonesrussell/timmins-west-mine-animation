'use strict';
/*global SVG */

SVG.DumpTruck = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function() {
      this.bodyParts = this.doc().use('Haulage_Dump_Truck_1_Body', 'images/master.svg');
      this.pile = this.doc().use('Haulage_Dump_Truck_1_Pile', 'images/master.svg');
      this.bucket = this.doc().use('Haulage_Dump_Truck_1_Bucket', 'images/master.svg');

      this.t = 1000;

      this.clip = this.doc().rect(60, 29)
        .move(700, 531)
        .rotate(-3)
      ;
      this.add(this.clip);
      this.clipWith(this.clip);

      this.body = this.group();
      this.add(this.body);
      this.bucketGroup = this.doc().group();
      this.bucketGroup
        .add(this.pile)
        .add(this.bucket)
      ;
      this.body
        .add(this.bodyParts)
        .add(this.bucketGroup)
      ;

      this._transform = this.bucket.transform();

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
      .animate(5000)
      .x(0)
      .y(0)
    ;
  }

  , backward: function() {
    return this.body
      .animate(5000)
      .x(90)
      .y(-4)
    ;
  }

  , showPile: function() {
    this.pile.show();
    return this;
  }

  , hidePile: function() {
    this.pile.hide();
    return this;
  }

  , dump: function() {
    this.pile.animate(700, '-', this.t).move(15, 4);
    return this.bucketGroup.animate(this.t).rotate(10, 668, 557).loop(1, true);
  }

  , resetPile: function() {
    this.pile.move(0, 0);
    return this;
  }

  , go: function() {
    var self = this;
//    self.showPile();
    self.backward().after(function(){
      self.dump().after(function(){
        self.hidePile();
        self.forward().after(function(){
          self.resetPile();
          self.showPile();
          self.go();
        });
      });
    });
  }

});
