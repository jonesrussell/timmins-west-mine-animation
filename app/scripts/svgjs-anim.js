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
  constructor() {
    this.draw = null;
    this.headings = {};
    this.videos = {};
    this.currentScene = null;
    this.isZoomed = false;
  }

  init() {
    // Initialize SVG.js
    this.draw = SVG('animation').size('100%', '100%');
    
    // Initialize all animation modules
    initPreload(this);
    initHoisting(this);
    initSkipping(this);
    initDevelopment(this);
    initHaulage(this);
    initThunderCreek(this);
    initShop(this);
  }

  zoomIn() {
    if (!this.isZoomed) {
      this.draw.animate(500).scale(1.5);
      this.isZoomed = true;
    }
  }

  zoomOut() {
    if (this.isZoomed) {
      this.draw.animate(500).scale(1);
      this.isZoomed = false;
    }
  }

  playVideo(videoId) {
    if (this.videos[videoId]) {
      this.videos[videoId].play();
    }
  }

  stopVideo(videoId) {
    if (this.videos[videoId]) {
      this.videos[videoId].pause();
    }
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
