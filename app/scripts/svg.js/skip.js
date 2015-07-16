'use strict';
/*global SVG, Q */

SVG.Skip = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
       build: function(x, y) {
            this.startX = x;
            this.startY = y;
//            this.move(x, y);
            this.driveDuration = 13000;

            var skipBody = this.doc().image('images/skip.svg', 1366, 700);

//            this.oreClip = this.doc().ellipse(75, 50);
//            this.add(this.oreClip);
//            this.orePile.clipWith(this.oreClip);

            this.add(skipBody);

            return this;
        }
    },
    construct: {
        skip: function(x, y) {
            return this.put(new SVG.Skip).build(x, y);
        }
    }
});

SVG.extend(SVG.Skip, {
    go: function() {
        this.animate(5000).move(0, -470).loop();
        return this;
    },
    travel: function() {
        var defer = Q.defer();

        this.skipTire1.animate(this.driveDuration).rotate(600);
        this.skipTire2.animate(this.driveDuration).rotate(600);

        this.animate(this.driveDuration)
            .move(this.dumpAtX, this.dumpAtY)
            .after(function(){ defer.resolve(); });

        return defer.promise;
    },
    up: function() {
        var defer = Q.defer();
        this.skipBox.animate(1000)
            .transform({
                rotation: 10,
                x: 5,
                y: -2
            })
            .after(function(){ defer.resolve(); });
        return defer.promise;
    },
    dump: function() {
        this.oreClipDump();
        return this.orePileDump();
    },
    down: function() {
        this.orePileReset();
        var defer = Q.defer();

        this.skipBox.animate(1000)
            .transform({
                rotation: 0,
                x: 0,
                y: 0
            })
            .after(function(){ defer.resolve(); });

        return defer.promise;
    },
    leave: function() {
        var defer = Q.defer();

        this.skipTire1.animate(this.driveDuration).rotate(-600);
        this.skipTire2.animate(this.driveDuration).rotate(-600);
        this.animate(this.driveDuration).move(this.startX, this.startY)
            .after(function(){ defer.resolve(); });

        return defer.promise;
    },
    showOre: function() {
        this.oreClip.transform({ x: 60, y: -27.5 });
        return this;
    },
    oreClipDump: function() {
        this.oreClip.animate(2000)
            .transform({ x: -150, y: -60 });
        return this;
    },
    orePileReset: function(){
        this.orePile.transform({
            rotation: 0,
            x: 0,
            y: 0
        });

    },
    orePileDump: function() {
        var defer = Q.defer();
        this.orePile.animate(1000)
            .transform({
                rotation: 0,
                x: 150,
                y: 60
            })
            .after(function(){
                defer.resolve();
            });

        return defer.promise;
    }
});
