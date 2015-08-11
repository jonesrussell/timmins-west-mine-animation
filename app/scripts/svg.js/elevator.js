'use strict';
/*global SVG */

SVG.Elevator = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
       build: function(x, y) {
            this.startX = x;
            this.startY = y;
            this.move(x, y);
            this.duration = 20000;
            this.elevatorTo = -470;

            this.clip = this.doc()
              .rect(1366, 700)
              .move(0, 217);
            this.add(this.clip);
            this.elevatorBody = this.doc()
              .image('images/elevator.svg', 1366, 700)
              .clipWith(this.clip);

            this.add(this.elevatorBody);

            return this;
        }
    },
    construct: {
        elevator: function(x, y) {
            return this.put(new SVG.Elevator).build(x, y);
        }
    }
});

SVG.extend(SVG.Elevator, {
    go: function() {
        var self = this;
        this.elevatorBody.animate(this.duration)
          .move(this.startX, this.elevatorTo)
          .after(function(){
            self.goBack();
          });
        return this;
    },
    goBack: function() {
        var self = this;
        this.elevatorBody.animate(this.duration)
          .move(this.startX, this.startY)
          .after(function(){
              self.go();
          });
    }
});
