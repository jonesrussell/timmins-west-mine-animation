'use strict';
/*global SVG */

SVG.extend(SVG.Bare, {
  gos: function(t) {
    this.t = t;
    this.tOrig = this.copy(t);
    return this;
  },
  go: function() {
      var t = this.t[0];
      var transformer = this;
      this.el.elevatorBody
        .animate(t.duration)
        .move(this.startX, t.y)
        .after(function(){
          transformer.goNext();
        });
      return this;
  },
  goNext: function() {
    this.t.shift();
    if (!this.t.length) {
      this.t = this.copy(this.tOrig);
    }
    return this.go();
  },
  copy: function(x) {
    return (JSON.parse(JSON.stringify(x)));
  }
});
