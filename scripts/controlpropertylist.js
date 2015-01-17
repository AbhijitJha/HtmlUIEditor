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


