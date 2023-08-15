function RefreshAnimationList(keepSelection = true) {
    RefreshSelectList("lstAnimations", currentAnimationList, "name", "name", keepSelection);
    UpdateAnimationIndex();
    UpdateAnimationImageList();
}

function UpdateAnimationImageList() {
    currentAnimationImageList = [];
    currentAnimationList.forEach((obj, idx) => {
        var img = new Image();
        img.src = obj.b64;
        var key = obj.key;
        img.onload = () => {
            currentAnimationImageList.push({ key: key, img: img });
        };
    });
}

function UpdateAnimationIndex() {
    currentAnimationList.forEach((obj, idx) => {
        if (!obj.key) obj.key = GenerateGUID();
        obj.index = idx;
    });
}

function GetSelectedAnimation() {
    var lstAnimations = $("#lstAnimations")[0];
    var currentSelection = currentSelectedAnimationIdx = lstAnimations.selectedIndex;
    return currentAnimationList[currentSelection];
}

function GetFrameAnimation() {
    return GetIframeWindow($("#frmAnimation")[0]);
}

function AddAnimation(onload) {
    currentSelectedAnimation = null;
    var frmAnim = $("#frmAnimation");
    frmAnim.off("load");
    frmAnim.prop("src", "about:blank");
    $("#modalAnimation").modal("show");
    setTimeout(() => {
        frmAnim.on("load", () => { if (onload) onload(); });
        frmAnim.prop("src", "animation.html");
    }, 10);
}

function EditAnimation() {
    var animation = GetSelectedAnimation();
    if (!animation) return;
    AddAnimation(() => {
        currentSelectedAnimation = animation;
        var frame = GetFrameAnimation();
        frame.EditAnimation(currentSelectedAnimation);
    });
}

function DeleteAnimation() {
    var obj = GetSelectedAnimation();
    if (!obj) return;
    var del = confirm("Really want to delete this Animation?");
    if (!del) return;
    currentAnimationList.splice(currentSelectedAnimationIdx, 1);
    var lstObjs = $("#lstAnimations")[0];
    var opt = lstObjs.options[currentSelectedAnimationIdx];
    lstObjs.removeChild(opt);
    currentSelectedAnimationIdx - 1;
    currentSelectedAnimation = null;
    UpdateAnimationIndex();
}

function SaveCurrentAnimation() {
    var frame = GetFrameAnimation();
    var animation = frame.GetAnimationInfo();
    if (currentSelectedAnimation != null) {
        currentAnimationList[currentSelectedAnimationIdx] = animation;
    } else {
        currentAnimationList.push(animation);
    }
    $("#modalAnimation").modal("hide");
    $("#frmAnimation").prop("src", "about:blank");
    RefreshAnimationList(true);
}

function AddAnimationInstance() {
    var animation = GetSelectedAnimation();
    if (!animation) return;
    var numInstances = currentAnimationInstanceList.filter(x => x.animKey == animation.key).length + 1;
    var newInstance = new ImageAnimationInstance();
    newInstance.cloneFromAnimation(animation, numInstances);
    currentAnimationInstanceList.push(newInstance);
    RefreshAnimationInstanceList(false);
    ResetFrameAnimationInstanceList();
}

function ResetFrameAnimationInstanceList() {
    currentAnimationInstanceList.forEach((obj) => {
        obj.resetImage();
    });
}

function RefreshAnimationInstanceList(keepSelection = true) {
    RefreshSelectList("lstAnimationInstances", currentAnimationInstanceList, "name", "key", keepSelection);
}

function GetCurrentAnimationInstance() {
    var lstControl = $(`#lstAnimationInstances`)[0];
    currentAnimationInstanceIndex = lstControl.selectedIndex;
    currentAnimationInstance = currentAnimationInstanceList[currentAnimationInstanceIndex];
    return currentAnimationInstance;
}

function StepAnimationInstance(x, y) {
    var inst = currentAnimationInstance;
    if (!inst) return;
    StepXY(x, y, "numAnimationX", "numAnimationY");
    UpdateAnimationInstance();
}

function EditAnimationInstance() {
    var inst = GetCurrentAnimationInstance();
    $("#txtAnimName").val(inst.name);
    $("#numAnimOp").val(inst.transp);
    $("#lstFlipAnim").val(inst.flipType);
    $("#numAnimationX").val(inst.posx);
    $("#numAnimationY").val(inst.posy);
    $("#numImageResize").val(inst.frameZoom);
    $("#chkAnimationLoop").prop("checked", inst.runOnce);
}

function DeleteAnimationInstance() {
    var layer = GetCurrentAnimationInstance();
    if (!layer) return;
    var del = confirm("Really want to delete this Instance?");
    if (!del) return;
    var idx = currentAnimationInstanceIndex;
    currentAnimationInstanceList.splice(idx, 1);
    var lstLayers = $("#lstAnimationInstances")[0];
    var opt = lstLayers.options[idx1];
    lstLayers.removeChild(opt);
    $("#txtAnimName").val("");
    $("#numAnimOp").val(1);
    $("#numImageResize").val(1);
    $("#lstFlipAnim").val(0);
    $("#numAnimationX").val(0);
    $("#numAnimationY").val(0);
    $("#chkAnimationLoop").prop("checked", false);
    currentAnimationInstanceIndex = null;
    currentAnimationInstance = null;
}

function UpdateAnimationInstance() {
    var inst = currentAnimationInstance;
    if (!inst) return;
    inst.name = $("#txtAnimName").val();
    inst.transp = getFloat("numAnimOp");
    inst.flipType = getInt("lstFlipAnim");
    inst.posx = getInt("numAnimationX");
    inst.posy = getInt("numAnimationY");
    inst.runOnce = chkVal("chkAnimationLoop");
    inst.frameZoom = getFloat("numImageResize");
    if (inst.runOnce) {
        inst.reset();
    } else {
        inst.run();
        ResetFrameAnimationInstanceList();
    }
    RefreshAnimationInstanceList(true);
}

function CloneAnimation() {
    var layer = GetSelectedAnimation();
    if (!layer) return;
    var clone = confirm("Really want to clone this Animation?");
    if (!clone) return;
    var newLayer = CloneClassInstance(layer, layer);
    newLayer.name = "Clone - " + newLayer.name;
    currentAnimationList.push(newLayer);
    UpdateAnimationIndex();
    RefreshAnimationList(false);
}

function CloneAnimationInstance() {
    var layer = GetCurrentAnimationInstance();
    if (!layer) return;
    var clone = confirm("Really want to clone this Animation Instance?");
    if (!clone) return;
    var newLayer = CloneClassInstance(layer, layer);
    newLayer.name = "Clone - " + newLayer.name;
    currentAnimationInstanceList.push(newLayer);
    RefreshAnimationInstanceList(false);
}

function PlayAnimationInstance() {
    var inst = currentAnimationInstance;
    if (!inst) return;
    inst.run();
}