/**
* Funcionalidade estática para Conversão Base64.
* @public
* @class Base64
* @static
*/
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    /**
    * Converte o valor informado para Base64.
    * @memberof Base64
    * @public
    * @example
    * var ret = Base64.encode("Valor");
    */
    encode: function (e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    /**
    * Converte o valor informado de Base64.
    * @memberof Base64
    * @public
    * @example
    * var ret = Base64.decode("Valor");
    */
    decode: function (e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function (e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function (e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}
/**
* Funcionalidade estática para geração de UUID (Guid).
* @public
* @class UUID (GUID)
* @static
*/
function UUIDjs() {
    //Exemplo de uso: var uuid4 = UUIDjs.create();
};

UUIDjs.maxFromBits = function (bits) {
    return Math.pow(2, bits);
};

UUIDjs.limitUI04 = UUIDjs.maxFromBits(4);
UUIDjs.limitUI06 = UUIDjs.maxFromBits(6);
UUIDjs.limitUI08 = UUIDjs.maxFromBits(8);
UUIDjs.limitUI12 = UUIDjs.maxFromBits(12);
UUIDjs.limitUI14 = UUIDjs.maxFromBits(14);
UUIDjs.limitUI16 = UUIDjs.maxFromBits(16);
UUIDjs.limitUI32 = UUIDjs.maxFromBits(32);
UUIDjs.limitUI40 = UUIDjs.maxFromBits(40);
UUIDjs.limitUI48 = UUIDjs.maxFromBits(48);

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
// @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

UUIDjs.randomUI04 = function () {
    return getRandomInt(0, UUIDjs.limitUI04 - 1);
};
UUIDjs.randomUI06 = function () {
    return getRandomInt(0, UUIDjs.limitUI06 - 1);
};
UUIDjs.randomUI08 = function () {
    return getRandomInt(0, UUIDjs.limitUI08 - 1);
};
UUIDjs.randomUI12 = function () {
    return getRandomInt(0, UUIDjs.limitUI12 - 1);
};
UUIDjs.randomUI14 = function () {
    return getRandomInt(0, UUIDjs.limitUI14 - 1);
};
UUIDjs.randomUI16 = function () {
    return getRandomInt(0, UUIDjs.limitUI16 - 1);
};
UUIDjs.randomUI32 = function () {
    return getRandomInt(0, UUIDjs.limitUI32 - 1);
};
UUIDjs.randomUI40 = function () {
    return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << 40 - 30)) * (1 << 30);
};
UUIDjs.randomUI48 = function () {
    return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << 48 - 30)) * (1 << 30);
};

UUIDjs.paddedString = function (string, length, z) {
    string = String(string);
    z = (!z) ? '0' : z;
    var i = length - string.length;
    for (; i > 0; i >>>= 1, z += z) {
        if (i & 1) {
            string = z + string;
        }
    }
    return string;
};

UUIDjs.prototype.fromParts = function (timeLow, timeMid, timeHiAndVersion, clockSeqHiAndReserved, clockSeqLow, node) {
    this.version = (timeHiAndVersion >> 12) & 0xF;
    this.hex = UUIDjs.paddedString(timeLow.toString(16), 8)
        + '-'
        + UUIDjs.paddedString(timeMid.toString(16), 4)
        + '-'
        + UUIDjs.paddedString(timeHiAndVersion.toString(16), 4)
        + '-'
        + UUIDjs.paddedString(clockSeqHiAndReserved.toString(16), 2)
        + UUIDjs.paddedString(clockSeqLow.toString(16), 2)
        + '-'
        + UUIDjs.paddedString(node.toString(16), 12);
    return this;
};

UUIDjs.prototype.toString = function () {
    return this.hex;
};
UUIDjs.prototype.toURN = function () {
    return 'urn:uuid:' + this.hex;
};

UUIDjs.prototype.toBytes = function () {
    var parts = this.hex.split('-');
    var ints = [];
    var intPos = 0;
    for (var i = 0; i < parts.length; i++) {
        for (var j = 0; j < parts[i].length; j += 2) {
            ints[intPos++] = parseInt(parts[i].substr(j, 2), 16);
        }
    }
    return ints;
};

UUIDjs.prototype.equals = function (uuid) {
    if (!(uuid instanceof UUID)) {
        return false;
    }
    if (this.hex !== uuid.hex) {
        return false;
    }
    return true;
};

UUIDjs.getTimeFieldValues = function (time) {
    var ts = time - Date.UTC(1582, 9, 15);
    var hm = ((ts / 0x100000000) * 10000) & 0xFFFFFFF;
    return {
        low: ((ts & 0xFFFFFFF) * 10000) % 0x100000000,
        mid: hm & 0xFFFF, hi: hm >>> 16, timestamp: ts
    };
};

UUIDjs._create4 = function () {
    return new UUIDjs().fromParts(
        UUIDjs.randomUI32(),
        UUIDjs.randomUI16(),
        0x4000 | UUIDjs.randomUI12(),
        0x80 | UUIDjs.randomUI06(),
        UUIDjs.randomUI08(),
        UUIDjs.randomUI48()
    );
};

UUIDjs._create1 = function () {
    var now = new Date().getTime();
    var sequence = UUIDjs.randomUI14();
    var node = (UUIDjs.randomUI08() | 1) * 0x10000000000 + UUIDjs.randomUI40();
    var tick = UUIDjs.randomUI04();
    var timestamp = 0;
    var timestampRatio = 1 / 4;

    if (now != timestamp) {
        if (now < timestamp) {
            sequence++;
        }
        timestamp = now;
        tick = UUIDjs.randomUI04();
    } else if (Math.random() < timestampRatio && tick < 9984) {
        tick += 1 + UUIDjs.randomUI04();
    } else {
        sequence++;
    }

    var tf = UUIDjs.getTimeFieldValues(timestamp);
    var tl = tf.low + tick;
    var thav = (tf.hi & 0xFFF) | 0x1000;

    sequence &= 0x3FFF;
    var cshar = (sequence >>> 8) | 0x80;
    var csl = sequence & 0xFF;

    return new UUIDjs().fromParts(tl, tf.mid, thav, cshar, csl, node);
};
/**
* Gera um GUID no formato padrão de 36 caracteres.
* @memberof UUIDjs
* @public
* @example
* var ret = UUIDjs.create().toString();
*/
UUIDjs.create = function (version) {
    version = version || 4;
    return this['_create' + version]();
};

UUIDjs.fromTime = function (time, last) {
    last = (!last) ? false : last;
    var tf = UUIDjs.getTimeFieldValues(time);
    var tl = tf.low;
    var thav = (tf.hi & 0xFFF) | 0x1000;  // set version '0001'
    if (last === false) {
        return new UUIDjs().fromParts(tl, tf.mid, thav, 0, 0, 0);
    } else {
        return new UUIDjs().fromParts(tl, tf.mid, thav, 0x80 | UUIDjs.limitUI06, UUIDjs.limitUI08 - 1, UUIDjs.limitUI48 - 1);
    }
};

UUIDjs.firstFromTime = function (time) {
    return UUIDjs.fromTime(time, false);
};
UUIDjs.lastFromTime = function (time) {
    return UUIDjs.fromTime(time, true);
};

UUIDjs.fromURN = function (strId) {
    var r, p = /^(?:urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(?:\})?$/i;
    if ((r = p.exec(strId))) {
        return new UUIDjs().fromParts(parseInt(r[1], 16), parseInt(r[2], 16),
            parseInt(r[3], 16), parseInt(r[4], 16),
            parseInt(r[5], 16), parseInt(r[6], 16));
    }
    return null;
};

UUIDjs.fromBytes = function (ints) {
    if (ints.length < 5) {
        return null;
    }
    var str = '';
    var pos = 0;
    var parts = [4, 2, 2, 2, 6];
    for (var i = 0; i < parts.length; i++) {
        for (var j = 0; j < parts[i]; j++) {
            var octet = ints[pos++].toString(16);
            if (octet.length == 1) {
                octet = '0' + octet;
            }
            str += octet;
        }
        if (parts[i] !== 6) {
            str += '-';
        }
    }
    return UUIDjs.fromURN(str);
};

UUIDjs.fromBinary = function (binary) {
    var ints = [];
    for (var i = 0; i < binary.length; i++) {
        ints[i] = binary.charCodeAt(i);
        if (ints[i] > 255 || ints[i] < 0) {
            throw new Error('Unexpected byte in binary data.');
        }
    }
    return UUIDjs.fromBytes(ints);
};

// Aliases to support legacy code. Do not use these when writing new code as
// they may be removed in future versions!
UUIDjs['new'] = function () {
    return this.create(4);
};

UUIDjs.newTS = function () {
    return this.create(1);
};

var MCFrameworkWords = {
    Language: "pt-BR",
    DropDownSelect: "Selecione...",
    TitleWait: "Aguarde...",
    StatusYes: "Sim",
    StatusNo: "Não",
    InsertValue: "Insira um Valor...",
    ErrorOccur: "Ocorreu um Erro",
    FormRequiredField: "* Campo {0} Obrigatório;",
    FormMessageSuccess: "Registro gravado com sucesso.",
    TableGridAdd: "Adicionar",
    TableGridSave: "Gravar",
    TableGridCancel: "Cancelar",
    TableGridDelete: "Excluir Registro",
    TableGridEdit: "Editar Registro",
    TableGridMoveUp: "Mover Registro Acima",
    TableGridMoveDown: "Mover Registro Abaixo",
    TableGridDeleteMessage: "Deseja mesmo remover este item?"
};

var MCFormsUseEnterForSearch = true;

function MCRegisterFormEnterForSearch() {
    $(document).ready(() => {
        $(document).keypress(function (event) {
            if (!MCFormsUseEnterForSearch) return;
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                event.stopImmediatePropagation();
                event.preventDefault();
                try {
                    LoadDatatablesData();
                } catch (e) {
                }
            }
        });
    });
}

function MCBootstrapMenuRedirect(url) {
    MCShowUpdateProgress();
    location.href = url;
}

var MCQueryString = {
    get Get() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
}

function MCForceDownloadFile(url, fileName) {
    var link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
}

var Regex = {
    Match: function (input, pattern) {
        var ret = Regex.Matches(input, pattern);
        if (ret) return ret[0];
        return null;
    },
    Matches: function (input, pattern) {
        var rgx = new RegExp(pattern);
        var match = rgx.exec(input);
        var ret = [];
        var counter = 0;
        while (match !== null) {
            var grps = [];
            grps.push({ Value: match[0] });
            for (idx = 1; idx <= 999; idx++) {
                var grp = match[idx];
                if (!grp) break;
                if (grp) grps.push({ Value: grp });
            }
            var lastobj = { Value: match[0], Groups: grps };
            ret.push(lastobj);
            match = rgx.exec(input);
            //Erro: Mesmo objeto. apenas um ajuste para usar agora.
            if (match && match[0] == lastobj.Value) {
                match = null;
                break;
            }
            counter++;
            if (counter > 999) break;
        }
        return ret;
    },
    IsMatch: function (input, pattern) {
        try {
            var rgx = new RegExp(pattern);
            return rgx.exec(input) !== null;
        } catch (e) {
            LogError("Regex.IsMatch Error: " + e.message);
            return false;
        }
    },
    Replace: function (input, pattern, replacement) {
        return input.replace(pattern, replacement);
    },
    Split: function (input, pattern) {
        return input.split(pattern);
    },
    GetNumbers: function (input) {
        return Regex.Replace(input, /[^0-9]/ig, "");
    },
    SplitStringWithLiteral: function (input, separator) {
        Regex.Matches(input, /[\""].+?[\""]/ig).forEach((mtc) => {
            input = input.replace(mtc.Value, mtc.Value.replace(/"/ig, "").replace(separator, "[]"));
        });
        var valores = input.split(separator);
        valores.forEach((obj, idx) => {
            valores[idx] = obj.replace(/\[\]/ig, separator);
        });
        return valores;
    }
};

function MCOpenNewWindowAsTab(uri) {
    /// <summary>
    /// Facilitador para abrir novas janelas como tabs.
    /// </summary>
    $('#linkToOpen').remove();
    var link = document.createElement('a');
    link.target = '_blank';
    link.href = uri;
    link.id = 'linkToOpen';
    document.body.appendChild(link);
    $('#linkToOpen')[0].click();
    $('#linkToOpen')[0].remove();
}

function MCGenerateGUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid.toUpperCase();
};

/**
 * Concatena os valores informados como argumentos e formata para se tornarem uma unica url.
 * @public
 */
function ConcatUrls() {
    var ret = Array.prototype.slice.call(arguments).join("/").replace("://", "()");
    ret = ret.replace(/\/{2,}/ig, "/");
    return ret.replace("()", "://");
}

/**
* Função de Validação de existência de uma função Javascript.
* @public
* @example
* function teste () { return 0; }
* var ret = FunctionExists(teste); //Retorno verdadeiro;
*/
function FunctionExists(obj) {
    return (typeof obj === "function");
}

function MCFormatDisplayBoolean(value, yesValue, noValue) {
    yesValue = yesValue ?? MCFrameworkWords.StatusYes;
    noValue = noValue ?? MCFrameworkWords.StatusNo;
    try {
        if (value == false || (value + "").toLowerCase() == "false" || (value + "") == "0") return noValue;
        if (value == true || (value + "").toLowerCase() == "true" || (value + "") == "1") return yesValue;
        return "N/A";
    } catch (e) {
        return 'N/A';
    }
}

/**
 * 
 * @param {any} obj
 */
function IsFunction(obj) {
    return obj && {}.toString.call(obj) === '[object Function]';
}

/**
* Função de Validação de Objeto.
* @public
* @example
* var ret = IsObject(null); //Retorno falso.
*/
function IsObject(obj) {
    return obj === Object(obj);
}
/**
* Função de Validação de Array.
* @public
* @example
* var ret = IsArray([]); //Retorno verdadeiro.
*/
function IsArray(obj) {
    return obj.constructor === Array;
}
/**
* Função que identifica se o browser em questão é de um dispositivo móvel.
* @public
* @example
* var ret = IsMobileDevice();
*/
function IsMobileDevice() {
    return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
}
/**
* Função que determina se o browser atual é uma versão do Internet Explorer.
* @public
* @example
* var ret = DetectIE();
*/
function DetectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    // other browser
    return false;
}
/**
* Função que retorna o nome do tipo de browser atual.
* @public
* @example
* var ret = GetBrowserType();
*/
function GetBrowserType() {
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    // Internet Explorer 6-11
    var isIE = DetectIE();
    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    return isOpera ? "Opera" :
        isFirefox ? "FireFox" :
            isSafari ? "Safari" :
                isIE ? "Internet Explorer" :
                    isEdge ? "Microsoft Edge" :
                        isChrome ? "Chrome" : "Não Reconhecido";
}

/**
* Função que determina se a página atual está sendo executada dentro de um Iframe.
* @public
* @example
* var ret = InIframe();
*/
function InIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

var MCParser = {
    toBoolean: function (valor) {
        switch ((valor + "").toLowerCase().trim()) {
            case "true": case "yes": case "1": return true;
            case "false": case "no": case "0": case null: return false;
            default: return Boolean(valor);
        }
    }
}

function MCCalendar(controlName, lang) {
    var self = this;
    this.ControlName = controlName;
    this.Language = lang;

    this.Control = () => {
        return $('#' + self.ControlName);
    }

    this.Clear = () => {
        var ctrl = self.Control();
        ctrl.val("");
    }

    this.GetDate = () => {
        var ctrl = self.Control();
        return DateFunctions.convert(ctrl.val());
    }

    this.SetDate = (val) => {
        var mask = "d/m/y";
        if (lang.toLowerCase() == "en-en") {
            mask = "y-m-d";
        }
        var ctrl = self.Control();
        var valor = DateFunctions.formatComplete(val, mask);
        ctrl.val(valor);
    }
}

function MCShowCalendar(controlName) {
    var ctrl = $("#" + controlName);
    var enabled = ctrl.prop("disabled");
    if (!enabled) {
        ctrl.datepicker("show");
        if (ctrl.val().length > 0) {
            var vals = ctrl.val().split("/");
            var data = new Date(parseInt(vals[2]), parseInt(vals[1]) - 1, parseInt(vals[0]));
            ctrl.datepicker("setDate", data);
        }
    }
}

function MCInitializeCalendar(controlName, startYear, finishYear, callback, lang) {
    $(document).ready(() => {
        MCInitializeCalendarNow(controlName, startYear, finishYear, callback, lang);
    });
}

function MCInitializeCalendarNow(controlName, startYear, finishYear, callback, lang) {
    if (!lang) lang = "pt-BR";
    var maskNine = "99/99/9999";
    var maskFort = "dd/mm/yyyy";
    var maskMinF = "d/m/yy";

    if (lang.toLowerCase() == "en-en") {
        var maskNine = "9999-99-99";
        var maskFort = "yy-mm-dd";
        var maskMinF = "yy-m-d";
    }

    $.datepicker.setDefaults($.datepicker.regional[lang]);

    var cal = $('#' + controlName);
    var yearRange = `-${startYear}:+${finishYear}`;
    cal.inputmask({ 'mask': maskNine, 'clearMaskOnLostFocus': false });
    cal.datepicker({
        dateFormat: maskFort,
        yearRange: yearRange,
        changeMonth: true,
        changeYear: true
    });
    cal.blur(() => {
        var valor = cal.val();
        if (valor.length == 0) return;
        var obj = cal;
        setTimeout(() => {
            try {
                $.datepicker.parseDate(maskMinF, valor);
            } catch (e) {
                cal.val('');
            }
            if (callback) callback();
        }, 1);
    });
}

function MCInitializeMonthYearCalendar(controlName, startYear, finishYear, callback) {
    $(document).ready(() => {
        MCInitializeMonthYearCalendarNow(controlName, startYear, finishYear, callback);
    });
}

function MCInitializeMonthYearCalendarNow(controlName, startYear, finishYear, callback) {
    //TODO: Usar o MonthPicker
    var cal = $('#' + controlName);
    var yearRange = `-${startYear}:+${finishYear}`;
    cal.inputmask({ 'mask': '99/9999', 'clearMaskOnLostFocus': false });

    cal.datepicker({
        dateFormat: 'mm/yyyy',
        yearRange: yearRange,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function (dateText, inst) {
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
        }
    });
    cal.focus(() => {
        $(".ui-datepicker-calendar").hide();
        $('.ui-datepicker-close').unbind("click").click(function () {
            $(".ui-datepicker-calendar").hide();
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            cal.datepicker('setDate', new Date(year, month, 1));
            setTimeout(() => { $("#ui-datepicker-div").hide(); }, 10);
        });
    });
    cal.blur(() => {
        $(".ui-datepicker-calendar").hide();
        var valor = cal.val();
        if (valor.length == 0 || valor.length < 7) {
            cal.val('');
            return;
        }
        setTimeout(() => {
            try {
                var values = valor.split("/"); //Se for em inglês deve funcionar diferente
                var month = parseInt(values[0]) - 1;
                var year = values[1];
                cal.datepicker('setDate', new Date(year, month, 1));
            } catch (e) {
                cal.val('');
            }
            if (callback) callback();
        }, 1);
    });
}

function MCInitializeTimestampControl(controlName, required, callback) {
    $(document).ready(function () {
        var cal = $('#' + controlName);
        cal.inputmask({ 'mask': '99:99:99', 'clearMaskOnLostFocus': false });
        cal.blur(function () {
            var valor = cal.val();
            if (valor.length == 0) return;
            var obj = cal;
            setTimeout(function () {
                try {
                    if (!MCValidatorTime(controlName, required)) {
                        cal.val('');
                    }
                } catch (e) {
                    cal.val('');
                }
                if (callback) callback();
            }, 1);
        });
    });
}

function MCInitializeTimeControl(controlName, required, callback) {
    $(document).ready(function () {
        var cal = $('#' + controlName);
        cal.inputmask({ 'mask': '99:99', 'clearMaskOnLostFocus': false });
        cal.blur(function () {
            var valor = cal.val();
            if (valor.length == 0) return;
            var obj = cal;
            setTimeout(function () {
                try {
                    if (!MCValidatorTime(controlName, required)) {
                        cal.val('');
                    }
                } catch (e) {
                    cal.val('');
                }
                if (callback) callback();
            }, 1);
        });
    });
}

function MCValidatorTime(controlName, required) {
    /// <summary>
    /// Método padrão de validação de Hora no formato HH:mm
    /// </summary>
    var target = $("#" + controlName).val();
    //Remove os caracteres inválidos
    var value = target.replace(/[\:_]/ig, "");
    //se estiver zerado e não for requerido é válido.
    if (value.length == 0 && !required) {
        return true;
    }
    //Requerido ou não, verifica se tem os 4
    if (value.length < 4) {
        return false;
    }
    //Se tem 6, significa que tem segundos
    var isSecs = value.length == 6;
    //Requerido ou não, a hora preenchida deve ser válida.
    var comp = target.split(':');
    var hora = parseInt(comp[0]);
    var minu = parseInt(comp[1]);
    var secc = isSecs ? parseInt(comp[2]) : 0;
    var isHora = (hora >= 0 && hora <= 23);
    var isMinu = (minu >= 0 && minu <= 59);
    var isSecc = (isSecs ? (secc >= 0 && secc <= 59) : true);
    return (isHora && isMinu && isSecc);
}

function MCValidateCalendarData(sender, args) {
    var target = $("#" + sender.controltovalidate);
    var type = target.attr("data-type");
    var value = target.val();
    switch (type) {
        case "dmy":
            value = value.replace(/[\/_]/ig, ""); //Invalido para Datas
            break;
        case "hms":
            value = value.replace(/[\:_]/ig, ""); //Invalido para horas
            break;
    }
    args.IsValid = (value.length > 0);
}

function GenerateCalendarControlTag(controlName, controlType, enabled, startValue) {
    var isDate = controlType == "date";
    var retorno = "<div class='input-group input-group-sm' style='width: 140px;'>";
    retorno += "<div class='input-group-addon' style='min-width: 32px!important;'><span class='glyphicon glyphicon-" +
        (isDate ? "calendar" : "time") + "' style='cursor:pointer;" +
        (enabled ? "" : "color:#DDD;") + "' " +
        (isDate ? "onclick=\"MCShowCalendar('$');\"".replace("$", controlName) : "") + "></span></div>";
    retorno += "<input type='text' value='" + startValue + "' id='$' class='form-control input-sm' data-type='dmy' />".replace("$", controlName);
    retorno += "</div>";
    return retorno;
}

function MCInitializeDecimalNumericBox(controlName, decimalPlaces, allowNegative, decimalSeparator = ",", thousandsSeparator = ".") {
    $(document).ready(function () {
        MCInitializeDecimalNumericBoxNow(controlName, decimalPlaces, allowNegative, decimalSeparator, thousandsSeparator);
    });
}

function MCInitializeMobileDecimal(jqueryControl, decimalPlaces, decimalSeparator = ",") {
    jqueryControl
        //Para evitar caracteres não numéricos
        .on("keypress", (evt) => {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            return true;
        })
        //Para aplicar a máscara decimal
        .on('keyup', (ev) => {
            var ctl = jqueryControl;
            var value = ctl.val().replace('.', '').replace(',', '');
            var length = parseInt("1" + MCPadLeft("", decimalPlaces, '0'));
            var retValue = (Number(value) / length).toFixed(decimalPlaces);
            if (retValue == "NaN") retValue = Number(MCPadLeft("0", decimalPlaces, '0')).toFixed(decimalPlaces);
            var lang = MCFrameworkWords.Language ?? "pt-br";
            switch (lang.toLowerCase()) {
                case "en-en":
                    value = retValue;
                    break;
                default:
                    value = retValue.replace('.', decimalSeparator);
                    break;
            }
            ctl.val(value);
        });
}

function MCInitializeDecimalNumericBoxNow(controlName, decimalPlaces, allowNegative,
    decimalSeparator = ",", thousandsSeparator = ".") {
    var isMobile = IsMobileDevice();
    var lang = MCFrameworkWords.Language;
    var jqueryControl = MCGetJqueryControl(controlName);
    switch (lang.toLowerCase()) {
        case "en-en":
            decimalSeparator = ".";
            thousandsSeparator = thousandsSeparator == "" ? thousandsSeparator : ",";
            break;
    }
    if (allowNegative) {
        jqueryControl.maskMoney({
            decimal: decimalSeparator, thousands: thousandsSeparator, precision: decimalPlaces, allowZero: true, allowNegative: allowNegative
        });
    } else {
        if (isMobile) {
            MCInitializeMobileDecimal(jqueryControl, decimalPlaces, decimalSeparator);
        } else {
            jqueryControl.maskMoney({
                decimal: decimalSeparator, thousands: thousandsSeparator, precision: decimalPlaces, allowZero: true, allowNegative: allowNegative
            });
        }
    }
}

function MCInitializeNumericBox(controlName, allowNegative) {
    $(document).ready(function () {
        MCInitializeNumericBoxNow(controlName, allowNegative);
    });
}

function MCInitializeNumericBoxNow(controlName, allowNegative) {
    if (allowNegative) {
        $('#' + controlName).inputmask({ alias: 'numeric', rightAlign: false, allowPlus: false, allowMinus: allowNegative });
        return;
    }
    //JN - 20/09/2021 - Foi feita a mudança pois o inputmask converte números maiores que int.maxvalue.
    $('#' + controlName).on("keypress", (evt) => {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }).on("paste", (evt) => {
        var org = evt.originalEvent;
        var clipData = org.clipboardData || window.clipboardData;
        if (clipData) {
            try {
                var val = clipData.getData('text/plain');
                if (Regex.IsMatch(val, /[^0-9]/ig)) {
                    org.stopPropagation();
                    org.preventDefault();
                }
            } catch (e) {
                org.stopPropagation();
                org.preventDefault();
            }
            return;
        }
        org.stopPropagation();
        org.preventDefault();
    });
}
//#########################################################################
/**
* Função que carrega o objeto informado (id e value) para o controle MCTokenFieldTextBox informado.
* @public
* @param {string} controlName ID do controle MCTokenFieldTextBox.
* @param {Object} id ID do objeto a ser configurado.
* @param {Object} value Display do objeto a ser configurado.
* @example
* MCSetSelectedItemAutoComplete('controle', '0', 'Objeto');
*/
function MCSetSelectedItemAutoComplete(controlName, id, value) {
    var objData = { label: value, value: value, id: id };
    $("#" + controlName + "hdf").val(JSON.stringify(objData));
    $("#" + controlName).val(value);
}
/**
* Função que recupera o objeto atualmente selecionado no controle MCTokenFieldTextBox informado.
* @public
* @param {string} controlName ID do controle MCTokenFieldTextBox.
* @example
* var selected = MCGetSelectedItemAutoComplete('controle');
*/
function MCGetSelectedItemAutoComplete(controlName) {
    var objData = $("#" + controlName + "hdf").val();
    if (!objData) return null;
    return JSON.parse(objData);
}
/**
* Função que remove a seleção atual do controle MCTokenFieldTextBox informado.
* @public
* @param {string} controlName ID do controle MCTokenFieldTextBox.
* @example
* MCClearSelectedItemAutoComplete('controle');
*/
function MCClearSelectedItemAutoComplete(controlName) {
    $("#" + controlName + "hdf").val("");
    $("#" + controlName).val("");
}
//#########################################################################
function MCInitializeAutoComplete(controlName, sourceUrl, isFunc, minLength,
    collectionFilter, onSelectCallBack, onClearCallback) {
    $(document).ready(function () {
        MCInitializeAutoCompleteNow(controlName, sourceUrl, isFunc, minLength,
            collectionFilter, onSelectCallBack, onClearCallback);
    });
}

function MCFormatUrlForAutoComplete(sourceUrl, isFunc, term) {
    var url = (isFunc ? eval(sourceUrl + "()") : sourceUrl);
    var c = (url.indexOf("?") > -1 ? "&" : "?");
    return String.format("{0}{1}term={2}", url, c, term);
}

function MCInitializeAutoCompleteNow(controlName, sourceUrl, isFunc, minLength,
    collectionFilter, onSelectCallBack, onClearCallback) {
    $('#' + controlName).autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: MCFormatUrlForAutoComplete(sourceUrl, isFunc, request.term),
                dataType: "json",
                success: function (data) {
                    if (collectionFilter) {
                        data = collectionFilter(data);
                    }
                    response($.map(data, function (item) {
                        return { label: item.value, value: item.value, id: item.id }
                    }));
                }
            });
        },
        minLength: minLength,
        select: function (event, ui) {
            $('#' + controlName + "hdf").val(JSON.stringify(ui.item));
            if (onSelectCallBack) onSelectCallBack(ui.item);
        }
    }).on("blur", function (e) {
        //Se o valor no campo não for o mesmo no hidden
        var vlrField = $('#' + controlName).val();
        var vlrHiden = $('#' + controlName + "hdf").val();
        if (vlrHiden) {
            vlrHiden = JSON.parse(vlrHiden).value;
        }
        if (vlrField != vlrHiden || !vlrField) {
            $('#' + controlName + "hdf").val("");
            $('#' + controlName).val("");
            if (onClearCallback) onClearCallback();
        }
    });
    var hidden = $('#' + controlName + "hdf");
    if (hidden.val()) {
        var objDados = JSON.parse(hidden.val());
        $('#' + controlName).val(objDados.value);
    }
}
//#########################################################################
function MCConvertImageFileToBase64(imgBase, file, width, height, callback) {
    /// <summary>
    /// Método padrão de conversão de arquivos de Imagem para Base64.
    /// </summary>
    var img = document.getElementById(imgBase);
    img.classList.add("obj");
    img.file = file;
    var haveLoaded = false;
    img.onload = function () {
        if (haveLoaded) return;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // We set the dimensions at the wanted size.
        canvas.width = width;
        canvas.height = height;
        // We resize the image with the canvas method drawImage();
        ctx.drawImage(this, 0, 0, width, height);
        haveLoaded = true;
        var dataUrl = canvas.toDataURL();
        if (callback) callback(dataUrl);
        img.src = dataUrl;
    };
    var reader = new FileReader();
    reader.onload = (function (aImg) {
        return function (e) {
            aImg.src = e.target.result;
        };
    })(img);
    reader.readAsDataURL(file);
}

function MCAjaxCall(type, sourceUrl, data, callback) {
    MCShowUpdateProgress();
    $.ajax({
        type: type,
        contentType: "application/json; charset=utf-8",
        url: sourceUrl,
        dataType: "json",
        data: data,
        success: function (data, textStatus, jqXHR) {
            MCHideUpdateProgress();
            if (callback) callback(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            MCHideUpdateProgress();
            console.log(errorThrown);
        }
    });
}

function MCAjaxCallGET(sourceUrl, callback) {
    MCAjaxCall("GET", sourceUrl, null, callback);
}

function MCAjaxCallPOST(sourceUrl, data, callback) {
    MCAjaxCall("POST", sourceUrl, data, callback);
}

/**
* Função que adiciona ao controle Dropdownlist informado o item "Selecione...".
* @public
* @param {Object} controle controle Dropdownlist.
* @param {Boolean} clear Indica se o controle deve ser limpo antes de adicionar o item.
* @example
* MCAdicionarItemVazioDropDownList(controle, true);
*/
function MCAdicionarItemVazioDropDownList(controle, clear) {
    controle = MCGetJqueryControl(controle)[0];
    if (clear) controle.length = 0;
    MCAdicionarItemDropDownList(controle, MCFrameworkWords.DropDownSelect, "0");
}
/**
* Função que adiciona um item (combinação de texto e valor) ao controle Dropdownlist informado.
* @public
* @param {Object} controle controle Dropdownlist.
* @param {String} texto Texto a ser adicionado (DisplayMember).
* @param {String} valor Valor a ser adicionado (ValueMember).
* @example
* MCAdicionarItemDropDownList(controle, "Novo", "1");
*/
function MCAdicionarItemDropDownList(controle, texto, valor) {
    controle = MCGetJqueryControl(controle)[0];
    var option = document.createElement("option");
    option.text = texto;
    option.value = valor;
    controle.add(option);
}
/**
* Função que retorna a option selecionada do controle Dropdownlist informado.
* @public
* @param {Object} controle controle Dropdownlist.
* @example
* var opt = MCGetSelectedOptionDropDownList(controle);
*/
function MCGetSelectedOptionDropDownList(control) {
    return control.options[control.selectedIndex];
}
/**
* Função que seleciona um item no controle Dropdownlist informado usando o valor como referência.
* @public
* @param {Object} controle controle Dropdownlist.
* @param {Object} valor valor a ser aplicado.
* @example
* MCSetSelectedItemDropDownListByValue(controle, "1");
*/
function MCSetSelectedItemDropDownListByValue(controle, valor) {
    for (var i = 0; i < controle.options.length; i++) {
        var opt = controle.options[i];
        if (opt.value == valor) {
            controle.selectedIndex = i;
            break;
        }
    }
}

/**
 * Função que tenta selecionar o item no controle Dropdownlist informado usando o valor como refência.
 * Caso o valor não seja encontrado, a lista será zerada.
 * @param {any} control
 * @param {any} value
 */
function MCSetValueOrDefaultOnDropDownList(control, value) {
    var dropDown = MCGetJqueryControl(control);
    var haveValue = Enumerable.From(dropDown[0].options)
        .Where(x => x.value == value).FirstOrDefault();
    if (haveValue) {
        dropDown.val(value);
        return true;
    }
    dropDown.prop('selectedIndex', 0);
    return false;
}

function MCLoadDataFromPageMethodsDropDownList(controlID, objConsulta, pageMethod, displayMember, valueMember, addEmptyItem, callback) {
    MCShowUpdateProgress();
    pageMethod(objConsulta, function (result) {
        MCHideUpdateProgress();
        if (result.Message) {
            console.log(result.Message);
            return;
        }

        if (result.Parameter) {
            result = result.Parameter;
        }

        if (!IsArray(result)) {
            console.log("Retorno não é um Array");
            console.log(result);
            return;
        }

        var dropDown = $("#" + controlID)[0];
        dropDown.length = 0;
        if (addEmptyItem) MCAdicionarItemVazioDropDownList(dropDown);

        result.forEach((item) => {
            MCAdicionarItemDropDownList(dropDown, item[displayMember], item[valueMember]);
        });

        if (callback) callback(result);
        try {
            $('.selectpicker').selectpicker('refresh');
        } catch (e) {
        }
    }, function (error) {
        MCHideUpdateProgress();
        console.log(error);
    });
}

/**
* Função que dá carga em um controle Dropdownlist a partir de um serviço.
* -> O serviço deve retornar uma coleção de objetos no modelo { value: "valor a ser exibido", id: "valor que representa o objeto" }.
* @public
* @param {Object} controle controle Dropdownlist.
* @param {String} sourceUrl Endereço do Serviço.
* @param {Object} callback Função de callback a ser invocado em caso de erro ou em caso de sucesso.
* @example
* MCLoadDataAsyncDropDownList(controle, "/Services/GetData.ashx", function(obj) { });
*/
function MCLoadDataAsyncDropDownList(control, sourceUrl, callback) {
    MCAjaxCallGET(sourceUrl, function (data) {
        var dropDown = $("#" + control)[0];
        dropDown.length = 0;
        //Adiciona o item "Selecione..."
        MCAdicionarItemVazioDropDownList(dropDown);
        if (data) {
            if (!IsArray(data)) {
                if (data.error) {
                    if (callback) callback(data.error);
                    return;
                }
            }
            //Adiciona a lista de itens
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                if (obj.value && obj.id) {
                    MCAdicionarItemDropDownList(dropDown, obj.value, obj.id);
                }
            }
            //Se o atributo selval tiver valor, determina ele como selecionado
            MCSetValueOnDropDownList(control);
        }
        if (callback) callback();
        try {
            $('.selectpicker').selectpicker('refresh');
        } catch (e) {
        }
    });
}
/**
* Função que seleciona um item no controle Dropdownlist informado usando o atributo 'selval' disponível nele.
* @public
* @param {Object} control controle Dropdownlist.
* @example
* MCSetValueOnDropDownList(controle);
*/
function MCSetValueOnDropDownList(control) {
    var dropDown = MCGetJqueryControl(control)[0];
    var selval = dropDown.getAttribute("selval");
    if (selval) {
        $("#" + control).val(selval);
    }
}
/**
* Função que dá carga em um controle Dropdownlist a partir de uma função.
* -> A função deve retornar uma coleção de objetos no modelo { value: "valor a ser exibido", id: "valor que representa o objeto" }.
* @public
* @param {Object} control controle Dropdownlist.
* @param {String} funcData Função a ser invocada.
* @example
* MCLoadDataFromFunctionDropDownList(controle, function(obj) { return []; });
*/
function MCLoadDataFromFunctionDropDownList(control, funcData) {
    var result = null;
    var dropDown = MCGetJqueryControl(control)[0];
    dropDown.length = 0;
    try {
        result = eval(funcData + "();");
    } catch (e) {
        MCAdicionarItemDropDownList(dropDown, MCFrameworkWords.ErrorOccur + " " + e.message, "0");
        return;
    }

    if (result) {
        MCAdicionarItemVazioDropDownList(dropDown, true);
        for (var i = 0; i < result.length; i++) {
            var obj = result[i];
            MCAdicionarItemDropDownList(dropDown, obj.value, obj.id);
        }
        MCSetValueOnDropDownList(control);
    }

    try {
        $('.selectpicker').selectpicker('refresh');
    } catch (e) {
    }
}
/**
 * 
 * @param {any} control
 * @param {any} lstDados
 * @param {any} displayMember
 * @param {any} valueMember
 * @param {any} addEmptyItem
 */
function MCLoadDataFromCollectionDropDownList(control, lstDados, displayMember, valueMember, addEmptyItem) {
    var dropDown = MCGetJqueryControl(control)[0];
    //Limpa o controle
    dropDown.length = 0;
    if (addEmptyItem) MCAdicionarItemVazioDropDownList(dropDown, true);
    for (var i = 0; i < lstDados.length; i++) {
        var obj = lstDados[i];
        MCAdicionarItemDropDownList(dropDown, obj[displayMember], obj[valueMember]);
    }
    try {
        $('.selectpicker').selectpicker('refresh');
    } catch (e) {
    }
    try {
        MCSetValueOnDropDownList(control);
    } catch (e) {
    }
}

/**
* Função que adicionar uma célula a um objeto Row de uma tabela HTML.
* @public
* @param {Object} row Objeto Row de uma tabela HTML.
* @param {String} texto Conteúdo da célula.
* @param {Boolean} displayNone Indicador de visibilidade.
* @param {Boolean} quebraLinha Indicador de quebra de linha.
* @example
* var cell = MCAdicionarCelulaTabela(row, "Item", false, false);
*/
function MCAdicionarCelulaTabela(row, texto, displayNone, quebraLinha) {
    /// <summary>
    /// Facilitador para adicionar células a uma linha de uma tabela.
    /// </summary>
    var cell = row.insertCell(-1);
    cell.innerHTML = texto;
    cell.style.verticalAlign = "middle";
    if (displayNone) {
        cell.style.display = "none";
    }
    if (quebraLinha) {
        cell.setAttribute("class", "mc-quebra-linha");
    }
    return cell;
}
/**
* Função que remove todas as linhas da tabela informada.
* @public
* @param {Object} tabela Objeto tabela.
* @param {Boolean} todos Se true, todas as linhas, senão, a 1º é desconsiderada.
* @example
* MCLimparRegistrosTabela(tabela, false);
*/
function MCLimparRegistrosTabela(tabela, todos) {
    for (var i = (tabela.rows.length - 1); i >= (todos ? 0 : 1); i--) {
        tabela.deleteRow(i);
    }
}
/**
* Função que exibe ou esconde o controle informado.
* @public
* @param {Object} controle Objeto a ser configurado.
* @param {Boolean} mostrar Se true, exibe, senão esconde.
* @example
* MCEsconderControle(tabela, false);
*/
function MCEsconderControle(controle, mostrar) {
    controle = MCGetJqueryControl(controle)[0];
    if (!mostrar) {
        controle.style.display = "none";
    } else {
        controle.style.display = "";
    }
}
/**
* Função que retorna se o controle em questão está bloqueado.
* @public
* @param {Object} controle Objeto a ser verificado.
* @example
* var a = MCControleBloqueado(tabela);
*/
function MCControleBloqueado(controle) {
    controle = MCGetJqueryControl(controle)[0];
    return controle.getAttribute("disabled");
}
/**
* Função que habilita ou desabilita o controle informado.
* @public
* @param {Object} controle Objeto a ser configurado.
* @param {Boolean} bloquear Se true, habilita, senão desabilita.
* @example
* MCEsconderControle(tabela, false);
*/
function MCBloquearControle(controle, bloquear) {
    controle = MCGetJqueryControl(controle)[0];
    if (bloquear) {
        controle.setAttribute("disabled", "disabled");
    } else {
        controle.removeAttribute("disabled");
    }
}

function MCMoverLinhaTabelaAcima(idx, tableID, funcUpdate) {
    /// <summary>
    /// Facilitador para alterar a ordem de linhas de tabelas HTML.
    /// </summary>
    var table = ctrl(tableID).tBodies[0];
    if (table.rows.length == 2) return;
    var linha = table.rows[idx].cloneNode(true);
    var lIdx = idx;
    idx--;
    if (idx == 0) {
        idx = table.rows.length - 1;
    }
    table.deleteRow(lIdx);
    table.insertBefore(linha, table.rows[idx]);
    funcUpdate(table);
}

function MCMoverLinhaTabelaAbaixo(idx, tableID, funcUpdate) {
    /// <summary>
    /// Facilitador para alterar a ordem de linhas de tabelas HTML.
    /// </summary>
    var table = ctrl(tableID).tBodies[0];
    if (table.rows.length == 2) return;
    var linha = table.rows[idx].cloneNode(true);
    var lIdx = idx;
    idx++;
    if (idx == table.rows.length) {
        idx = 1;
    }
    table.deleteRow(lIdx);
    table.insertBefore(linha, table.rows[idx]);
    funcUpdate(table);
}

function MCGetIframeWindow(iframe_object) {
    var doc;

    if (iframe_object.contentWindow) {
        return iframe_object.contentWindow;
    }

    if (iframe_object.window) {
        return iframe_object.window;
    }

    if (!doc && iframe_object.contentDocument) {
        doc = iframe_object.contentDocument;
    }

    if (!doc && iframe_object.document) {
        doc = iframe_object.document;
    }

    if (doc && doc.defaultView) {
        return doc.defaultView;
    }

    if (doc && doc.parentWindow) {
        return doc.parentWindow;
    }

    return undefined;
}

//##########################################################################################
function MCFindByXPath(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }

    return xnodes;
}
//##########################################################################################
function MCPadLeft(value, length, char) {
    return new Array(length - (value + "").length + 1).join(char || '0') + value;
}
//##########################################################################################
function MCGetRawHtmlValue(htmlValue) {
    var span = document.createElement('span');
    span.innerHTML = htmlValue;
    return span.textContent || span.innerText;
}
//##########################################################################################
function MCSetValOrHtml(field, value) {
    var ctrl = $(field)[0];
    if (ctrl.type) {
        $(field).val(value);
    } else {
        $(field).html(value);
    }
}
function MCUploadFileAsync(urlService, file, fieldTarget, successCallback, errorCallback) {
    var field = "#" + fieldTarget;
    var data = new FormData();
    var arr = [];
    arr.push(file);
    $.each(arr, function (key, value) {
        data.append(key, value);
    });
    MCSetValOrHtml(field, MCFrameworkWords.TitleWait);
    $.ajax({
        url: urlService,
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', function (e) {
                    if (e.lengthComputable) {
                        var vlr = parseInt((e.loaded * 100) / e.total);
                        MCSetValOrHtml(field, "(" + vlr + "%) " + MCFrameworkWords.TitleWait);
                    }
                }, false);
            }
            return myXhr;
        },
        success: function (data, textStatus, jqXHR) {
            if (IsArray(data) && data[0].error) {
                errorCallback(jqXHR, data[0].error, null);
            } else {
                successCallback(data, textStatus, jqXHR);
            }
        },
        error: errorCallback
    });
}
//##########################################################################################
/**
* Funcionalidade estática para Conversão de Data/Hora
* @public
* @class DateTimeFunctions
* @static
*/
var DateTimeFunctions = {
    isString: function (d) {
        return d.constructor === String || d.constructor.name == "String";
    },
    isDate: function (d) {
        return d.constructor === Date || d.constructor.name == "Date";
    },
    Patterns: {
        yyyyMMddHHmmss: /([0-9]{4})\-([0-9]{2})\-([0-9]{2})[T ]([0-9]{2}):([0-9]{2}):([0-9]{2})/ig,
        ddMMyyyyHHmmss: /([0-9]{2})\/([0-9]{2})\/([0-9]{4})[T ]([0-9]{2}):([0-9]{2}):([0-9]{2})/ig,
        dmyhns: "d/m/y h:n:s",
        ymdhns: "y-m-d h:n:s"
    },
    convertForUtc: function (d) {
        var ret = DateTimeFunctions.formatForUtc(d);
        return DateTimeFunctions.convert(ret);
    },
    formatForUtc: function (d) {
        if (DateTimeFunctions.isString(d)) {
            return DateTimeFunctions.format(d);
        }
        var format = MCFrameworkWords.Language.toLowerCase() == "pt-br" ? "d/m/y h:n:s" : "y-m-d h:n:s";
        if (d == null) return null;
        var dia = "";
        var mes = "";
        var ano = "";
        var hor = "";
        var min = "";
        var sec = "";
        if (DateTimeFunctions.isDate(d)) {
            var hourDiff = MCFrameworkWords.HourDiff;

            dia = d.getDate();
            mes = d.getMonth() + 1;
            ano = d.getFullYear();
            hor = d.getHours();
            min = d.getMinutes();
            sec = d.getSeconds();

            if (hourDiff != -13) {
                var nd = new Date(d);
                nd.setFullYear(nd.getUTCFullYear());
                nd.setMonth(nd.getUTCMonth());
                nd.setDate(nd.getUTCDate());
                nd.setHours(nd.getUTCHours());
                nd.setMinutes(nd.getUTCMinutes());
                dia = nd.getDate();
                mes = nd.getMonth() + 1;
                ano = nd.getFullYear();
                hor = nd.getHours();
                min = nd.getMinutes();
                sec = nd.getSeconds();
            }

            dia = MCPadLeft(dia, 2);
            mes = MCPadLeft(mes, 2);
            hor = MCPadLeft(hor, 2);
            min = MCPadLeft(min, 2);
            sec = MCPadLeft(sec, 2);
        }
        return format
            .replace("d", dia)
            .replace("m", mes)
            .replace("y", ano)
            .replace("h", hor)
            .replace("n", min)
            .replace("s", sec);
    },
    formatComplete: function (d, format) {
        try {
            if (!format) format = DateTimeFunctions.Patterns.dmyhns;
            if (d == null) return null;
            var dia = "";
            var mes = "";
            var ano = "";
            var hor = "";
            var min = "";
            var sec = "";
            if (DateTimeFunctions.isString(d)) {
                var ymdPattern = DateTimeFunctions.Patterns.yyyyMMddHHmmss;
                var dmyPattern = DateTimeFunctions.Patterns.ddMMyyyyHHmmss;
                var isDMY = Regex.IsMatch(d, dmyPattern);
                var isYMD = Regex.IsMatch(d, ymdPattern);
                if (!isYMD && !isDMY) return d;
                if (isYMD) {
                    var match = Regex.Match(d, ymdPattern);
                    dia = match.Groups[3].Value;
                    mes = match.Groups[2].Value;
                    ano = match.Groups[1].Value;
                    hor = match.Groups[4].Value;
                    min = match.Groups[5].Value;
                    sec = match.Groups[6].Value;
                }
                if (isDMY) {
                    var match = Regex.Match(d, dmyPattern);
                    dia = match.Groups[1].Value;
                    mes = match.Groups[2].Value;
                    ano = match.Groups[3].Value;
                    hor = match.Groups[4].Value;
                    min = match.Groups[5].Value;
                    sec = match.Groups[6].Value;
                }
            }
            if (DateTimeFunctions.isDate(d)) {
                dia = d.getDate();
                mes = d.getMonth() + 1;
                ano = d.getFullYear();
                hor = d.getHours();
                min = d.getMinutes();
                sec = d.getSeconds();

                dia = MCPadLeft(dia, 2);
                mes = MCPadLeft(mes, 2);
                hor = MCPadLeft(hor, 2);
                min = MCPadLeft(min, 2);
                sec = MCPadLeft(sec, 2);
            }
            return format
                .replace("d", dia)
                .replace("m", mes)
                .replace("y", ano)
                .replace("h", hor)
                .replace("n", min)
                .replace("s", sec);
        } catch (e) {
            console.log(e);
            return null;
        }
    },
    /**
    * Formata o objeto data informado para uma string no formato dd/MM/yyyy HH:mm:ss
    * @memberof DateTimeFunctions
    * @public
    * @example
    * var date = new Date();
    * var ret = DateTimeFunctions.format(date);
    */
    format: function (d) {
        var format = MCFrameworkWords.Language.toLowerCase() == "pt-br" ?
            DateTimeFunctions.Patterns.dmyhns :
            DateTimeFunctions.Patterns.ymdhns;
        return DateTimeFunctions.formatComplete(d, format);
    },
    /**
    * Converte o texto informado no formato yyyy-MM-ddTHH:mm:ss.fff em um objeto Date.
    * @memberof DateTimeFunctions
    * @public
    * @example
    * var date = "2017-10-21T18:46:10.4400000";
    * var ret = DateTimeFunctions.convert(date);
    */
    convert: function (d) {
        if (!d) return null;
        if (DateTimeFunctions.isDate(d)) return d;
        if (DateTimeFunctions.isString(d)) {
            var ymdPattern = DateTimeFunctions.Patterns.yyyyMMddHHmmss;
            var dmyPattern = DateTimeFunctions.Patterns.ddMMyyyyHHmmss;
            var isDMY = Regex.IsMatch(d, dmyPattern);
            var isYMD = Regex.IsMatch(d, ymdPattern);
            if (!isDMY && !isYMD) return d;
            var dia = "";
            var mes = "";
            var ano = "";
            var hor = "";
            var min = "";
            var sec = "";
            if (isDMY) {
                var match = Regex.Match(d, dmyPattern);
                dia = match.Groups[1].Value;
                mes = match.Groups[2].Value;
                ano = match.Groups[3].Value;
                hor = match.Groups[4].Value;
                min = match.Groups[5].Value;
                sec = match.Groups[6].Value;
            }
            if (isYMD) {
                var match = Regex.Match(d, ymdPattern);
                dia = match.Groups[3].Value;
                mes = match.Groups[2].Value;
                ano = match.Groups[1].Value;
                hor = match.Groups[4].Value;
                min = match.Groups[5].Value;
                sec = match.Groups[6].Value;
            }
            dia = parseInt(dia);
            mes = parseInt(mes);
            ano = parseInt(ano);
            hor = parseInt(hor);
            min = parseInt(min);
            sec = parseInt(sec);
            return new Date(ano, mes - 1, dia, hor, min, sec);
        }
        return d;
    },

    convertFromDDMMYYYYHHMMSS: function (d) {
        return DateTimeFunctions.convert(d);
    },

    difference: function (menor, maior) {
        var menorIsDate = DateTimeFunctions.isDate(menor);
        var maiorIsDate = DateTimeFunctions.isDate(maior);
        if (menorIsDate && maiorIsDate) {
            var mili = (maior - menor); //diferença em milisegundos
            var sec = parseInt((mili / 1000) % 60);
            var min = parseInt(((mili / (1000 * 60)) % 60));
            var hor = parseInt(((mili / (1000 * 60 * 60)) % 24));
            var dia = maior.getDate();
            var mes = maior.getMonth();
            var ano = maior.getFullYear();
            return new Date(ano, mes, dia, hor, min, sec);
        }
        return null;
    },

    differenceFull: function (menor, maior) {
        var menorIsDate = DateTimeFunctions.isDate(menor);
        var maiorIsDate = DateTimeFunctions.isDate(maior);
        if (menorIsDate && maiorIsDate) {
            var mili = (maior - menor); //diferença em milisegundos
            var sec = parseInt((mili / 1000) % 60);
            var min = parseInt(((mili / (1000 * 60)) % 60));
            var hor = parseInt(((mili / (1000 * 60 * 60)) % 24));
            return { hours: hor, minutes: min, seconds: sec };
        }
        return null;
    }
};
/**
* Funcionalidade estática para Conversão de Data
* @public
* @class DateFunctions
* @static
*/
var DateFunctions = {
    /**
    * Formata uma string informada em um objeto data. A string deve possuir o formato yyyy-MM-dd.
    * @memberof DateFunctions
    * @public
    * @example
    * var date = "2017-03-02T13:55:50.2470000Z";
    * var ret = DateFunctions.convertFromYYYYMMDD(date);
    */
    convertFromYYYYMMDD: function (d) {
        ////"2017-03-02T13:55:50.2470000Z"
        //([0-9]{4})\-([0-9]{2})\-([0-9]{2})
        if (DateTimeFunctions.isDate(d)) return d;
        if (d.indexOf("T") > -1) {
            d = d.split('T')[0];
        }
        if (d.search(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/ig) != -1) {
            var comp = d.split('-');
            var d = parseInt(comp[2], 10);
            var m = parseInt(comp[1], 10);
            var y = parseInt(comp[0], 10);
            return new Date(y, m - 1, d);
        }
    },

    formatComplete: function (d, outputFormat = "d/m/y") {
        try {
            if (d == null) return null;
            var dia = "";
            var mes = "";
            var ano = "";
            if (typeof d == "string") {
                var dmyPattern = /([0-9]{2})\/([0-9]{2})\/([0-9]{4})/ig;
                var ymdPattern = /([0-9]{4})\-([0-9]{2})\-([0-9]{2})/ig;

                var isDMY = Regex.IsMatch(d, dmyPattern);
                var isYMD = Regex.IsMatch(d, ymdPattern);
                if (isDMY) {
                    var match = Regex.Match(d, dmyPattern);
                    dia = match.Groups[1].Value;
                    mes = match.Groups[2].Value;
                    ano = match.Groups[3].Value;
                }
                if (isYMD) {
                    var match = Regex.Match(d, ymdPattern);
                    dia = match.Groups[3].Value;
                    mes = match.Groups[2].Value;
                    ano = match.Groups[1].Value;
                }
                if (!isDMY && !isYMD) return d;
            } else {
                dia = MCPadLeft(d.getDate(), 2);
                mes = MCPadLeft(d.getMonth() + 1, 2);
                ano = d.getFullYear();
            }
            return outputFormat.replace("d", dia).replace("m", mes).replace("y", ano);
        } catch (e) {
            console.log(e);
            return null;
        }
    },

    /**
    * Formata o objeto data informado para uma string no formato dd/MM/yyyy
    * @memberof DateFunctions
    * @public
    * @example
    * var date = new Date();
    * var ret = DateFunctions.format(date);
    */
    format: function (d) {
        var format = MCFrameworkWords.Language.toLowerCase() == "pt-br" ? "d/m/y" : "y-m-d";
        return DateFunctions.formatComplete(d, format);

        ///// <summary>
        ///// Formata a data informada para string no formado dd/MM/yyyy
        ///// </summary>
        //if (typeof d == "string") {
        //    var reg = /([0-9]{4})\-([0-9]{2})\-([0-9]{2})T/ig;
        //    var match = reg.exec(d);
        //    if (match) {
        //        var dia = match[3];
        //        var mes = match[2];
        //        var ano = match[1];
        //        return MCPadLeft(dia, 2) + "/" + MCPadLeft(mes, 2) + "/" + ano;
        //    }
        //}
        //var dia = d.getDate();
        //var mes = d.getMonth() + 1;
        //var ano = d.getFullYear();
        //return MCPadLeft(dia, 2) + "/" + MCPadLeft(mes, 2) + "/" + ano;
    },

    /**
    * Converte o valor informado em um objeto de Data.
    * @memberof DateFunctions
    * @public
    * @param {String} d Valor a ser convertido.
    * @param {RegExp} rgx Regex que quebre o valor informado para ser montado usando msk.
    * @param {String} msk Se rgx for informado, msk transforma o valor de forma a ser dividido em dd-MM-yyyy.
    * @returns {Date}
    * @example
    * var data = '30/06/1977';
    * var conv = DateFunctions.convert(data);
    * 
    * var dttE = '1977-06-30';
    * var rgx = /[0-9]{4}\-[0-9]{2}\-[0-9]{2}/ig;
    * var conv = DateFunctions.convert(dttE, rgx, "-");
    */
    convert: function (d, rgx = null, msk = null, split = null) {
        if (!d) return null;
        if (DateTimeFunctions.isDate(d)) return d;
        var comp = [0, 0, 0];
        if (rgx != null) {
            if (!msk) {
                throw "Argumento 'msk' obrigatório;";
            }
            if (!split) {
                throw "Argumento 'split' obrigatório;";
            }
            var obj = Regex.Replace(d, rgx, msk);
            comp = obj.split(split);
        } else {
            comp = d.split('/');
        }

        var isDMY = Regex.IsMatch(d, /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/ig);
        if (isDMY) {
            comp = d.split('/');
            var d = parseInt(comp[0], 10);
            var m = parseInt(comp[1], 10);
            var y = parseInt(comp[2], 10);
            return new Date(y, m - 1, d);
        }

        var isYMD = Regex.IsMatch(d, /[0-9]{4}-[0-9]{2}-[0-9]{2}/ig);
        if (isYMD) {
            comp = d.split('-');
            var d = parseInt(comp[2], 10);
            var m = parseInt(comp[1], 10);
            var y = parseInt(comp[0], 10);
            return new Date(y, m - 1, d);
        }

        return null;
    },
    /**
    * Compara duas datas retornando a diferença entre elas.
    * <p>-1 : if a < b</p>
    * <p> 0 : if a = b</p>
    * <p> 1 : if a > b</p>
    * @memberof DateFunctions
    * @public
    * @example
    * var dateA = DateFunctions.convert("30/01/1900");
    * var dateB = DateFunctions.convert("30/03/1900");
    * var ret = DateFunctions.compare(dateA, dateB); //Retorna -1
    */
    compare: function (a, b) {
        var valA = this.convert(a);
        valA = valA.setHours(0, 0, 0, 0);
        var valB = this.convert(b);
        valB = valB.setHours(0, 0, 0, 0);
        if (valA == valB) return 0;
        if (valA < valB) return -1;
        return 1;
    },
    /**
    * Determina se a data informada está no intervalo de datas informado.
    * @memberof DateFunctions
    * @public
    * @example
    * var dateA = DateFunctions.convert("30/01/1900");
    * var dateB = DateFunctions.convert("30/03/1900");
    * var dateC = DateFunctions.convert("20/03/1900");
    * var ret = DateFunctions.inRange(dateC, dateA, dateB); //Retorna true
    */
    inRange: function (d, start, end) {
        return (
            isFinite(d = this.convert(d).valueOf()) &&
                isFinite(start = this.convert(start).valueOf()) &&
                isFinite(end = this.convert(end).valueOf()) ?
                start <= d && d <= end :
                NaN
        );
    },

    /**
     * Retorna o Número da semana da data informada.
     * @memberof DateFunctions
     * @public
     */
    weekNumber: function (d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        // Return array of year and week number
        return [d.getUTCFullYear(), weekNo];
    },

    equals: function (dttA, dttB) {
        return dttA.getFullYear() == dttB.getFullYear() &&
            dttA.getMonth() == dttB.getMonth() &&
            dttA.getDate() == dttB.getDate();
    }
}
//##########################################################################################
var MCDropDownListWeekNumber = function (id, dayRef, currSel, adjust) {
    var self = this;
    this.ID = id;
    this.DayReference = dayRef;
    this.CurrentSelected = currSel;
    this.CurrentSelectedAdjust = adjust;

    this.Initialize = function () {
    }

    this.SetValue = function (value) {
        $("#" + self.ID).val(value);
    }

    this.GetValue = function () {
        return $("#" + self.ID).val();
    }

    this.SetValueFromDate = function (date) {
        var weekNum = DateFunctions.weekNumber(date);
        $("#" + self.ID).val(weekNum);
    }

    this.Clear = function () {
        if (self.CurrentSelected) {
            $("#" + self.ID).val(self.CurrentSelectedAdjust);
        } else {
            $("#" + self.ID).prop("selectedIndex", 0);
        }
    }
};
//##########################################################################################
var bootstrapFloatAlert = function () {
    var self = this;
    this.baseTimeout = 2000;
    this.baseMessage = function (message, alert, parent) {
        $('<div id="bootstrapFloatAlert" class="alert alert-' + alert +
            ' fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
            message + '&nbsp;&nbsp;</div>').appendTo((parent ? parent : 'body'));
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
//##########################################################################################
function MCGetUpdateProgressPanel() {
    var ctl = $("#updateProgressJS");
    if (!ctl.length) {
        ctl = $("#updateProgressPrincipal");
    }
    return ctl;
}
/**
* Funcionalidade estática para exibir o painel de "Aguarde..." nos casos de chamada assíncrona, por exemplo.
* @public
* @static
* @example
* MCShowUpdateProgress();
*/
function MCShowUpdateProgress() {
    MCGetUpdateProgressPanel().css("display", "block");
}
/**
* Funcionalidade estática para esconder o painel de "Aguarde..." que foi exibido usando o método MCShowUpdateProgress.
* @public
* @static
* @example
* MCShowUpdateProgress();
*/
function MCHideUpdateProgress() {
    MCGetUpdateProgressPanel().css("display", "none");
}
//##########################################################################################
/**
* Funcionalidade estática para exibição de mensagens.
* @public
* @static
* @param {String} message Mensagem a ser exibida.
* @param {Function} callback Função a ser invocada quando o botão OK for clicado.
* @example
* MCAlert("O registro foi gravado com sucesso.");
* MCAlert("O registro foi gravado com sucesso.", function() { [Continuidade do fluxo.] });
*/
function MCAlert(message, callback) {
    var errOccur = MCFrameworkWords.ErrorOccur;
    var finalMessage = "";
    if (typeof message == 'string') {
        finalMessage = message;
    } else if (typeof message == 'object') {
        if (message._message) {
            finalMessage = message._message;
        } else {
            finalMessage = errOccur + "\n" + JSON.stringify(message);
        }
    } else {
        finalMessage = errOccur + "\n" + JSON.stringify(message);
    }
    Ply.dialog("alert", "<b>" + finalMessage.replace(/\n/ig, "<br/>") + "</b>")
        .always(function (ui) { if (callback) callback(ui.state); });
}

/**
 * Funcionalidade estática para exibição de Prompts.
 * @public
 * @static
 * @param {any} message Mensagem a ser exibida.
 * @param {any} defaultValue Valor padrão a ser aplicado no campo.
 * @param {any} callback Função a ser invocada quando um dos botões for clicado.
 * @example
 * var msg = "Informe um valor para ser processado";
 * var def = "5";
 * var cal = (state, value) => { if(state) { [Clicou em sim] } else { [Clicou em não] } }
 * MCPrompt(msg, def, cal);
 */
function MCPrompt(message, defaultValue, callback) {
    Ply.dialog("prompt", {
        title: message,
        form: { "mc-prompt-field": MCFrameworkWords.InsertValue }
    }).always(function (ui) {
        if (callback) callback(ui.state, ui.data["mc-prompt-field"]);
    });
    setTimeout(() => { $('[data-ply-name="mc-prompt-field"]').val(defaultValue); }, 10);
}

/**
* Funcionalidade estática para exibição de mensagens de confirmação.
* @public
* @static
* @param {String} message Mensagem a ser exibida.
* @param {Function} callback Função a ser invocada quando um dos botões for clicado.
* @example
* MCConfirm("Deseja mesmo excluir este registro?", function(state) { if(state) { [Clicou em sim] } else { [Clicou em não] } });
*/
function MCConfirm(message, callback) {
    Ply.dialog({
        "intro": {
            ui: "confirm",
            data: {
                text: "<b>" + message.replace(/\n/ig, "<br/>") + "</b>",
                ok: MCFrameworkWords.StatusYes,
                cancel: MCFrameworkWords.StatusNo
            }
        }
    }).always(function (ui) { callback(ui.state); });
}
window.OldAlert = window.alert;
window.alert = MCAlert;
//##########################################################################################
function MCPriorityBox(baseName, callback, userData) {
    var self = this;
    this.BaseName = baseName;
    this.Callback = callback;
    this.UserData = userData;
    this.SetChecked = function (value) {
        var radio = $("#rdPriority" + self.BaseName + value)[0];
        if (radio) radio.checked = true;
        if (self.Callback) self.Callback(radio, self.UserData);
    }

    this.GetChecked = function () {
        var els = document.getElementsByName("rdPriority" + self.BaseName);
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (el.checked) return el.value;
        }
        return null;
    }

    this.GetBody = function (myName, addBluePanel, startCheck) {
        var template = "<div class='priority-box-ctn$'>" +
            "	<table class='priority-box-table'>" +
            "		<tr>" +
            "			<td class='priority-box pb-left-gray' title='Nenhuma' onclick='@.SetChecked(0);'>" +
            "				<input type='radio' name='rdPriority#' id='rdPriority#0' value='0' &0 />" +
            "			</td>" +
            "			<td class='priority-box pb-left' title='Baixa' onclick='@.SetChecked(1);'>" +
            "				<input type='radio' name='rdPriority#' id='rdPriority#1' value='1' &1 />" +
            "			</td>" +
            "			<td class='priority-box' title='Média' onclick='@.SetChecked(2);'>" +
            "				<input type='radio' name='rdPriority#' id='rdPriority#2' value='2' &2 />" +
            "			</td>" +
            "			<td class='priority-box pb-right' title='Alta' onclick='@.SetChecked(3);'>" +
            "				<input type='radio' name='rdPriority#' id='rdPriority#3' value='3' &3 />" +
            "			</td>" +
            "		</tr>" +
            "	</table>" +
            "</div>";
        var ck = "checked='checked'";
        var ck0 = (startCheck == 0 ? ck : "");
        var ck1 = (startCheck == 1 ? ck : "");
        var ck2 = (startCheck == 2 ? ck : "");
        var ck3 = (startCheck == 3 ? ck : "");
        return template
            .replace(/\&0/ig, ck0)
            .replace(/\&1/ig, ck1)
            .replace(/\&2/ig, ck2)
            .replace(/\&3/ig, ck3)
            .replace(/\#/ig, self.BaseName)
            .replace(/\@/ig, myName)
            .replace(/\$/ig, (addBluePanel ? "-blue" : ""));
    }

    this.GetInstance = function (parent, myName, addBluePanel, startCheck) {
        $(parent).html(self.GetBody(myName, addBluePanel, startCheck));
        if (startCheck) self.SetChecked(startCheck);
    }
}
//##########################################################################################
/**
* Funcionalidade estática para armazenamento no localStorage.
* @public
* @class MCStorage
* @static
*/
var MCStorage = {
    /**
    * Armazena o valor informado com o ID informado. 
    * @memberof MCStorage
    * @public
    * @param {String} id Referência do objeto que será armazenado.
    * @param {Object} value valor a ser armazenado. Para armazenar objetos, use JSON.stringify no mesmo.
    * @example
    * MCStorage.Write("USUARIO", 12345);
    */
    Write: function (id, value) {
        localStorage.setItem(id, value);
    },
    /**
    * Lê um valor que possua o ID informado que tenha sido armazenado anteriormente usando MCStorage.Write. 
    * Caso o valor não exista, o valor de defaultValue será retornado.
    * Para ler objetos, use JSON.parse no resultado.
    * @memberof MCStorage
    * @public
    * @param {String} id Referência do objeto que será armazenado.
    * @param {Object} defaultValue Valor padrão que será retornado caso o registro não exista.
    * @example
    * var usuario = MCStorage.Read("USUARIO", 1);
    */
    Read: function (id, defaultValue) {
        var ret = localStorage.getItem(id);
        if (!ret) return defaultValue;
        return ret;
    },
    /**
    * Remove o valor informado com o ID informado. 
    * @memberof MCStorage
    * @public
    * @param {String} id Referência do objeto que será armazenado.
    * @example
    * MCStorage.Clear("USUARIO");
    */
    Clear: function (id) {
        localStorage.removeItem(id);
    }
}
//##########################################################################################
function MCListSelection(lstNaoSelecionados, lstSelecionados, hdfDadosNaoSelecionados,
    hdfDadosSelecionados, baseName, callbackOnAdd, callbackOnRemove) {
    var self = this;

    this.lstNaoSelecionados = lstNaoSelecionados;
    this.lstSelecionados = lstSelecionados;
    this.hdfDadosNaoSelecionados = hdfDadosNaoSelecionados;
    this.hdfDadosSelecionados = hdfDadosSelecionados;
    this.BaseName = baseName;
    this.CallbackOnAdd = callbackOnAdd;
    this.CallbackOnRemove = callbackOnRemove;
    this.WordEntry = "Registro";
    this.WordEntries = "Registros";
    this.WordNoEntry = "Nenhum Registro";


    this.Initialize = function () {
        var naoSelecionados = self.getCtrl(self.lstNaoSelecionados);
        var selecionados = self.getCtrl(self.lstSelecionados);
        var objDadosNaoSel = eval("(" + self.getCtrl(self.hdfDadosNaoSelecionados).value + ")");
        var objDadosSel = eval("(" + self.getCtrl(self.hdfDadosSelecionados).value + ")");
        for (var i = 0; i < objDadosNaoSel.length; i++) {
            var objDados = objDadosNaoSel[i];
            self.CreateOption(objDados.text, objDados.value, naoSelecionados);
        }
        for (var i = 0; i < objDadosSel.length; i++) {
            var objDados = objDadosSel[i];
            self.CreateOption(objDados.text, objDados.value, selecionados);
        }
        self.SetCounters();
    }

    this.ShowCounters = function (show) {
        var leftCounter = self.getCtrl(self.BaseName + "_countLeft");
        var rightCounter = self.getCtrl(self.BaseName + "_countRight");
        var display = show ? "" : "none";
        leftCounter.style.display = display;
        rightCounter.style.display = display;
    }

    this.SetCounters = function () {
        var leftCounter = self.getCtrl(self.BaseName + "_countLeft");
        var rightCounter = self.getCtrl(self.BaseName + "_countRight");
        var naoSelecionados = self.getCtrl(self.lstNaoSelecionados);
        var selecionados = self.getCtrl(self.lstSelecionados);
        var l = naoSelecionados.options.length;
        var r = selecionados.options.length;
        leftCounter.innerHTML = (l == 0 ? self.WordNoEntry : l + (l > 1 ? " " + self.WordEntries : " " + self.WordEntry));
        rightCounter.innerHTML = (r == 0 ? self.WordNoEntry : r + (r > 1 ? " " + self.WordEntries : " " + self.WordEntry));
    }

    this.getCtrl = function (nome) {
        return document.getElementById(nome);
    }

    this.CreateOption = function (text, value, control) {
        var option = document.createElement("option");
        option.text = text;
        option.value = value;
        option.title = text;
        control.add(option);
    }

    this.AddOptionOnNonSelected = function (text, value) {
        var naoSelecionados = self.getCtrl(self.lstNaoSelecionados);
        self.CreateOption(text, value, naoSelecionados);
    }

    this.AddOptionOnSelected = function (text, value) {
        var selecionados = self.getCtrl(self.lstSelecionados);
        self.CreateOption(text, value, selecionados);
    }

    this.SerializeData = function () {
        var lstObjDadosNotAdded = self.GetDataFromListbox(self.lstNaoSelecionados);
        var lstObjDadosAdded = self.GetDataFromListbox(self.lstSelecionados);
        self.getCtrl(self.hdfDadosNaoSelecionados).value = JSON.stringify(lstObjDadosNotAdded);
        self.getCtrl(self.hdfDadosSelecionados).value = JSON.stringify(lstObjDadosAdded);
    }

    this.GetRawData = function (displayMember, valueMember) {
        var selecionados = self.getCtrl(self.lstSelecionados);
        var col = [];
        for (var i = 0; i < selecionados.options.length; i++) {
            var opt = selecionados.options[i];
            var obj = {};
            obj[displayMember] = opt.text;
            obj[valueMember] = opt.value;
            col.push(obj);
        }
        return col;
    }

    this.GetDataFromListbox = function (listBox) {
        var lst = self.getCtrl(listBox);
        var col = [];
        for (var i = 0; i < lst.options.length; i++) {
            var opt = lst.options[i];
            col.push({
                text: opt.text,
                value: opt.value
            });
        }
        return col;
    }

    this.AddNonSelectedFromCollection = function (arrObjs, displayMember, valueMember, clear) {
        var naoSelecionados = self.getCtrl(self.lstNaoSelecionados);
        self.AddFromCollection(arrObjs, displayMember, valueMember, clear, naoSelecionados);
        self.getCtrl(self.BaseName + "_lstNaoSelecionadosFilter").value = "";
        self.SetCounters();
    }

    this.AddSelectedFromCollection = function (arrObjs, displayMember, valueMember, clear) {
        var selecionados = self.getCtrl(self.lstSelecionados);
        self.AddFromCollection(arrObjs, displayMember, valueMember, clear, selecionados);
        self.getCtrl(self.BaseName + "_lstSelecionadosFilter").value = "";
        self.SetCounters();
    }

    this.AddFromCollection = function (arrObjs, displayMember, valueMember, clear, control) {
        if (clear) control.options.length = 0;
        if (!arrObjs) return;
        arrObjs.forEach((obj, idx) => {
            var text = obj[displayMember];
            var vale = obj[valueMember];
            self.CreateOption(text, vale, control);
        });
    }

    this.ClearSelected = function () {
        var selecionados = self.getCtrl(self.lstSelecionados);
        selecionados.options.length = 0;
        self.SerializeData();
        self.SetCounters();
    }

    this.ClearNonSelected = function () {
        var naoSelecionados = self.getCtrl(self.lstNaoSelecionados);
        naoSelecionados.options.length = 0;
        self.SerializeData();
        self.SetCounters();
    }

    this.AddSelected = function () {
        var naoSelecionados = self.getCtrl(self.lstNaoSelecionados);
        var selecionados = self.getCtrl(self.lstSelecionados);
        var nodeSelected = [];
        for (var i = naoSelecionados.options.length - 1; i >= 0; i--) {
            var opt = naoSelecionados.options[i];
            if (opt.selected) {
                naoSelecionados.removeChild(opt);
                nodeSelected.push(opt);
            }
        }
        var total = nodeSelected.length;
        for (var i = 0; i < total; i++) {
            var node = nodeSelected.pop();
            selecionados.appendChild(node);
            self.CallbackOnAdd(node);
        }
        self.SerializeData();
        self.SetCounters();
    }

    this.RemoveOptionFromNonSelected = function (value) {
        var naoSelecionados = self.getCtrl(self.lstNaoSelecionados);
        for (var i = naoSelecionados.options.length - 1; i >= 0; i--) {
            var opt = naoSelecionados.options[i];
            if (opt.value == value) {
                naoSelecionados.removeChild(opt);
                break;
            }
        }
    }

    this.RemoveOptionFromSelected = function (value) {
        var selecionados = self.getCtrl(self.lstSelecionados);
        for (var i = selecionados.options.length - 1; i >= 0; i--) {
            var opt = selecionados.options[i];
            if (opt.value == value) {
                selecionados.removeChild(opt);
                break;
            }
        }
    }

    this.RemoveSelected = function () {
        var naoSelecionados = self.getCtrl(self.lstNaoSelecionados);
        var selecionados = self.getCtrl(self.lstSelecionados);
        var nodeSelected = [];
        for (var i = selecionados.options.length - 1; i >= 0; i--) {
            var opt = selecionados.options[i];
            if (opt.selected) {
                selecionados.removeChild(opt);
                nodeSelected.push(opt);
            }
        }
        var total = nodeSelected.length;
        for (var i = 0; i < total; i++) {
            var node = nodeSelected.pop();
            naoSelecionados.appendChild(node);
            self.CallbackOnRemove(node);
        }
        self.SerializeData();
        self.SetCounters();
    }

    this.AddAll = function () {
        var naoSelecionados = self.getCtrl(self.lstNaoSelecionados);
        var selecionados = self.getCtrl(self.lstSelecionados);
        while (naoSelecionados.options.length > 0) {
            var opt = naoSelecionados.options[0];
            naoSelecionados.removeChild(opt);
            selecionados.appendChild(opt);
            self.CallbackOnAdd(opt);
        }
        self.SerializeData();
        self.SetCounters();
    }

    this.RemoveAll = function () {
        var naoSelecionados = self.getCtrl(self.lstNaoSelecionados);
        var selecionados = self.getCtrl(self.lstSelecionados);
        while (selecionados.options.length > 0) {
            var opt = selecionados.options[0];
            selecionados.removeChild(opt);
            naoSelecionados.appendChild(opt);
            self.CallbackOnRemove(opt);
        }
        self.SerializeData();
        self.SetCounters();
    }

    this.FilterNotSelected = function () {
        var target = self.getCtrl(self.lstNaoSelecionados);
        var field = self.getCtrl(self.lstNaoSelecionados + "Filter").value;
        for (var i = 0; i < target.options.length; i++) {
            var opt = target.options[i];
            opt.style.display = "";
            if (opt.text.toLowerCase().indexOf(field.toLowerCase()) == -1) {
                opt.style.display = "none";
            }
        }
    }

    this.FilterSelected = function () {
        var target = self.getCtrl(self.lstSelecionados);
        var field = self.getCtrl(self.lstSelecionados + "Filter").value;
        for (var i = 0; i < target.options.length; i++) {
            var opt = target.options[i];
            opt.style.display = "";
            if (opt.text.toLowerCase().indexOf(field.toLowerCase()) == -1) {
                opt.style.display = "none";
            }
        }
    }
}
//##########################################################################################
function MCModalPanel(modalPanel, saveButtonID, validationGroup, preventClose, attachToForm, showCallback,
    hideCallback, iframeUrl, injectButtonBarContainer, makeDraggable) {
    var self = this;
    this.ModalPanel = "#" + modalPanel;
    this.SaveButtoID = saveButtonID;
    this.ValidationGroup = validationGroup;
    this.PreventClose = preventClose;
    this.AttachToForm = attachToForm;
    this.ShowCallback = showCallback;
    this.HideCallback = hideCallback;
    this.IframeUrl = iframeUrl;
    this.TempIframeUrl = null;
    this._preventClose = preventClose;
    this.InjectButtonBarContainer = injectButtonBarContainer;
    this.IsDraggable = makeDraggable;

    this.Load = function () {
        $(self.ModalPanel).on('shown.bs.modal', function () {
            var frame = self.GetFrameAndClear();
            if (frame) frame.attr("src", self.GetIframeUrl());
            if (self.ShowCallback) self.ShowCallback();
        });
        $(self.ModalPanel).on('hidden.bs.modal', function () {
            self.PreventClose = self._preventClose;
            self.GetFrameAndClear();
            if (self.HideCallback) self.HideCallback();
        });
        $(self.ModalPanel).on('hide.bs.modal.prevent', function (e) {
            if (self.PreventClose) {
                e.preventDefault();
            }
        });
        if (self.InjectButtonBarContainer) {
            //Acha o rodapé
            var rodape = $(`${self.ModalPanel}_modalFooter`);
            //O que chegou é o nome de um Container
            var container = $(`#${self.InjectButtonBarContainer}`);
            rodape.html(container.html());
            container.html("");
        }

        if (self.IsDraggable) {
            //TODO: registrar no Header
            $(`${self.ModalPanel}_modalHeader`).on("mousedown", function (mousedownEvt) {
                var $draggable = $(this);
                var x = mousedownEvt.pageX - $draggable.offset().left,
                    y = mousedownEvt.pageY - $draggable.offset().top;
                $("body").on("mousemove.draggable", function (mousemoveEvt) {
                    $draggable.closest(".modal-dialog").offset({
                        "left": mousemoveEvt.pageX - x,
                        "top": mousemoveEvt.pageY - y
                    });
                });
                $("body").one("mouseup", function () {
                    $("body").off("mousemove.draggable");
                });
                $draggable.closest(".modal").one("bs.modal.hide", function () {
                    $("body").off("mousemove.draggable");
                });
            });
        }
    }

    this.ReloadIframe = function () {
        if (self.IframeUrl) {
            var frame = self.GetFrameAndClear();
            frame.attr("src", self.GetIframeUrl());
        }
    }

    this.GetRawIframeUrl = function () {
        if (self.IframeUrl) {
            if (IsFunction(self.IframeUrl)) { //Método
                return self.IframeUrl();
            }
            if (typeof self.IframeUrl === 'string' && self.IframeUrl.indexOf('/') > -1) {//Url
                return self.IframeUrl;
            }
        }
        return null;
    }

    this.SetIframeUrlEditParam = function (editParam) {
        var rawUrl = self.GetRawIframeUrl();
        var concat = rawUrl.indexOf("?") > -1 ? "&" : "?";
        self.TempIframeUrl = self.GetRawIframeUrl() + concat + "editcode=" + editParam;
    }

    this.GetIframeUrl = function () {
        if (self.TempIframeUrl) {
            var ret = self.TempIframeUrl;
            self.TempIframeUrl = null;
            return ret;
        }
        return self.GetRawIframeUrl();
    }

    this.GetFrameAndClear = function () {
        if (self.IframeUrl) {
            //Acha o Frame
            var frame = $(self.ModalPanel + "iframe");
            //Reseta e retorna o frame
            frame.attr("src", "about:blank");
            return frame;
        }
        return null;
    }

    this.Show = function () {
        if (self.AttachToForm) {
            $(self.ModalPanel).appendTo(document.forms[0]).modal('show');
        } else {
            $(self.ModalPanel).modal({ keyboard: false, show: true });
        }
    }

    this.Hide = function () {
        self._preventClose = self.PreventClose;
        self.PreventClose = false;
        $(self.ModalPanel).modal('hide');
    }

    this.Close = function () {
        $(document).ready(function () {
            self.Hide();
        });
    }

    this.Validate = function () {
        if (typeof Page_ClientValidate === 'function') {
            if (Page_ClientValidate(self.ValidationGroup)) {
                self.Hide();
                __doPostBack(this.SaveButtoID, '');
            } else {
                Page_BlockSubmit = false;
            }
        } else {
            self.Hide();
            __doPostBack(this.SaveButtoID, '');
        }
    }
}
//##########################################################################################
function MClzwEncode(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i = 1; i < data.length; i++) {
        currChar = data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase = currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i = 0; i < out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

function MCLzwDecode(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i = 1; i < data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
            phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}
//##########################################################################################
function LoadApplicationIcon(title, imgName) {
    $(document).ready(function () {
        var imgMenu = document.getElementById('coreMenuImg');
        if (imgMenu && window.parent.GetApplicationIcon) {
            window.parent.GetApplicationIcon(imgName, function (url) {
                imgMenu.title = title;
                imgMenu.src = url;
            })
        }
    });
}

function ValidateInsideIframe(errorUrl) {
    if (!InIframe()) {
        location.href = errorUrl;
    }
}

function MCCustomFieldsValidatorValidate(sender, args) {
    args.IsValid = true;
}
//##########################################################################################
var MCCodLoggedUser = null;
var MCCodCustomerInstance = null;
var MCTableGridMappedControls = [];
var MCFormShowSucessAfterSave = true;

$(document).ready(() => {
    setTimeout(() => {
        if (MCCodCustomerInstance == null || MCCodCustomerInstance == "-1") {
            var valFromDrop = $("#cbClientes").val();
            if (valFromDrop) {
                MCCodCustomerInstance = valFromDrop;
            }
        }
    }, 10);
});

function MCConfigurationWysiwyg(property, control, title, required, useBase64) {
    return {
        Property: property,
        Control: control,
        UseBase64: useBase64,
        Title: title,
        Required: (required || false),
        CustomType: null,
        Validation: (config) => {
            if (!config.Required) return true;
            var value = MCGetRawHtmlValue($('#' + config.Control).trumbowyg('html'));
            return value.length > 0;
        },
        GetValue: (control) => {
            var value = $('#' + control).trumbowyg('html');
            if (useBase64) return Base64.encode(value);
        },
        SetValue: (control, newValue) => {
            if (useBase64) {
                newValue = Base64.decode(newValue);
            }
            $('#' + control).trumbowyg('html', newValue);
        },
        ClearValue: (control) => {
            $('#' + control).trumbowyg('html', "");
        },
        DefValue: ""
    };
}

function MCConfigurationInput(property, control, title, required, defValue) {
    return MCConfigurationCommon(property, control, title, required, null, null, null, null, null, defValue);
}

function MCConfigurationCommon(property, control, title, required,
    customType, validation, getValue, setValue, clearValue, defValue) {
    return {
        Property: property,
        Control: control,
        Title: title,
        Required: (required || false),
        CustomType: (customType || null),
        Validation: (validation || null),
        GetValue: (getValue || null),
        SetValue: (setValue || null),
        ClearValue: (clearValue || null),
        DefValue: defValue
    };
}

function MCConfigurationTokenField(displayProp, valueProp, control, title, required, defValue) {
    return {
        Property: valueProp,
        DisplayProperty: displayProp,
        Control: control,
        Title: title,
        Required: (required || false),
        CustomType: "tokenfield",
        Validation: null,
        GetValue: null,
        SetValue: null,
        ClearValue: null,
        DefValue: defValue
    };
}

function MCGetTableGridMapped(property) {
    var objRetorno = null;
    MCTableGridMappedControls.forEach((obj) => {
        if (obj.Ref == property) {
            objRetorno = obj.Control;
        }
    });
    return objRetorno;
}

function MCConfigurationTableGrid(property, controlObj, title, required) {
    MCTableGridMappedControls.push({ Ref: property, Control: controlObj });
    return {
        Property: property,
        Control: property,
        Title: title,
        Required: (required || false),
        CustomType: "TableGrid",
        Validation: (config) => {
            if (!config.Required) return true;
            return MCGetTableGridMapped(config.Property).GetRawData().length > 0;
        },
        GetValue: (control) => { return MCGetTableGridMapped(control).GetData(); },
        SetValue: (control, newValue) => { MCGetTableGridMapped(control).SetData(newValue); },
        ClearValue: (control) => { MCGetTableGridMapped(control).Clear(); },
        DefValue: null
    };
}

function MCValidateTextbox(config, customMsg) {
    if (!config.Required) return true;
    return MCGetControlValue(config.Control).length > 0;
}

function MCValidateMaskedTextbox(config, customMsg) {
    if (!config.Required) return true;
    var ctl = GetCtrl(config.Control);
    var formula = ctl.getAttribute("data-validate-formula");
    var value = MCGetControlValue(config.Control);
    var length = value.length;
    if (length == 0) return false;
    switch (formula) {
        case "CPF":
            if (!MCValidation.IsCPF(value)) {
                customMsg(`* Campo ${config.Title} Inválido;\n`);
                return false;
            }
            break;
        case "CNPJ":
            if (!MCValidation.IsCNPJ(value)) {
                customMsg(`* Campo ${config.Title} Inválido;\n`);
                return false;
            }
            break;
        default:
            var customFunc = ctl.getAttribute("data-custom-func");
            if (customFunc) {
                try {
                    var ret = eval(`${customFunc}('${value}');`);
                    if (!ret) {
                        customMsg(`* Campo ${config.Title} Inválido;\n`);
                        return false;
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            break;
    }
    return true;
}

function MCValidateDropDownList(config, customMsg) {
    if (!config.Required) return true;
    return MCGetControlValue(config.Control) != "0";
}

function MCConfigureValidationFunction(config) {
    if (!config.Validation) {
        if (config.CustomType) {
            switch (config.CustomType) {
                case "maskedtextbox":
                    config.Validation = MCValidateMaskedTextbox;
                    break;
                case "numericbox":
                    config.Validation = MCValidateTextbox;
                    break;
                case "calendar":
                    config.Validation = MCValidateCalendarValue;
                    break;
                case "tokenfield":
                    config.Validation = MCValidateTokenField;
                    break;
                case "uploadfile":
                    //TODO: Implementar corretamente
                    config.Validation = MCValidateTextbox;
                    break;
            }

        } else {
            var ctl = MCGetJqueryControl(config.Control);
            if (!ctl || ctl.length == 0) {
                throw `-> MCConfigureValidationFunction: Controle '${config.Control}' não Encontrado para Mapeamento.`;
            }
            switch (ctl.prop("nodeName").toLowerCase()) {
                case "input":
                    var type = ctl.prop("type").toLowerCase();
                    switch (type) {
                        case "checkbox":
                            //Não precisa fazer nada
                            config.Validation = function (ctrl) { return true; };
                            break;
                        case "radio":
                            //TODO: Implementar corretamente
                            config.Validation = function (ctrl) { return true; };
                            break;
                        default:
                            config.Validation = MCValidateTextbox;
                            break;
                    }
                    break;
                case "textarea":
                    config.Validation = MCValidateTextbox;
                    break;
                case "select":
                    config.Validation = MCValidateDropDownList;
                    break;
                default:
                    if (ctl.hasClass("mc-calendar")) {
                        config.Validation = MCValidateCalendarValue;
                    } else {
                        config.Validation = MCValidateTextbox;
                    }
                    break;
            }
        }
    }
}

function MCConfigureGetValueFunction(config) {
    if (!config.GetValue) {
        if (config.CustomType) {
            switch (config.CustomType) {
                case "maskedtextbox":
                case "numericbox":
                    config.GetValue = MCGetControlValue;
                    break;
                case "calendar":
                    config.GetValue = MCGetCalendarValue;
                    break;
                case "tokenfield":
                    //TODO: Implementar corretamente
                    config.GetValue = MCGetTokenFieldValue;
                    break;
                case "uploadfile":
                    //TODO: Implementar corretamente
                    config.GetValue = MCGetControlValue;
                    break;
            }

        } else {
            var ctl = MCGetJqueryControl(config.Control);
            if (!ctl || ctl.length == 0) {
                throw `-> MCConfigureGetValueFunction: Controle '${config.Control}' não Encontrado para Mapeamento.`;
            }
            switch (ctl.prop("nodeName").toLowerCase()) {
                case "input":
                    var type = ctl.prop("type").toLowerCase();
                    switch (type) {
                        case "checkbox":
                            //Não precisa fazer nada
                            config.GetValue = MCGetControlChecked;
                            break;
                        case "radio":
                            //TODO: Implementar corretamente
                            config.GetValue = MCGetControlChecked;
                            break;
                        default:
                            config.GetValue = MCGetControlValue;
                            break;
                    }
                    break;
                case "textarea":
                    config.GetValue = MCGetControlValue;
                    break;
                case "select":
                    config.GetValue = MCGetControlValue;
                    break;
                default:
                    if (ctl.hasClass("mc-calendar")) {
                        config.GetValue = MCGetCalendarValue;
                    } else {
                        config.GetValue = MCGetControlValue;
                    }
                    break;
            }
        }
    }
}

function MCConfigureSetValueFunction(config) {
    if (!config.SetValue) {
        if (config.CustomType) {
            switch (config.CustomType) {
                case "maskedtextbox":
                case "numericbox":
                    config.SetValue = MCSetControlValue;
                    break;
                case "calendar":
                    config.SetValue = MCSetCalendarValue;
                    break;
                case "tokenfield":
                    //TODO: Implementar corretamente
                    config.SetValue = MCSetTokenFieldValue;
                    break;
                case "uploadfile":
                    //TODO: Implementar corretamente
                    config.SetValue = MCSetControlValue;
                    break;
            }
        } else {
            var ctl = MCGetJqueryControl(config.Control);
            if (!ctl || ctl.length == 0) {
                throw `-> MCConfigureSetValueFunction: Controle '${config.Control}' não Encontrado para Mapeamento.`;
            }
            switch (ctl.prop("nodeName").toLowerCase()) {
                case "input":
                    var type = ctl.prop("type").toLowerCase();
                    switch (type) {
                        case "checkbox":
                            //Não precisa fazer nada
                            config.SetValue = MCSetControlChecked;
                            break;
                        case "radio":
                            //TODO: Implementar corretamente
                            config.SetValue = MCSetControlChecked;
                            break;
                        default:
                            config.SetValue = MCSetControlValue;
                            break;
                    }
                    break;
                case "textarea":
                    config.SetValue = MCSetControlValue;
                    break;
                case "select":
                    config.SetValue = MCSetDropDownListValue;
                    break;
                default:
                    if (ctl.hasClass("mc-calendar")) {
                        config.SetValue = MCSetCalendarValue;
                    } else {
                        config.SetValue = MCSetControlValue;
                    }
                    break;
            }
        }
    }
}

function MCConfigureClearValueFunction(config) {
    if (!config.ClearValue) {
        if (config.CustomType) {
            switch (config.CustomType) {
                case "maskedtextbox":
                case "numericbox":
                    config.ClearValue = MCClearControlValue;
                    break;
                case "calendar":
                    config.ClearValue = MCClearCalendarValue;
                    break;
                case "tokenfield":
                    //TODO: Implementar corretamente
                    config.ClearValue = MCClearTokenFieldValue;
                    break;
                case "uploadfile":
                    //TODO: Implementar corretamente
                    config.ClearValue = MCClearControlValue;
                    break;
            }

        } else {
            var ctl = MCGetJqueryControl(config.Control);
            if (!ctl || ctl.length == 0) {
                throw `-> MCConfigureClearValueFunction: Controle '${config.Control}' não Encontrado para Mapeamento.`;
            }
            switch (ctl.prop("nodeName").toLowerCase()) {
                case "input":
                    var type = ctl.prop("type").toLowerCase();
                    switch (type) {
                        case "checkbox":
                            //Não precisa fazer nada
                            config.ClearValue = MCClearControlChecked;
                            break;
                        case "radio":
                            //TODO: Implementar corretamente
                            config.ClearValue = MCClearControlChecked;
                            break;
                        default:
                            config.ClearValue = MCClearControlValue;
                            break;
                    }
                    break;
                case "textarea":
                    config.ClearValue = MCClearControlValue;
                    break;
                case "select":
                    config.ClearValue = MCClearDropdownListValue;
                    break;
                default:
                    if (ctl.hasClass("mc-calendar")) {
                        config.ClearValue = MCClearCalendarValue;
                    } else {
                        config.ClearValue = MCClearControlValue;
                    }
                    break;
            }
        }
    }
}

function MCConfigureForm(controlCollection, pageMethodsFunction, preCallbackFunction, postCallBackFunction) {
    MCFormControlCollection = controlCollection;
    MCPageMethodsFunction = pageMethodsFunction;
    MCPageMethodsPreCallbackFunction = preCallbackFunction;
    MCPageMethodsPostCallbackFunction = postCallBackFunction;
    //TODO: Configurar os validadores de acordo com o tipo do controle
    MCFormControlCollection.forEach((config) => {
        MCConfigureValidationFunction(config);
        MCConfigureGetValueFunction(config);
        MCConfigureSetValueFunction(config);
        MCConfigureClearValueFunction(config);
    });
}

//##################################################################################
/*
 * MCClearFormDataFromConfiguration(configCollection)
 * MCSetFormDataFromConfiguration(configCollection, objDados)
 * MCRetrieveEntryForEditFromConfiguration(configCollection, objQuery, pageMethodsFunction, callback)
 * MCRetrieveFormDataFromConfiguration(configCollection)
 * MCValidateFormFromConfiguration(configCollection, pageMethodsFunction, preCallback, postCallback, showSucessAfterSave)
 */
function MCClearFormDataFromConfiguration(configCollection) {
    configCollection.forEach((config) => {
        config.ClearValue(config.Control, config.DefValue);
    });
}

function MCSetFormDataFromConfiguration(configCollection, objDados) {
    configCollection.forEach((config) => {
        //Se tem essa prop, é um TokenField
        if (config.DisplayProperty) {
            config.SetValue(config.Control, objDados[config.DisplayProperty], objDados[config.Property]);
            return;
        }
        config.SetValue(config.Control, objDados[config.Property]);
    });
}

function MCRetrieveEntryForEditFromConfiguration(configCollection, objQuery, pageMethodsFunction, callback) {
    MCShowUpdateProgress();
    pageMethodsFunction(objQuery, (result) => {
        MCHideUpdateProgress();
        if (result.Message) {
            alert(`${MCFrameworkWords.ErrorOccur}: ${result.Message}.`);
            return;
        }
        var objDados = result.Parameter;
        if (IsArray(result.Parameter)) {
            objDados = result.Parameter[0];
        }
        MCSetFormDataFromConfiguration(configCollection, objDados);
        callback(objDados);
    }, (result) => {
        MCHideUpdateProgress();
        alert(result);
    });
}

function MCRetrieveFormDataFromConfiguration(configCollection) {
    var errorMsg = "";
    var objDados = {};
    configCollection.forEach((config) => {
        if (config.Validation) {
            var customMsg = "";
            if (!config.Validation(config, (msg) => { customMsg = msg; })) {
                if (customMsg) {
                    errorMsg += customMsg;
                } else {
                    errorMsg += String.format(MCFrameworkWords.FormRequiredField, config.Title) + "\n";
                }
            }
        }
        objDados[config.Property] = config.GetValue(config.Control);
    });
    //########################################################
    //Atribui os campos padrão Usr_Record e Cod_CustomerInstance
    objDados["Usr_Record"] = MCCodLoggedUser;
    objDados["Cod_CustomerInstance"] = MCCodCustomerInstance;
    //########################################################
    if (errorMsg.length > 0) {
        alert(errorMsg);
        return null;
    }
    return objDados;
}

var MCPersistFormSucessMessage = MCFrameworkWords.FormMessageSuccess;

function MCValidateFormFromConfiguration(configCollection, pageMethodsFunction, preCallback, postCallback, showSucessAfterSave) {
    var objDados = MCRetrieveFormDataFromConfiguration(configCollection);
    if (!objDados) return;
    if (preCallback(objDados)) {
        MCShowUpdateProgress();
        pageMethodsFunction(objDados, (result) => {
            MCHideUpdateProgress();
            if (result.Message) {
                alert(`${MCFrameworkWords.ErrorOccur}: ${result.Message}.`);
                return;
            }
            if (showSucessAfterSave) {
                MCAlert(MCPersistFormSucessMessage);
            }
            if (IsObject(result.Parameter)) {
                //TODO: O que fazer?
            } else if (IsArray(result.Parameter)) {
                //TODO: O que fazer?
            } else {
                //Em teoria, o campo Cod_Record é retornado no Parameter
                var codRecordConfig = configCollection.find(
                    (obj) => { return obj.Property.toLowerCase() == "cod_record"; });
                if (codRecordConfig) {
                    codRecordConfig.SetValue(codRecordConfig.Control, result.Parameter);
                    objDados[codRecordConfig.Property] = result.Parameter;
                } else {
                    console.log(`Valor retornado não mapeado: ${result.Parameter}`);
                }
            }
            postCallback(objDados, result.Parameter);
        }, (result) => { //Falha 
            MCHideUpdateProgress();
            alert(result);
        });
    }
}
//##################################################################################

function MCClearFormData() {
    MCClearFormDataFromConfiguration(MCFormControlCollection);
}

function MCSetFormData(objDados) {
    MCSetFormDataFromConfiguration(MCFormControlCollection, objDados);
}

function MCRetrieveEntryForEdit(objQuery, pageMethodsFunction, callback) {
    MCRetrieveEntryForEditFromConfiguration(MCFormControlCollection, objQuery, pageMethodsFunction, callback);
}

function MCRetrieveFormData() {
    MCRetrieveFormDataFromConfiguration(MCFormControlCollection);
}

function MCValidateForm() {
    MCValidateFormFromConfiguration(MCFormControlCollection, MCPageMethodsFunction,
        MCPageMethodsPreCallbackFunction, MCPageMethodsPostCallbackFunction, MCFormShowSucessAfterSave);
}
/**
 * Facilitador para chamadas de PageMethods.
 * @param {Object} objDados - Objeto a ser passado como parametro para o PageMethod.
 * @param {Function} pageMethod - Método a ser chamado.
 * @param {Boolean} customMessage - Se o retorno possui uma mensagem customizada para ser tratada.
 * @param {function} callbackSucess - Callback com retorno de sucesso.
 * @param {function} callbackFailure - Callback com retorno de falha.
 */
function MCCallPageMethod(objDados, pageMethod, customMessage, callbackSucess, callbackFailure) {
    MCShowUpdateProgress();
    pageMethod(objDados, (result) => {
        MCHideUpdateProgress();
        if (customMessage) {
            callbackSucess(result);
            return;
        }
        if (result.Message) {
            alert(`${MCFrameworkWords.ErrorOccur}: ${result.Message}.`);
            callbackFailure(result);
            return;
        }
        callbackSucess(result);
    }, (result) => {
        MCHideUpdateProgress();
        callbackFailure(result);
    });
}

function MCParseSelectedFileToBase64(evt) {
    MCShowUpdateProgress();
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var base64 = btoa(
            new Uint8Array(reader.result)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        MCHideUpdateProgress();
        $(currentUploadTarget).val(base64);
    }
    reader.readAsArrayBuffer(file);
}

/**
 * Recupera o valor do controle informado.
 * @param {any} control - Controle do qual o valor será recuperado. São aceitos:<br/>
 * Controle Jquery: No formato $("Nome do controle")<br />
 * Controle DOM: Recuperado usando document.getElementById("Nome do controle")<br />
 * ID do controle: Apenas "Nome do controle".
 * @returns {Object}
 */
function MCGetControlValue(control) {
    var controlC = MCGetJqueryControl(control);
    if (controlC) return controlC.val();
    return null;
}

function MCGetDateControlValue(control) {
    var controlC = MCGetJqueryControl(control);
    var val = null;
    if (controlC) {
        var cldValue = controlC.val().replace("__/__/____", "");
        if (cldValue) val = DateFunctions.convert(cldValue);
    }
    return val;
}

function MCSetDropDownListValue(control, newValue) {
    var dropDown = MCGetJqueryControl(control);
    var haveValue = Enumerable.From(dropDown[0].options)
        .Where(x => x.value == newValue).FirstOrDefault();
    if (haveValue) {
        dropDown.val(newValue);
        return true;
    }
    dropDown.prop('selectedIndex', 0);
    return false;
}

function MCSetControlValue(control, newValue) {
    var controlC = MCGetJqueryControl(control);
    if (controlC) controlC.val(newValue);
}

function MCSetDateControlValue(control, newValue) {
    if (!newValue) return;
    var controlC = MCGetJqueryControl(control);
    if (controlC) {
        controlC.val(DateFunctions.format(newValue));
    }
}

function MCClearControlValue(control, defValue) {
    var controlC = MCGetJqueryControl(control);
    if (!defValue) defValue = "";
    if (controlC) controlC.val(defValue);
}

function MCClearDropdownListValue(control) {
    var controlC = MCGetJqueryControl(control);
    if (controlC) controlC.prop('selectedIndex', 0);
}

/**
 * Recupera o valor de um controle Checkbox.
 * @param {any} control - Controle do qual o valor será recuperado. São aceitos:<br/>
 * Controle Jquery: No formato $("Nome do controle")<br />
 * Controle DOM: Recuperado usando document.getElementById("Nome do controle")<br />
 * ID do controle: Apenas "Nome do controle".
 * @returns {Boolean}
 */
function MCGetControlChecked(control) {
    var controlC = MCGetJqueryControl(control);
    if (controlC) {
        return controlC.prop("checked");
    }
    return null;
}

function MCValidateCalendarValue(config, msg) {
    if (!config.Required) return true;
    var obj = window[config.Control];
    if (obj) {
        var ret = obj.GetDate();
        if (ret == null) return false;
        return true;
    }
    return false;
}

function MCClearCalendarValue(control) {
    var obj = window[control];
    if (obj) obj.Clear();
}

function MCGetCalendarValue(control) {
    var obj = window[control];
    if (obj) return obj.GetDate();
    return null;
}

function MCSetCalendarValue(control, newValue) {
    var obj = window[control];
    if (obj) obj.SetDate(newValue);
}

function MCSetControlChecked(control, newValue) {
    var controlC = MCGetJqueryControl(control);
    if (controlC) controlC.prop("checked", newValue);
}

function MCClearControlChecked(control, defValue) {
    var controlC = MCGetJqueryControl(control);
    if (defValue == 'undefined' || defValue == undefined) defValue = false;
    if (controlC) controlC.prop("checked", defValue);
}

/**
 * Recupera o controle informado no formato JQuery.
 * @param {any} control - Controle a ser recuperado. São aceitos:<br/>
 * Controle Jquery: No formato $("Nome do controle")<br />
 * Controle DOM: Recuperado usando document.getElementById("Nome do controle")<br />
 * ID do controle: Apenas "Nome do controle".
 * @returns {JQuery}
 */
function MCGetJqueryControl(control) {
    if (control instanceof jQuery) {//Controle Jquery
        return control;
    }
    else if (IsDOMElement(control)) {//Controle DOM
        return $(control);
    }
    else if (typeof control === "string") {//Nome do Controle
        return $("#" + control);
    }
    return null;
}

function MCGetTokenFieldValue(control) {
    var obj = MCGetSelectedItemAutoComplete(control);
    if (obj) return obj.id;
    return null;
}

function MCSetTokenFieldValue(control, newDisplay, newValue) {
    MCSetSelectedItemAutoComplete(control, newValue, newDisplay);
}

function MCClearTokenFieldValue(control) {
    MCClearSelectedItemAutoComplete(control);
}

function MCValidateTokenField(objConfig) {
    var obj = MCGetSelectedItemAutoComplete(objConfig.Control);
    return obj != null;
}
//##########################################################################################

var MCSimpleAudioPlayer = function (id) {
    var self = this;
    this.ID = id;
    this.AutoPlay = false;
    this.InResetMode = false;
    this.ShowDownload = true;
    this.objAudioTagSlider = null;
    this.objAudioTag = null;
    this.objAudioTagTime = null;
    this.objAudioTagTotalTime = null;
    this.objAudioTagDownload = null;
    this.startTimeout = false;
    this.objIcon = null;
    this.objFileName = null;
    this.objSource = null;

    this.PadLeft = function (val) {
        val = val + "";
        if (val.length == 1) return "0" + val;
        return val;
    }

    this.FormatTime = function (totalSecs) {
        var mins = Math.floor(totalSecs / 60).toFixed(0);
        var secs = Math.floor(totalSecs % 60).toFixed(0);
        return self.PadLeft(mins) + ":" + self.PadLeft(secs);
    }

    this.TimeoutLoop = function () {
        if (self.startTimeout) {
            setTimeout(() => {
                var curr = self.objAudioTag.prop("currentTime");
                var total = self.objAudioTag.prop("duration");
                var totalSecs = Math.floor(curr).toFixed(0);
                self.objAudioTagTime.html(self.FormatTime(totalSecs));
                self.objAudioTagSlider.slider("option", "value", totalSecs);
                if (curr >= total) {
                    self.Stop();
                } else {
                    self.TimeoutLoop();
                }
            }, 500);
        }
    }

    this.Load = function (source, fileName) {
        self.objSource = source;
        self.objFileName = fileName;
        self.objAudioTag.prop("src", null);
        self.objAudioTagTime.html(self.FormatTime(0));
        self.objAudioTagTotalTime.html("&nbsp;/&nbsp;" + self.FormatTime(0));
        self.objAudioTagSlider.slider("option", "max", 0);
        self.objAudioTag.prop("src", source);
    }

    this.GetBody = function () {
        var btnDownload = self.ShowDownload ? `<div class='input-group-btn'>
                            <a class='btn btn-default' title='Download' onclick='{0}.Download()'><i id='{0}_audioTagDownload' class='glyphicon glyphicon-download'></i></a>
                        </div>` : "";

        return String.format(`<a id='{0}_audioTagDownload' style='display:none'></a>
                    <audio id='{0}_audioTag' style='display:none'></audio>
                    <div class='input-group input-group-sm' style='width: 200px;'>
                        <div class='input-group-btn'>
                            <a class='btn btn-default' onclick='{0}.PlayPause()'><i title='Play/Pause' id='{0}_audioTagIcon' class='glyphicon glyphicon-play'></i></a>
                        </div>
                        <div class='form-control input-sm' style='padding: 0 !important; overflow: hidden; width: 170px; height: 30px;'>
                            <table style='width: 100%;'>
                                <tr>
                                    <td>
                                        <div id='{0}_audioTagSlider' style='margin: 9px 8px;'></div>
                                    </td>
                                    <td style='width: 35px; text-align: right' id='{0}_audioTagTime'>00:00</td>
                                    <td style='width: 49px; text-align: left;' id='{0}_audioTagTotalTime'>&nbsp;/&nbsp;00:00</td>
                                </tr>
                            </table>
                        </div>
                        ${btnDownload}
                    </div>`, self.ID);
    }

    this.Initialize = function () {
        var compID = `#${self.ID}_`;
        self.objAudioTagTime = $(compID + "audioTagTime");
        self.objAudioTag = $(compID + "audioTag");
        self.objIcon = $(compID + "audioTagIcon");
        self.objAudioTagTotalTime = $(compID + "audioTagTotalTime");
        self.objAudioTagDownload = $(compID + "audioTagDownload");

        self.objAudioTagSlider = $(compID + "audioTagSlider").slider({
            max: 0,
            slide: (ev, ui) => {
                self.objAudioTagTime.html(self.FormatTime(ui.value));
                self.objAudioTag.prop("currentTime", ui.value);
            }
        });

        self.objAudioTag.on("pause", () => {
            self.startTimeout = false;
        });

        self.objAudioTag.on("loadedmetadata", () => {
            var dur = Math.floor(self.objAudioTag.prop("duration")).toFixed(0);
            self.objAudioTagTotalTime.html("&nbsp;/&nbsp;" + self.FormatTime(dur));
            self.objAudioTagSlider.slider("option", "max", dur);
        });

        self.objAudioTag.on("play", () => {
            self.startTimeout = true;
            self.TimeoutLoop();
        });

        self.objAudioTag.on("canplay", () => {
            if (self.AutoPlay) {
                if (self.InResetMode) {
                    self.InResetMode = false;
                    return;
                }
                self.Play();
            }
        });
    }

    this.Play = function () {
        self.objAudioTag.trigger("play");
        self.objIcon.removeClass("glyphicon-play");
        self.objIcon.addClass("glyphicon-pause");
    }

    this.Pause = function () {
        self.objAudioTag.trigger("pause");
        self.objIcon.removeClass("glyphicon-pause");
        self.objIcon.addClass("glyphicon-play");
    }

    this.Stop = function () {
        self.Pause();
        self.InResetMode = true;
        self.objAudioTag.prop("currentTime", 0);
        self.objAudioTagSlider.slider("option", "value", 0);
    }

    this.PlayPause = function () {
        if (!self.objSource) return;
        if (self.objAudioTag.prop("paused")) {
            self.Play();
        } else {
            self.Pause();
        }
    }

    this.Download = function () {
        if (!self.objSource) return;
        self.objAudioTagDownload.prop("href", self.objSource);
        self.objAudioTagDownload.prop("download", self.objFileName);
        self.objAudioTagDownload[0].click();
    }
}

function MCSetEmojiDummy(emoji) {
    console.log(emoji);
}

function MCSetEmojiData(setEmojiMethod, emojiName, emojiRaw, emojiData, emojiSelectedCallBack) {
    setEmojiMethod(emojiData);
    var emoji = { Name: emojiName, Value: emojiRaw };
    emojiSelectedCallBack(emoji);
    MCPutEmojiHistory(emoji);
}

function MCPutEmojiHistory(emoji) {
    var storageID = "MCEmojiHistory";
    var lastCollection = JSON.parse(MCStorage.Read(storageID, "[]"));
    var newCollection = Enumerable.From(lastCollection).Distinct().Where(x => x.Value != emoji.Value).ToArray();
    newCollection.splice(0, 0, emoji);
    MCStorage.Write(storageID, JSON.stringify(newCollection));
    MCProcessEmojiHistory();
}

function MCProcessEmojiHistory() {
    var storageID = "MCEmojiHistory";
    var lastCollection = JSON.parse(MCStorage.Read(storageID, "[]"));
    $("#" + MCProcessEmojiHistoryTable).html("");
    var tbData = "<tr>";
    for (var i = 0; i < 15; i++) {
        var obj = lastCollection[i];
        if (obj && obj.Value) {
            var emojiData = String.format(MCEmojiPanel.EmojiPattern, obj.Value);
            tbData += `<td class='emoji-td' title='${obj.Name}'>
                <div onclick='MCSetEmojiData(${MCEmojiPanel.SetMethod}, "${obj.Name}", "${obj.Value}", "${emojiData}", ${MCEmojiPanel.SelectedCallBack});' class='emoji-block'>&#x${obj.Value};</div></td>`;
        } else {
            tbData += `<td class='emoji-td'><div class='emoji-block'></div></td>`;
        }
    }
    tbData += "</tr>";
    $("#" + MCProcessEmojiHistoryTable).html(tbData);
}

var MCEmojiPanel = {
    ContainerTable: "",
    EmojiTable: "",
    HistoryTable: "",
    EmojiPattern: "",
    SetMethod: null,
    SelectedCallBack: null
};

function MCProcessEmojiData(emojiContainer, emojiTable, emojiTableHistory, emojiBlock, setEmojiMethod, emojiSelectedCallBack) {
    $(document).ready(() => {
        MCProcessEmojiHistoryTable = emojiTableHistory;
        $("#" + emojiContainer).tabs();
        setTimeout(() => {
            if (!setEmojiMethod) setEmojiMethod = "MCSetEmojiDummy";
            jsonEmojiData = mcEmojiData;
            jsonEmojiBlacklist = mcEmojiBlackListData;

            MCEmojiPanel = {
                ContainerTable: emojiContainer,
                EmojiTable: emojiTable,
                HistoryTable: emojiTableHistory,
                EmojiPattern: emojiBlock,
                SetMethod: setEmojiMethod,
                SelectedCallBack: emojiSelectedCallBack
            };

            var htmlBase = "";
            var tabBase = "";
            var total = 0;
            var emojiCol = [];
            jsonEmojiData.forEach((obj, idx) => {
                obj.EmojiGroups.forEach((grp, idxg) => {
                    emojiCol = emojiCol.concat(grp.Emojis);
                    total += grp.Emojis.length;
                });
            });
            var div = 15;
            var lines = Math.floor(total / div) + (total % div != 0 ? 1 : 0);
            var c = 0;
            for (var i = 0; i < lines; i++) {
                var innerBase = "<tr>";
                for (var j = 0; j < div; j++) {
                    if (c < emojiCol.length - 1) {
                        var emoji = emojiCol[c];
                        //Se está na blacklist
                        var inBlackList = jsonEmojiBlacklist.find((blk) => { return blk.Value == emoji.Value });
                        if (inBlackList) {
                            //console.log("ID na blacklist: " + emoji.Value);
                            j--;
                            c++;
                            continue;
                        } else {
                            var emojiData = String.format(emojiBlock, emoji.Value);
                            innerBase += `<td class='emoji-td' title='${emoji.Name}'><div onclick='MCSetEmojiData(${setEmojiMethod}, "${emoji.Name}", "${emoji.Value}", "${emojiData}", ${emojiSelectedCallBack});' class='emoji-block'>&#x${emoji.Value};</div></td>`;
                        }
                    }
                    c++;
                }
                tabBase += innerBase + "</tr>";
            }
            htmlBase += tabBase;
            $("#" + emojiTable).html(htmlBase);
            MCProcessEmojiHistory();
        }, 200);
    });
}

var MCFormatter = {
    ToCPF: function (cpf) {
        if (!cpf) return "";
        cpf = cpf.replace(/[^0-9]+/ig, "");
        if (cpf.length < 11) return cpf;
        cpf = cpf.replace(/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/ig, "$1.$2.$3-$4");
        return cpf;
    },

    ToCNPJ: function (cnpj) {
        if (!cnpj) return "";
        cnpj = cnpj.replace(/[^0-9]+/ig, "");
        if (cnpj.length < 14) return cnpj;
        cnpj = cnpj.replace(/([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/ig, "$1.$2.$3/$4-$5");
        return cnpj;
    }
}

var MCValidation = {
    IsEmail: function (email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    },

    IsCEI: function (cei) {
        if (cei == "" || cei == null) return false;
        //Recupera valor sem a mascara EE.NNN.NNNNN/AD
        cei = cei.replace(/[-._/]/gi, "");
        //Peso para calculo
        var peso = "74185216374";
        var soma = 0;
        if (cei.length != 12) return false;
        if (cei == "888888888888") return false;
        //Somatorio da multiplicao de cada numero do CEI pelo respectivo peso da sua posição
        for (var i = 1; i < 12; i++) {
            var fator = parseInt(peso.substr(i - 1, 1));
            var valor = parseInt(cei.substr(i - 1, 1));
            soma += (fator * valor);
        }
        //Unidade do somátorio
        var unidade = soma % 10;
        //Converte a soma para string
        soma = soma + '';
        //Recupera a dezena do somatótio
        var dezena = soma[soma.length - 2];
        //Soma a dezena com a unidade
        var total = (unidade + parseInt(dezena));
        //Calcular o DV, 10 menos a unidade do total
        var digitoEncontrado = Math.abs(10 - (total % 10));
        //DV inserido pelo usuário
        var digitoCEI = parseInt(cei.substr(11, 1));
        //Comparação do DV inserido pelo usuário com o DV correto
        return digitoCEI == digitoEncontrado;
    },

    IsPIS: function (pis) {
        if (pis == "" || pis == null) return false;
        //Recupera valor sem a mascara DDD.DDDDD.DD-D
        pis = pis.replace(/[-._]/gi, "");
        //Peso para calculo
        var peso = "3298765432";
        var soma = 0;
        var digitoPis = 99;
        //Valida quantidade
        if (pis.length != 11) return false;
        if (pis == "00000000000") return false;
        //Somatorio da multiplicao de cada numero do CEI pelo respectivo peso da sua posição
        for (var i = 1; i < 11; i++) {
            var valor = parseInt(pis.substr(i - 1, 1));
            var fator = parseInt(peso.substr(i - 1, 1));
            soma += valor * fator;
        }
        //Recupera o DV calculado
        var digitoEncontrado = 11 - soma % 11;
        digitoEncontrado = digitoEncontrado == 10 || digitoEncontrado == 11 ? 0 : digitoEncontrado;
        //DV inserido pelo usuario
        digitoPis = parseInt("" + pis[10]);
        //Comparação do DV inserido pelo usuário com o DV correto
        return digitoEncontrado == digitoPis;
    },

    IsCPF: function (cpf) {
        var Soma = 0;
        var Resto;
        var strCPF = cpf;
        strCPF = strCPF.replace(/[-._]/gi, "");
        if (strCPF.length != 11) return false;
        if (strCPF == "00000000000" ||
            strCPF == "11111111111" ||
            strCPF == "22222222222" ||
            strCPF == "33333333333" ||
            strCPF == "44444444444" ||
            strCPF == "55555555555" ||
            strCPF == "66666666666" ||
            strCPF == "77777777777" ||
            strCPF == "88888888888" ||
            strCPF == "99999999999")
            return false;
        for (i = 1; i <= 9; i++) {
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;
        Soma = 0;
        for (i = 1; i <= 10; i++) {
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        }
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    },

    IsCNPJ: function (cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
        if (cnpj == '') return false;
        if (cnpj.length != 14) return false;

        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;

        // Valida DVs
        var tamanho = cnpj.length - 2
        var numeros = cnpj.substring(0, tamanho);
        var digitos = cnpj.substring(tamanho);
        var soma = 0;
        var pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) return false;
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) return false;
        return true;
    },

    IsCNS: function (cns) {
        return MCValidation.mcValidacaoCNS(cns);
    },

    mcValidacaoCNS: function (vlrCNS) {
        if (vlrCNS.length != 15) return false;
        var resultado;
        var provisorio = [7, 8, 9];
        var primeiro = parseInt(vlrCNS.substring(0, 1));

        if (provisorio.indexOf(primeiro) >= 0) {
            return MCValidation.mcValidacaoCNSProv(vlrCNS);
        }

        var pis = vlrCNS.substring(0, 11);
        var soma = (((Number(pis.substring(0, 1))) * 15) +
            ((Number(pis.substring(1, 2))) * 14) +
            ((Number(pis.substring(2, 3))) * 13) +
            ((Number(pis.substring(3, 4))) * 12) +
            ((Number(pis.substring(4, 5))) * 11) +
            ((Number(pis.substring(5, 6))) * 10) +
            ((Number(pis.substring(6, 7))) * 9) +
            ((Number(pis.substring(7, 8))) * 8) +
            ((Number(pis.substring(8, 9))) * 7) +
            ((Number(pis.substring(9, 10))) * 6) +
            ((Number(pis.substring(10, 11))) * 5));
        var resto = soma % 11;
        var dv = 11 - resto;
        if (dv == 11) dv = 0;
        if (dv == 10) {
            soma = (((Number(pis.substring(0, 1))) * 15) +
                ((Number(pis.substring(1, 2))) * 14) +
                ((Number(pis.substring(2, 3))) * 13) +
                ((Number(pis.substring(3, 4))) * 12) +
                ((Number(pis.substring(4, 5))) * 11) +
                ((Number(pis.substring(5, 6))) * 10) +
                ((Number(pis.substring(6, 7))) * 9) +
                ((Number(pis.substring(7, 8))) * 8) +
                ((Number(pis.substring(8, 9))) * 7) +
                ((Number(pis.substring(9, 10))) * 6) +
                ((Number(pis.substring(10, 11))) * 5) + 2);
            resto = (soma % 11);
            dv = (11 - resto);
            resultado = pis + "001" + String(dv);
        } else {
            resultado = pis + "000" + String(dv);
        }
        return (vlrCNS == resultado);
    },

    mcValidacaoCNSProv: function (vlrCNS) {
        var pis = vlrCNS.substring(0, 15);
        var soma = ((parseInt(pis.substring(0, 1), 10)) * 15)
            + ((parseInt(pis.substring(1, 2), 10)) * 14)
            + ((parseInt(pis.substring(2, 3), 10)) * 13)
            + ((parseInt(pis.substring(3, 4), 10)) * 12)
            + ((parseInt(pis.substring(4, 5), 10)) * 11)
            + ((parseInt(pis.substring(5, 6), 10)) * 10)
            + ((parseInt(pis.substring(6, 7), 10)) * 9)
            + ((parseInt(pis.substring(7, 8), 10)) * 8)
            + ((parseInt(pis.substring(8, 9), 10)) * 7)
            + ((parseInt(pis.substring(9, 10), 10)) * 6)
            + ((parseInt(pis.substring(10, 11), 10)) * 5)
            + ((parseInt(pis.substring(11, 12), 10)) * 4)
            + ((parseInt(pis.substring(12, 13), 10)) * 3)
            + ((parseInt(pis.substring(13, 14), 10)) * 2)
            + ((parseInt(pis.substring(14, 15), 10)) * 1);
        var resto = soma % 11;
        return resto == 0;
    }
}

function NullToEmpty(value) {
    if (!value) return "";
    return value;
}

function ZeroToNull(value) {
    if (value == "0") return null;
    return value;
}

function MCPhotoBox(baseName, baseWidth) {
    var self = this;
    this.BASE_IMAGE_PERSON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAABVjSURBVHjaYkxJSWHAApiB2A+IQ4BYHYgNoGKjYBQQC/4C8QUgvgnEa4B4E1QMBQAEEAsWjaAEtwiIzUbDcBRQAEAFljEURwHxKSCOgyZIOAAIICY0TUVAfH408Y0CGgAzaNoqQhYECCDkBNgFxL1AzDkaVqOARoATmsa6YAIAAQRLgOFAXDoaPqOATqAUmuYYAAIIlADZoKlyFIwCeoIWUNoDCCAmaE9XejQ8RgGdgQoo7QEEECgBeo+GxSgYIOANEEBM0G7yKBgFAwEsAQIIlAAlRsNhFAwQkAYIINBAND+5uhkZGRkEBQUZREREGDg4OBi4ubnBYqNg+IL///8zfP36leHHjx8Mb968YXj//j1YjEzABhBALOTq5OTkZFBVVWXg4eEZjZURBEAFDCjOQRhU8Hz58oXh9u3bDN+/fyfLPIAAYiJHk5SUFIO+vv5o4hsF4DQASgugNEEOAAggkktAeXl5Bmnp0VGbUYBUijExMSgoKDCwsrIyPHz4kCS9AAFEUgkIKnJHE98owNmjAKYNUBohBQAEENEJEFT3g1L5KBgF+ICcnBxJHVGAACK6ChYWFmZgY2MbkYF6584dcPVy48YNcM/v9evXDK9evWJ49+4dw79//xiEhITAOR/UDhIXFwdn1D9//jCoq6uPuLACjYaA0goonIgBAAFEdAIEBfJIAqDE9fHjR4azZ88yPHnyBMwGDT/8/v0bjkGJDARAQxGg3uDTp0/BmRQUCby8vGC9BgYG4EQJipSRAkBphdgECBBARCdA0BjfcAd///4F43Xr1oFLPVAggsa7QIkN31gXLEGiN1lAZpw4cQIcIbKysgw+Pj7ghMjCwjKsw5GU0RGAACI6JIZ79QtKeGvXrgUnGFBpBuJTMMAK1vvr1y8wBpWcoNLxwoULDCoqKgwxMTHDukRkZ2cnWi1AABGdAJmZh++WkGPHjoET34cPHyhKdPgSIyhBgxLipUuXGGpraxm8vLzAJeJwBKR0QgACaHjXBUSUevPnzwcnQHoBUGIEVeugav7q1asMCQkJDGJiYiN2ChMggJhGoqdBnYdHjx4xdHR0gBPfQEQ+yM6bN28ytLW1gTsroKp6JAKAABpxCRAU0adOnWLo6+tjuHv37oC75/PnzwwzZsxg2Lp1K9nzqUMZAATQiKqCQT1VUIm3bNkycCkIKoVAVSIt2n3EVMWwkhA0lrht2zaw+3x9fcELPUYKAAigEVMCgiL53r17DBs2bICP3w1EwsOVEEHt0YMHD4J74TD3jQQAEEAjJgE+f/6cYdWqVQyfPn0atG4EVcFbtmxhePDgATjDjAQAEEAjIgGChj927NjBcP/+/UE/fAGaVVmzZg14qm8kAIAAGvYJ8OfPnwznzp0D46ECbt26Ba6OR0LPGCCAhn0CBM3p7tmzZ0j0MJHbpMePHwdP5YHahsMZAATQsE6AoAUEoEb948ePh5zbQW3VnTt3ggethzMACKBhnQBBVRg9ZzmoDa5fvw4erB7OvWKAABq2CRC0oODkyZMMb9++HbJ+ACU8UNsVNEc9XAFAAA3bBAhaPAFKgEMdnD9/flivRAIIoGGZAEFjaKCq69mzZ0PeL6DOE6hDAurND0cAEEDDMgGCIgvUgxwMMx3UACC/DNfOCEAADcsECOp8gGYThgsALdsCLfMfjgAggIZlAgS1mUCDucMFgEo/UJNiOI4JAgTQsEuAoEgCDV8Mt6EL0DTicByOAQigYZkAX7x4Mewi6uXLl8OyBAQIoGGXAEE9YNCE/nADsD3Iww0ABNCwS4CwPRfDsWc/XHr1yAAggIZlAhyOY2bDNQECBNCwTIDDsbE+XOeDAQJo2CVA0KJO0Dkuww0MRz+BAEAADcsEOBwHbUEblUDn8A03ABBAowlwCCXA4bh5HSCAhl0CBK2CERUVHXYRBTr+bTiWgAABNCwToKSk5LCLKNDpo8PxfB6AABp2CRBUSoBOoBpuB6ibm5sPy3WBAAE0bJdjaWhoDBv/gI69Ha475AACaFgmQND5dIqKisPGP6DDLYfrqmiAABq2CdDKyoqkgxIHc69eW1t72J4XAxBAw3ZPCGgp+3CohgUEBBh0dXWH7bG+AAE0bBMg6A470A0+Q3XsDOZuU1NTjPOnhxMACKBhmwBB1S8oAYIa8EMRgOa0QT15MzMzcCk4XAFAAA3rjemgGREHB4chO34GascO1QxELAAIoGGdAEENd1ApqKWlNeTcLiMjw2BtbT3sr3QACKBhfzgRHx8fg6enJ5geShnHxcVlWE4pogOAABr2CRA0M6KsrMzg5OQ0ZBYpGBsbM5iYmAzbrZjIACCARsQBlaC1dI6OjuDqeLAD0DQi6A4RLi6ukRA1DAABNGKO6AXd3ebv7w+fIQENcwy2IRpQbzc8PBx8b8hIAQABNKKuaQBFbGxsLPjutsG2vwI01RYaGgq+EHw4LrvCBQACaEQlQFDEguZVS0pKwNXxQCZC5NIX1NnIzMwEt/uGe68XHQAE0Ii7qAY0Jgi6PhUU4ZaWlgPmDljiBw0RlZeXg6fbhuu+D3wAIIBG5F1xoNIHVOWlpqaCL5UG3dsGurGIXiUiyH5QSefm5sYQHBzMMJIBQACN6MsKQcDOzo5BR0eHYcWKFQxXrlwBr7uj1QkEsIQPulE9MDCQQU1NbaQHPwNAAI34BAgCoE5JVlYW+CalzZs3g492A90tQq29uKC2J+jCb1DVDxoUNzQ0HA10KAAIoNEEiASUlJQY0tPTGV6/fg0+oR50IhVoJQooMZJ6zQNoMQRoIBm0oADUyQDNbICGgEbSPXDEAIAAGk2AaACUaEA95ZSUFPARv6ATqUBnTYOudwUlRtDh56Al/8g3qoOqVlApB6peQSUdqDMhJSUFXo8IWk4FOmR8KE0F0hMABNBoAsQDQIkIBEAJEnTaPmgwG3T0G+j0LdABSLBECOpQgDBoIBm0Iw9UYsLmcUHtydHEhxsABNBoAiQSCAsLg2nQ8ihCS6RGyjQaNQBAAI24BAgqnUBjgaCbiEAYNPwCat+BOhyg0grXIZAgeVBpB5vCQ5/Gg1XHIDNgwyy4OiQg+0HyoHYiqFQFYVApCdILYo8kABBAIyIBwg6sBA2zPH36FFx9gq7xAiW+b9++wdt0+BIgtQAoAcISIazNCML8/PxgPmgdIGhwGpRAYaXucAYAATRsEyBoPA8U0UePHmW4du0auOQDHXMLOml0MJ+zB9rLAur0gKpx0DihjY0NuFMzHHb4YQMAATQsEyCohNu1axfDjRs3wIluKB3ZC3IrzL13794F35QEanO6u7uDz4cZbgAggIZVAgRd8nzgwAHwKfkg9mC4ohXUHiS3xAU1EUAYNDAOykygtYKgZfogergAgAAaNglw+/btDHv37gWP01H7GAtQew1UCoGqQWISE6jqBw3bgDIBNap70PgjqO0KKs1BlxdaWFgw+Pn5gduOQx0ABNCQT4Cg6TPQPO7Dhw9psn8WtD6vrq4OPGcMSkzEJChQggVlhKlTpzLMnz+falN6IHNAJeL+/fvBHSpfX19wYhzKACCAhnQCPHToEMP69evBwym06liAVqxERkaSPIUGck9MTAy4SXD79m2qugnUU3/+/DnDokWLwLM1QUFBQzYOAQJoSK4HBA2XbNmyhWHlypXg4RRa9mpBJStobpicth/opnZQr5vaAOZfUGcLNGc9d+7cIXuHCEAADbkECKpmt27dyrBjxw66dDKOHDkCjmRSEzko4YEyCa0vzAaFB+g6V1BmHIpXOQAE0JBKgKAcD1ouBUp8oAFkegCQPatXrwaXZqQA0PgjqK1Grxph9+7dDAsXLgQvfBhKpSFAAA2ZBAgaSAa19/bs2UP34ZV9+/aBExOxEQtqFoBKJFCvlZ7gxIkT4E4PqMkwVBIhQAANiQQIKvlA1e7BgwcH5BouUKN/+fLlRCcoUEIAVduwtiA9Aah3DHIrLdqetAAAATToEyBo6AHUDgP1eAfymFpQbxbkBkJzxaAqe9OmTQxv3rxB6TDQE1y6dAlcYg+FY30BAmhQJ0BQ5IEuagZNq9GrzYcLgBr4CxYsINipuHjxIripMNAAlFmOHTs26KtigABiGsyJD9SWAkUmrDQZaABqAoAiFVcpCGqngnbYgcboBkObGTQ7BBpGGsz3DAME0KBOgKBqDzTTMVgAqPOzbNkynBEK6imDOh+DBcD2tgzmUhAggAZlAgQFGGiEHzS3O9gAqBcO6hWDVqyAIhiGQY3+DRs2kDxcQ2sAmjsGLUcbrLdtAgTQoJyKA03mg3IuqBoZbACU8HJycsD7RGCRCnIvrL06GDtxoLFTPT29QZkAAQJo0CVAUESC2i2nTp0atNUG6EgP0CFHoFkI2KYk0BBNTU3NoHQvaHspqO0KWrgw2I4rBgigQZcAQeNmoF4vKHIpWUtHSwBakwc68BIUmbB9IqCOEqiX/OTJk0HZngbNHoHcPdgAQAANujYgKAJPnz49qIcOYLveYPuBYZdkD+btl6A2NWjOeLABgAAadAkQNNQB62UOxtIPtHEIdNoB+gwH7PiNwTyqABqWGWwAIIAGVQIE9X5BG3IGMwCtCwRtncSWAAf7lkpQ7QJapT2YAEAADaoECNqAA1pJPJgBqKrFtjgVlACHwgkIoLHVwQQAAmhQJcDBXvqBAGhfCKgNiF4CgvhDYY8GaMPWYAIAATSoEuBgmXIjlACxtQFB/KFwSTZoenMwja8CBNCgSYCgaS7Q3o7BDkCnZ2GrgkFDMkOhCgYt6gDtNx4sACCABk0CBK1jGyoJENspBbA24GA/4R40vnr16tVB4x6AABo0oXXnzp1BvWoDBkDtP2yzCbBhmMF+MSJspmmwXAELEECDJgGCBkqHwoYa0FALtlIO1AYEyQ2Fk+5BiycGy3AMQAANigQIahSDGsdDAeBKgCAAOlhoKPSEQdsaBksCBAigQZEAQUuZBnrFM7EA1NPFlQBBnZOhkABBA/6DpScMEECDIgGC9i4MhfYfCODraIDaf0PlEPLBsj4QIIAGRQIEVQmDdcEkKQkQ1P4DVcNDAYD2uAwGABBATIMlNw6VEhBUwuFKgKB1gUNhMBrU2RssvWCAABpxd8VRCrBNwyFXwaMHlJMGAAJoNAGSCEBnOeNrA460Q8YpBQABNJoASQCgKhbUxsNXBYMS6CggHgAE0GgCJDEB4quCQZ2Q0QRIGgAIoNEESAKAXauArw04FDohgwkABNBoAiSxA4KvjQdKgMPh3GZ6AoAAGk2AJABQ4sJ3X8doJ4R0ABBAowmQxBIQ33KrobIkazABgAAaDSkSAGgQmtByK1ACBLUVRwFxACCARhMgCQDUwcB1CSFyAhwdjCYeAATQaAIkAYASF6H1frAbMEcBcQAggEYTIBXbgCAAGyscBcQBgAAaTYAk9oIJtQFBJeDoDenEA4AAGk2AJCZAQm1AUAIUEBAYDSwiAUAAjSZAEtuAhBIgSH50MJp4ABBAowmQBADqXBCqgnEd3TEKsAOAABpNgCQAUNVKTBU8VFZFDwYAEECjCZBIAFqAICQkRLAEBA1Cj3ZCiAcAATSaAIkEoIRFTNUKqoJH24DEA4AAGk2ARALQJh7QOcuE7qkD3Ww+FE75GiwAIIBGEyAJYMaMGeDjg3Gd4ADaXgq6sRJ0VdcoIA4ABNBoAiQBgI6P6+rqwnmMHOiK1kmTJo0GFAkAIIBGEyAJnRAQAN3auWbNGgx50DUNDQ0NZN2uPpIBQACNJkAiAXK1CyoFkS+lAe1pnj17NviCwFFAGgAIoNEESAZ48OABQ0dHB3wzPeg62f7+/tGAIQMABNBoAiQTrFixgmHbtm3g61urqqrAByzR+3JqapXoAwkAAmhQ3JQE6j0OlqMiiG0Pgs6zKS0tZVBWVgYPzwymSCUmvAfLQZoAATQoEqCMjAyDpqYm+B6LDx8+DInSA5QIQe3AwXhBIT4gLi7OoK+vD77vbjAAgABiGSyBkpKSAj6k6PLly+DzokEHaWNLjIPl/rihUtrBgLS0NIONjQ2DmZkZeEYHdNb1YAAAATQoEiDyJS+gC/XMzc3BY22gS2tA992C7rYAzTAMxYgfSACaPtTW1maws7NjkJKSAi+SILSYgt4AIIAG3W2ZoAACYVC1DEpsampq4KoZNMcKKhkfPXrEcOvWrdHxNjxAQUGBwcHBgUFCQgLcRoVdqDgYAUAAsQzmgAQFGgjLycmB+ZKSknA5UMkIqqJBt4Hfu3cPfMQvqAqHlZDDvaSEJSjY6fyKiorgdh2oetXV1R0y/gAIIKITIGjMazBdQWBkZASmQff2ggColAR1CECXM4MO4P78+TN44QCotwo6ExmEQYlyKCZMWAkGomGrbUCHIIESHahDAWq+gGqMwQJIOWwUIICIToCgrvtgXukLigDkSACNy4ES28WLFxmeP38O5oPalKCECTqgG5QgQQEFwjD2YCjVQM0PUEID0bA7iEH7kUGrsUGdNVCTBFSt4jsiZDAM8xALAAJQdwYpAIAgEOwT+gD//zCfESMsLJ3qWCAFXYKGLcz0GkA27adQc4JHXSFpvNeiHt09QOJEpjwEUAInlZrwRwIj8Cp1sBRUKqr50/za4KaTA7AYq3fY+MqpD00RsTJzrKpmXT9l3XrJwL8FoO5eUgAAQSCAXsIjeP8zxlvMxjZuFSQxiKgxP0StAWjDqup03OQEQd39uQzuWmJj8TDXLcYk6xNj0rkXGBlAgVKbQnqSqABMuSO/K5EBiRFoZaV0QIcZw5yb8a89+QYrW3oCiOgECCotQIE+WMaPqAlg5/oNdESDSr6hDkBpBJRWiAUAAUT0XDCoigENgYyCUYAPgNIIKR09gAAiaTECaHAYdKfbKBgF2AAobZB65zNAAJE8Dgi6aRHU5pGVlR1Sqz9GAe0AqMR7/PgxfLaKFAAQQCzkWAYacwPV86qqqqNnIo9wABo9AF21S+5dfwABRPZMCKhnCFo4ABruEBYWhvfwRsHISHSg0QBQdQsbbyUXAAQQKAGC7kkl624BkMWgkpCUXs8oGAXIaRkggECdkBej4TAKBgg8BQggUAI8OxoOo2CAwFmAAAIlwK2j4TAKBghsBQggUAIEbXK9MxoWo4DO4D4o7QEEECgBgpYu1IyGxyigM6gEpT2AAILNhKwE4r7RMBkFdAJ90DTHABBAyFNxZdCS8Ndo+IwCGgFYbVsGEwAIIOQECFqR2QrEekB8ajSsRgGVAShNGULTGHz1L0AAYZsJAW10tQLiQCAOAWLQAjXj0fAbBWSAs9DOBqi6XY+c8GAAIMAAdqlxcuD4FrwAAAAASUVORK5CYII=";
    this.NoPhotoBase64Image = null;
    this.Width = baseWidth || "160";
    this.BaseName = baseName;

    this.Initialize = function (targetControl) {
        var nm = self.BaseName;
        var wd = self.Width;
        var bi = self.NoPhotoBase64Image || self.BASE_IMAGE_PERSON;

        var templateBody = `<div style='display: none'>
	                <input type='file' accept='image/*' id='${nm}_ImgUpload' onchange='${nm}.HandleImage(this.files)' />
                </div>
                <input type='hidden' id='${nm}_B64Photo' />
                <div style='cursor: pointer; width: ${wd}px' title='Clique para alterar' onclick='${nm}.TriggerUpload()'>
	                <img alt="" id='${nm}_Img' width='${wd}' src='${bi}' />
                </div>`;
        document.getElementById(targetControl).innerHTML = templateBody;
    }

    this.HandleImage = function (files) {
        var nm = self.BaseName;
        var wd = self.Width;
        MCConvertImageFileToBase64(`${nm}_Img`, files[0], wd, wd, function (base64) {
            $(`#${nm}_B64Photo`).val(base64);
            $(`#${nm}_ImgUpload`).val("");
        });
    }

    this.TriggerUpload = function () {
        var nm = self.BaseName;
        $(`#${nm}_ImgUpload`).trigger("click");
    }

    this.Clear = function () {
        var nm = self.BaseName;
        $(`#${nm}_Img`).attr("src", self.NoPhotoBase64Image || self.BASE_IMAGE_PERSON);
        $(`#${nm}_B64Photo`).val("");
        $(`#${nm}_ImgUpload`).val("");
    }

    this.SetPhoto = function (base64Img) {
        var nm = self.BaseName;
        $(`#${nm}_Img`).attr("src", base64Img);
        $(`#${nm}_B64Photo`).val(base64Img);
        $(`#${nm}_ImgUpload`).val("");
    }

    this.GetPhoto = function () {
        var nm = self.BaseName;
        return $(`#${nm}_B64Photo`).val();
    }
}

function MCSelectCheckListCombinedSearch(controlName, lstData, displayMember, valueMember) {
    var self = this;
    this.ControlName = controlName;
    this.ListData = lstData;
    this.DisplayMember = displayMember;
    this.ValueMember = valueMember;
    this.Title = "Selecione uma Opção";
    this.Memorize = true;
    this.PageName = "";

    //{0} - ControlName
    //{1} - Index
    //{2} - Value
    //{3} - Label
    this.itemTemplate = `<li>
                <div class="checkbox mc-min-checkbox">
                    <label for="chk{0}Opt{1}" class="base-label">
                        <input id="chk{0}Opt{1}" type="checkbox" name="chk{0}" onclick="{0}.GetLabelSelected()" data-value="{2}" title="{3}" />{3}</label>
                </div>
            </li>`;

    this.ulStartTemplate = `<li>
        <table style="width: 100%;">
            <tr>
                <td>
                    <div class="radio mc-min-radio">
                        <label for="rd{0}Equals">
                            <input type="radio" class="radio" id="rd{0}Equals" onclick="{0}.GetLabelSelected()" name="rd{0}" value="IEQ" checked="checked" />Igual a&nbsp;&nbsp;
                        </label>
                    </div>
                </td>
                <td style="width: 12px">&nbsp;</td>
                <td>
                    <div class="radio mc-min-radio">
                        <label for="rd{0}NotEquals">
                            <input type="radio" class="radio" id="rd{0}NotEquals" onclick="{0}.GetLabelSelected()" name="rd{0}" value="NEQ" />Diferente De
                        </label>
                    </div>
                </td>
            </tr>
        </table>
    </li>
    <li role="separator" class="divider" style="margin-bottom: 0;"></li>
    <li>
        <div class="checkbox mc-min-checkbox">
            <label for="chk{0}CheckAll" class="base-label">
                <input id="chk{0}CheckAll" onclick="{0}.SelectUnselectAll(this);" type="checkbox" />
                Selecionar Todos</label>
        </div>
    </li>
    <li role="separator" class="divider" style="margin-bottom: 0;"></li>`;

    //{0} - ControlName
    //{1} - ItemList
    //{2} - Title
    //{3} - ulStart
    this.controlTemplate = `<div class="input-group input-group-sm mc-user-select-cancel" style="width: 100%">
                <div class="input-group-btn">
                    <div class="btn-group btn-group-sm" id="div{0}">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <b>{2}&nbsp;&nbsp;</b><span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" style="padding: 4px 12px 8px; white-space: nowrap;" id="ulRoot{0}">
                            {3}
                            {1}
                        </ul>
                    </div>
                </div>
                <input type="text" class="form-control input-sm disabled" disabled="disabled" id="lbl{0}"></div>
            </div>`;

    this.Initialize = () => {
        $(document).on('click', `#div${self.ControlName} .dropdown-menu`, function (e) {
            e.stopPropagation();
        });

        var itemContent = "";
        self.ListData.forEach((obj, idx) => {
            var display = obj[self.DisplayMember];
            var value = obj[self.ValueMember];
            //{0} - ControlName
            //{1} - Index
            //{2} - Value
            //{3} - Label
            itemContent += String.format(self.itemTemplate, self.ControlName, idx, value, display);
        });

        setTimeout(() => {
            if (self.Memorize) {
                var obj = MCStorage.Read(`${self.PageName}_${self.ControlName}`, "");
                if (obj) {
                    self.SetData(JSON.parse(obj));
                }
            }
        }, 50);

        var ulStartTemplate = String.format(self.ulStartTemplate, self.ControlName);

        //{0} - ControlName
        //{1} - ItemList
        //{2} - Title
        //{3} - ulStart
        return String.format(self.controlTemplate, self.ControlName, itemContent, self.Title, ulStartTemplate);
    };

    this.LoadListData = (lstData) => {
        self.Clear();
        self.ListData = lstData;
        var ulStartTemplate = String.format(self.ulStartTemplate, self.ControlName);
        var itemContent = ulStartTemplate;
        self.ListData.forEach((obj, idx) => {
            var display = obj[self.DisplayMember];
            var value = obj[self.ValueMember];
            //{0} - ControlName
            //{1} - Index
            //{2} - Value
            //{3} - Label
            itemContent += String.format(self.itemTemplate, self.ControlName, idx, value, display);
        });
        $(`#ulRoot${self.ControlName}`).html(itemContent);
    };

    this.Clear = () => {
        $(`#chk${self.ControlName}CheckAll`).prop("checked", false);
        $(`#rd${self.ControlName}Equals`).prop("checked", true);
        self.SetSelectUnselectAll(false);
    };

    this.SelectUnselectAll = (check) => {
        self.SetSelectUnselectAll(check.checked);
    };

    this.SetSelectUnselectAll = (checked) => {
        $(`[name='chk${self.ControlName}']`).prop("checked", checked);
        self.GetLabelSelected();
    };

    this.GetLabelSelected = () => {
        var cn = self.ControlName;
        var checks = [...$(`input[name='chk${cn}']:checked`)].map(x => $(x).attr("title"));
        var ret = checks.join(";");
        var isEqual = $(`#rd${cn}Equals`).prop("checked");
        ret = "(" + (isEqual ? "==" : "<>") + ") " + ret;
        $(`#lbl${cn}`).val(ret);
        if (self.Memorize) {
            var obj = JSON.stringify(self.GetData());
            MCStorage.Write(`${self.PageName}_${self.ControlName}`, obj);
        }
        return ret;
    };

    this.GetSelected = () => {
        var checks = [...$(`input[name='chk${self.ControlName}']:checked`)].map(x => $(x).attr("data-value"));
        return checks.join(",");
    };

    this.GetData = () => {
        var op = $(`#rd${self.ControlName}Equals`).prop("checked");
        return {
            Selected: self.GetSelected(),
            Operator: (op ? "IEQ" : "NEQ")
        };
    };

    this.SetData = (data) => {
        var cn = self.ControlName;
        var checks = [...$(`input[name='chk${cn}']`)];
        var optEquals = $(`#rd${cn}Equals`);
        var optNotEquals = $(`#rd${cn}NotEquals`);
        self.Clear();
        var checkedItems = data.Selected.split(',');
        checks.forEach((chk) => {
            var ctl = $(chk);
            var val = ctl.attr("data-value");
            if (checkedItems.find(x => x == val)) {
                ctl.prop("checked", true);
            }
        });
        if (data.Operator == "IEQ") {
            optEquals.prop("checked", true);
        } else {
            optNotEquals.prop("checked", true);
        }
        self.GetLabelSelected();
    };
}

function MCImageViewer(baseName, width, height) {
    var self = this;
    this.BaseName = baseName;
    this.Width = width ?? "600px";
    this.Height = height ?? "400px";
    this.Container = "body";
    this.Inline = true;
    this.Viewer = null;
    this.Base64RawImg = "data:image/png;base64,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";
    this.GetInstance = function () {
        return $(`#${self.BaseName}`);
    }

    this.Refresh = function () {
        self.Viewer.update();
        self.Viewer.view(0);
    }

    this.Clear = function () {
        self.LoadData(null, []);
    }

    this.LoadData = function (basePath, lstData) {
        var obj = self.GetInstance();
        obj.html(""); //Remove os objetos
        var newEls = [];
        if (lstData.length == 0) {
            newEls.push(`<li><img src="${self.Base64RawImg}" alt="media-core.jpg"></li>`);
        } else {
            lstData.forEach((file) => {
                var newUrl = ConcatUrls(basePath, file);
                var newEl = `<li><img src="${newUrl}" alt="${file}"></li>`;
                newEls.push(newEl);
            });
        }
        obj.html(newEls.join(""));
        self.Refresh();
    }

    this.Initialize = function (containerToInject) {
        var html = `
<div style="width: ${self.Width}; height:${self.Height}; overflow: hidden">
    <ul id="${self.BaseName}" style="display: none">
    </ul>
</div>`;
        document.getElementById(containerToInject).innerHTML = html;
        setTimeout(() => {
            var obj = self.GetInstance();
            obj.viewer({
                container: self.Container,
                inline: self.Inline,
                minWidth: parseInt(self.Width.replace("px", "")),
                minHeight: parseInt(self.Height.replace("px", "")),
            });
            self.Viewer = obj.data('viewer');
            self.Clear();
        }, 10);
    }
}