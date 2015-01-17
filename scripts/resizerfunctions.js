function setResizerBasedSize(left, top, index)
{
    if (index == 1)
    {
        lastPositionX = (left + 10 > parseFloat(resizePoint4.style.left)) ? (parseFloat(resizePoint4.style.left) - 10) : left;
        lastPositionY = (top + 10 > parseFloat(resizePoint4.style.top)) ? (parseFloat(resizePoint4.style.top) - 10) : top;
        resizeHelper(lastPositionX, lastPositionY, resizePoint4);
        setResizerBasedPosition(lastPositionX, lastPositionY);
    }
    else if (index == 2)
    {
        lastPositionX = (left - 10 <= parseFloat(resizePoint3.style.left)) ? (parseFloat(resizePoint3.style.left) + 10) : left;
        lastPositionY = (top + 10 > parseFloat(resizePoint3.style.top)) ? (parseFloat(resizePoint3.style.top) - 10) : top;
        //console.log(lastPositionX, lastPositionY);
        resizeHelper(lastPositionX, lastPositionY, resizePoint3);
        setResizerBasedPosition(parseFloat(resizePoint1.style.left), lastPositionY, parseFloat(resizer.style.width), parseFloat(resizer.style.height));
    }
    else if (index == 3)
    {
        lastPositionX = (left + 10 > parseFloat(resizePoint2.style.left)) ? (parseFloat(resizePoint2.style.left) - 10) : left;
        lastPositionY = (top - 10 <= parseFloat(resizePoint2.style.top)) ? (parseFloat(resizePoint2.style.top) - 10) : top;
        //console.log(lastPositionX, lastPositionY);
        resizeHelper(lastPositionX, lastPositionY, resizePoint2);
        setResizerBasedPosition(lastPositionX, parseFloat(resizePoint1.style.top), parseFloat(resizer.style.width), parseFloat(resizer.style.height));
    }
    else if (index == 4)
    {
        lastPositionX = (left - 10 <= parseFloat(resizePoint1.style.left)) ? (parseFloat(resizePoint1.style.left) + 10) : left;
        lastPositionY = (top - 10 <= parseFloat(resizePoint1.style.top)) ? (parseFloat(resizePoint1.style.top) - 10) : top;
        resizeHelper(lastPositionX, lastPositionY, resizePoint1);
        setResizerBasedPosition(parseFloat(resizePoint1.style.left), parseFloat(resizePoint1.style.top), parseFloat(resizer.style.width), parseFloat(resizer.style.height));
    }
}

function resizeHelper(left, top, resizePoint)
{
    var width = Math.abs(parseFloat(resizePoint.style.left) - left);
    
    width = width > 10 ? width : 10;
    var height = Math.abs(parseFloat(resizePoint.style.top) - top);
    
    height = height > 10 ? height : 10;
    resizer.style.width = width + "px";
    resizer.style.height = height + "px";
    selectedControlInDesigner.style.width = (width - 10) + "px";
    selectedControlInDesigner.style.height = (height - 10) + "px";
}

function setResizerBasedPosition(left, top, width, height)
{
    resizer.style.left = left + "px";
    resizer.style.top = top + "px";
    selectedControlInDesigner.style.left = (left + adjustedMargin) + "px";
    selectedControlInDesigner.style.top = (top + adjustedMargin) + "px";
    resizePoint1.style.left = left + "px";
    resizePoint1.style.top = top + "px";
    resizePoint2.style.left = (left + width) + "px";
    resizePoint2.style.top = top + "px";
    resizePoint3.style.left = left + "px";
    resizePoint3.style.top = (top + height) + "px";
    resizePoint4.style.left = (left + width) + "px";
    resizePoint4.style.top = (top + height) + "px";
}

function addResizerEvents() {
    $(resizer).mousedown(function (e) {
        if (e.which == 1)
            isDrag = true;
        resizerMouseDown = true;
        e.stopPropagation();
    });

    $(resizer).on('mousemove', function (e) {
        if (selectedControlInDesigner != null)
        {
            if (isDrag && resizerMouseDown)
            {
                setResizerBasedPosition(e.clientX - this.clientWidth / 2, e.clientY - this.clientHeight / 2, parseFloat(resizer.style.width), parseFloat(resizer.style.height));
                loadProperties();
            }
        }
        //e.stopPropagation();
    });
    $(resizer).mouseup(function (e) {
        isDrag = false;
        resizerMouseDown = false;
    });
}




var lastPositionX, lastPositionY;
function addResizePointEvents(resizePoint, index) {
    $(resizePoint).mousedown(function (e) {
        if (e.which == 1)
        {
            isResize = true;
            resizeIndex = parseInt(this.id[this.id.length - 1]);
            lastPositionX = e.clientX;
            lastPositionY = e.clientY;
        }
        e.stopPropagation();
    });

//    $(resizePoint).on('mousemove', function (e) {
//        if (selectedControlInDesigner != null)
//        {
//            if (isResize)
//            {
//                if (index == 1)
//                {
//
//                    setResizerBasedSize(e.clientX, e.clientY, 1);
//                    setResizerBasedPosition(e.clientX, e.clientY);
//                }
//                else if (index == 2)
//                {
//                    setResizerBasedSize(e.clientX, e.clientY, 2);
//                    //setResizerBasedPosition(e.clientX - this.clientWidth / 2  - (resizer.style.width - 4), e.clientY - this.clientHeight / 2);
//                }
//                else if (index == 3)
//                {
//                    setResizerBasedSize(e.clientX, e.clientY, 3);
//                    //setResizerBasedPosition(e.clientX - this.clientWidth / 2, e.clientY - this.clientHeight / 2  - (resizer.style.height - 4));
//                }
//                else if (index == 4)
//                {
//                    setResizerBasedSize(e.clientX, e.clientY, 4);
//                    //setResizerBasedPosition(e.clientX - this.clientWidth / 2  - (resizer.style.width - 4), e.clientY - this.clientHeight / 2  - (resizer.style.width - 4));
//                }
//                loadProperties();
//            }
//        }
//        e.stopPropagation();
//    });
    $(resizePoint).mouseup(function (e) {
        isResize = false;
        resizeIndex = 0;
        lastPositionX = undefined;
        lastPositionY = undefined;
    });
}
function removeResizerEvents(resizeControl) {
    $(resizeControl).off();
}


