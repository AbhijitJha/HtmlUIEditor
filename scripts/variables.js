// variable definitions

//string id of the toolbox button selected
var selectedToolBoxButtonID = "";

//control on which mouse is hovering in designer div
var controlBelowMouseInDesigner = null;

//currently selected control in designer
var selectedControlInDesigner = null;

var count = 1;

//shows whether selected control is being dragged(within designer)
var isDrag = false;

//shows whether selected control is being resized(within designer)
var isResize = false, resizeIndex=0;

//rectangular wrapper around selected control in designer for resizing and moving
var resizer = null;

var resizePoint1=null;
var resizePoint2=null;
var resizePoint3=null;
var resizePoint4=null;

//resizer mouse down
var resizerMouseDown = false;

var toolTypeAndCount = [
    {type: 'ButtonTool', count: 0},
    {type: 'TextTool', count: 0}
];


var resizerControlMargin = 5;
var resizerBorderThickness = 4;
var adjustedMargin = resizerControlMargin + resizerBorderThickness / 2;



