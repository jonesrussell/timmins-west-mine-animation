'use strict';
/*global SVGjsAnim */

(function(){
  this.initShaft = function() {
    var elements = this.draw.set();
    var animations = this.draw.set();

    this.mygroup = this.draw
    .group()
    .attr('id', 'shaft');

    this.skip = this.draw.skip(0, 0);
    this.mygroup.add(this.skip);

    this.elevator = this.draw.elevator(0, 0);
    this.scene.add(this.elevator);
  };

  this.getShaft = function() {
    return this.mygroup;
  };

  this.skipGo = function() {
    this.skip.go();
  };

}).call(SVGjsAnim.prototype);


