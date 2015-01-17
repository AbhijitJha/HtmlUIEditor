//requires utility.js

//Toolbox Functions       

    $("#PointerTool").mousedown(function () {
        selectedToolBoxButtonID = "";
        selectedControlInDesigner = null;
        highlightSelectedToolboxControl(this);
    });

    $("#ButtonTool").mousedown(function () {
        selectedToolBoxButtonID = this.id.toString();
        highlightSelectedToolboxControl(this);
        selectedControlInDesigner = null;
    });

    $("#ButtonTool").mouseup(function () {
        selectedToolBoxButtonID = "";
        selectedControlInDesigner = null;
        unselectToolboxControl();
    });

    $("#TextTool").mousedown(function () {
        highlightSelectedToolboxControl(this);
        selectedToolBoxButtonID = this.id.toString();
        selectedControlInDesigner = null;
    });

    $("#TextTool").mouseup(function () {
        selectedToolBoxButtonID = "";
        selectedControlInDesigner = null;
        unselectToolboxControl();
    });

    $("#TableTool").mousedown(function () {
        highlightSelectedToolboxControl(this);
        selectedToolBoxButtonID = this.id.toString();
        selectedControlInDesigner = null;
    });


