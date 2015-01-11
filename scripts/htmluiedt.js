
(function () {
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

//rectangular wrapper around selected control in designer for resizing and moving
    var resizer = null;

//resizer mouse down
    var resizerMouseDown = false;

    var toolTypeAndCount = [
        {type: 'ButtonTool', count: 0},
        {type: 'TextTool', count: 0}
    ];

    function highlightSelectedToolboxControl(ctrl)
    {
        $('#tblToolBox input').each(function () {
            $(this.parentNode).removeClass("toolboxSelectedControl");
        });
        $(ctrl.parentNode).addClass("toolboxSelectedControl");
    }

    function unselectToolboxControl()
    {
        $('#tblToolBox input').each(function () {
            $(this.parentNode).removeClass("toolboxSelectedControl");
        });
    }

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


// Synchronization Functions

    $("#SyncTool").mousedown(function () {

        selectedToolBoxButtonID = "";
        selectedControlInDesigner = null;
        $("#txtHtmlSource")[0].value = $("#designerDiv").html();
        //$('#tblProperty').html(s);
    });

    $("#SyncToolUp").mousedown(function () {

        selectedToolBoxButtonID = "";
        selectedControlInDesigner = null;
        resizer = null;
        $("#designerDiv").html($("#txtHtmlSource")[0].value);
        if ($('#divResizer').length > 0)
            $('#divResizer')[0].parentNode.removeChild($('#divResizer')[0]);
        $("#txtHtmlSource")[0].value = $("#designerDiv").html();
        $('#tblProperty').html("");
        loadEvents();
    });

//Designer Functions

    $("#designerDiv").mouseup(function (e) {

        if (selectedControlInDesigner != null)
        {
            if (isDrag)
            {
                resizer.style.left = (e.clientX) + "px";
                resizer.style.top = (e.clientY) + "px";
                selectedControlInDesigner.style.left = (e.clientX) + "px";
                selectedControlInDesigner.style.top = (e.clientY) + "px";
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

    function loadEvents() {
        $('#designerDiv input').each(function () {

            $(this).mouseenter(function () {
                controlBelowMouseInDesigner = this;
            });
            $(this).mouseleave(function () {
                controlBelowMouseInDesigner = null;
            });
            $(this).mousedown(function (e) {
                if (!resizerMouseDown) {
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
            $(this).mouseup(function (e) {
                isDrag = false;
                e.stopPropagation();
            });

            try {
                $(this).focus();
            } catch (e) {
            }

        });
    }

//Properties Box Functions

    // Contains list of properties and sub properties to show in properties window
    var arrProperties = [
        {
            prop: 'value',
            isParent: false,
            getProp: function(ctrl){
                return ctrl.value;
            }
        },
        {
            prop: 'style',
            isParent: false,
            getProp: function(ctrl){
                return $(ctrl).attr('style');
            }
        },
        {
            prop: 'width',
            isParent: false,
            getProp: function(ctrl){
                return ctrl.offsetWidth || '';
            }
        },
        {
            prop: 'height',
            isParent: false,
            getProp: function(ctrl){
                return ctrl.offsetHeight || '';
            }
        },
        {
            prop: 'display',
            isParent: false,
            getProp: function(ctrl){
                return ctrl.style.display;
            }
        },
        {
            prop: 'left',
            isParent: false,
            getProp: function(ctrl){
                return ctrl.style.left;
            }
        }
    ];

    function loadProperties() {
        var etype = $(selectedControlInDesigner).attr('type');
        if (etype == 'text') {
            var s = '';
            for (var i = 0; i < arrProperties.length; i++) {
                s += "<tr>";
                s += "<td style='width=40%;'>";
                s += "<span id='" + arrProperties[i].prop + "zzzp" + i + "' >" + arrProperties[i].prop + "</span>";
                s += "</td>";
                s += "<td style='width=60%;'>";
                s += "<input id='" + arrProperties[i].prop + "zzzv" + i + "' type='text' value='" + arrProperties[i].getProp(selectedControlInDesigner) + "'></input>";
                s += "</td>";
                s += "</tr>";
            }
            $('#tblProperty').html(s);
            $('#tblProperty tr td input').change(propChange);
        }
        else if (etype == 'button') {
            var s = '';
            for (var i = 0; i < arrProperties.length; i++) {
                s += "<tr>";
                s += "<td style='width=40%;'>";
                s += "<span id='" + arrProperties[i].prop + "zzzp" + i + "' >" + arrProperties[i].prop + "</span>";
                s += "</td>";
                s += "<td style='width=60%;'>";
                s += "<input id='" + arrProperties[i].prop + "zzzv" + i + "' type='text' value='" + arrProperties[i].getProp(selectedControlInDesigner) + "'></input>";
                s += "</td>";
                s += "</tr>";
            }
        }
        $('#tblProperty').html(s);
        $('#tblProperty tr td input').change(propChange);
    }


    function propChange() {
        $(selectedControlInDesigner).attr(this.id.split('zzzv')[0], this.value);
    }

//Resizer Functions   

    function createResizer(e)
    {
        resizer = document.createElement('div');
        resizer.setAttribute('id', 'divResizer');
        resizer.setAttribute('style', 'filter: alpha(opacity=10);opacity: 0.1;z-index:111;position:absolute;left:' + (selectedControlInDesigner.offsetLeft - 5) + "px;top:" + (selectedControlInDesigner.offsetTop - 5) + "px;width:" + (selectedControlInDesigner.clientWidth + 10) + "px;height:" + (selectedControlInDesigner.clientHeight + 10) + "px; border:4px solid #111;background-color:#fff;");
        document.getElementById("designerDiv").appendChild(resizer);

        $(resizer).mousedown(function (e) {
            if (e.which == 1)
                isDrag = true;
            resizerMouseDown = true;
        });

        $(resizer).on('mousemove', function (e) {
            if (selectedControlInDesigner != null)
            {
                if (isDrag && resizerMouseDown)
                {
                    this.style.left = (e.clientX - this.clientWidth / 2) + "px";
                    this.style.top = (e.clientY - this.clientHeight / 2) + "px";
                    selectedControlInDesigner.style.left = (e.clientX - this.clientWidth / 2) + "px";
                    selectedControlInDesigner.style.top = (e.clientY - this.clientHeight / 2) + "px";
                    loadProperties();
                }
            }
            e.stopPropagation();
        });
        $(resizer).mouseup(function (e) {
            isDrag = false;
            resizerMouseDown = false;
        });
    }

    function destroyResizer()
    {
        if (resizer != null)
            document.getElementById("designerDiv").removeChild(resizer);
    }

//Element Functions

    function createButton(bid, bval, bonc) {
        var buttonnode = document.createElement('input');
        buttonnode.setAttribute('type', 'button');
        buttonnode.setAttribute('id', bid);
        buttonnode.setAttribute('value', bval);
        buttonnode.setAttribute('style', 'position:absolute;');
        return buttonnode;
    }

    function createTextBox(bid, bval, bonc) {
        var textboxnode = document.createElement('input');
        textboxnode.setAttribute('type', 'text');
        textboxnode.setAttribute('id', bid);
        textboxnode.setAttribute('value', bval);
        textboxnode.setAttribute('style', 'position:absolute;');
        return textboxnode;
    }

    function createTable(bid, rows, columns) {
        var textboxnode = document.createElement('table');
        var st = "";
        for (i = 0; i < rows; i++) {
            var row = textboxnode.insertRow(i);
            for (j = 0; j < columns; j++) {
                var cell = row.insertCell(j);
                cell.style.border = "1px solid #000";
            }
        }
        textboxnode.setAttribute('style', 'position:absolute;border:2px solid #000;background-color:#fff;width:100px;height:100px;');
        return textboxnode;
    }


})();




//-------------------------------------





//                $(element).on('mousemove',function (e) {
//                    //alert(this.id);
//                    if(selectedControlInDesigner != null)
//                    {
//                        if(selectedControlInDesigner.id==this.id && isDrag)
//                        {
//                            this.style.left=(e.clientX-this.clientWidth/2) +"px";
//                            this.style.top=(e.clientY-this.clientHeight/2) +"px";
//                            loadProperties();
//                        }
//                    }
//                });

//alert(e.pageX +  "  "  +  e.offsetX + "  " + this.offsetLeft);
//                $(element).on('mousemove',function (e) {
//                    //alert(this.id);
//                    if(selectedControlInDesigner != null)
//                    {
//                        if(selectedControlInDesigner.id==this.id && isDrag)
//                        {
//                            this.style.left=(e.clientX-this.clientWidth/2) +"px";
//                            this.style.top=(e.clientY-this.clientHeight/2) +"px";
//                            loadProperties();
//                        }
//                    }
//                });

//alert(e.pageX +  "  "  +  e.offsetX + "  " + this.offsetLeft);


//var t_array = $.map(json_array, function(item) {
//    return item.text;
//});

//var t_array = [];
//for (var i=0; i< json_array.length; i++)
//t_array.push(json_array[i].text);

//var t_array = [];
//$.each(json_array,function(i,o) {
//  t_array.push(o.text);
//})
