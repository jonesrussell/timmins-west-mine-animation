'use strict';
/*global SVG */

SVG.Skip = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
       build: function() {
          var img = 'images/master.svg';

          this.chain = this.doc().image('images/Loading_Bin_Chain_1_.svg', 1366, 700);
          this.gateUpper = this.doc().image('images/Feed_Chute_Knife_Gate.svg', 1366, 700);
          this.gateLower = this.doc().image('images/Measuring_Flask_Knife_Gate.svg', 1366, 700);
          this.rocks1 = this.doc().image('images/Measuring_Pocket_Rocks_1.svg', 1366, 700).opacity(0);
          this.rocks2 = this.doc().image('images/Measuring_Pocket_Rocks_2.svg', 1366, 700).opacity(0);
          this.rocks3 = this.doc().image('images/Measuring_Pocket_Rocks_3.svg', 1366, 700).opacity(0);
          this.rocks4 = this.doc().image('images/Measuring_Pocket_Rocks_4.svg', 1366, 700).opacity(0);
          this.rocks5 = this.doc().image('images/Skip_Rocks_1.svg', 1366, 700).opacity(0);
          this.rocks6 = this.doc().image('images/Skip_Rocks_2.svg', 1366, 700).opacity(0);
          this.rocks7 = this.doc().image('images/Skip_Rocks_3.svg', 1366, 700).opacity(0);
          this.rocks8 = this.doc().image('images/Skip_Rocks_4.svg', 1366, 700).opacity(0);
          this.skipBody = this.doc().image('images/Skip_1_.svg', 1366, 700);
          this.rocksSkip = this.doc().image('images/Rocks_from_ore_bin_to_skip.svg', 1366, 700);
          this.rocksSkip2 = this.doc().image('images/Rocks_from_ore_bin_to_skip.svg', 1366, 700);
          this.headframeRock1 = this.doc().image('images/Rockpile_from_headframe_1_1_.svg', 1366, 700).opacity(0);
          this.headframeRock2 = this.doc().image('images/Rockpile_from_headframe_2_2_.svg', 1366, 700).opacity(0);
          this.headframeRock3 = this.doc().image('images/Rockpile_from_headframe_3_1_.svg', 1366, 700).opacity(0);
          this.headframeRock4 = this.doc().image('images/Rockpile_from_headframe_4_2_.svg', 1366, 700).opacity(0);
          this.headframeRocks = this.doc().image('images/Rocks_from_Headframe_to_box.svg', 1366, 700);

          this.attr('id', 'animation-skipping');
          this.startX = 0;
          this.startY = 0;
          this.upDuration = 8000;
          this.headframeSpillDuration = 2000;
          this.skipTo = -470;

          // Chain
          this.add(this.chain);

          // Gate upper
          this.add(this.gateUpper);

          // Gate lower
          this.add(this.gateLower);

          // Measuring box rocks
          this.add(this.rocks1)
            .add(this.rocks2)
            .add(this.rocks3)
            .add(this.rocks4)
          ;

          // Skip
          this.skipRocks = this.doc()
            .group()
            .add(this.rocks5)
            .add(this.rocks6)
            .add(this.rocks7)
            .add(this.rocks8)
          ;
          this.clip = this.doc().rect(1366, 700).move(0, 217);
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
          this.add(this.rocksClip);
          this.rocksWrapper = this.doc()
            .group()
            .add(this.rocksSkip)
            .clipWith(this.rocksClip)
            .hide()
          ;
          this.add(this.rocksWrapper);

          // Second rock slide
          this.rocksClip2 = this.doc()
            .rect(10, 14)
            .move(784, 638)
          ;
          this.add(this.rocksClip2);
          this.rocksWrapper2 = this.doc()
            .group()
            .add(this.rocksSkip2)
            .clipWith(this.rocksClip2)
            .hide()
          ;
          this.add(this.rocksWrapper2);

          // Headframe
          this.add(this.headframeRock1)
            .add(this.headframeRock2)
            .add(this.headframeRock3)
            .add(this.headframeRock4)
          ;

          this.headframeRocksClip = this.doc()
            .rect(67, 65)
            .move(716, 140)
          ;
          this.headframeRocksWrapper = this.doc()
            .group()
            .add(this.headframeRocksClip)
            .add(this.headframeRocks)
            .clipWith(this.headframeRocksClip)
          ;
          this.add(this.headframeRocksWrapper);

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
    reset: function() {
      this.headframeRock1.animate().opacity(0);
      this.headframeRock2.animate().opacity(0);
      this.headframeRock3.animate().opacity(0);
      this.headframeRock4.animate().opacity(0);
    }
    , gateUpperUp: function() {
      return this.gateUpper.animate(2000).y(0);
    }
    , gateUpperDown: function() {
      this.rocksWrapper2.hide();
      this.rocksWrapper.show();
      return this.gateUpper.animate(2000).y(9);
    }
    , gateLowerUp: function() {
      return this.gateLower.animate(2000).y(0);
    }
    , gateLowerDown: function() {
      this.rocksWrapper.hide();
      this.rocksWrapper2.show();
      return this.gateLower.animate(2000).y(15);
    }
    , chainDown: function() {
      return this.chain.animate(2000).move(0, 0);
    }
    , chainUp: function() {
      return this.chain.animate(2000).move(0, -9);
    }
    , measuringPileShow: function() {
      var self = this;
      return self.rocks4
        .animate(500, '<>', 500)
        .opacity(1)
        .after(function(){
          self.rocks3
            .animate(500)
            .opacity(1)
            .after(function(){
              self.rocks2
                .animate(500)
                .opacity(1)
                .after(function(){
                  self.rocks1
                    .animate(500)
                    .opacity(1)
                  ;
                })
              ;
            })
          ;
        })
      ;
    }
    , measuringPileHide: function() {
      var self = this;
      return self.rocks1
        .animate(500, '<>', 500)
        .opacity(0)
        .after(function(){
          self.rocks2
            .animate(500)
            .opacity(0)
            .after(function(){
              self.rocks3
                .animate(500)
                .opacity(0)
                .after(function(){
                  self.rocks4
                    .animate(500)
                    .opacity(0)
                  ;
                })
              ;
            })
          ;
        })
      ;
    }
    , skipPileShow: function() {
      var self = this;
      return self.rocks8
        .animate(500, '<>', 500)
        .opacity(1)
        .after(function(){
          self.rocks7
            .animate(500)
            .opacity(1)
            .after(function(){
              self.rocks6
                .animate(500)
                .opacity(1)
                .after(function(){
                  self.rocks5
                    .animate(500)
                    .opacity(1)
                  ;
                })
              ;
            })
          ;
        })
      ;
    }
    , skipPileHide: function() {
      this.rocks8.opacity(0);
      this.rocks7.opacity(0);
      this.rocks6.opacity(0);
      this.rocks5.opacity(0);
      return this;
    }
    , headframePile: function() {
      var self = this;
      return this.headframeRock4
        .animate(500, '<>', 500)
        .opacity(1)
        .after(function(){
          self.headframeRock3
            .animate(500)
            .opacity(1)
            .after(function(){
              self.headframeRock2
                .animate(500)
                .opacity(1)
                .after(function(){
                  self.headframeRock1
                    .animate(500)
                    .opacity(1)
                  ;
                })
              ;
            })
          ;
        })
      ;
    }
    , headframeSpillRocks: function() {
      var self = this;
      this.headframePile();
      return this.headframeRocks
        .animate(this.headframeSpillDuration, '-', 0)
        .move(-310, 245)
        .after(function(){
          self.headframeRocks
            .move(0, 0)
          ;
        })
      ;
    }
    , spillRocks: function() {
      this.rocksSkip2.animate(2500).move(85, 75);
      return this.rocksSkip
        .animate(2500)
        .move(85, 75)
      ;
    }
    , spillRocksReset: function() {
      this.rocksSkip.move(0, 0);
      this.rocksSkip2.move(0, 0);
      return this;
    }
    , up: function() {
        return this.skipBodyWrapper
          .animate(this.upDuration)
          .move(this.startX, this.skipTo)
        ;
    }
    , down: function() {
      return this.skipBodyWrapper
        .animate(this.upDuration)
        .move(this.startX, this.startY)
      ;
    }
    , headframeDump: function() {
      return this.headframeSpillRocks();
    }
    , go: function() {
      var self = this;
      self.gateUpperDown().after(function(){
        self.chainUp().after(function(){
          self.measuringPileShow();
          self.spillRocks().after(function(){
            self.spillRocksReset();
            self.chainDown().after(function(){
              self.gateUpperUp().after(function(){
                self.gateLowerDown().after(function(){
                  self.measuringPileHide();
                  self.skipPileShow();
                  self.spillRocks().after(function(){
                    self.spillRocksReset();
                    self.gateLowerUp().after(function(){
                      self.up().after(function(){
                        self.skipPileHide();
                        self.headframeDump();
                        self.down().after(function(){
                          self.reset();
                          self.go();
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
      return this;
    }
});
