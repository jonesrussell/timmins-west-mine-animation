'use strict';

import EventBus from 'eventbusjs';

class HoistingAnimation {
  constructor(draw) {
    this.draw = draw;
    this.hoisting = null;
    this.elevator = null;
    this.rockBreaker = null;
    this.rockBreakerRocks = null;
    this.isRunning = false;
  }

  init() {
    try {
      this.hoisting = this.draw
        .group()
        .attr('id', 'hoisting');

      this.elevator = this.draw.elevator();
      this.rockBreaker = this.draw.rockBreaker();
      this.rockBreakerRocks = this.draw.rockBreakerRocks();

      this.hoisting
        .add(this.rockBreaker)
        .add(this.rockBreakerRocks)
        .add(this.elevator);

      this.setupEventListeners();
      return this;
    } catch (error) {
      console.error('Failed to initialize hoisting animation:', error);
      throw error;
    }
  }

  setupEventListeners() {
    EventBus.addEventListener('hoisting_start', () => this.start());
    EventBus.addEventListener('hoisting_stop', () => this.stop());
  }

  start() {
    if (this.isRunning) return;
    
    try {
      this.elevator.go();
      this.rockBreaker.go();
      this.rockBreakerRocks.go();
      this.isRunning = true;
    } catch (error) {
      console.error('Failed to start hoisting animation:', error);
      this.stop();
      throw error;
    }
  }

  stop() {
    if (!this.isRunning) return;
    
    try {
      this.elevator.stop();
      this.rockBreaker.stop();
      this.rockBreakerRocks.stop();
      this.isRunning = false;
    } catch (error) {
      console.error('Failed to stop hoisting animation:', error);
      throw error;
    }
  }

  cleanup() {
    this.stop();
    this.hoisting?.remove();
    this.hoisting = null;
    this.elevator = null;
    this.rockBreaker = null;
    this.rockBreakerRocks = null;
  }
}

export function initHoisting(anim) {
  const hoistingAnimation = new HoistingAnimation(anim.draw);
  return hoistingAnimation.init();
}

