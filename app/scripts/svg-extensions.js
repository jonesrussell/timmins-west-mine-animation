import { SVG, Element, G } from '@svgdotjs/svg.js';

// Extend SVG.js with our custom elements
Element.prototype.extend({
  // Add any common methods here
});

// Register all extensions
SVG.registerExtension({
  name: 'custom-elements',
  init: function() {
    // Define Step extension
    SVG.Step = SVG.invent({
      create: 'g',
      inherit: G,
      extend: {
        build: function() {
          return this.put(new SVG.Step());
        }
      },
      construct: {
        step: function() {
          return this.put(new SVG.Step());
        }
      }
    });

    // Define Skip extension
    SVG.Skip = SVG.invent({
      create: 'g',
      inherit: G,
      extend: {
        build: function() {
          return this.put(new SVG.Skip());
        }
      },
      construct: {
        skip: function() {
          return this.put(new SVG.Skip());
        }
      }
    });

    // Define Elevator extension
    SVG.Elevator = SVG.invent({
      create: 'g',
      inherit: G,
      extend: {
        build: function() {
          return this.put(new SVG.Elevator());
        }
      },
      construct: {
        elevator: function() {
          return this.put(new SVG.Elevator());
        }
      }
    });

    // Define DumpTruck extension
    SVG.DumpTruck = SVG.invent({
      create: 'g',
      inherit: G,
      extend: {
        build: function() {
          return this.put(new SVG.DumpTruck());
        }
      },
      construct: {
        dumpTruck: function() {
          return this.put(new SVG.DumpTruck());
        }
      }
    });

    // Define Scooptram extension
    SVG.Scooptram = SVG.invent({
      create: 'g',
      inherit: G,
      extend: {
        build: function() {
          return this.put(new SVG.Scooptram());
        }
      },
      construct: {
        scooptram: function() {
          return this.put(new SVG.Scooptram());
        }
      }
    });

    // Define ITHDrill extension
    SVG.ITHDrill = SVG.invent({
      create: 'g',
      inherit: G,
      extend: {
        build: function() {
          return this.put(new SVG.ITHDrill());
        }
      },
      construct: {
        ithDrill: function() {
          return this.put(new SVG.ITHDrill());
        }
      }
    });

    // Define GroundSupport extension
    SVG.GroundSupport = SVG.invent({
      create: 'g',
      inherit: G,
      extend: {
        build: function() {
          return this.put(new SVG.GroundSupport());
        }
      },
      construct: {
        groundSupport: function() {
          return this.put(new SVG.GroundSupport());
        }
      }
    });

    // Define JumboDrill extension
    SVG.JumboDrill = SVG.invent({
      create: 'g',
      inherit: G,
      extend: {
        build: function() {
          return this.put(new SVG.JumboDrill());
        }
      },
      construct: {
        jumboDrill: function() {
          return this.put(new SVG.JumboDrill());
        }
      }
    });

    // Define Longholes extension
    SVG.Longholes = SVG.invent({
      create: 'g',
      inherit: G,
      extend: {
        build: function() {
          return this.put(new SVG.Longholes());
        }
      },
      construct: {
        longholes: function() {
          return this.put(new SVG.Longholes());
        }
      }
    });

    // Define RockBreaker extension
    SVG.RockBreaker = SVG.invent({
      create: 'g',
      inherit: G,
      extend: {
        build: function() {
          return this.put(new SVG.RockBreaker());
        }
      },
      construct: {
        rockBreaker: function() {
          return this.put(new SVG.RockBreaker());
        }
      }
    });

    // Define JawCrusher extension
    SVG.JawCrusher = SVG.invent({
      create: 'g',
      inherit: G,
      extend: {
        build: function() {
          return this.put(new SVG.JawCrusher());
        }
      },
      construct: {
        jawCrusher: function() {
          return this.put(new SVG.JawCrusher());
        }
      }
    });

    // Define Zimba extension
    SVG.Zimba = SVG.invent({
      create: 'g',
      inherit: G,
      extend: {
        build: function() {
          return this.put(new SVG.Zimba());
        }
      },
      construct: {
        zimba: function() {
          return this.put(new SVG.Zimba());
        }
      }
    });
  }
});

export default SVG; 