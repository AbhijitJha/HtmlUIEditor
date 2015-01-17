//requires variables.js, propertybox.js
//Resizer Functions   

function createResizer(e)
{
    var left=selectedControlInDesigner.offsetLeft - adjustedMargin;
    var top=selectedControlInDesigner.offsetTop - adjustedMargin;
    var width=selectedControlInDesigner.clientWidth + 10;
    var height=selectedControlInDesigner.clientHeight + 10;
    
    var designerDiv = document.getElementById("designerDiv");
    resizer = createResizeControl(left, top, width, height);
    designerDiv.appendChild(resizer);

    resizePoint1 = createResizePoint(1, left, top);
    resizePoint2 = createResizePoint(2, left + width, top);
    resizePoint3 = createResizePoint(3, left, top + height);
    resizePoint4 = createResizePoint(4, left + width, top + height);
    designerDiv.appendChild(resizePoint1);
    designerDiv.appendChild(resizePoint2);
    designerDiv.appendChild(resizePoint3);
    designerDiv.appendChild(resizePoint4);

    addResizerEvents();
    addResizePointEvents(resizePoint1);
    addResizePointEvents(resizePoint2);
    addResizePointEvents(resizePoint3);
    addResizePointEvents(resizePoint4);
}



function destroyResizer()
{
    if (resizer != null)
    {
        removeResizerEvents(resizer);
        removeResizerEvents(resizePoint1);
        removeResizerEvents(resizePoint2);
        removeResizerEvents(resizePoint3);
        removeResizerEvents(resizePoint4);
        document.getElementById("designerDiv").removeChild(resizer);
        document.getElementById("designerDiv").removeChild(resizePoint1);
        document.getElementById("designerDiv").removeChild(resizePoint2);
        document.getElementById("designerDiv").removeChild(resizePoint3);
        document.getElementById("designerDiv").removeChild(resizePoint4);
    }
}

function createResizeControl(left, top, width, height)
{
    var resizeControl = document.createElement('div');
    resizeControl.setAttribute('id', 'divResizer');
    resizeControl.setAttribute('class', 'resizer');
    resizeControl.setAttribute('style', 'left:' + left + "px;top:" + top + "px;width:" + width + "px;height:" + height + "px;");
    return resizeControl;
}

function createResizePoint(index, left, top)
{
    var resizePoint = document.createElement('div');
    resizePoint.setAttribute('id', 'divResizerPoint' + index);
    resizePoint.setAttribute('class', 'resizerPoint');
    resizePoint.setAttribute('style', 'left:' + left + "px;top:" + top + "px;");
    return resizePoint;
}




