function AddLayer() {
    LoadImage((file) => {
        var newLayer = new ImageLayer();
        newLayer.initialize(URL.createObjectURL(file), () => {
            newLayer.name = file.name;
            newLayer.index = $("#lstLayers").prop("length");
            currentLayerList.push(newLayer);
            RefreshLayerList(false);
            EditLayer(newLayer);
        });
    });
}

var currentRevealLayer = null;
var currentRevealInterval = null;
var currCmdRevealShow = false;
var startRevealVal = 0.0;

function RevealLayer(idx) {
    currentRevealLayer = currentLayerList[idx];
    currCmdRevealShow = false;
    startRevealVal = 0.0;
    currentRevealLayer.transp = 0.0;
    currentRevealLayer.visible = true;
    var currentRevealInterval = setInterval(() => {
        startRevealVal = Math.min(1, startRevealVal + 0.1);
        currentRevealLayer.transp = startRevealVal;
        if (startRevealVal == 1) {
            clearInterval(currentRevealInterval);
        }
    }, 50);
    
}

function SelectCurrentLayer() {
    var layer = GetSelectedLayer();
    EditLayer(layer);
}

function StepCurrentLayer(x, y) {
    if (currentLayerEdit != null) {
        var numBox = getInt("numBox");
        var numLayerX = getInt("numLayerX") + (numBox * x);
        var numLayerY = getInt("numLayerY") + (numBox * y);
        $("#numLayerX").val(numLayerX);
        $("#numLayerY").val(numLayerY);
        UpdateSelectedLayer();
    }
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
    currentLayerList.forEach((obj, idx) => {
        obj.index = idx;
    });
}

function GetSelectedLayer() {
    var lstLayers = $("#lstLayers")[0];
    var currentSelection = lstLayers.selectedIndex;
    return currentLayerList[currentSelection];
}

function CloneLayer() {
    var layer = GetSelectedLayer();
    if (!layer) return;
    var clone = confirm("Really want to clone this layer?");
    if (!clone) return;
    var newLayer = CloneClassInstance(layer, layer);
    newLayer.name = "Clone - " + newLayer.name;
    currentLayerList.push(newLayer);
    UpdateLayerIndex();
    RefreshLayerList(false);
    EditLayer(newLayer);
}

function DeleteLayer() {
    var layer = GetSelectedLayer();
    if (!layer) return;
    var del = confirm("Really want to delete this layer?");
    if (!del) return;
    currentLayerList.splice(layer.index, 1);
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
        [currentLayerList[idx], currentLayerList[nxt]] = [currentLayerList[nxt], currentLayerList[idx]];
        UpdateLayerIndex();
        lstLayers.removeChild(opt);
        lstLayers.insertBefore(opt, opB);
    }
    //requestAnimationFrame(ResetCanvas);
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
        [currentLayerList[idx], currentLayerList[nxt]] = [currentLayerList[nxt], currentLayerList[idx]];
        UpdateLayerIndex();
    }
    //requestAnimationFrame(ResetCanvas);
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
        $("#lstLayers")[0].options[currentLayerEdit.index].text = currentLayerEdit.name;
    }
}

function RefreshLayerList(keepSelection = true) {
    RefreshSelectList("lstLayers", currentLayerList, "name", "index", keepSelection);
}