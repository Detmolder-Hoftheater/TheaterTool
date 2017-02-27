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
    style: {
        borderRight: '5px solid #f4f4f4'
    },
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
    
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.Theaterakte',
            data:[]
        });
        
        if (me.lineList != 'undefined') {
            //console.log(me.lineList);
            
            
            
            var workNumber = 0;
            var personsNumber = 0;
            for (i = 0; i < me.lineList.rows.length; i++) {
                var one_row = me.lineList.rows[i];
                
                
                var workName = '';
                var workKey = '';
                var workDetails_1 = '';
                var detailsColumnNumber = 1;
                var workDetails_2 = '';
                var workDetails_3 = '';
                var workDate = '';
                
                var personObject = new Array();
                var workObject = new Array();
                var columnText = new Array();
                
                
                //for(j = 0; j < one_row.cells.length; j++){
                var oneColumn = one_row.cells[1];
                var workArray = one_row.cells[2];
                var dateObject = one_row.cells[0];
                
                var personWorkObject = one_row.cells[3];
                
                if (typeof workArray !== 'undefined') {
                    
                    for (k = 0; k < workArray.work.length; k++) {
                        workObject[k] = workArray.work[k];
                        if (workArray.work.length > workNumber) {
                            workNumber = workArray.work.length;
                        }
                        /*workName = onwWork[0];
                        workKey = onwWork[1];
                        console.log(workName);*/
                    }
                    
                    
                    
                    
                    
                    if (typeof personWorkObject !== 'undefined') {
                        
                        for (j = 0; j < personWorkObject.workpersons.length; j++) {
                            personObject[j] = personWorkObject.workpersons[j];
                            if (personWorkObject.workpersons.length > personsNumber) {
                                personsNumber = personWorkObject.workpersons.length;
                            }
                        }
                    }
                    
                    if (typeof dateObject !== 'undefined') {
                        workDate = dateObject.date[0];
                    }
                    
                    
                    var one_line = Ext.create('TheaterTool.model.Theaterakte', {
                        works: workObject,
                        // workKey: workKey,
                        details1: oneColumn.inhalt[0],
                        date: workDate,
                        persons: personObject
                    });
                    me.store.add(one_line);
                }
            }
        }
        
        
        var objs = new Array();
        
        
        var tableColumns = -1;
        //var columnNumber = 4;
        
        var colDate = Ext.create('Ext.grid.column.Column', {
            xtype: 'gridcolumn',
            header: 'Datum',
            flex: 0.3,
            menuDisabled: true,
            dataIndex: 'date'
        });
        tableColumns = tableColumns + 1;
        objs[tableColumns] = colDate;
        
        //for(i = 1; i <= columnNumber; i++){
        var col = Ext.create('Ext.grid.column.Column', {
            xtype: 'gridcolumn',
            header: 'Vorstellungen',
            flex: 1,
            menuDisabled: true,
            dataIndex: 'details1'
        });
        tableColumns = tableColumns + 1;
        objs[tableColumns] = col;
        //}
        
        
        /* me.detailsColumn = this.createColumn('Werk', 'resources/images/Door-24.png', 'name');
        tableColumns = tableColumns + 1;
        objs[tableColumns] = me.detailsColumn;
        me.workDetailsColumn = me.detailsColumn;*/
        
        if (workNumber > 0) {
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
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        if (personsNumber > 0) {
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
        
        
        /*var col_inhalt = this.createColumn('Inhaltdetails', 'resources/images/Note-15.png', 'createContent');
        tableColumns = tableColumns+1;
        me.inhaltColumn = tableColumns;
        objs[tableColumns] = col_inhalt;*/
        
        me.columns = objs;
        
        me.callParent();
    },
    
    
    createColumn: function (headerName, path, dataind) {
        var me = this;
        var eColumn = Ext.create('Ext.grid.column.Action', {
            xtype: 'actioncolumn',
            header: headerName,
            flex: 0.5,
            menuDisabled: true,
            dataIndex: dataind,
            align: 'center',
            renderer: function (val, metadata, record) {
                if (headerName === 'Werk') {
                    if (record.data.workKey !== '') {
                        this.items[0].icon = path;
                        /*return '<div style="float: right; font-size: 11px; line-height: 1em;">'
                        + record.data.name+'</div>';*/
                    } else {
                        this.items[0].icon = '';
                        /*return '<font style="right; font-size: 11px; line-height: 1em;">'
                        + record.data.name
                        + '</font>';*/
                    }
                } else if (headerName === 'Inhaltdetails') {
                    if (record.data.createContent) {
                        this.items[0].icon = path;
                        /*return '<div style="float: right; font-size: 11px; line-height: 1em;">'
                        + record.data.name+'</div>';*/
                    } else {
                        this.items[0].icon = '';
                        /*return '<font style="right; font-size: 11px; line-height: 1em;">'
                        + record.data.name
                        + '</font>';*/
                    }
                }
                
                metadata.style = 'cursor: pointer;';
                return val;
                
                
                
                /*if(headerName == 'Werkdetails'){
                if(record.data.workKey !== ''){
                this.items[0].icon = path;
                }
                else {
                this.items[0].icon = '';
                }
                }*/
                
                /*metadata.style = 'cursor: pointer;';
                return val;*/
            },
            
            handler: function (grid, rowIndex, colIndex) {
                /*console.log(grid);
                console.log(rowIndex);
                console.log(colIndex);*/
                var rec = grid.getStore().getAt(rowIndex);
                /*console.log(rec);
                console.log(me.workDetailsColumn);*/
                if (colIndex === me.inhaltColumn && rec.data.createContent) {
                }
                if (colIndex === me.workDetailsColumn && rec.data.workKey != '') {
                    var dbkey = rec.data.workKey;
                    if (dbkey != '') {
                        
                        var workIcon = '';
                        if (extWorkKeys.indexOf('dbkey') > -1) {
                            workIcon = 'resources/images/BookBlau-16.png';
                        } else {
                            workIcon = 'resources/images/Books1-17.png';
                        }
                        
                        
                        var toolBarGlobal = Ext.getCmp('toolbar');
                        var historyButton = Ext.getCmp('historyButton');
                        // var isHistoryItemExist = toolBarGlobal.foundHistoryitemWithId(historyButton.menu.items, dbkey);
                        //  if(!isHistoryItemExist){
                        var menuItem = historyButton.menu.add({
                            text: '<font style="color:gray;">' + rec.data.name + '</font>', icon: workIcon, dbkey: dbkey
                        });
                        
                        //  }
                        
                        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                        var existItems = navTreeGlobal.items;
                        var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, dbkey, menuItem.id);
                        if (! isFoundItem) {
                            
                            
                            var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                                title: '<font style="color:gray;">' + rec.data.name + '</font>',
                                icon: workIcon
                            });
                            var personDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({
                                selection: dbkey, isSelected: true
                            });
                            repertoireTab.add(personDetails);
                            
                            repertoireTab.setActiveMenuItemId(menuItem.id);
                            repertoireTab.setMenuAdded(true);
                            
                            navTreeGlobal.add(repertoireTab);
                            navTreeGlobal.setActiveTab(repertoireTab);
                            navTreeGlobal.fireEvent('render', Ext.getCmp('tabpanel'));
                        }
                    }
                }
            }
        });
        return eColumn;
    },
    
    
    setTablePanel: function (tablePanel) {
        this.tablePanel = tablePanel;
    }
});