//requires variables.js, controlpropertylist.js
//
//Properties Box Functions

 
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


