'use strict';
/*global SVG */

SVG.Skip = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
       build: function() {
          this.attr('id', 'animation-skipping');
          this.startX = 0;
          this.startY = 0;
          this.duration = 20000;
          this.skipTo = -470;

          var img = 'images/master.svg';
          // Chain
          this.chain = this.doc()
            .use('Loading_Bin_Chain_1_', img)
          ;
          this.add(this.chain);

          // Gate upper
          this.gateUpper = this.doc()
            .use('Feed_Chute_Knife_Gate', img)
          ;
          this.add(this.gateUpper);

          // Gate lower
          this.gateLower = this.doc()
            .use('Measuring_Flask_Knife_Gate', img)
          ;
          this.add(this.gateLower);

          // Measuring box rocks
          this.rocks1 = this.doc().use('Measuring_Pocket_Rocks_1', img);
          this.rocks2 = this.doc().use('Measuring_Pocket_Rocks_2', img);
          this.rocks3 = this.doc().use('Measuring_Pocket_Rocks_3', img);
          this.rocks4 = this.doc().use('Measuring_Pocket_Rocks_4', img);
          this.add(this.rocks1)
            .add(this.rocks2)
            .add(this.rocks3)
            .add(this.rocks4)
          ;

          // Skip
          this.rocks5 = this.doc().use('Skip_Rocks_1', img);
          this.rocks6 = this.doc().use('Skip_Rocks_2', img);
          this.rocks7 = this.doc().use('Skip_Rocks_3', img);
          this.rocks8 = this.doc().use('Skip_Rocks_4', img);
          this.skipRocks = this.doc()
            .group()
            .add(this.rocks5)
            .add(this.rocks6)
            .add(this.rocks7)
            .add(this.rocks8)
          ;
          this.clip = this.doc().rect(1366, 700).move(0, 217);
          this.skipBody = this.doc().use('Skip_1_', img);
          this.skipBodyWrapper = this.doc()
            .group()
            .add(this.skipBody)
            .add(this.skipRocks)
          ;
          this.skipWrapper = this.doc()
            .group()
            .add(this.clip)
            .add(this.skipBodyWrapper)
            .clipWith(this.clip)
          ;
          this.add(this.skipWrapper);

          // Ore falling in skipping
          this.rocksClip = this.doc()
            .rect(10, 10)
            .move(771, 613)
          ;
          this.rocks = this.doc()
            .use('Rocks_from_ore_bin_to_skip', img)
          ;
          this.rocksWrapper = this.doc()
            .group()
            .add(this.rocksClip)
            .add(this.rocks)
            .clipWith(this.rocksClip)
          ;
          this.add(this.rocksWrapper);

          return this;
       }
    },
    construct: {
        skip: function() {
            return this.put(new SVG.Skip).build();
        }
    }
});

SVG.extend(SVG.Skip, {
    spillRocks: function() {
      this.rocks
        .animate(10000)
        .move(85, 75)
      ;
      return this;
    }
    , go: function() {
        var self = this;
        self.spillRocks();
        self.skipBodyWrapper.animate(this.duration)
          .move(this.startX, this.skipTo)
          .after(function(){
            self.goBack();
          });
        return this;
    }
    , goBack: function() {
        var self = this;
        this.skipBodyWrapper.animate(this.duration)
          .move(this.startX, this.startY)
          .after(function(){
              self.go();
          });
    }
});
