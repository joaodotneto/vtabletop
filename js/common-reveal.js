function AddRevealItem() {
    CreateRevealItemAlert();
    createMapRevealEnabled = true;
    currentSelectedRevealItem = null;
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
    } else {
        var newReveal = new MapReveal();
        newReveal.name = mapRevealName;
        newReveal.steps = [...currentRevealSteps];
        newReveal.proportion = proportion;
        currentRevealList.push(newReveal);
    }
    currentSelectedRevealItem = null;
    CancelMapRevealCreation();
    RefreshMapRevealList(keepSelected);
    event.preventDefault();
}

function RefreshMapRevealList(keepSelection = true) {
    RefreshSelectList("lstMapReveals", currentRevealList, "name", "name", keepSelection);
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

function ReorderRevealList() {
    var newRevealList = [];
    [...$("#lstMapReveals").children()].map(x => x.value).forEach((y, idx) => {
        var obj = currentRevealList.find(x => x.name == y);
        obj.index = idx;
        newRevealList.push(obj);
    });
    currentRevealList = newRevealList;
}

function MoverRevealUp() {
    var lstLayers = $("#lstMapReveals")[0];
    var idx = lstLayers.selectedIndex;
    if (idx > 0) {
        var nxt = idx - 1;
        var opt = lstLayers.options[idx];
        var opB = lstLayers.options[nxt];
        lstLayers.removeChild(opt);
        lstLayers.insertBefore(opt, opB);
    }
    ReorderRevealList();
}

function MoverRevealDown() {
    var lstLayers = $("#lstMapReveals")[0];
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
    }
    ReorderRevealList();
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
