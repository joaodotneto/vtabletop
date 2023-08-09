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