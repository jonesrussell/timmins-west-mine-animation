'use strict';
/*global SVGjsAnim, SVG */

SVGjsAnim.prototype.Development = function() {
  this.development = this.draw
    .group()
    .attr('id', 'development');

  // IE doesn't read image size
  var w = this.origSceneW;
  var h = this.origSceneH;

  this.scooptramTimmins2 = this.draw.image('images/scooptram_timmins2.svg', w, h);
  this.scene.add(this.scooptramTimmins2);

  this.groundSupport = this.draw.image('images/ground_support.svg', w, h);
  this.scene.add(this.groundSupport);

  this.jumboDrill = this.draw.image('images/jumbo_drill.svg', w, h);
  this.scene.add(this.jumboDrill);

  var anim = this;

  this.headings.development = this.draw
    .use('Development_Video_1_', 'images/headings.svg')
    .move(-150, -667)
    .addClass('zoom-in')
    .click(function(){
      console.log('clicked Development');
      if (this.hasClass('zoom-in')) {
        this.removeClass('zoom-in')
          .addClass('action');
        anim.scene
          .animate()
          .transform({ scaleX: 4.9, scaleY: 4.9, cx: 1240, cy: 690 })
          .after(function(){
            anim.scene.addClass('zoom-out')
            console.log('zoomed');
          })
        ;
      } else {
        console.log('play video');
      }
      event.stopPropagation();
    })
  ;
  this.scene
    .add(this.headings.development);

  this.scene.click(function(){
    console.log('clicked Scene');
    if (this.hasClass('zoom-out')) {
      this.removeClass('zoom-out');
      this.animate()
      .transform(new SVG.Matrix);

      anim.headings.development
        .removeClass('action')
        .addClass('zoom-in');
    }
  });

  return this;
};

