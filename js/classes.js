﻿class ImageLayer {
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
        this.showOverlay = false;
        this.overlayOpacity = 1.0;
        this.overlayColor = "#000000";
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

class MapReveal {
    constructor() {
        this.name = "";
        this.visible = true;
        this.steps = [];
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