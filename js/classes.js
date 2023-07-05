class ImageLayer {
    constructor() {
        this.name = "";
        this.index = 0;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.transp = 1.0;
        this.angle = 0;
        this.visible = true;
        this.flipType = 0;
        this.img = new Image();
    }

    loadImage(imgSrc, callback) {
        this.img = new Image();
        this.img.src = imgSrc;
        this.img.onload = () => {
            if (callback) callback();
        };
    }

    initialize(imgSrc, callback) {
        this.loadImage(imgSrc, () => {
            this.w = this.img.naturalWidth;
            this.h = this.img.naturalHeight;
            if (callback) callback(this.img);
        });
    }

    calcFlip(ctx, w, h) {
        var flipH = (this.flipType == 1 || this.flipType == 3);
        var flipV = (this.flipType == 2 || this.flipType == 3);
        var scaleH = flipH ? -1 : 1,
            scaleV = flipV ? -1 : 1,
            posX = flipH ? w * -1 : 0,
            posY = flipV ? h * -1 : 0;
        ctx.scale(scaleH, scaleV);
        return { x: posX, y: posY };
    }

    draw(ctx) {
        if (!this.visible) return;
        ctx.save();
        ctx.globalAlpha = this.transp;
        var pos = this.calcFlip(ctx, this.w, this.h);
        ctx.drawImage(this.img, (this.x + pos.x), (this.y + pos.y), this.w, this.h);
        ctx.restore();
    }
}

class ImageAnimation extends ImageLayer {
    constructor() {
        super();
        this.frameWidth = 0;
        this.frameHeight = 0;
        this.frameStep = 2;
        this.frameSpeed = 0.5;
        this.frameTime = 0.0;
        this.frameCount = 0;
    }

    draw(ctx, delta) {
        if (!this.visible) return;
        this.frameTime += delta;
        if (this.frameTime >= this.frameSpeed) {
            this.frameTime = 0;
            this.frameCount += 1;
            if (this.frameCount > this.frameStep - 1) {
                this.frameCount = 0;
            }
        }
        ctx.save();
        ctx.globalAlpha = this.transp;
        var pos = this.calcFlip(ctx, this.frameWidth, this.frameHeight);
        ctx.drawImage(this.img, (this.frameCount * this.frameWidth), 0,
            this.frameWidth, this.frameHeight, (this.x + pos.x),
            (this.y + pos.y), this.frameWidth, this.frameHeight);
        ctx.restore();
    }
}

class ParallaxBackground {
    //TODO: Trazer os parametros para dentro (passados no draw, por exemplo)
    constructor() {
        this.totalSeconds = 0;
        this.speed = 20;
        this.img = new Image();
        this.slideImages = 1;
    }
    initialize(imgSrc, callback) {
        this.img.src = imgSrc;
        this.img.onload = () => {
            this.slideImages = Math.ceil(canvasObj.width / this.img.width) + 1;
            if (callback) callback(this.img);
        };
    }
    draw(ctx, delta) {
        this.totalSeconds += delta;
        var new_pos = (this.totalSeconds * this.speed % this.img.width);
        ctx.save();

        var fromRightToLeft = -new_pos;
        var fromLeftToRight = (new_pos - this.img.width);
        var directionX = parallaxDirection ? fromRightToLeft : fromLeftToRight;

        var fromTopToBottom = -new_pos;
        var fromBottomToTop = (new_pos - this.img.height);
        var directionY = parallaxDirection ? fromTopToBottom : fromBottomToTop;

        if (parallaxVertical) {
            ctx.translate(0, directionY);
        } else {
            ctx.translate(directionX, 0);
        }

        for (var i = 0; i < this.slideImages; i++) {
            if (parallaxVertical) {
                ctx.drawImage(this.img, parallaxX, (i * this.img.height) + parallaxY);
            } else {
                ctx.drawImage(this.img, (i * this.img.width) + parallaxX, parallaxY);
            }
        }
        /*
        //Escurecer o Parallax
        ctx.fillStyle = `rgba(0, 0, 0, ${currentDarken})`;
        ctx.fillRect(0, 0, canvasObj.width, canvasObj.height);
        */
        ctx.restore();
    }
}