function ExecuteStart() {
    $("input[type=number]").blur(function () {
        var self = $(this);
        val = parseFloat(self.val());
        min = parseFloat(self.attr("min"));
        max = parseFloat(self.attr("max"));
        if (val > max) {
            self.val(max);
        } else if (val < min) {
            self.val(min);
        }
    });
    CreateToggle("chkShowGrid", "divShowGrid", true, "GetSettingsAndSend()", "Hide Grid", "Show Grid");
    CreateToggle("chkShowCoords", "divShowCoords", false, "GetSettingsAndSend()", "Hide Coordinates", "Show Coordinates");
    CreateToggle("chkParallaxAnim", "divParallaxAnim", true, "GetSettingsAndSend()", "Par. Not Animated", "Par. Animated");
    CreateToggle("chkShowAllLayer", "divShowAllLayer", true, "GetSettingsAndSend()", "Hide All Layers", "Show All Layers");
    CreateToggle("chkShowMapRevealNames", "divShowMapRevealNames", false, "GetSettingsAndSend()", "Hide Rev. Names", "Show Rev. Names");
    CreateToggle("chkShowAllMapReveal", "divShowAllMapReveal", true, "GetSettingsAndSend()", "Hide All Rev.", "Show All Rev.");

    window.addEventListener("message", (event) => {
        var objParameters = event.data;
        setTimeout(() => {
            var attrs = objParameters.attrs;
            var cmd = objParameters.cmd;
            switch (cmd) {
                case "LoadSettings":
                    SetLocalSettings(attrs[0]);
                    break;
            }
        }, 100);
        return true;
    }, false);
}

function SetLayer(idx, chkLayer, chkOverlay) {
    SendToParent("UpdateLayer", [idx, chkVal(chkLayer), chkVal(chkOverlay)]);
}

function SetAnimation(idx, chk) {
    SendToParent("SetAnimation", [idx, chkVal(chk)]);
}

function RunAnimation(idx) {
    SendToParent("RunAnimation", [idx]);
}

function SetReveal(idx, chk) {
    SendToParent("UpdateReveal", [idx, chkVal(chk)]);
}

function RevealLayer(idx) {
    $(`#chkShowLayer${idx}`).prop("checked", true);
    SendToParent("RevealLayer", [idx]);
}

function SetLocalSettings(objInp) {
    $("#numGlobalShow").val(objInp.Fog ?? 0.0);
    $("#chkShowGrid").prop("checked", objInp.G);
    $("#chkShowCoords").prop("checked", (objInp.Coords ?? false));
    if (objInp.Parallax) {
        var objP = objInp.Parallax;
        $("#chkParallaxAnim").prop("checked", objP.Anim);
    }

    if (objInp.Layers) {
        var tbHtml = ``;
        objInp.Layers.forEach((obj, idx) => {
            tbHtml += `<tr>
                                <td style="padding-left: 5px;font-weight: bold">${obj.name}</td>
                                <td style="text-align: center;"><input type="checkbox" ${(obj.visible ? "checked" : "")}
                                    id="chkShowLayer${idx}" onclick="SetLayer('${idx}', 'chkShowLayer${idx}', 'chkShowOVerlay${idx}')" /></td>
                                <td style="text-align: center;"><input type="checkbox" ${(obj.showOverlay ? "checked" : "")}
                                    id="chkShowOVerlay${idx}" onclick="SetLayer('${idx}', 'chkShowLayer${idx}', 'chkShowOVerlay${idx}')" /></td>
                                <td style="text-align: center;"><input type="button" class="btn btn-success btn-sm" value="Reveal"
                                    id="btnRevealLayer${idx}" onclick="RevealLayer('${idx}')" /></td>
                            </tr>`;
        });
        $("#tbLayers").html(tbHtml);
    }

    if (objInp.Reveals) {
        var tbHtml = ``;
        objInp.Reveals.forEach((obj, idx) => {
            tbHtml += `<tr>
                                <td style="padding-left: 5px;font-weight: bold">${obj.name}</td>
                                <td style="text-align: center;"><input type="checkbox" ${(obj.visible ? "checked" : "")}
                                    id="chkReveal${idx}" onclick="SetReveal('${idx}', 'chkReveal${idx}')" /></td>
                            </tr>`;
        });
        $("#tbReveals").html(tbHtml);
    }

    if (objInp.AnimInstances) {
        var tbHtml = ``;
        objInp.AnimInstances.forEach((obj, idx) => {
            tbHtml += `<tr>
                                <td style="padding-left: 5px;font-weight: bold">${obj.name}</td>
                                <td style="text-align: center;"><input type="checkbox" ${(obj.visible ? "checked" : "")} ${(obj.runOnce ? "disabled" : "")}
                                    id="chkAnimation${idx}" name="chkAnimation" onclick="SetAnimation('${idx}', 'chkAnimation${idx}')" /></td>
                                <td style="text-align: center;"><input type="button" class="btn btn-success btn-sm ${(obj.runOnce ? "" : "disabled")}" value="Run"
                                    id="btnRunAnimation${idx}" onclick="RunAnimation('${idx}')" /></td>
                            </tr>`;
        });
        $("#tbAnimations").html(tbHtml);
    }
}

function GetSettingsData() {
    return {
        G: chkVal("chkShowGrid"),
        Coords: chkVal("chkShowCoords"),
        ShowLayers: chkVal("chkShowAllLayer"),
        ShowRevNames: chkVal("chkShowMapRevealNames"),
        ShowReveals: chkVal("chkShowAllMapReveal"),
        Parallax: {
            Anim: chkVal("chkParallaxAnim")
        }
    };
}

function GetSettingsAndSend() {
    var objData = GetSettingsData();
    SendToParent("UpdateInfo", [objData]);
}

function SendToParent(command, attributes) {
    var objSend = {
        cmd: command,
        attrs: attributes
    };
    window.opener.postMessage(objSend);
}

var currInterval = null;
var currCmdShow = false;
var startShowVal = 0.0;
function ExecuteShowMap(show) {
    var stsVal = getFloat("numGlobalShow");
    var timVal = getFloat("numGlobalShowStep");
    currCmdShow = show;
    startShowVal = stsVal;
    currInterval = setInterval(() => {
        startShowVal = currCmdShow ? Math.max(0, startShowVal - 0.1) : Math.min(1, startShowVal + 0.1);
        console.log(startShowVal);
        $("#numGlobalShow").val(startShowVal);
        SendToParent("ChangeFog", [startShowVal]);
        var indFinish = currCmdShow ? 0 : 1;
        if (startShowVal == indFinish) {
            clearInterval(currInterval);
        }
    }, timVal * 100);
}

function SendChangeFog() {
    var stsVal = getFloat("numGlobalShow");
    SendToParent("ChangeFog", [stsVal]);
}

function ReloadSettings() {
    SendToParent("ReloadSettings", []);
}

function ReadLocalSettings() {
    if (HasOpenFilePicker()) {
        OpenJsonFile((result) => {
            SendToParent("OpenFile", [result]);
        });
        return;
    }
    alert("Open File Unavailable");
}

function CheckAllAnimations(check) {
    var isCheck = check.checked;
    $('[name="chkAnimation"]').prop("checked", isCheck).trigger("click");
}

function ExecuteCommand(cmd) {
    if (parseInt(cmd) == 12) {
        var objData = {
            Val: $("#numDisplacement").val(),
            Dir: $("#ddlDisplacement").val()
        };
        SendToParent("ExecuteCommand", [cmd, objData]);
        return;
    }
    SendToParent("ExecuteCommand", [cmd]);
}