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

          // Skip
          this.clip = this.doc()
            .rect(1366, 700)
            .move(0, 217);
          this.add(this.clip);
          this.skipBody = this.doc()
            .image('images/skip.svg', 1366, 700)
            .clipWith(this.clip);
          this.add(this.skipBody);

          // Chain
          this.chain = this.doc()
            .use('Loading_Bin_Chain_1_', 'images/master.svg')
          ;
          this.add(this.chain);

          // Gate upper
          this.gateUpper = this.doc()
            .use('Feed_Chute_Knife_Gate', 'images/master.svg')
          ;
          this.add(this.gateUpper);

          // Gate lower
          this.gateLower = this.doc()
            .use('Measuring_Flask_Knife_Gate', 'images/master.svg')
          ;
          this.add(this.gateLower);

          // Ore falling in skipping
          this.rocksClip = this.doc()
            .rect(10, 10)
            .move(771, 613)
          ;
          this.rocks = this.doc()
            .use('Rocks_from_ore_bin_to_skip', 'images/master.svg')
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
        self.skipBody.animate(this.duration)
          .move(this.startX, this.skipTo)
          .after(function(){
            self.goBack();
          });
        return this;
    }
    , goBack: function() {
        var self = this;
        this.skipBody.animate(this.duration)
          .move(this.startX, this.startY)
          .after(function(){
              self.go();
          });
    }
});
