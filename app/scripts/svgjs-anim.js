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

//  this.scene.scale(4);
//  this.scene.move(-130, -320);
}

SVGjsAnim.prototype.Scene = function() {
  EventBus.addEventListener('clicked_heading', this.zoomIn, this);
  EventBus.addEventListener('clicked_Scene', this.zoomOut, this);
  EventBus.addEventListener('play_video', this.playVideo, this);
  EventBus.addEventListener('stop_video', this.stopVideo, this);

  this.scene.click(function(){ EventBus.dispatch('clicked_Scene'); });
  this.scene.add(this.sceneHeadings);
};

SVGjsAnim.prototype.zoomIn = function(e, headingName, scale, cx, cy){
  var scene = this.scene;
  scene.data('active-heading', headingName);
  var head = this.headings[headingName];
  if (head.hasClass('zoom-in')) {
    head.removeClass('zoom-in')
      .addClass('action');
    scene
      .animate()
      .transform({ scaleX: scale, scaleY: scale, cx: cx, cy: cy })
      .after(function(){
        scene.addClass('zoom-out');
      })
    ;
  } else {
    EventBus.dispatch('play_video', this, headingName);
  }
  event.stopPropagation();
};

SVGjsAnim.prototype.zoomOut = function() {
  var scene = this.scene;
  var headingName = scene.data('active-heading');
  scene.data('active-heading', null);
  if (scene.hasClass('zoom-out')) {
    scene.removeClass('zoom-out');
    scene.animate()
      .transform(new SVG.Matrix);

    this.headings[headingName]
      .removeClass('action')
      .addClass('zoom-in');
  }
};

SVGjsAnim.prototype.playVideo = function(e, name) {
  this.videos[name].container.style.display = 'block';
  document.getElementById('trigger-overlay').click();
  this.videos[name].play();
};

SVGjsAnim.prototype.stopVideo = function() {
  var name;
  for(name in this.videos) {
    this.videos[name].container.style.display = 'none';
    this.videos[name].pause();
    this.videos[name].time(0);
  }
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
    var w = this.origSceneW;
    var h = this.origSceneH;

    this.HeadingsSVG();

    var background = this.draw.use('Background', 'images/master.svg');
    this.scene.add(background);

    var clouds = this.draw.image('images/clouds.svg', w, h);
    this.cloudGroup = this.draw.group().attr({ id: 'cloud-group' })
      .add(clouds)
      .add(clouds.clone().move(-w, 0));
    this.scene.add(this.cloudGroup);
    this.scene.add(this.cloudGroup);

    this.Hoisting();
    this.Development();
    this.ThunderCreek();
    this.Haulage();
    this.Skipping();
    this.Shop();
    this.Stoping();

    var foreground = this.draw.use('Foreground', 'images/master.svg');
    this.scene.add(foreground);

    this.Scene();
};

SVGjsAnim.prototype.start = function()
{
  return this.cloudGroup
    .animate(380000, '-', 0)
    .move(this.origSceneW, 0)
    .loop()
  ;
};
