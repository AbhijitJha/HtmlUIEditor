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



