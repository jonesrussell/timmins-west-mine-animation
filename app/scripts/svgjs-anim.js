'use strict';

import { SVG } from '@svgdotjs/svg.js';
import EventBus from 'eventbusjs';
import './svg-extensions.js';
import { initPreload } from './svgjs_anim/preload.js';
import { initHoisting } from './svgjs_anim/hoisting.js';
import { initSkipping, extendSVGjsAnimWithSkipping } from './svgjs_anim/skipping.js';
import { initDevelopment, extendSVGjsAnimWithDevelopment } from './svgjs_anim/development.js';
import { initHaulage, extendSVGjsAnimWithHaulage } from './svgjs_anim/haulage.js';
import { initThunderCreek, extendSVGjsAnimWithThunderCreek } from './svgjs_anim/thunder-creek.js';
import { initShop, extendSVGjsAnimWithShop } from './svgjs_anim/shop.js';
import { extendSVGjsAnimWithStoping } from './svgjs_anim/stoping.js';

// Separate controllers for different responsibilities
class AnimationController {
  constructor(draw) {
    this.draw = draw;
    this.animations = new Map();
  }

  addAnimation(id, animation) {
    this.animations.set(id, animation);
  }

  startAnimation(id) {
    const animation = this.animations.get(id);
    if (animation) {
      animation.start();
    }
  }

  stopAnimation(id) {
    const animation = this.animations.get(id);
    if (animation) {
      animation.stop();
    }
  }
}

class SceneManager {
  constructor(draw) {
    this.draw = draw;
    this.scenes = new Map();
    this.currentScene = null;
  }

  addScene(id, scene) {
    this.scenes.set(id, scene);
  }

  switchScene(id) {
    const scene = this.scenes.get(id);
    if (scene) {
      this.currentScene?.hide();
      scene.show();
      this.currentScene = scene;
    }
  }
}

class VideoController {
  constructor() {
    this.videos = new Map();
  }

  addVideo(id, video) {
    this.videos.set(id, video);
  }

  playVideo(id) {
    const video = this.videos.get(id);
    if (video) {
      video.play();
    }
  }

  stopVideo(id) {
    const video = this.videos.get(id);
    if (video) {
      video.pause();
    }
  }
}

class ZoomController {
  constructor(draw) {
    this.draw = draw;
    this.isZoomed = false;
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
}

export class SVGjsAnim {
  constructor() {
    console.log('[SVGjsAnim] constructor called');
    this.draw = null;
    this.animationController = null;
    this.sceneManager = null;
    this.videoController = null;
    this.zoomController = null;
  }

  init() {
    console.log('[SVGjsAnim] init called');
    // Initialize SVG.js
    this.draw = SVG('drawing').size('100%', '100%');
    console.log('[SVGjsAnim] SVG instance created:', this.draw);
    // Initialize controllers
    this.animationController = new AnimationController(this.draw);
    this.sceneManager = new SceneManager(this.draw);
    this.videoController = new VideoController();
    this.zoomController = new ZoomController(this.draw);
    // Initialize all animation modules
    initPreload(this);
    initHoisting(this);
    initSkipping(this);
    initDevelopment(this);
    initHaulage(this);
    initThunderCreek(this);
    initShop(this);
    // Log the contents of the #drawing element
    const drawingEl = document.getElementById('drawing');
    if (drawingEl) {
      console.log('[SVGjsAnim] #drawing innerHTML after init:', drawingEl.innerHTML);
    } else {
      console.warn('[SVGjsAnim] #drawing element not found');
    }
  }

  // Event handling
  setupEventListeners() {
    EventBus.addEventListener('clicked_heading', () => this.zoomController.zoomIn());
    EventBus.addEventListener('clicked_Scene', () => this.zoomController.zoomOut());
    EventBus.addEventListener('play_video', (e) => this.videoController.playVideo(e.detail.id));
    EventBus.addEventListener('stop_video', (e) => this.videoController.stopVideo(e.detail.id));
  }

  preload() {
    console.log('[SVGjsAnim] preload called');
    const loading = document.getElementById('anim-loading');
    if (loading) {
      loading.style.display = 'none';
      console.log('[SVGjsAnim] Hiding #anim-loading');
    }
    // Log the contents of the #drawing element after preload
    const drawingEl = document.getElementById('drawing');
    if (drawingEl) {
      console.log('[SVGjsAnim] #drawing innerHTML after preload:', drawingEl.innerHTML);
    }
  }

  build() {
    const w = this.origSceneW;
    const h = this.origSceneH;

    this.HeadingsSVG();

    const background = this.draw.use('Background', 'images/master.svg');
    this.scene.add(background);

    const clouds = this.draw.image('images/clouds.svg', w, h);
    this.cloudGroup = this.draw.group().attr({ id: 'cloud-group' })
      .add(clouds)
      .add(clouds.clone().move(-w, 0));
    this.scene.add(this.cloudGroup);

    // Initialize all components
    this.Hoisting();
    this.Development();
    this.ThunderCreek();
    this.Haulage();
    this.Skipping();
    this.Shop();

    const foreground = this.draw.use('Foreground', 'images/master.svg');
    this.scene.add(foreground);

    this.setupEventListeners();
  }

  start() {
    return this.cloudGroup
      .animate(380000, '-', 0)
      .move(this.origSceneW, 0)
      .loop();
  }
}

// Extend SVGjsAnim prototype with all animation modules
extendSVGjsAnimWithSkipping(SVGjsAnim);
extendSVGjsAnimWithDevelopment(SVGjsAnim);
extendSVGjsAnimWithHaulage(SVGjsAnim);
extendSVGjsAnimWithThunderCreek(SVGjsAnim);
extendSVGjsAnimWithShop(SVGjsAnim);
extendSVGjsAnimWithStoping(SVGjsAnim);

// Make SVGjsAnim available globally
window.SVGjsAnim = SVGjsAnim;
