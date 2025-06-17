// Wonderful video overlay lifted from https://github.com/codrops/FullscreenOverlayStyles
'use strict';

import classie from 'classie';

// Simple feature detection for CSS transitions
const supportsTransitions = (() => {
  const el = document.createElement('div');
  const transitions = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd',
    'transition': 'transitionend'
  };
  
  for (const t in transitions) {
    if (el.style[t] !== undefined) {
      return {
        transitions: true,
        transitionEnd: transitions[t]
      };
    }
  }
  
  return {
    transitions: false,
    transitionEnd: 'transitionend'
  };
})();

window.addEventListener('load', function() {

  function toggleOverlay() {
    if(classie.has(overlay, 'open') ) {
      classie.remove(overlay, 'open');
      classie.add(overlay, 'close');
      var onEndTransitionFn = function( ev ) {
        if(supportsTransitions.transitions) {
          if(ev.propertyName !== 'visibility') { return; }
          this.removeEventListener( supportsTransitions.transitionEnd, onEndTransitionFn );
        }
        classie.remove( overlay, 'close' );
      };
      if(supportsTransitions.transitions) {
        overlay.addEventListener( supportsTransitions.transitionEnd, onEndTransitionFn );
      }
      else {
        onEndTransitionFn();
      }
    }
    else if( !classie.has( overlay, 'close' ) ) {
      classie.add( overlay, 'open' );
    }
  }

  var triggerBttn = document.getElementById('trigger-overlay')
    , overlay = document.querySelector('div.overlay')
    , closeBttn = overlay.querySelector('button.overlay-close')
  ;

  triggerBttn.addEventListener( 'click', toggleOverlay );
  closeBttn.addEventListener( 'click', toggleOverlay );

});
