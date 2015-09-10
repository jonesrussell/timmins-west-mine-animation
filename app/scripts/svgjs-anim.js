'use strict';
/*global SVG, mill, EventBus */

function SVGjsAnim(id)
{
  this.draw = SVG(id)
    .addClass('svg-content')
    .spof();

  this.scene = this.draw
    .group()
    .attr({ id: 'scene' });
  this.sceneHeadings = this.draw
    .group()
    .attr({ id: 'scene-headings' });

  this.origSceneW = 1366;
  this.origSceneH = 700;

  this.draw.viewbox(0, 0, this.origSceneW, this.origSceneH);
  this.draw.attr('preserveAspectRatio', 'xMidYMax meet');
}

SVGjsAnim.prototype.Scene = function() {
  this.scene.click(function(){
    EventBus.dispatch('clicked_Scene');
  });

  EventBus.addEventListener('clicked_Scene', function(){
    var scene = this.scene;
    var headingName = scene.data('active-heading');
    scene.data('active-heading', null);
    if (scene.hasClass('zoom-out')) {
      scene.removeClass('zoom-out');
      scene.animate()
        .transform(new SVG.Matrix);

      console.log(headingName);
      this.headings[headingName]
        .removeClass('action')
        .addClass('zoom-in');
    }
  }, this);

  EventBus.addEventListener('clicked_heading', function(e, headingName, scale, cx, cy){
    var scene = this.scene;
    scene.data('active-heading', headingName);
    var dev = this.headings[headingName];
    if (dev.hasClass('zoom-in')) {
      dev.removeClass('zoom-in')
        .addClass('action');
      scene
        .animate()
        .transform({ scaleX: scale, scaleY: scale, cx: cx, cy: cy })
        .after(function(){
          console.log('zoomed');
          scene.addClass('zoom-out');
        })
      ;
    } else {
      EventBus.dispatch('play_video', this, 'development');
      console.log('play video');
    }
    event.stopPropagation();
  }, this);

  this.scene.add(this.sceneHeadings);
};

SVGjsAnim.prototype.headings = {};

SVGjsAnim.prototype.init = function() {
    var svgjsAnim = mill;
    // @TODO skip if no images to preload
    if (svgjsAnim.preloadedImages) {
        var loadingImage = document.getElementById('anim-loading');
        loadingImage.parentNode.removeChild(loadingImage);
        svgjsAnim.build();
        svgjsAnim.start();
    } else {
        setTimeout(svgjsAnim.init, 100);
    }
};

SVGjsAnim.prototype.build = function() {
//    var w = this.origSceneW;
//    var h = this.origSceneH;

    this.HeadingsSVG();

    var background = this.draw.use('Background', 'images/master.svg');
    this.scene.add(background);

    // @TODO clouds linearGradient doesn't work
    // may have to fall back to clouds.svg
//    var clouds = this.draw.image('images/clouds.svg', w, h);
    var clouds = this.draw.use('Clouds', 'images/master.svg');
    this.scene.add(clouds);
//    this.cloudGroup = this.draw.group().attr({ id: 'cloud-group' })
//      .add(clouds);
//      .add(clouds.clone().move(-w, 0));
//    this.scene.add(this.cloudGroup);

    this.Hoisting();
    this.Development();
    this.Haulage();
    this.Skipping();
    this.Shop();
    this.Stoping();

    this.Scene();
};

SVGjsAnim.prototype.start = function()
{
/*  this.cloudGroup
    .animate(380000, '-', 0)
    .move(this.origSceneW, 0)
    .loop();*/
};
