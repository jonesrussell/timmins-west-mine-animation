'use strict';

import { SVG } from '@svgdotjs/svg.js';

;(function(){

    SVG.Step = SVG.invent({
        create: 'g',
        inherit: SVG.G,
        extend: {
            build: function() {
                this.step = this.doc().use('Step', 'images/master.svg');
                this.add(this.step);
                return this;
            },
            setHeading: function(heading) {
                this.add(heading);
                return this;
            },
            setZoom: function(zoom) {
                this.zoom = zoom;
                this.add(zoom);
                return this;
            },
            setScene: function(scene) {
                this.scene = scene;
                return this;
            },
            content: function(o) {
                this._content.add(o);
                return this;
            }
        },
        construct: {
            step: function() { return this.put(new SVG.Step).build(); }
        }
    });

    SVG.extend(SVG.Step, {
        go: function() {
            var self = this;
            this.step
                .animate(5000, '-', 0)
                .move(0, -100)
                .after(function() {
                    self.step.y(0);
                    self.go();
                });
        }
    });

}).call(this);
