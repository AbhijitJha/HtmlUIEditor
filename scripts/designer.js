//required variables.js, propertybox.js, utility.js
//

//Designer Functions
$("#designerDiv").mousemove(function (e) {

    if (selectedControlInDesigner != null)
    {
        if (isResize)
        {
            setResizerBasedSize(e.clientX, e.clientY, resizeIndex);            
            loadProperties();
        }
    }
});
$("#designerDiv").mouseup(function (e) {

    if (selectedControlInDesigner != null)
    {
        if (isResize)
        {
            isResize = false;
            resizeIndex = 0;
            lastPositionX = undefined;
            lastPositionY = undefined;
            return;
        }

        if (isDrag)
        {
            setResizerBasedPosition(e.clientX - 7, e.clientY - 7, parseFloat(resizer.style.width), parseFloat(resizer.style.height));
            loadProperties();
            e.stopPropagation();
            isDrag = false;
            resizerMouseDown = false;
            return;
        }
    }

    isDrag = false;
    resizerMouseDown = false;
    var element = null;
    if (selectedToolBoxButtonID == "ButtonTool") {
        var element = createButton("btnDesign" + count, "Button" + count, null)
        if (controlBelowMouseInDesigner)
            $(element).insertAfter(controlBelowMouseInDesigner);
        else
            document.getElementById("designerDiv").appendChild(element);
        count++;
    }
    else if (selectedToolBoxButtonID == "TextTool") {
        element = createTextBox("txtDesign" + count, "TextBox" + count, null)
        //buttonnode.attachEvent('OnClick',Hi());
        if (controlBelowMouseInDesigner)
            $(element).insertAfter(controlBelowMouseInDesigner);
        else
            document.getElementById("designerDiv").appendChild(element);
        count++;
    }
    else if (selectedToolBoxButtonID == "TableTool") {
        element = createTable("tblDesign" + count, 3, 3)
        //buttonnode.attachEvent('OnClick',Hi());
        if (controlBelowMouseInDesigner)
            $(element).insertAfter(controlBelowMouseInDesigner);
        else
            document.getElementById("designerDiv").appendChild(element);
        count++;
    }
    selectedToolBoxButtonID = "";
    unselectToolboxControl();

    if (element) {
        $(element).mouseenter(function () {
            controlBelowMouseInDesigner = this;
        });
        $(element).mouseleave(function () {
            controlBelowMouseInDesigner = null;
        });
        $(element).mousedown(function (e) {
            if (!resizerMouseDown)
            {
                selectedControlInDesigner = this;
                loadProperties();
                if (e.which == 1)
                    isDrag = true;
                destroyResizer();
                createResizer(e);
            }
            resizerMouseDown = false;
            e.stopPropagation();
            try {
                $(selectedControlInDesigner).focus();
            } catch (e) {
            }
        });
        $(element).mouseup(function (e) {
            isDrag = false;
            e.stopPropagation();
        });

        try {
            $(element).focus();
        } catch (e) {
        }
    }
});




