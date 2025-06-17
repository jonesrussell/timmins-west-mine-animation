// Simple SVG support check
if (document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1')) {
  document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, 'svg');
} else {
  document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, 'no-svg');
  document.getElementById('no-svg').style.display = 'block';
}

export default Modernizr; 