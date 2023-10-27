const FileOptions = { types: [{ description: "Json Files", accept: { "application/json": [".json"] } }] };
const ImageOptions = { types: [{ description: "Image Files", accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] } }] };

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

var CurrentOpenedSettings = null;
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

//Layers
var currentLayerList = [];
var currentLayerEdit = null;

var deltaTime = 0.0;
var DeltaSeconds = 0.0;

var InMoveX = false;
var InMoveY = false;

var MoveXYLastTime = 0;
var MoveXAmmount = 0;
var MoveYAmmount = 0;
var MoveXPosition = 0.0;
var MoveYPosition = 0.0;

var MoveXYSpeed = 0.1;
var MoveXYSpeedMultiplier = 10.0;

var MoveXDirection = 1;
var MoveYDirection = 1;

//Escurecimento da tela
var currentDarken = 0;

var MAX_ZOOM = 5
var MIN_ZOOM = 0.1
var ctrlKey = false;
var shftKey = false;

var lastMouseX = 0;
var lastMouseY = 0;
var lastSelectedFileName = "Map";

//Panel Control
var showObjectPanel = false;
var showLayerPanel = false;
var showMapRevealPanel = false;
var showAnimationPanel = false;
var showActionPanel = false;
var settingsWindow = null;

//Map Reveals
var currentSelectedRevealItem = null;
var createMapRevealEnabled = false;
var currentRevealList = [];
var currentRevealSteps = [];

//Animations
var currentAnimationList = [];
var currentAnimationImageList = [];
var currentSelectedAnimation = null;
var currentSelectedAnimationIdx = null;
var currentAnimationInstanceList = [];
var currentAnimationInstance = null;
var currentAnimationInstanceIndex = null;

const OpenJsonFile = async (callback) => {
    try {
        [LastOpenedHandle] = await window.showOpenFilePicker(FileOptions);
        var file = await LastOpenedHandle.getFile();
        lastSelectedFileName = file.name.replace(".json", "");
        var reader = new FileReader();
        reader.onload = function () {
            callback(reader.result);
        };
        reader.readAsText(file);
    } catch (err) {
        console.log(err.name, err.message);
        return null;
    }
};

const OpenImageFile = async (callback) => {
    try {
        var [fileHandle] = await window.showOpenFilePicker(ImageOptions);
        var file = await fileHandle.getFile();
        callback(file);
    } catch (err) {
        console.log(err.name, err.message);
        return null;
    }
};

const SaveFile = async (saveAs, blob) => {
    try {
        var openedHandle = null;
        if (saveAs) {
            openedHandle = await window.showSaveFilePicker(FileOptions);
        } else {
            if (LastOpenedHandle == null) {
                openedHandle = LastOpenedHandle = await window.showSaveFilePicker(FileOptions);
            } else {
                openedHandle = LastOpenedHandle;
            }
        }
        var writable = await openedHandle.createWritable();
        await writable.write(blob);
        await writable.close();
        BootstrapFloatAlert.success(`File '${openedHandle.name}' saved Sucessfully!`, ".content");
    } catch (err) {
        console.log(err.name, err.message);
    }
};

function ClearBackground() {
    currentImg = new Image();
}

function ClearParallax() {
    parallaxBack = null;
    parallaxDirection = false;
    parallaxVertical = false;
    parallaxSpeed = 2.0;
    parallaxStretch = false;
}

function SetLocalSettings(objInp) {
    $("#numGlobalShow").val(objInp.Fog ?? 0.0);
    $("#chkShowGrid").prop("checked", objInp.G);
    $("#chkShowCoords").prop("checked", (objInp.Coords ?? false));
    $("#chkShowAllLayer").prop("checked", (objInp.ShowLayers ?? true));
    $("#chkShowMapRevealNames").prop("checked", (objInp.ShowRevNames ?? false));
    $("#chkShowAllMapReveal").prop("checked", (objInp.ShowReveals ?? true));

    if (objInp.Parallax) {
        var objP = objInp.Parallax;
        $("#chkParallaxAnim").prop("checked", objP.Anim);
    }
}

function ConfigureWindowMessage() {
    window.addEventListener("unload", (event) => {
        if (settingsWindow) settingsWindow.close();
    });

    window.addEventListener("message", (event) => {
        var objParameters = event.data;
        setTimeout(() => {
            var attrs = objParameters.attrs;
            var objData = objParameters.parameters;
            var cmd = objParameters.cmd;
            var par01 = attrs[0];
            switch (cmd) {
                case "ReloadSettings":
                    if (CurrentOpenedSettings != null) {
                        InvokeConfigOnSettingsWindow("LoadSettings", [CurrentOpenedSettings]);
                    }
                    break;

                case "ChangeFog":
                    $("#numGlobalShow").val(par01);
                    break;

                case "OpenFile":
                    ParseAndApplySettings(par01);
                    break;

                case "UpdateInfo":
                    SetLocalSettings(par01);
                    break;

                case "UpdateReveal":
                    var val = attrs[1];
                    currentRevealList[par01].visible = val;
                    RefreshMapRevealList();
                    break;

                case "UpdateLayer":
                    var val = attrs[1];
                    var ovl = attrs[2];
                    var objLayer = currentLayerList[par01];
                    objLayer.visible = val;
                    objLayer.showOverlay = ovl;
                    RefreshLayerList();
                    break;

                case "SetAnimation":
                    var objAnim = currentAnimationInstanceList[par01];
                    objAnim.visible = attrs[1];
                    break;

                case "RunAnimation":
                    var objAnim = currentAnimationInstanceList[par01];
                    objAnim.run();
                    break;

                case "RevealLayer":
                    RevealLayer(par01);
                    break;

                case "ResetCanvas":
                    window.ResetCanvas();
                    break;

                case "LoadBackground":
                    currentImg.onload = function () { ResetCanvas(); }
                    currentImg.src = URL.createObjectURL(objParameters.file);
                    break;

                case "LoadParallax":
                    parallaxBack = new ParallaxBackground();
                    parallaxBack.initialize(URL.createObjectURL(objParameters.file), ResetCanvas);
                    ResetCanvas();
                    break;

                case "ExecuteCommand":
                    var cmd = parseInt(par01);
                    if (cmd == 12) {
                        var objData = attrs[1];
                        var steps = parseInt(objData.Val);
                        switch (objData.Dir) {
                            case "X1":
                                MoveStepsX(steps, -1);
                                break;
                            case "X2":
                                MoveStepsX(steps, 1);
                                break;
                            case "Y1":
                                MoveStepsY(steps, -1);
                                break;
                            case "Y2":
                                MoveStepsY(steps, 1);
                                break;
                        }
                        return;
                    }
                    ExecuteCommand(cmd);
                    break;
            }
        }, 100);
        return true;
    }, false);
}

function InvokeConfigOnSettingsWindow(command, attributes) {
    var objSend = {
        cmd: command,
        attrs: attributes
    };
    if (settingsWindow) settingsWindow.postMessage(objSend);
}

function ShowSettingsWindow() {
    HideAllPanels();
    var left = (canvasObj.width - 620);
    var top = 150;

    settingsWindow = window.open("settings.html", "settings",
        `toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=540,height=300,left=${left},top=${top}`);
}

var SystemPanels = [
    { id: "objectPanel", varName: "showObjectPanel" },
    { id: "layersPanel", varName: "showLayerPanel" },
    { id: "mapRevealPanel", varName: "showMapRevealPanel" },
    { id: "animationPanel", varName: "showAnimationPanel" },
    { id: "actionPanel", varName: "showActionPanel" },
];

function GetPanelByID(id) {
    return SystemPanels.find(x => x.id == id);
}

function HideAllPanels(except) {
    SystemPanels.forEach((obj) => {
        if (obj.id == except) return;
        window[obj.varName] = false;
        $(`#${obj.id}`).css("display", "none");
    });
}

function ShowPanel(namePanel, forceHide) {
    HideAllPanels(namePanel);
    var objPanel = GetPanelByID(namePanel);
    window[objPanel.varName] = forceHide ? false : !window[objPanel.varName];
    var showPanel = window[objPanel.varName];
    $(`#${objPanel.id}`).css("display", showPanel ? "" : "none");
}

function ShowHideLayerPanel(forceHide) {
    ShowPanel("layersPanel", forceHide);
}

function ShowHideObjectPanel(forceHide) {
    ShowPanel("objectPanel", forceHide);
}

function ShowHideMapRevealPanel(forceHide) {
    ShowPanel("mapRevealPanel", forceHide);
}

function ShowHideAnimationPanel(forceHide) {
    ShowPanel("animationPanel", forceHide);
}

function ShowHideActionPanel(forceHide) {
    ShowPanel("actionPanel", forceHide);
}

function AddValueToField(field, value, convertFunc) {
    var currVal = convertFunc($(field).val());
    currVal += value;
    $(field).val(currVal);
}

function SetBoxValue(value) {
    $("#numBox").val(value);
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
    canvasCtx.lineWidth = 1;
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

function GetImageAsBase64(img, type = "image/png") {
    var canvas = document.getElementById('saveCanvas');
    var ctx = canvas.getContext('2d');
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL(type);
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
    if (HasOpenFilePicker()) {
        OpenImageFile(callback);
        return;
    }
    $("#uploadFile").unbind("change").change(function (e) {
        var file = e.currentTarget.files[0];
        callback(file);
        $("#uploadFile").val("");
    });
    $("#uploadFile").trigger("click");
}

function LoadBackground() {
    LoadImage((file) => {
        currentImg.src = URL.createObjectURL(file);
    });
}

function LoadParallax() {
    LoadImage((file) => {
        parallaxBack = new ParallaxBackground();
        parallaxBack.initialize(URL.createObjectURL(file), () => { });
    });
}

function ConfigureCanvas() {
    canvasObj = document.getElementById("baseCanvas");
    canvasCtx = canvasObj.getContext("2d");
    canvasCtx.canvas.width = window.innerWidth;
    canvasCtx.canvas.height = window.innerHeight;
    ConfigureWindowMessage();
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
    }, { passive: true });

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
            var calc = (shftKey ? 0 : ((keyCode == Keys.Down) ? -1 : 1));
            if (calc == 0) return false;
            if (rott) {
                MoveStepsX(1, calc);
                //currentX += calc;
            } else {
                MoveStepsY(1, calc);
                //currentY += calc;
            }
            //var calc = (shftKey ? 0 : ((keyCode == Keys.Down) ? -1 : 1) * ammount);
            //if (rott) {
            //    currentX += calc;
            //} else {
            //    currentY += calc;
            //}
            return true;
            break;

        case Keys.Left:
        case Keys.Right:
            var calc = (shftKey ? 0 : ((keyCode == (rott ? Keys.Left : Keys.Right)) ? -1 : 1));
            if (rott) {
                MoveStepsY(1, calc);
            } else {
                MoveStepsX(1, calc);
            }
            //var calc = (shftKey ? 0 : ((keyCode == (rott ? Keys.Left : Keys.Right)) ? -1 : 1) * ammount);
            //if (rott) {
            //    currentY += calc;
            //} else {
            //    currentX += calc;
            //}
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
}

function CloneClassInstance(model, instance) {
    return Object.assign(Object.create(Object.getPrototypeOf(model)), instance);
}

function WriteSettings(saveAs = false) {
    var parsedLayers = [];
    currentLayerList.forEach((obj) => {
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
        Fog: getFloat("numGlobalShow"),
        Color: $("#numColor").val(),
        BackColor: $("#numColorBk").val(),
        Image: GetImageAsBase64(currentImg, 'image/jpeg'),
        Layers: JSON.stringify(parsedLayers),
        RevealColor: $("#numColorMapReveal").val(),
        Reveals: JSON.stringify(currentRevealList),
        Animations: JSON.stringify(currentAnimationList),
        AnimInstances: JSON.stringify(currentAnimationInstanceList),
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
        SaveFile(saveAs, file);
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
        OpenJsonFile(ParseAndApplySettings);
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
    currentLayerList = [];
    currentAnimationList = [];
    currentAnimationInstanceList = [];
    currentRevealList = [];
    currentLayerEdit = null;
    currentSelectedRevealItem = null;
    createMapRevealEnabled = false;
    currentAnimationInstance = null;
    currentAnimationInstanceIndex = null;
    currentSelectedAnimation = null;
    currentSelectedAnimationIdx = null;
    parallaxBack = null;

    var objInp = CurrentOpenedSettings = JSON.parse(result);
    currentX = objInp.PX;
    currentY = objInp.PY;
    $("#numBox").val(objInp.Box);
    $("#numCompX").val(objInp.X);
    $("#numCompY").val(objInp.Y);
    $("#numCompZ").val(objInp.Z);
    $("#numColor").val(objInp.Color);
    $("#numGlobalShow").val(objInp.Fog ?? 0.0);
    $("#numColorBk").val(objInp.BackColor ?? "#000000");
    $("#numColorMapReveal").val(objInp.RevealColor ?? "#ffffff");
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
        var lstLayers = objInp.Layers = JSON.parse(objInp.Layers);
        var model = new ImageLayer();
        lstLayers.forEach((obj) => {
            var nLayer = CloneClassInstance(model, obj);
            nLayer.loadImage(nLayer.img);
            currentLayerList.push(nLayer);
        });
    }
    RefreshLayerList(false);

    if (objInp.Animations) {
        var lstAnimations = objInp.Animations = JSON.parse(objInp.Animations);
        var model = new ImageAnimation();
        lstAnimations.forEach((obj) => {
            var nAnimation = CloneClassInstance(model, obj);
            currentAnimationList.push(nAnimation);
        });
    }
    RefreshAnimationList(false);

    if (objInp.AnimInstances) {
        var lstAnimations = objInp.AnimInstances = JSON.parse(objInp.AnimInstances);
        var model = new ImageAnimationInstance();
        lstAnimations.forEach((obj) => {
            var nAnimation = CloneClassInstance(model, obj);
            nAnimation.resetImage();
            currentAnimationInstanceList.push(nAnimation);
        });
    }
    RefreshAnimationInstanceList(false);

    if (objInp.Reveals) {
        var lstReveals = objInp.Reveals = JSON.parse(objInp.Reveals);
        var model = new MapReveal();
        lstReveals.forEach((obj) => {
            var nLayer = CloneClassInstance(model, obj);
            currentRevealList.push(nLayer);
        });
    }
    RefreshMapRevealList(false);

    currentImg.onload = function () {
        InvokeConfigOnSettingsWindow("LoadSettings", [objInp]);
    }
    currentImg.src = objInp.Image;
}

function RefreshSelectList(lstName, collection, propText, propValue, keepSelection = true) {
    var lstControl = $(`#${lstName}`)[0];

    var currentSelection = lstControl.selectedIndex;
    lstControl.length = 0;
    collection.forEach((obj) => {
        AddListItem(lstControl, obj[propText], obj[propValue]);
    });
    if (keepSelection) {
        lstControl.selectedIndex = currentSelection;
    } else {
        lstControl.selectedIndex = lstControl.length - 1;
    }
}

function RenderParallax() {
    if (!showAnimation) {
        if (parallaxBack) parallaxBack.draw(canvasCtx, 0);
        return;
    }
    var deltaSeconds = DeltaSeconds / parseInt(parallaxSpeed * 100);
    if (parallaxBack) parallaxBack.draw(canvasCtx, deltaSeconds);
}

function CalcProportion(prop, val, newProp) {
    return Math.floor(parseFloat((val * prop) / newProp));
}

function CreateToggle(id, target, checked, onclick, noTitle, yesTitle, cssClass = "") {
    var isCheck = checked ? `checked="checked"` : "";
    var hvOnClick = onclick ? `onclick="${onclick}"` : "";
    var html = `<label class="mc-toggle-switch ${cssClass}">
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

function CreateToggles() {
    //Reveal Items
    CreateToggle("chkShowMapRevealNames", "tdShowMapRevealNames", false, "", "Hide Names", "Show Names");
    CreateToggle("chkShowAllMapReveal", "tdShowAllMapReveal", true, "", "Hide All", "Show All");
    //Layers
    CreateToggle("chkShowAllLayer", "tdShowAllLayer", true, "UpdateSelectedLayer()", "Hide All", "Show All");
    CreateToggle("chkShowLayerOverlay", "tdShowLayerOverlay", false, "UpdateSelectedLayer()", "Hide Overlay", "Show Overlay");
    CreateToggle("chkShowLayer", "tdShowLayer", true, "UpdateSelectedLayer()", "Hide Layer", "Show Layer");
    //Settings
    CreateToggle("chkShowGrid", "divShowGrid", false, "", "Hide Grid", "Show Grid");
    CreateToggle("chkHorizontal", "divHorizontal", false, "", "Backgrnd Original", "Backgrnd Rotated");
    CreateToggle("chkShowCoords", "divShowCoords", false, "", "Hide Coordinates", "Show Coordinates");
    //Parallax
    CreateToggle("chkParallaxAnim", "divParallaxAnim", true, "", "Not Animated", "Animated");
    CreateToggle("chkParallaxRtl", "divParallaxRtl", false, "", "Left to Right", "Right to Left");
    CreateToggle("chkParallaxVertical", "divParallaxVertical", false, "", "Horizontal", "Vertical");
    CreateToggle("chkParallaxStretch", "divParallaxStretch", false, "", "Resize To Fit", "Default");
    //Animation
    CreateToggle("chkAnimationLoop", "divAnimationLoop", false, "UpdateAnimationInstance()", "On Loop", "On Demand", "min-label");

}

function CalculateDeltaSecs() {
    var now = Date.now();
    var deltaSeconds = (now - deltaTime);
    deltaTime = now;
    if (!isFinite(deltaSeconds) || isNaN(deltaSeconds)) deltaSeconds = 0;
    return deltaSeconds;
}

function ExecuteMoveX() {
    AMMOUNT = getInt("numBox");
    MoveXAmmount = AMMOUNT;
    MoveXPosition = 0.0;
    InMoveX = true;
}

function ExecuteMoveY() {
    AMMOUNT = getInt("numBox");
    MoveYAmmount = AMMOUNT;
    MoveYPosition = 0.0;
    InMoveY = true;
}

function MoveStepsX(steps, dir = 1) {
    AMMOUNT = getInt("numBox");
    MoveXAmmount = AMMOUNT * steps;
    MoveXPosition = 0.0;
    MoveXDirection = dir;
    InMoveX = true;
}

function MoveStepsY(steps, dir = 1) {
    AMMOUNT = getInt("numBox");
    MoveYAmmount = AMMOUNT * steps;
    MoveYPosition = 0.0;
    MoveYDirection = dir;
    InMoveY = true;
}

function MoveXY() {
    var deltaSeconds = DeltaSeconds / parseInt(MoveXYSpeed * MoveXYSpeedMultiplier);
    var ammountX = (MoveXAmmount * MoveXDirection);
    var ammountY = (MoveYAmmount * MoveYDirection);

    if (InMoveX) {
        if (Math.abs(MoveXPosition) < MoveXAmmount) {
            MoveXPosition += (deltaSeconds * MoveXDirection);
            MoveXPosition = MoveXDirection == 1 ? Math.min(MoveXPosition, MoveXAmmount) : Math.max(MoveXPosition, ammountX);
            if (Math.abs(MoveXPosition) == MoveXAmmount) {
                currentX += ammountX;
                MoveXPosition = 0;
                InMoveX = false;
            }
        }
    }
    if (InMoveY) {
        if (Math.abs(MoveYPosition) < MoveYAmmount) {
            MoveYPosition += (deltaSeconds * MoveYDirection);
            MoveYPosition = MoveYDirection == 1 ? Math.min(MoveYPosition, MoveYAmmount) : Math.max(MoveYPosition, ammountY);
            if (Math.abs(MoveYPosition) == MoveYAmmount) {
                currentY += ammountY;
                MoveYPosition = 0;
                InMoveY = false;
            }
        }
    }
}

function GetIframeWindow(iframe_object) {
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

function GenerateGUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid.toUpperCase();
};

function StepXY(x, y, ctrlX, ctrlY) {
    var numBox = getInt("numBox");
    var numLayerX = getInt(ctrlX) + (numBox * x);
    var numLayerY = getInt(ctrlY) + (numBox * y);
    $(`#${ctrlX}`).val(numLayerX);
    $(`#${ctrlY}`).val(numLayerY);
}

function StepBackground(x, y) {
    StepXY(x, y, "numCompX", "numCompY");
}

function StepParallax(x, y) {
    StepXY(x, y, "numParallaxX", "numParallaxY");
}