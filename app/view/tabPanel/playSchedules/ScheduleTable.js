Ext.define('TheaterTool.view.tabPanel.playSchedules.ScheduleTable', {
    extend: 'Ext.grid.Panel',
    requires:[
    'Ext.grid.column.Action',
    'TheaterTool.model.Theaterakte',
    'Ext.ux.grid.SubTable'],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    /*style: {
    borderRight: '5px solid #f4f4f4'
    },*/
    flex: 1.7,
    sortableColumns: false,
    
    border: false,
    store: null,
    rowLines: true,
    columnLines: true,
    tablePanel: null,
    
    detailsColumn: null,
    lineList: null,
    workDetailsColumn: null,
    inhaltColumn: null,
    //selType: 'cellmodel',
    
    //reserveScrollbar: true,
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.Theaterakte',
            data:[]
        });
        
        if (me.lineList !== 'undefined') {
            // console.log(me.lineList);
            
            
            
            // var workNumber = 0;
            // var personsNumber = 0;
            
            for (i = 0; i < me.lineList.rows.length; i++) {
                var one_row = me.lineList.rows[i];
                var presentationText = '';
                var workDate = one_row.cells[0];
                var workObject = one_row.cells[1];
                /*for(j = 0; j < workObject.inhalt.length; j++){
                var tail = workObject.inhalt[j];
                //console.log(tail.work);
                if(typeof tail.celltext !== 'undefined'){
                presentationText = presentationText + tail.celltext+' ';
                
                }
                else if(typeof tail.work !== 'undefined'){
                
                presentationText = presentationText + tail.work[0]+' ';
                if(tail.work[1] !== ''){
                
                presentationText = presentationText + /\*'<img src="resources/images/Door-24.png" style="width:15px;height:14px;vertical-align:middle;">'*\/
                '<img onclick="openOnImageClick()" class="workhtml" src="resources/images/Door-24.png" id="' + tail.work[1] + '" style="width:15px;height:14px;vertical-align:middle;">'+' ';
                
                
                }
                }
                else if(typeof tail.workpersons !== 'undefined'){
                
                presentationText = presentationText + tail.workpersons[0]+' ';
                if(tail.workpersons[1] !== ''){
                presentationText = presentationText + '<img class="personhtml" src="resources/images/Door-24.png" id="' + tail.workpersons[1] + '" style="width:15px;height:14px;vertical-align:middle;">'+' ';
                }
                }
                
                }*/
                
                var one_line = Ext.create('TheaterTool.model.Theaterakte', {
                    works: workObject,
                    // workKey: workKey,
                    // details1: oneColumn.inhalt[0],
                    date: workDate.date
                    // persons: personObject
                });
                me.store.add(one_line);
                //}
            }
        }
        
        
        var objs = new Array();
        
        
        var tableColumns = -1;
        
        var colDate = Ext.create('Ext.grid.column.Column', {
            xtype: 'gridcolumn',
            header: 'Datum',
            flex: 0.15,
            menuDisabled: true,
            dataIndex: 'date'
        });
        tableColumns = tableColumns + 1;
        objs[tableColumns] = colDate;
        
        var col_inhalt = this.createColumn('Vorstellungen', 'resources/images/Note-15.png', 'works');
        tableColumns = tableColumns + 1;
        objs[tableColumns] = col_inhalt;
        
        /* var colTest = Ext.create('Ext.grid.column.Column', {
        xtype: 'gridcolumn',
        header: 'Test',
        flex: 1,
        menuDisabled: true,
        //dataIndex: 'works',
        /\*getClass: function(val, metadata, record) {
        console.log('renderer');
        console.log(val);
        console.log(metadata);
        console.log(record);
        return
        '<div style="float:right; font-size: 13px; line-height: 1em;">'
        + 'Hey!'
        + '</div>'
        }*\/
        layout: 'fit',
        items: [{
        
        text: 'blabla',
        dataIndex: 'works'
        //xtype: 'actioncolumn',
        /\*icon: 'resources/images/BookBlau-16.png',
        getClass: function(val, metadata, record) {
        console.log('renderer');
        console.log(val);
        console.log(metadata);
        console.log(record);
        return
        '<div style="float:right; font-size: 13px; line-height: 1em;">'
        + 'Hey!'
        + '</div>'
        },
        handler: function(view, rowIndex, colIndex, item, e, record, row) {
        console.log('handler');
        this.fireEvent('itemClick', view, rowIndex, colIndex, item, e, record, row, 'edit');
        }*\/
        }]
        });
        tableColumns = tableColumns + 1;
        objs[tableColumns] = colTest;
         */
        
        /*  var col = Ext.create('Ext.grid.column.Action', {
        xtype: 'actioncolumn',
        header: 'Vorstellungen',
        flex: 1,
        menuDisabled: true,
        dataIndex: 'works',
        defaultRenderer: function (value, metadata, record, rowIdx, colIdx, store, view) {
        //console.log(value);
        var prefix = Ext.baseCSSPrefix;
        var scope = me.origScope || me;
        var ret = Ext.isFunction(me.origRenderer) ? me.origRenderer.apply(scope, arguments) || '' : '';
        //console.log(ret);
        var testItem = new Array();
        for(j = 0; j < value.inhalt.length; j++){
        testItem[j] = {icon:'resources/images/BookBlau-16.png',
        title: '<font style="right; font-size: 11px; line-height: 1em;">' + 'Testing'
        + '</font>'
        
        }
        var disabled = testItem.disabled || (testItem.isDisabled ? testItem.isDisabled.call(testItem.scope || scope, view, rowIdx, colIdx, testItem, record) : false);
        var tooltip = disabled ? null : (testItem.tooltip || (testItem.getTip ? testItem.getTip.apply(testItem.scope || scope, arguments) : null));
        
        ret += '&lt;img alt=&quot;' + (testItem.altText || me.altText) + '&quot; src=&quot;' + (testItem.icon || Ext.BLANK_IMAGE_URL) +
        '&quot; class=&quot;' + prefix + 'action-col-icon ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
        ' ' + (Ext.isFunction(testItem.getClass) ? testItem.getClass.apply(testItem.scope || scope, arguments) : (testItem.iconCls || me.iconCls || '')) + '&quot;' +
        (tooltip ? ' data-qtip=&quot;' + tooltip + '&quot;' : '') + ' /&gt;';
        }
        this.items = testItem;
        return ret;
        //var imTest = '<img src="resources/images/Door-24.png" id="1029394" style="width:15px;height:14px;vertical-align:middle;">';
        
        
        //var domEls = this.el.dom.querySelectorAll('#' + this.getId() + ' .x-grid-icon', this.el.dom);
        // console.log( document.getElementById('1029394'));
        //return imTest;
        
        
        /\* var test = '';
        var testItem = new Array();
        for(j = 0; j < value.inhalt.length; j++){
        testItem[j] = {icon:'resources/images/BookBlau-16.png',
        title: '<font style="right; font-size: 11px; line-height: 1em;">' + 'Testing'
        + '</font>'};
        
        /\* test = test +  '<font style="right; font-size: 11px; line-height: 1em;">'
        + j
        + '</font>';*\/
        
        }
        this.items = testItem;
        return value;*\/
        // return test;
        
        
        },
        /\* getEditor: function(record) {
        console.log(value);
        var value;
        if (record.get('state') == 'free') {
        
        value = 'xf09c@FontAwesome'
        } else {
        value = 'resources/images/BookBlau-16.png'
        }
        return Ext.create('Ext.grid.CellEditor', {
        field: {
        xtype: 'image',
        glyph: value
        
        }
        });
        },*\/
        /\*items: [{
        xtype: 'gridcolumn',
        text: 'adsfafafsdfsfsdfsdfds'
        /\*xtype:'actioncolumn',
        icon:'resources/images/BookBlau-16.png'*\/
        },
        {
        xtype: 'gridcolumn',
        text: 'adsfafaf'
        }],*\/
        
        listeners: {
        /\*\/\* click: function (item, e, eOpts) {
        
        //console.log(item);
        // console.log(e);
        // console.log(eOpts);
        var prsonElement = e.getElementsByClassName('workhtml');
        console.log(prsonElement);
        var prsonElement_1 = e.getElementsByClassName('personhtml');
        console.log(prsonElement_1);
        
        console.log(this.el.dom.innerHTML);
        
        /\*var prsonElement = e.getElementsByClassName('workhtml');
        //console.log(prsonElement);
        if (prsonElement[0] !== undefined) {
        var personData = prsonElement[0].id;
        var personDataArray = personData.split('_')
        var personId = personDataArray[0];
        var personName = personDataArray[1];
        
        var toolBarGlobal = Ext.getCmp('toolbar');
        var historyButton = Ext.getCmp('historyButton');
        
        var workIcon = '';
        if (extWorkKeys.indexOf(personId) > -1) {
        workIcon = 'resources/images/BookBlau-16.png';
        } else {
        workIcon = 'resources/images/Books1-17.png';
        }
        
        var menuItem = historyButton.menu.add({
        text: '<font style="color:gray;">' + personName + '</font>', icon: workIcon, dbkey: personId
        });
        
        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
        var existItems = navTreeGlobal.items;
        var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, personId, menuItem.id);
        if (! isFoundItem) {
        
        var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
        title: '<font style="color:gray;">' + personName + '</font>',
        icon: workIcon
        });
        
        var personDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({
        selection: personId, isSelected: true
        });
        
        personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">' + personName + '</font>');
        repertoireTab.add(personDetails);
        
        repertoireTab.setActiveMenuItemId(menuItem.id);
        repertoireTab.setMenuAdded(true);
        
        navTreeGlobal.add(repertoireTab);
        navTreeGlobal.setActiveTab(repertoireTab);
        navTreeGlobal.fireEvent('render', navTreeGlobal);
        }
        }*\/
        },
         *\/ render : function(c) {
        c.on('click', function() {
        alert('' + this.id);
        alert(this.el.dom.innerHTML);
        }, this);}*\/
        
        
        }
        // renderer: function (value, metadata, record) {
        // defaultRenderer: function (value, metadata, record, rowIdx, colIdx, store, view) {
        //  console.log(value);
        //   console.log(metadata);
        //  console.log(record);
        
        /\**me.items = [{
        xtype:'actioncolumn',
        icon:'resources/images/BookBlau-16.png'
        },
        {
        Text: 'adsfafaf'
        }];*\/
        
        
        /\**     var presentationText = '';
        var workObject = record.data.works;
        for(j = 0; j < workObject.inhalt.length; j++){
        var tail = workObject.inhalt[j];
        
        if(typeof tail.celltext !== 'undefined'){
        presentationText = presentationText + '<div style="font-size: 11px; line-height: 1em;">'
        + tail.celltext+'</div>';
        
        }
        else if(typeof tail.work !== 'undefined'){
        
        presentationText = presentationText + '<div style="font-size: 11px; line-height: 1em;">'
        + tail.work[0]+'</div>';
        
        if(tail.work[1] !== ''){
        
        
        presentationText = presentationText + /\*'<img src="resources/images/Door-24.png" style="width:15px;height:14px;vertical-align:middle;">'*\/
        '<img class="workhtml" src="resources/images/Door-24.png" id="' + tail.work[1] + '" style="width:15px;height:14px;vertical-align:middle;">'+' ';
        
        }
        }
        else if(typeof tail.workpersons !== 'undefined'){
        
        presentationText = presentationText + '<div style="font-size: 11px; line-height: 1em;">'
        + tail.workpersons[0]+'</div>';
        
        if(tail.workpersons[1] !== ''){
        
        var imageVIAFLink = Ext.create('Ext.Img', {
        //html: '<img src="resources/images/Link.png" style="width:17px;height:18px;">',
        src: 'resources/images/Link.png',
        listeners: {
        el: {
        click: function() {
        Ext.Msg.alert("Message");
        }
        
        }
        }
        
        });
        
        presentationText = presentationText + imageVIAFLink.html;
        //'<img class="personhtml" src="resources/images/Door-24.png" id="' + tail.workpersons[1] + '" style="width:15px;height:14px;vertical-align:middle;">'+' ';
        }
        }
        
        }
        // metadata.style = 'cursor: pointer;';
        
        console.log(this.el.dom.innerHTML);
        return presentationText;*\/
        
        //  }
        
        });
        tableColumns = tableColumns + 1;
        objs[tableColumns] = col;*/
        //}
        
        
        /* me.detailsColumn = this.createColumn('Werk', 'resources/images/Door-24.png', 'name');
        tableColumns = tableColumns + 1;
        objs[tableColumns] = me.detailsColumn;
        me.workDetailsColumn = me.detailsColumn;*/
        
        /*if (workNumber > 0) {
        var workArray = new Array();
        for (var i = 0; i < workNumber; i++) {
        var pers = {
        text: 'Werk',
        width: 180,
        dataIndex: 'works',
        defaultRenderer: function (value, meta, record, rowIdx, colIdx, store, view) {
        if (value.length > 0) {
        
        for (k = 0; k < value.length; k++) {
        //var m = colIdx - tableColumns;
        // var m = Math.abs((tableColumns-workNumber)-colIdx);
        var m = 0;
        if(personsNumber !== 0){
        m = colIdx - tableColumns+1;
        }
        else{
        m = colIdx - tableColumns;
        //Math.abs((tableColumns +1) - colIdx);
        //Math.abs((tableColumns-workNumber)-colIdx);
        }
        
        var onePerson = value[m];
        
        if (onePerson !== undefined) {
        //var m = Math.abs((tableColumns-1)-colIdx);
        var workName = onePerson[0];
        var workKey = onePerson[1]
        if (workName !== undefined) {
        if (workKey !== '') {
        return '<div class="workhtml" style="font-size: 11px;vertical-align:middle;" id="' + workKey + '_' + workName + '">' + workName + '<img src="resources/images/Door-24.png" style="width:15px;height:14px;vertical-align:middle;">' + '</div>';
        }
        return '<div style="font-size: 11px;vertical-align:middle;">' + workName + '</div>';
        }
        }
        }
        }
        },
        listeners: {
        click: function (item, e, eOpts) {
        var prsonElement = e.getElementsByClassName('workhtml');
        //console.log(prsonElement);
        if (prsonElement[0] !== undefined) {
        var personData = prsonElement[0].id;
        var personDataArray = personData.split('_')
        var personId = personDataArray[0];
        var personName = personDataArray[1];
        
        var toolBarGlobal = Ext.getCmp('toolbar');
        var historyButton = Ext.getCmp('historyButton');
        
        var workIcon = '';
        if (extWorkKeys.indexOf(personId) > -1) {
        workIcon = 'resources/images/BookBlau-16.png';
        } else {
        workIcon = 'resources/images/Books1-17.png';
        }
        
        var menuItem = historyButton.menu.add({
        text: '<font style="color:gray;">' + personName + '</font>', icon: workIcon, dbkey: personId
        });
        
        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
        var existItems = navTreeGlobal.items;
        var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, personId, menuItem.id);
        if (! isFoundItem) {
        
        var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
        title: '<font style="color:gray;">' + personName + '</font>',
        icon: workIcon
        });
        
        var personDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({
        selection: personId, isSelected: true
        });
        
        personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">' + personName + '</font>');
        repertoireTab.add(personDetails);
        
        repertoireTab.setActiveMenuItemId(menuItem.id);
        repertoireTab.setMenuAdded(true);
        
        navTreeGlobal.add(repertoireTab);
        navTreeGlobal.setActiveTab(repertoireTab);
        navTreeGlobal.fireEvent('render', navTreeGlobal);
        }
        }
        }
        }
        };
        
        workArray[i] = pers
        }
        var testColumn = Ext.create('Ext.grid.column.Column', {
        header: 'Werke',
        columns: workArray
        });
        
        tableColumns = tableColumns + 1;
        objs[tableColumns] = testColumn;
        }
         */
        
        
        /*if (personsNumber > 0) {
        var personArray = new Array();
        for (var i = 0; i < personsNumber; i++) {
        var pers = {
        text: 'Person',
        width: 120,
        dataIndex: 'persons',
        defaultRenderer: function (value, meta, record, rowIdx, colIdx, store, view) {
        
        if (value.length > 0) {
        
        for (k = 0; k < value.length; k++) {
        var m = colIdx - tableColumns - workNumber + 1;
        //var m = Math.abs((tableColumns-workNumber)-colIdx);
        var onePerson = value[m];
        
        if (onePerson !== undefined) {
        //var m = Math.abs((tableColumns-1)-colIdx);
        var persName = onePerson[0];
        var persKey = onePerson[1]
        
        if (persName !== undefined) {
        if (persKey !== '') {
        return '<div class="personhtml" style="font-size: 11px;vertical-align:middle;" id="' + persKey + '_' + persName + '">' + persName + '<img src="resources/images/Door-24.png" style="width:15px;height:14px;vertical-align:middle;">' + '</div>';
        }
        return '<div style="font-size: 11px;vertical-align:middle;">' + persName + '</div>';
        }
        }
        }
        }
        },
        listeners: {
        click: function (item, e, eOpts) {
        var prsonElement = e.getElementsByClassName('personhtml');
        //console.log(prsonElement);
        if (prsonElement[0] !== undefined) {
        var personData = prsonElement[0].id;
        var personDataArray = personData.split('_')
        var personId = personDataArray[0];
        var personName = personDataArray[1];
        
        var toolBarGlobal = Ext.getCmp('toolbar');
        var historyButton = Ext.getCmp('historyButton');
        // var isHistoryItemExist = toolBarGlobal.foundHistoryitemWithId(historyButton.menu.items, personId);
        //if(!isHistoryItemExist){
        var menuItem = historyButton.menu.add({
        text: '<font style="color:gray;">' + personName + '</font>', icon: 'resources/images/Mask-19.png', dbkey: personId
        });
        
        //}
        
        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
        var existItems = navTreeGlobal.items;
        var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, personId, menuItem.id);
        if (! isFoundItem) {
        
        var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
        title: '<font style="color:gray;">' + personName + '</font>',
        icon: 'resources/images/Mask-19.png'
        });
        var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({
        dbkey: personId
        });
        personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">' + personName + '</font>');
        repertoireTab.add(personDetails);
        
        repertoireTab.setActiveMenuItemId(menuItem.id);
        repertoireTab.setMenuAdded(true);
        
        navTreeGlobal.add(repertoireTab);
        navTreeGlobal.setActiveTab(repertoireTab);
        navTreeGlobal.fireEvent('render', navTreeGlobal);
        }
        }
        }
        }
        };
        
        personArray[i] = pers
        }
        var testColumn = Ext.create('Ext.grid.column.Column', {
        header: 'Personen',
        columns: personArray
        });
        
        tableColumns = tableColumns + 1;
        objs[tableColumns] = testColumn;
        }
         */
        
        /*var col_inhalt = this.createColumn('Inhaltdetails', 'resources/images/Note-15.png', 'createContent');
        tableColumns = tableColumns+1;
        me.inhaltColumn = tableColumns;
        objs[tableColumns] = col_inhalt;*/
        
        me.columns = objs;
        
        me.callParent();
    },
    
    
    createColumn: function (headerName, path, dataind) {
        var me = this;
        
        getWorkContent = function (workId, workName) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            var historyButton = Ext.getCmp('historyButton');
            
            var workIcon = '';
            if (extWorkKeys.indexOf(workId) > -1) {
                workIcon = 'resources/images/BookBlau-16.png';
            } else {
                workIcon = 'resources/images/Books1-17.png';
            }
            
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + workName + '</font>', icon: workIcon, dbkey: workId
            });
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, workId, menuItem.id);
            if (! isFoundItem) {
                
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + workName + '</font>',
                    icon: workIcon
                });
                
                /*var personDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({
                selection: workId, isSelected: true
                });*/
                var personDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                    selection: workId, isSelected: true, workName: workName, workIcon: workIcon
                });
                
               // personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">' + workName + '</font>');
                repertoireTab.add(personDetails);
                
                repertoireTab.setActiveMenuItemId(menuItem.id);
                repertoireTab.setMenuAdded(true);
                
                navTreeGlobal.add(repertoireTab);
                navTreeGlobal.setActiveTab(repertoireTab);
                navTreeGlobal.fireEvent('render', navTreeGlobal);
            }
        };
        
        getPersonContent = function (personId, personName) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            var historyButton = Ext.getCmp('historyButton');
            // var isHistoryItemExist = toolBarGlobal.foundHistoryitemWithId(historyButton.menu.items, personId);
            //if(!isHistoryItemExist){
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + personName + '</font>', icon: 'resources/images/Mask-19.png', dbkey: personId
            });
            
            //}
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, personId, menuItem.id);
            if (! isFoundItem) {
                
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + personName + '</font>',
                    icon: 'resources/images/Mask-19.png'
                });
                var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({
                    dbkey: personId
                });
                personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">' + personName + '</font>');
                repertoireTab.add(personDetails);
                
                repertoireTab.setActiveMenuItemId(menuItem.id);
                repertoireTab.setMenuAdded(true);
                
                navTreeGlobal.add(repertoireTab);
                navTreeGlobal.setActiveTab(repertoireTab);
                navTreeGlobal.fireEvent('render', navTreeGlobal);
            }
        };
        var eColumn = Ext.create('Ext.grid.column.Action', {
            xtype: 'actioncolumn',
            header: headerName,
            flex: 1,
            menuDisabled: true,
            dataIndex: dataind,
            //align: 'center',
            renderer: function (val, metadata, record) {
                var me = this;
                var presentationText = '';
                var workObject = record.data.works;
                for (j = 0; j < workObject.inhalt.length; j++) {
                    var tail = workObject.inhalt[j];
                    
                    if (typeof tail.celltext !== 'undefined') {
                        presentationText = presentationText + '<small style="font-size: 11px; line-height: 1em;"> ' + tail.celltext + ' </small>';
                    } else if (typeof tail.work !== 'undefined') {
                        
                        /*presentationText = presentationText + '<div style="font-size: 11px; line-height: 1em;">'
                        + tail.work[0]+'</div>';*/
                        
                        if (tail.work[1] !== '') {
                            workId = tail.work[1];
                            workName = tail.work[0];
                            //this.icon = 'resources/images/BookBlau-16.png';
                            presentationText = presentationText + /*'<img src="resources/images/Door-24.png" style="width:15px;height:14px;vertical-align:middle;">'*/
                            //'<img class="workhtml" src="resources/images/Door-24.png" id="' + tail.work[1] + '" style="width:15px;height:14px;vertical-align:middle;">'+' ';
                            // this.icon;
                            '<small style="font-size: 11px; line-height: 1em;"><a href="javascript:getWorkContent(\'' + tail.work[1] + '\'' + ', \'' + tail.work[0] + '\');">' + tail.work[0] + '</a></small>';
                        } else {
                            presentationText = presentationText + '<small style="font-size: 11px; line-height: 1em;">' + tail.work[0] + '</small>';
                        }
                    } else if (typeof tail.workpersons !== 'undefined') {
                        
                        /*presentationText = presentationText + '<div style="font-size: 11px; line-height: 1em;">'
                        + tail.workpersons[0]+'</div>';*/
                        
                        if (tail.workpersons[1] !== '') {
                            personId = tail.workpersons[1];
                            personName = tail.workpersons[0];
                            presentationText = presentationText +
                            //'<img class="personhtml" src="resources/images/Door-24.png" id="' + tail.workpersons[1] + '" style="width:15px;height:14px;vertical-align:middle;">'+' ';
                            '<small style="font-size: 11px; line-height: 1em;"><a href="javascript:getPersonContent(\'' + tail.workpersons[1] + '\'' + ', \'' + tail.workpersons[0] + '\');">' + tail.workpersons[0] + '</a></small>';
                        } else {
                            presentationText = presentationText + '<small style="font-size: 11px; line-height: 1em;">' + tail.workpersons[0] + '</small>';
                        }
                    }
                }
                // metadata.style = 'cursor: pointer;';
                return presentationText;
                
                /*ret += '&lt;img alt=&quot;' + (testItem.altText || me.altText) + '&quot; src=&quot;' + (testItem.icon || Ext.BLANK_IMAGE_URL) +
                '&quot; class=&quot;' + prefix + 'action-col-icon ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
                ' ' + (Ext.isFunction(testItem.getClass) ? testItem.getClass.apply(testItem.scope || scope, arguments) : (testItem.iconCls || me.iconCls || '')) + '&quot;' +
                (tooltip ? ' data-qtip=&quot;' + tooltip + '&quot;' : '') + ' /&gt;';
                }*/
                //metadata.style = 'cursor: pointer;';
                // return val;
            }
        });
        return eColumn;
    },
    
    
    setTablePanel: function (tablePanel) {
        this.tablePanel = tablePanel;
    }
});