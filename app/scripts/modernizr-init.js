// Simple SVG feature detection
const supportsSVG = (() => {
  return !!document.createElementNS && 
         !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
})();

// Add appropriate class to document
if (supportsSVG) {
  document.documentElement.classList.add('svg');
} else {
  document.documentElement.classList.add('no-svg');
}

export default {
  svg: supportsSVG
}; 