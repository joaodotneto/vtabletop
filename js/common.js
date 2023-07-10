const FileOptions = { types: [{ description: "Json Files", accept: { "application/json": [".json"] } }] };

var Keys = {
    Up: 38,
    Down: 40,
    Right: 39,
    Left: 37
}

var MouseKey = {
    Left: 1,
    Mid: 2,
    Right: 3
}

var LastOpenedHandle = null;
var canvasObj = null;
var canvasCtx = null;
var currentX = 0;
var currentY = 0;
var parallaxX = 0;
var parallaxY = 0;
var parallaxOp = 1.0;
var lastFrameTime = null;
var showAnimation = true;
var parallaxBack = null;
var parallaxDirection = false;
var parallaxVertical = false;
var parallaxSpeed = 2.0;
var parallaxStretch = false;
var isDraggable = false;
var currentImg = new Image();
var AMMOUNT = 96;
var SCROLL_SENSITIVITY = 0.0005;
var lastValueZoom = 1.0;
var cameraZoom = 1.0;
var layers = [];
var currentLayerEdit = null;
var currentSelectedRevealItem = null;

//Escurecimento da tela
var currentDarken = 0;

var MAX_ZOOM = 5
var MIN_ZOOM = 0.1
var ctrlKey = false;
var shftKey = false;

var lastMouseX = 0;
var lastMouseY = 0;
var lastSelectedFileName = "Map";
var showObjectPanel = false;
var showLayerPanel = false;
var showMapRevealPanel = false;
var settingsWindow = null;

var createMapRevealEnabled = false;
var currentRevealList = [];
var currentRevealSteps = [];

const OpenFile = async () => {
    try {
        [LastOpenedHandle] = await window.showOpenFilePicker(FileOptions);
        var file = await LastOpenedHandle.getFile();
        lastSelectedFileName = file.name.replace(".json", "");
        var reader = new FileReader();
        reader.onload = function () {
            ParseAndApplySettings(reader.result);
        };
        reader.readAsText(file);
    } catch (err) {
        console.log(err.name, err.message);
        return null;
    }
};

const SaveFile = async (blob) => {
    try {
        if (LastOpenedHandle == null) {
            LastOpenedHandle = await window.showSaveFilePicker(FileOptions);
        }
        var writable = await LastOpenedHandle.createWritable();
        await writable.write(blob);
        await writable.close();
        BootstrapFloatAlert.success(`File '${LastOpenedHandle.name}' saved Sucessfully!`, ".content");
    } catch (err) {
        console.log(err.name, err.message);
    }
};

function ConfigureWindowMessage() {
    window.addEventListener("message", (event) => {
        var model = { cmd: "", parameters: [] };
        debugger;
    }, false);
}

function ShowSettingsWindow() {
    //var left = canvasObj.width - 580;
    //var top = 150;
    //window.open("settings.html", "settings", `width=500,height=300,left=${left},top=145`);
}

function ShowHideLayerPanel(forceHide) {
    showLayerPanel = forceHide ? false : !showLayerPanel;
    if (showLayerPanel) {
        ShowHideObjectPanel(true);
        ShowHideMapRevealPanel(true);
    }
    $("#layersPanel").css("display", showLayerPanel ? "" : "none");
}

function ShowHideObjectPanel(forceHide) {
    showObjectPanel = forceHide ? false : !showObjectPanel;
    if (showObjectPanel) {
        ShowHideLayerPanel(true);
        ShowHideMapRevealPanel(true);
    }
    $("#objectPanel").css("display", showObjectPanel ? "" : "none");
}

function ShowHideMapRevealPanel(forceHide) {
    showMapRevealPanel = forceHide ? false : !showMapRevealPanel;
    if (showMapRevealPanel) {
        ShowHideObjectPanel(true);
        ShowHideLayerPanel(true);
    }
    $("#mapRevealPanel").css("display", showMapRevealPanel ? "" : "none");
}

function AddValueToField(field, value, convertFunc) {
    var currVal = convertFunc($(field).val());
    currVal += value;
    $(field).val(currVal);
}

function SetBoxValue(value) {
    $("#numBox").val(value);
    ResetCanvas();
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function HasSaveFilePicker() {
    return ('showSaveFilePicker' in window);
}

function HasOpenFilePicker() {
    return ('showOpenFilePicker' in window);
}

function DrawHorLine(y) {
    DrawLine(0, y, window.innerWidth, y);
}

function DrawVerLine(x) {
    DrawLine(x, 0, x, window.innerHeight);
}

function DrawLine(x1, y1, x2, y2) {
    canvasCtx.beginPath();
    canvasCtx.moveTo(x1, y1);
    canvasCtx.lineTo(x2, y2);
    canvasCtx.closePath();
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = $("#numColor").val();
    canvasCtx.stroke();
}

function DrawCoordsFull(stepsV, stepsH) {
    canvasCtx.save();
    canvasCtx.font = "bold 18px Arial";
    canvasCtx.fillStyle = "#ffffff";
    for (var i = 0; i < stepsV; i++) {
        for (var j = 0; j < stepsH; j++) {
            DrawCoords(i, j);
        }
    }
    canvasCtx.restore();
}

function DrawCoordsVert(x, y) {
    canvasCtx.fillText(`${x}-${y}`, (x * AMMOUNT) + 4, (y * AMMOUNT) - 8);
}

function DrawCoords(x, y) {
    canvasCtx.fillText(`${(x + 1)}-${(y)}`, (x * AMMOUNT) + 4, (y * AMMOUNT) - 8);
}

function chkVal(name) {
    return $(`#${name}`).prop("checked");
}

function getInt(name) {
    var value = parseInt($(`#${name}`).val());
    if (isNaN(value)) return 0;
    return value ?? 0;
}

function getFloat(name, def) {
    var value = parseFloat($(`#${name}`).val());
    if (isNaN(value)) return (def ?? 0.0);
    return value ?? (def ?? 0.0);
}

function GetImageAsBase64(img) {
    var canvas = document.getElementById('saveCanvas');
    var ctx = canvas.getContext('2d');
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
}

function AdjustZoom(zoomAmount, zoomFactor) {
    if (zoomAmount) {
        cameraZoom += zoomAmount;
    }
    else if (zoomFactor) {
        cameraZoom = zoomFactor * lastZoom;
    }
    cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
    cameraZoom = Math.max(cameraZoom, MIN_ZOOM);
}

function AddListItem(controle, texto, valor) {
    var option = document.createElement("option");
    option.text = texto;
    option.value = valor;
    controle.add(option);
}

function LoadImage(callback) {
    $("#uploadFile").unbind("change").change(function (e) {
        var file = e.currentTarget.files[0];
        callback(file);
        $("#uploadFile").val("");
    });
    $("#uploadFile").trigger("click");
}

function LoadBackground() {
    LoadImage((file) => {
        currentImg.onload = function () { ResetCanvas(); }
        currentImg.src = URL.createObjectURL(file);
    });
}

function LoadParallax() {
    LoadImage((file) => {
        parallaxBack = new ParallaxBackground();
        parallaxBack.initialize(URL.createObjectURL(file), ResetCanvas);
        ResetCanvas();
    });
}

function ConfigureCanvas() {
    canvasObj = document.getElementById("baseCanvas");
    canvasCtx = canvasObj.getContext("2d");
    canvasCtx.canvas.width = window.innerWidth;
    canvasCtx.canvas.height = window.innerHeight;

    canvasObj.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        return false;
    });

    canvasObj.addEventListener("mouseup", (e) => {
        if (e.which == MouseKey.Right) {
            e.preventDefault();
            if (createMapRevealEnabled) {
                AskCancelMapRevealCreation();
            }
            return false;
        }

        if (createMapRevealEnabled) {
            AddMapRevealStep(e);
            return false;
        }
    });

    canvasObj.addEventListener("mousemove", (e) => {
        AMMOUNT = getInt("numBox");
        var cr = canvasObj.getBoundingClientRect();
        var mr = new DOMPoint(e.clientX, e.clientY, 0, 0);
        var mx = parseInt((mr.x - cr.left) / AMMOUNT);
        var my = parseInt((mr.y - cr.top) / AMMOUNT);
        if (lastMouseX != mx || lastMouseY != my) {
            lastMouseX = mx;
            lastMouseY = my;
            if (createMapRevealEnabled && e.shiftKey) {
                AddMapRevealStep(e);
            }
        }
    });
    
    canvasObj.addEventListener('wheel', (e) => {
        if (!e.shiftKey) return;
        var newVal = e.deltaY * SCROLL_SENSITIVITY;
        var numCompZ = $("#numCompZ");
        var curVal = parseFloat(numCompZ.val());
        curVal += (newVal > 0 ? 0.01 : -0.01);
        numCompZ.val(curVal);
        SetCanvasZoom();
    });

    $('html').keydown(function (e) {
        var keyCode = e.which ?? e.keyCode;
        ctrlKey = e.ctrlKey;
        shftKey = e.shiftKey;
        var cmpX = false;
        var cmpY = false;

        var rott = $("#chkHorizontal").prop("checked");
        var isMoveKey = ExecuteMove(keyCode, shftKey, ctrlKey, rott);

        switch (keyCode) {
            case Keys.Down:
            case Keys.Up:
                cmpY = true;
                break;

            case Keys.Left:
            case Keys.Right:
                cmpX = true;
                break;
        }

        if (isMoveKey && ctrlKey) {
            var numCompX = $("#numCompX");
            var numCompY = $("#numCompY");
            var valX = parseInt(numCompX.val());
            var valY = parseInt(numCompY.val());
            if (shftKey) { //Complementos
                if (cmpX) {
                    var calc = ((keyCode == (rott ? Keys.Left : Keys.Right)) ? 1 : -1) * 1;
                    if (rott) {
                        valY += calc;
                    } else {
                        valX += calc;
                    }
                }
                if (cmpY) {
                    var calc = ((keyCode == Keys.Down) ? 1 : -1) * 1;
                    if (rott) {
                        valX += calc;
                    } else {
                        valY += calc;
                    }
                }
                numCompX.val(valX);
                numCompY.val(valY);
            }
            ResetCanvas();
            e.preventDefault();
        }
    });
}

function ExecuteMove(keyCode, shftKey, ctrlKey, rott) {
    if (!ctrlKey) return false;
    AMMOUNT = parseInt($("#numBox").val());
    var ammount = AMMOUNT; // ctrlKey ? (AMMOUNT / 2) : AMMOUNT;

    switch (keyCode) {
        case Keys.Down:
        case Keys.Up:
            var calc = (shftKey ? 0 : ((keyCode == Keys.Down) ? -1 : 1) * ammount);
            if (rott) {
                currentX += calc;
            } else {
                currentY += calc;
            }
            return true;
            break;

        case Keys.Left:
        case Keys.Right:
            var calc = (shftKey ? 0 : ((keyCode == (rott ? Keys.Left : Keys.Right)) ? -1 : 1) * ammount);
            if (rott) {
                currentY += calc;
            } else {
                currentX += calc;
            }
            return true;
            break;
    }
    return false;
}

function SetCanvasZoom() {
    var newZoom = parseFloat($("#numCompZ").val());
    var diffZoom = lastValueZoom > newZoom ? -0.01 : 0.01;
    lastValueZoom = newZoom;
    AdjustZoom(diffZoom);
    ResetCanvas();
}

function ResetAdjusts() {
    $("#numCompX").val("0");
    $("#numCompY").val("0");
    $("#numCompZ").val("1");
    $("#numBox").val("96");
    lastValueZoom = 0;
    cameraZoom = 1;
    currentX = 0;
    currentY = 0;
    canvasCtx.setTransform(1, 0, 0, 1, 0, 0);
    ResetCanvas();
}

function CloneClassInstance(model, instance) {
    return Object.assign(Object.create(Object.getPrototypeOf(model)), instance);
}

function WriteSettings() {
    var parsedLayers = [];
    layers.forEach((obj) => {
        var parsedLayer = CloneClassInstance(obj, obj);
        parsedLayer.img = GetImageAsBase64(parsedLayer.img);
        parsedLayers.push(parsedLayer);
    });
    var objOut = {
        Box: getInt("numBox"),
        X: getInt("numCompX"),
        Y: getInt("numCompY"),
        Z: getFloat("numCompZ"),
        R: chkVal("chkHorizontal"),
        G: chkVal("chkShowGrid"),
        Coords: chkVal("chkShowCoords"),
        PX: currentX,
        PY: currentY,
        Color: $("#numColor").val(),
        BackColor: $("#numColorBk").val(),
        Image: GetImageAsBase64(currentImg),
        Layers: JSON.stringify(parsedLayers),
        RevealColor: $("#numColorMapReveal").val(),
        Reveals: JSON.stringify(currentRevealList),
        Parallax: {
            Anim: chkVal("chkParallaxAnim"),
            Dir: chkVal("chkParallaxRtl"),
            Ver: chkVal("chkParallaxVertical"),
            Spd: getFloat("numkParallaxSpeed", 1.0),
            X: getInt("numParallaxX"),
            Y: getInt("numParallaxY"),
            Opacity: getFloat("numParallaxOp"),
            Image: parallaxBack == null ? null : GetImageAsBase64(parallaxBack.img)
        }
    };
    var strData = JSON.stringify(objOut);
    const link = document.createElement("a");
    const file = new Blob([strData], { type: 'text/plain' });
    if (HasSaveFilePicker()) {
        SaveFile(file);
        return;
    }
    var newName = window.prompt("Map Name", lastSelectedFileName);
    if (!newName) return;
    link.href = URL.createObjectURL(file);
    link.download = newName + ".json";
    link.click();
    URL.revokeObjectURL(link.href);
}

function ReadSettings() {
    if (HasOpenFilePicker()) {
        OpenFile();
        return;
    }
    $("#uploadSettings").unbind("change").change(function (e) {
        var file = e.currentTarget.files[0];
        lastSelectedFileName = file.name.replace(".json", "");
        var reader = new FileReader();
        reader.onload = function () {
            ParseAndApplySettings(reader.result);
        };
        reader.readAsText(file);
        $("#uploadSettings").val("");
    });
    $("#uploadSettings").trigger("click");
}

function ParseAndApplySettings(result) {
    var objInp = JSON.parse(result);

    currentX = objInp.PX;
    currentY = objInp.PY;

    $("#numBox").val(objInp.Box);
    $("#numCompX").val(objInp.X);
    $("#numCompY").val(objInp.Y);
    $("#numCompZ").val(objInp.Z);
    $("#numColor").val(objInp.Color);
    $("#numColorBk").val(objInp.BackColor ?? "#000000");
    $("#numColorMapReveal").val(objInp.RevealColor ?? "#ffffff"),
    $("#chkHorizontal").prop("checked", objInp.R);
    $("#chkShowGrid").prop("checked", objInp.G);
    $("#chkShowCoords").prop("checked", (objInp.Coords ?? false));

    if (objInp.Parallax) {
        var objP = objInp.Parallax;
        $("#numkParallaxSpeed").val(objP.Spd);
        $("#numParallaxX").val(objP.X);
        $("#numParallaxY").val(objP.Y);
        $("#numParallaxOp").val(objP.Opacity ?? 1.0);
        $("#chkParallaxAnim").prop("checked", objP.Anim);
        $("#chkParallaxRtl").prop("checked", objP.Dir);
        $("#chkParallaxVertical").prop("checked", objP.Ver);
        if (objP.Image) {
            parallaxBack = new ParallaxBackground();
            parallaxBack.initialize(objP.Image);
        }
    }

    if (objInp.Layers) {
        var lstLayers = JSON.parse(objInp.Layers);
        layers = [];
        var model = new ImageLayer();
        lstLayers.forEach((obj) => {
            var nLayer = CloneClassInstance(model, obj);
            nLayer.loadImage(nLayer.img);
            layers.push(nLayer);
        });
        RefreshLayerList(false);
    }

    if (objInp.Reveals) {
        var lstReveals = JSON.parse(objInp.Reveals);
        currentRevealList = [];
        var model = new MapReveal();
        lstReveals.forEach((obj) => {
            var nLayer = CloneClassInstance(model, obj);
            currentRevealList.push(nLayer);
        });
        RefreshMapRevealList(false);
    }

    currentImg.onload = function () {
        ResetCanvas();
    }
    currentImg.src = objInp.Image;
}

function RenderParallax() {
    if (!showAnimation) {
        if (parallaxBack) parallaxBack.draw(canvasCtx, 0);
        return;
    }
    var now = Date.now();
    var deltaSeconds = (now - lastFrameTime) / parseInt(parallaxSpeed * 100);
    lastFrameTime = now;
    if (!isFinite(deltaSeconds) || isNaN(deltaSeconds)) deltaSeconds = 0;
    if (parallaxBack) parallaxBack.draw(canvasCtx, deltaSeconds);
}

function RefreshLayerList(keepSelection = true) {
    var lstLayers = $("#lstLayers")[0];
    var currentSelection = lstLayers.selectedIndex;
    lstLayers.length = 0;
    layers.forEach((obj) => {
        AddListItem(lstLayers, obj.name, obj.index);
    });
    if (keepSelection) {
        lstLayers.selectedIndex = currentSelection;
    } else {
        lstLayers.selectedIndex = lstLayers.length - 1;
    }
}

function AddLayer() {
    LoadImage((file) => {
        var newLayer = new ImageLayer();
        newLayer.initialize(URL.createObjectURL(file), () => {
            newLayer.name = file.name;
            newLayer.index = $("#lstLayers").prop("length");
            layers.push(newLayer);
            RefreshLayerList(false);
            EditLayer(newLayer);
            ResetCanvas();
        });
    });
}

function SelectCurrentLayer() {
    var layer = GetSelectedLayer();
    EditLayer(layer);
}

function EditLayer(layer) {
    currentLayerEdit = layer;
    $("#txtLayerName").val(layer.name);
    $("#numLayerX").val(layer.x);
    $("#numLayerY").val(layer.y);
    $("#numLayerW").val(layer.w);
    $("#numLayerH").val(layer.h);
    $("#numLayerOp").val(layer.transp);
    $("#chkShowLayer").prop("checked", layer.visible);
    $("#chkShowLayerOverlay").prop("checked", layer.showOverlay);
    $("#numColorLayerOverlay").val(layer.overlayColor);
    $("#numLayerOverlayOp").val(layer.overlayOpacity);
}

function ClearEditLayer() {
    currentLayerEdit = null;
    $("#txtLayerName").val("");
    $("#numLayerX").val("0");
    $("#numLayerY").val("0");
    $("#numLayerW").val("0");
    $("#numLayerH").val("0");
    $("#numLayerOp").val("1");
    $("#chkShowLayer").prop("checked", true);
    $("#chkShowLayerOverlay").prop("checked", false);
    $("#numColorLayerOverlay").val("#000000");
    $("#numLayerOverlayOp").val("1");
}

function UpdateLayerIndex() {
    layers.forEach((obj, idx) => {
        obj.index = idx;
    });
}

function GetSelectedLayer() {
    var lstLayers = $("#lstLayers")[0];
    var currentSelection = lstLayers.selectedIndex;
    return layers[currentSelection];
}

function CloneLayer() {
    var layer = GetSelectedLayer();
    if (!layer) return;
    var clone = confirm("Really want to clone this layer?");
    if (!clone) return;
    var newLayer = CloneClassInstance(layer, layer);
    newLayer.name = "Clone - " + newLayer.name;
    layers.push(newLayer);
    UpdateLayerIndex();
    RefreshLayerList(false);
    EditLayer(newLayer);
}

function DeleteLayer() {
    var layer = GetSelectedLayer();
    if (!layer) return;
    var del = confirm("Really want to delete this layer?");
    if (!del) return;
    layers.splice(layer.index, 1);
    var lstLayers = $("#lstLayers")[0];
    var opt = lstLayers.options[layer.index];
    lstLayers.removeChild(opt);
    ClearEditLayer();
}

function MoverLayerUp() {
    var lstLayers = $("#lstLayers")[0];
    var idx = lstLayers.selectedIndex;
    if (idx > 0) {
        var nxt = idx - 1;
        var opt = lstLayers.options[idx];
        var opB = lstLayers.options[nxt];
        [layers[idx], layers[nxt]] = [layers[nxt], layers[idx]];
        UpdateLayerIndex();
        lstLayers.removeChild(opt);
        lstLayers.insertBefore(opt, opB);
    }
    requestAnimationFrame(ResetCanvas);
}

function MoverLayerDown() {
    var lstLayers = $("#lstLayers")[0];
    var idx = lstLayers.selectedIndex;
    var tot = (lstLayers.length - 1);
    if (idx < tot) {
        var opt = lstLayers.options[idx];
        var nxt = 0;
        if ((idx + 1) == tot) {
            nxt = tot;
            lstLayers.appendChild(opt);
        } else {
            nxt = idx + 2;
            var opB = lstLayers.options[idx + 2];
            lstLayers.insertBefore(opt, opB);
        }
        [layers[idx], layers[nxt]] = [layers[nxt], layers[idx]];
        UpdateLayerIndex();
    }
    requestAnimationFrame(ResetCanvas);
}

function UpdateSelectedLayer() {
    if (currentLayerEdit != null) {
        currentLayerEdit.name = $("#txtLayerName").val();
        currentLayerEdit.x = getInt("numLayerX");
        currentLayerEdit.y = getInt("numLayerY");
        currentLayerEdit.w = getInt("numLayerW");
        currentLayerEdit.h = getInt("numLayerH");
        currentLayerEdit.transp = getFloat("numLayerOp");
        currentLayerEdit.visible = chkVal("chkShowLayer");
        currentLayerEdit.flipType = getInt("lstFlipLayer");
        currentLayerEdit.showOverlay = chkVal("chkShowLayerOverlay");
        currentLayerEdit.overlayOpacity = getFloat("numLayerOverlayOp");
        currentLayerEdit.overlayColor = $("#numColorLayerOverlay").val();
    }
}

function CalcProportion(prop, val, newProp) {
    return Math.floor(parseFloat((val * prop) / newProp));
}

function AddRevealItem() {
    CreateRevealItemAlert();
    createMapRevealEnabled = true;
    currentRevealSteps = [];
}

function AddMapRevealStep(e) {
    AMMOUNT = parseInt($("#numBox").val());
    var cr = canvasObj.getBoundingClientRect();
    var mr = new DOMPoint(e.clientX, e.clientY, 0, 0);
    var mx = parseInt((mr.x - cr.left) / AMMOUNT);
    var my = parseInt((mr.y - cr.top) / AMMOUNT);
    var pX = (currentX / AMMOUNT) * -1;
    var pY = (currentY / AMMOUNT) * -1;
    var rx = (pX + mx);
    var ry = (pY + my);
    var idx = currentRevealSteps.findIndex((a) => { return a.x == rx && a.y == ry });
    if (idx > -1) {
        currentRevealSteps.splice(idx, 1);
    } else {
        currentRevealSteps.push({ x: rx, y: ry });
    }
}

function AskCancelMapRevealCreation() {
    var cancel = confirm('Really want to cancel this Reveal edition?');
    if (!cancel) return;
    CancelMapRevealCreation();
}

function CancelMapRevealCreation() {
    $("#alertMapRevealCreate").alert('close');
    createMapRevealEnabled = false;
    currentRevealSteps = [];
}

function FinishAddMapRevealStep(event) {
    var revealName = "Reveal";
    var keepSelected = false;
    if (currentSelectedRevealItem) {
        revealName = currentSelectedRevealItem.name;
        keepSelected = true;
    }
    var mapRevealName = prompt("Give this map reveal a Name:", revealName);
    if (!mapRevealName) return;
    var proportion = getInt("numBox");
    if (currentSelectedRevealItem) {
        currentSelectedRevealItem.name = mapRevealName;
        currentSelectedRevealItem.steps = [...currentRevealSteps];
        currentSelectedRevealItem.proportion = proportion;
        currentSelectedRevealItem = null;
    } else {
        var newReveal = new MapReveal();
        newReveal.name = mapRevealName;
        newReveal.steps = [...currentRevealSteps];
        newReveal.proportion = proportion;
        currentRevealList.push(newReveal);
    }
    CancelMapRevealCreation();
    RefreshMapRevealList(keepSelected);
    event.preventDefault();
}

function RefreshMapRevealList(keepSelection = true) {
    var lstReveal = $("#lstMapReveals")[0];
    var currentSelection = lstReveal.selectedIndex;
    lstReveal.length = 0;
    currentRevealList.forEach((obj) => {
        AddListItem(lstReveal, obj.Name, obj.name);
    });
    if (keepSelection) {
        lstReveal.selectedIndex = currentSelection;
    } else {
        lstReveal.selectedIndex = lstReveal.length - 1;
    }
}

function GetSelectedMapReveal() {
    var lstReveal = $("#lstMapReveals")[0];
    var currentSelection = lstReveal.selectedIndex;
    currentSelectedRevealItem = currentRevealList[currentSelection];
    currentSelectedRevealItem.index = currentSelection;
    return currentSelectedRevealItem;
}

function ChangeCurrentMapReveal() {
    var currentReveal = GetSelectedMapReveal();
    currentReveal.visible = !currentReveal.visible;
    RefreshMapRevealList(true);
}

function MoveRevealItem(idx) {
    var currentReveal = GetSelectedMapReveal();
    if (!currentReveal) return;
    var mvx = (idx == 2 ? -1 : (idx == 3 ? 1 : 0));
    var mvy = (idx == 0 ? -1 : (idx == 1 ? 1 : 0));
    currentReveal.updateSteps(mvx, mvy);
}

function CloneRevealItem() {
    var currentReveal = GetSelectedMapReveal();
    if (!currentReveal) return;
    var clone = confirm("Really want to clone this Reveal Item?");
    if (!clone) return;
    var newItem = CloneClassInstance(currentReveal, currentReveal);
    newItem.name = "Clone - " + currentReveal.name;
    currentRevealList.push(newItem);
    RefreshMapRevealList(false);
}

function EditRevealItem() {
    var currentReveal = GetSelectedMapReveal();
    if (!currentReveal) return;
    CreateRevealItemAlert();
    createMapRevealEnabled = true;
    currentRevealSteps = [...currentReveal.steps];
}

function DeleteRevealItem() {
    var currentReveal = GetSelectedMapReveal();
    if (!currentReveal) return;
    var del = confirm("Really want to delete this Reveal Item?");
    if (!del) return;
    currentRevealList.splice(currentReveal.index, 1);
    var lstReveal = $("#lstMapReveals")[0];
    var opt = lstReveal.options[currentReveal.index];
    lstReveal.removeChild(opt);
    currentSelectedRevealItem = null;
}

function CreateRevealItemAlert() {
    var alert = `<div class="alert alert-warning alert-map-reveal" id="alertMapRevealCreate" role="alert" onclick="FinishAddMapRevealStep(event)">
                <b><i>Left Click</i> over the locals of the map that compose the reveal.</b><br />
                <b><i>Right Click</i> to cancel.</b><br />
                <b>Click HERE to complete.</b><br />
            </div>`;
    $(alert).appendTo('body');
}

function CreateToggle(id, target, checked, onclick, noTitle, yesTitle) {
    var isCheck = checked ? `checked="checked"` : "";
    var hvOnClick = onclick ? `onclick="${onclick}"` : "";
    var html = `<label class="mc-toggle-switch">
        <input class="mc-ts-check" type="checkbox" id="${id}" ${isCheck} ${hvOnClick} />
        <span class="mc-ts-slider round">
        </span>
        <div class='mc-ts-toggle-title mc-ts-toggle-title-yes'>${yesTitle}</div>
        <div class='mc-ts-toggle-title mc-ts-toggle-title-no'>${noTitle}</div>
    </label>`;
    $(`#${target}`).html(html);
}

function CreateButton(title, caption, icon, cssclass, style, onclick) {
    hvCaption = caption ? "&nbsp;" + caption : "";
    hvStyle = style ? `style="${style}"` : "";
    return `<a class="btn btn-default ${cssclass}" ${hvStyle} onclick="${onclick}" title="${title}">
        <i class="glyphicon glyphicon-${icon}"></i>${hvCaption}</a>`;
}