var EventType = {
    MoveScene: "move",
    ChangeFog: "fog",
    ChangeLayer: "layer",
    ChangeReveal: "reveal"
};

class AnimationEvent {
    constructor() {
        this.name = "";
        this.index = 0;
        this.actions = [];
    }
}

class AnimationAction {
    constructor() {
        this.type = "";
        this.name = "";
        this.index = 0;
        this.isParallel = false;
        this.parameters = [];
        this.executed = false;
    }
}

class ImageLayer {
    constructor() {
        this.key = GenerateGUID();
        this.file = "";
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
        this.showOverlay = false;
        this.overlayOpacity = 1.0;
        this.overlayColor = "#000000";
        this.img = new Image();
        this.b64 = null;

        this.backColor = "#ffffff";
        this.gridColor = "#ff0000";
        this.gridSize = "96";
        this.gridShow = true;
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

    draw(ctx, modX, modY) {
        if (!this.visible) return;
        if (this.showOverlay) {
            ctx.save();
            ctx.fillStyle = this.overlayColor;
            ctx.globalAlpha = this.overlayOpacity;
            canvasCtx.fillRect(0, 0, canvasObj.width, canvasObj.height);
            ctx.restore();
        }
        ctx.save();
        ctx.globalAlpha = this.transp;
        var pos = this.calcFlip(ctx, this.w, this.h);
        ctx.drawImage(this.img, modX + (this.x + pos.x), modY + (this.y + pos.y), this.w, this.h);
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
        this.frameZoom = 1.0;
    }

    draw(ctx, delta) {
        if (!this.visible) return;
        if (!this.img) return;
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

        var frameW = this.frameWidth * this.frameZoom;
        var frameH = this.frameHeight * this.frameZoom;
        var frameX = (this.x + pos.x);
        var frameY = (this.y + pos.y);
        var frameS = (this.frameCount * this.frameWidth);
        //console.log({ S: frameS, X: frameX, Y: frameY, W: frameW, H: frameH });

        ctx.drawImage(this.img,
            frameS,
            0,
            this.frameWidth,
            this.frameHeight,
            frameX, frameY, frameW, frameH);
        ctx.restore();
    }
}

class ImageAnimationInstance extends ImageAnimation {
    constructor() {
        super();
        this.key = GenerateGUID();
        this.animKey = "";
        this.animName = "";
        this.animflipType = 0;
        this.posx = 0;
        this.posy = 0;
        this.opacity = 1;
        this.delay = 0;
        this.runOnce = false;
    }

    GetImage() {
        if (this.img == null) {
            var ret = currentAnimationImageList.find(x => x.key == this.animKey);
            if (ret) this.img = ret.img;
        }
        return null;
    }

    cloneFromAnimation(animation, idx) {
        this.frameWidth = animation.frameWidth;
        this.frameHeight = animation.frameHeight;
        this.frameStep = animation.frameStep;
        this.frameSpeed = animation.frameSpeed;
        this.frameZoom = animation.frameZoom;
        this.animKey = animation.key;
        this.name = animation.name + ` Int ${idx}`;
        this.animName = animation.name;
        this.transp = animation.transp;
        this.flipType = this.animflipType = animation.flipType;
    }

    draw(ctx, delta) {
        if (!this.visible) return;
        this.GetImage();
        if (!this.img) return;

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

        var frameW = this.frameWidth * this.frameZoom;
        var frameH = this.frameHeight * this.frameZoom;
        var frameX = (this.x + pos.x) + this.posx;
        var frameY = (this.y + pos.y) + this.posy;
        var frameS = (this.frameCount * this.frameWidth);
        //console.log({ S: frameS, X: frameX, Y: frameY, W: frameW, H: frameH });

        ctx.drawImage(this.img,
            frameS,
            0,
            this.frameWidth,
            this.frameHeight,
            frameX, frameY, frameW, frameH);
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

        ctx.globalAlpha = parallaxOp;
        for (var i = 0; i < this.slideImages; i++) {
            if (parallaxVertical) {
                ctx.drawImage(this.img, parallaxX, (i * this.img.height) + parallaxY);
            } else {
                ctx.drawImage(this.img, (i * this.img.width) + parallaxX, parallaxY);
            }
        }
        ctx.restore();
    }
}

class MapReveal {
    constructor() {
        this.name = "";
        this.visible = true;
        this.proportion = 96; //Será usado para calcular a mudança do Box Size
        this.steps = [];
    }

    get Proportion() {
        return this.proportion ?? 96;
    }

    translateSteps() {
        this.steps.forEach((obj) => {
            obj.x += obj.rx;
            obj.y += obj.ry;
        });
    }

    updateSteps(x, y) {
        this.steps.forEach((obj) => {
            obj.x += x;
            obj.y += y;
        });
    }

    get Name() {
        var vis = this.visible ? "(V)" : "(H)";
        return `${vis}-${this.name}`;
    }
}

var bootstrapFloatAlert = function () {
    var self = this;
    this.baseTimeout = 2000;
    this.baseMessage = function (message, alert, parent) {
        $('<div id="bootstrapFloatAlert" class="alert alert-' + alert +
            ' fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><b>' +
            message + '&nbsp;&nbsp;</b></div>').appendTo((parent ? parent : 'body'));
        setTimeout(function () {
            $(".alert").alert('close');
        }, self.baseTimeout);
    }
    /**
    * Exibe um alerta flutuante de cor amarela (warning bootstrap) no canto superior direito do parent informado.
    * Se o parent não for informado, ela surgirá no canto superior direito da tela.
    * @memberof BootstrapFloatAlert
    * @public
    * @example
    * BootstrapFloatAlert.warning("Ocorreu um Erro!");
    * BootstrapFloatAlert.warning("Ocorreu um Erro!", "divPainelExemplo");
    */
    this.warning = function (message, parent) {
        self.baseMessage(message, 'warning', parent);
    }
    /**
    * Exibe um alerta flutuante de cor verde (success bootstrap) no canto superior direito do parent informado.
    * Se o parent não for informado, ela surgirá no canto superior direito da tela.
    * @memberof BootstrapFloatAlert
    * @public
    * @example
    * BootstrapFloatAlert.success("Dado persistido corretamente!");
    * BootstrapFloatAlert.success("Dado persistido corretamente!", "divPainelExemplo");
    */
    this.success = function (message, parent) {
        self.baseMessage(message, 'success', parent);
    }
    /**
    * Exibe um alerta flutuante de cor azul (info bootstrap) no canto superior direito do parent informado.
    * Se o parent não for informado, ela surgirá no canto superior direito da tela.
    * @memberof BootstrapFloatAlert
    * @public
    * @example
    * BootstrapFloatAlert.info("Dado persistido corretamente!");
    * BootstrapFloatAlert.info("Dado persistido corretamente!", "divPainelExemplo");
    */
    this.info = function (message, parent) {
        self.baseMessage(message, 'info', parent);
    }
    /**
    * Exibe um alerta flutuante de cor vermelha (danger bootstrap) no canto superior direito do parent informado.
    * Se o parent não for informado, ela surgirá no canto superior direito da tela.
    * @memberof BootstrapFloatAlert
    * @public
    * @example
    * BootstrapFloatAlert.danger("Ocorreu um Erro!");
    * BootstrapFloatAlert.danger("Ocorreu um Erro!", "divPainelExemplo");
    */
    this.danger = function (message, parent) {
        self.baseMessage(message, 'danger', parent);
    }
}
/**
* Funcionalidade estática para Exibição de alertas flutuantes.
* @public
* @class BootstrapFloatAlert
* @static
*/
var BootstrapFloatAlert = new bootstrapFloatAlert();