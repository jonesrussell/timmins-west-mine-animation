'use strict';
/*global SVG, Q */

SVG.Skip = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
       build: function(x, y) {
            this.startX = x;
            this.startY = y;
            this.move(x, y);
            this.duration = 10000;
            this.skipTo = -470;

            this.clip = this.doc().rect(1366, 700).move(0, 217);
            this.add(this.clip);
            this.skipBody = this.doc()
              .image('images/skip.svg', 1366, 700)
              .clipWith(this.clip);

            this.add(this.skipBody);

            return this;
        }
    },
    construct: {
        skip: function(x, y) {
            return this.put(new SVG.Skip).build(x, y);
        }
    }
});

SVG.extend(SVG.Skip, {
    go: function() {
        var self = this;
        this.skipBody.animate(this.duration)
          .move(this.startX, this.skipTo)
          .after(function(){
            self.goBack();
          });
        return this;
    },
    goBack: function() {
        var self = this;
        this.skipBody.animate(this.duration)
          .move(this.startX, this.startY)
          .after(function(){
              self.go();
          });
    }
});
