$("#tblShowHideProperty .btnShowHideProperty").click(function () {
    if (this.value == '>')
    {
        $('#tblProperty')[0].style.display = 'none';
        $('.propertyHeader')[0].style.display = 'none';
        $('#tblProperty')[0].parentNode.className = 'tdPropertyRootCollapsed';
        this.value = '<';
    }
    else
    {
        $('#tblProperty')[0].style.display = 'block';
        $('.propertyHeader')[0].style.display = 'block';
        $('#tblProperty')[0].parentNode.className = 'tdPropertyRoot';
        this.value = '>';
    }
});
$("#tblShowHideToolBox .btnShowHideToolBox").click(function () {
    if (this.value == '<')
    {
        $('#tblToolBox')[0].style.display = 'none';
        $('.toolBoxHeader')[0].style.display = 'none';
        $('#tblToolBox')[0].parentNode.className = 'tdToolBoxRootCollapsed';
        this.value = '>';
    }
    else
    {
        $('#tblToolBox')[0].style.display = 'block';
        $('.toolBoxHeader')[0].style.display = 'block';
        $('#tblToolBox')[0].parentNode.className = 'tdToolBoxRoot';
        this.value = '<';
    }
});
$(".btnShowHideSource").click(function () {
    if (this.value == '\\/')
    {
        $('#txtHtmlSource')[0].style.display = 'none';
        $('#SyncTool')[0].style.display = 'none';
        $('#SyncToolUp')[0].style.display = 'none';
        $('.tblHtmlSource')[0].parentNode.className = 'tdHtmlSourceRootCollapsed';
        this.value = '/\\';
    }
    else
    {
        $('#txtHtmlSource')[0].style.display = 'block';
        $('#SyncTool')[0].style.display = 'block';
        $('#SyncToolUp')[0].style.display = 'block';
        $('.tblHtmlSource')[0].parentNode.className = 'tdHtmlSourceRoot';
        this.value = '\\/';
    }
});

