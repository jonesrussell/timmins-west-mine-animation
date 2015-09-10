'use strict';
/*global SVG */

SVG.Elevator = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function() {
      this.pathPoints = [
        { y: -96, duration: 5000 }
        , { y: -270, duration: 5000 }
        , { y: -470, duration: 5000 }
        , { y: -270, duration: 5000 }
        , { y: -96, duration: 5000 }
        , { y: 0, duration: 5000 }
      ];
      this.pathCounter = 0;

      // Hide parts the chain and elevator
      // when animating
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
    elevator: function() {
      return this.put(new SVG.Elevator)
        .build();
      ;
    }
  }
});

SVG.extend(SVG.Elevator, {
  go: function() {
    var i = this.pathCounter;
    this.pathCounter++;
    if (this.pathCounter >= this.pathPoints.length) {
      this.pathCounter = 0;
    }
    var self = this;
    return this.elevatorBody
      .animate(self.pathPoints[i].duration)
      .y(self.pathPoints[i].y)
      .after(function() {
        self.go();
      })
    ;
  }
});
