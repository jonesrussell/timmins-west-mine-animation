'use strict';
/*global SVG */

SVG.JumboDrill = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function() {
      this.topDrillBody = this.doc().image('images/Jumbo_Drill_Top_Body.svg', 1366, 700);
      this.topDrillBit = this.doc().image('images/Jumbo_Drill_Top_Drill_Bit_Group.svg', 1366, 700);
      this.jumboBody = this.doc().image('images/Jumbo_Drill_Body.svg', 1366, 700);
      this.topDrillHole1 = this.doc().image('images/Jumbo_Drill_Holes_1.svg', 1366, 700).opacity(0);
      this.topDrillHole2 = this.doc().image('images/Jumbo_Drill_Holes_2.svg', 1366, 700).opacity(0);
      this.bottomDrillBody = this.doc().image('images/Jumbo_Drill_Bottom_Body.svg', 1366, 700);
      this.bottomDrillBit = this.doc().image('images/Jumbo_Drill_Bottom_Drill_Bit_Group.svg', 1366, 700);
      this.bottomDrillHole = this.doc().image('images/Bottom_Drill_Hole.svg', 1366, 700);
      this.bottomDrillHole1 = this.doc().image('images/Jumbo_Drill_Holes_3.svg', 1366, 700).opacity(0);
      this.bottomDrillHole2 = this.doc().image('images/Jumbo_Drill_Holes_4.svg', 1366, 700).opacity(0);

      this.attr('id', 'jumbo-drill');

      this.clip = this.doc()
        .rect(166, 100)
        .move(1000, 600)
      ;
      this.add(this.clip);
      this.clipWith(this.clip);

      this.topDrill = this.doc().group()
        .add(this.topDrillBit)
        .add(this.topDrillBody);

      this.topDrillHoles = this.doc().group()
        .add(this.topDrillHole1)
        .add(this.topDrillHole2)
      ;
      this.add(this.topDrillHoles);

      this.bottomDrill = this.doc().group()
        .add(this.bottomDrillHole)
        .add(this.bottomDrillBit)
        .add(this.bottomDrillBody)
      ;

      this.bottomDrillHoles = this.doc().group()
        .add(this.bottomDrillHole1)
        .add(this.bottomDrillHole2)
      ;
      this.add(this.bottomDrillHoles);

      this.jumbo = this.doc()
        .group()
        .add(this.topDrill)
        .add(this.bottomDrill)
        .add(this.jumboBody)
      ;
      this.add(this.jumbo);

      this.driveTime = 10000;
      this.drillTime = 2000;

      this.go();
      return this;
    }
  }
  , construct: {
    jumboDrill: function() {
      return this.put(new SVG.JumboDrill)
        .build();
    }
  }
});

SVG.extend(SVG.JumboDrill, {
  reset: function() {
    this.topDrillHole1.animate(500).opacity(0);
    this.topDrillHole2.animate(500).opacity(0);
    this.bottomDrillHole1.animate(500).opacity(0);
    this.bottomDrillHole2.animate(500).opacity(0);
  }
  , forward: function() {
    return this.jumbo
      .animate(this.driveTime)
      .x(96.5)
    ;
  }
  , backward: function() {
    return this.jumbo
      .animate(this.driveTime)
      .x(0)
    ;
  }
  , bottomDrillDown: function() {
    return this.bottomDrill
      .animate(this.drillTime)
      .y(2)
    ;
  }
  , bottomDrillUp: function() {
    return this.bottomDrill
      .animate(this.drillTime)
      .y(0)
    ;
  }
  , bottomDrillIn: function() {
    return this.bottomDrillBit
      .animate(this.drillTime)
      .x(11.5)
    ;
  }
  , bottomDrillOut: function() {
    if(this.bottomDrillHole1.opacity()) {
      this.bottomDrillHole2.opacity(1);
    } else {
      this.bottomDrillHole1.opacity(1);
    }
    return this.bottomDrillBit
      .animate(this.drillTime)
      .x(0)
    ;
  }
  , bottomDrillLeaveHole: function() {
    return this;
  }
  , topDrillDown: function() {
    return this.topDrill
      .animate(this.drillTime)
      .y(0)
    ;
  }
  , topDrillUp: function() {
    return this.topDrill
      .animate(this.drillTime)
      .y(-2)
    ;
  }
  , topDrillIn: function() {
    return this.topDrillBit
      .animate(this.drillTime)
      .x(11.5)
    ;
  }
  , topDrillOut: function() {
    if(this.topDrillHole2.opacity()) {
      this.topDrillHole1.opacity(1);
    } else {
      this.topDrillHole2.opacity(1);
    }
    return this.topDrillBit
      .animate(this.drillTime)
      .x(0)
    ;
  }
  , topDrillLeaveHole: function() {
    return this;
  }
  , go: function() {
    var self = this;
    self.forward().after(function(){

      self.bottomDrillIn().after(function(){
        self.bottomDrillLeaveHole();
        self.bottomDrillOut().after(function(){
          self.bottomDrillDown().after(function(){
              self.bottomDrillIn().after(function(){
                self.bottomDrillLeaveHole();
                self.bottomDrillOut().after(function(){
                  self.bottomDrillUp();
                });
              });
          });
        });
      });

      self.topDrillIn().after(function(){
        self.topDrillLeaveHole();
        self.topDrillOut().after(function(){
          self.topDrillUp().after(function(){
            self.topDrillIn().after(function(){
              self.topDrillLeaveHole();
              self.topDrillOut().after(function(){
                self.topDrillDown().after(function(){
                  self.backward().after(function(){
                    self.reset();
                    self.go();
                  });
                });
              });
            });
          });
        });
      });

    }); // end go
  }
});
