import Modernizr from 'modernizr';

// Initialize Modernizr
if (Modernizr.svg) {
  document.documentElement.classList.add('svg');
} else {
  document.documentElement.classList.add('no-svg');
}

export default Modernizr; 