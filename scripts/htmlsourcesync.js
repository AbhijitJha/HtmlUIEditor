// requires variables.js, resizer.js, 

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
