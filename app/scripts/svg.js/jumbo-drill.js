'use strict';
/*global SVG */

SVG.JumboDrill = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function() {
      var img = 'images/master.svg';
      this.bottomDrillBody = this.doc().use('Jumbo_Drill_Bottom_Drill', img);
      this.bottomDrillBit = this.doc().use('Jumbo_Drill_Bottom_Drill_Bit_Group', img);
      this.bottomDrill = this.doc().group().add(this.bottomDrillBit).add(this.bottomDrillBody);
      this.topDrillBody = this.doc().use('Jumbo_Drill_Top_Drill', img);
      this.topDrillBit = this.doc().use('Jumbo_Drill_Top_Drill_Bit_Group', img);
      this.topDrill = this.doc().group().add(this.topDrillBit).add(this.topDrillBody);
      this.jumboBody = this.doc().use('Jumbo_Drill_Body', img);

      this.jumbo = this.doc()
        .group()
        .attr('id', 'jumbo-drill')
        .add(this.topDrill)
        .add(this.bottomDrill)
        .add(this.jumboBody)
      ;
      this.add(this.jumbo);

      this.drillTime = 3000;

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
  forward: function() {
    return this.jumbo
      .animate(5000)
      .x(96.5)
    ;
  }
  , backward: function() {
    return this.jumbo
      .animate(5000)
      .x(0)
    ;
  }
  , bottomDrillDown: function() {
    return this.bottomDrill
      .animate()
      .y(2)
    ;
  }
  , bottomDrillUp: function() {
    return this.bottomDrill
      .animate()
      .y(0)
    ;
  }
  , bottomDrillIn: function() {
    return this.bottomDrillBit
      .animate(this.drillTime)
      .x(10)
    ;
  }
  , bottomDrillOut: function() {
    return this.bottomDrillBit
      .animate()
      .x(0)
    ;
  }
  , bottomDrillLeaveHole: function() {
    return this;
  }
  , topDrillDown: function() {
    return this.topDrill
      .animate()
      .y(0)
    ;
  }
  , topDrillUp: function() {
    return this.topDrill
      .animate()
      .y(-2)
    ;
  }
  , topDrillIn: function() {
    return this.topDrillBit
      .animate(this.drillTime)
      .x(10)
    ;
  }
  , topDrillOut: function() {
    return this.topDrillBit
      .animate()
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
