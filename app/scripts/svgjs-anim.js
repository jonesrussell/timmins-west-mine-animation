'use strict';
/*global SVG, mill, EventBus */

import { SVG } from '@svgdotjs/svg.js';
import EventBus from 'eventbusjs';
import './svg-extensions.js';
import { initHeadings } from './svgjs_anim/headings.js';
import { initPreload } from './svgjs_anim/preload.js';
import { initHoisting } from './svgjs_anim/hoisting.js';
import { initSkipping } from './svgjs_anim/skipping.js';
import { initDevelopment } from './svgjs_anim/development.js';
import { initHaulage } from './svgjs_anim/haulage.js';
import { initThunderCreek } from './svgjs_anim/thunder-creek.js';
import { initShop } from './svgjs_anim/shop.js';
import { initStoping } from './svgjs_anim/stoping.js';

export class SVGjsAnim {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.draw = SVG().addTo(this.container).size('100%', '100%');
    this.videos = {};
    this.headings = {};
    this.init();
  }

  init() {
    // Initialize all animation modules
    initHeadings(this);
    initPreload(this);
    initHoisting(this);
    initSkipping(this);
    initDevelopment(this);
    initHaulage(this);
    initThunderCreek(this);
    initShop(this);
    initStoping(this);
  }

  preload() {
    // Add any preloading logic here
    const loading = document.getElementById('anim-loading');
    if (loading) {
      loading.style.display = 'none';
    }
  }

  Scene() {
    EventBus.addEventListener('clicked_heading', this.zoomIn, this);
    EventBus.addEventListener('clicked_Scene', this.zoomOut, this);
    EventBus.addEventListener('play_video', this.playVideo, this);
    EventBus.addEventListener('stop_video', this.stopVideo, this);

    this.scene.click(() => { EventBus.dispatch('clicked_Scene'); });
    this.scene.add(this.sceneHeadings);
  }

  zoomIn(e, headingName, scale, cx, cy) {
    var scene = this.scene;
    scene.data('active-heading', headingName);
    var head = this.headings[headingName];
    if (head.hasClass('zoom-in')) {
      head.removeClass('zoom-in')
        .addClass('action');
      scene
        .animate()
        .transform({ scaleX: scale, scaleY: scale, cx: cx, cy: cy })
        .after(() => {
          scene.addClass('zoom-out');
        });
    } else {
      EventBus.dispatch('play_video', this, headingName);
    }
    event.stopPropagation();
  }

  zoomOut() {
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
  }

  playVideo(e, name) {
    this.videos[name].container.style.display = 'block';
    document.getElementById('trigger-overlay').click();
    this.videos[name].play();
  }

  stopVideo() {
    var name;
    for(name in this.videos) {
      this.videos[name].container.style.display = 'none';
      this.videos[name].pause();
      this.videos[name].time(0);
    }
  }

  build() {
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
  }

  start() {
    return this.cloudGroup
      .animate(380000, '-', 0)
      .move(this.origSceneW, 0)
      .loop();
  }
}

// Make SVGjsAnim available globally
window.SVGjsAnim = SVGjsAnim;
