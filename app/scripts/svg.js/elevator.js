'use strict';
/*global SVG */

// @TODO
// - TRASH TRANSFORMER
// - TRASH EventBus - Profile it
SVG.Elevator = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
       build: function(x, y) {
            this.startX = x;
            this.startY = y;
            this.move(x, y);

            this.transformer = this.doc().element('symbol');
            var self = this;
            this.transformer.el = self;
            this.transformer.gos([
               { y: -96, duration: 5000 }
              , { y: -270, duration: 5000 }
              , { y: -470, duration: 5000 }
              , { y: -270, duration: 5000 }
              , { y: -96, duration: 5000 }
              , { y: 0, duration: 5000 }
            ]);

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
