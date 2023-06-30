const FileOptions = { types: [{ description: "Json Files", accept: { "application/json": [".json"] } }] };

var Keys = {
    Up: 38,
    Down: 40,
    Right: 39,
    Left: 37
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function HasSaveFilePicker() {
    return ('showSaveFilePicker' in window);
}

function HasOpenFilePicker() {
    return ('showOpenFilePicker' in window);
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