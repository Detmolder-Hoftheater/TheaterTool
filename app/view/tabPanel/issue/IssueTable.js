Ext.define('TheaterTool.view.tabPanel.issue.IssueTable', {
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
    
    selectedWorkID: null,
    workToFocus: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.Theaterakte',
            data:[]
        });
        
        var column_2 = false;
        if (me.lineList !== 'undefined') {
            
            for (i = 0; i < me.lineList.rows.length; i++) {
                var one_row = me.lineList.rows[i];
                
                var presentationText = '';
                var workDate = one_row.cells[0];
                var workObject = one_row.cells[2];
                var rthlrObject = one_row.cells[1];
                /*var ggrObject = one_row.cells[2];
                var dObject = one_row.cells[3];*/
                var workObject_2 = null;
                if (typeof one_row.cells[3] !== 'undefined') {
                    workObject_2 = one_row.cells[3];
                    column_2 = true;
                }
                
                var one_line = Ext.create('TheaterTool.model.Theaterakte', {
                    works: workObject,
                    work_2: workObject_2,
                    measure: rthlrObject.measure,
                    /*ggr: ggrObject.ggr[0],
                    d: dObject.d[0],*/
                    date: workDate.date
                });
                me.store.add(one_line);
            }
        }
        
        
        var objs = new Array();
        
        
        var tableColumns = -1;
        
        var colDate = Ext.create('Ext.grid.column.Column', {
            xtype: 'gridcolumn',
            header: GUI_NAMES.exp_table_date,
            flex: 0.15,
            menuDisabled: true,
            dataIndex: 'date'
        });
        tableColumns = tableColumns + 1;
        objs[tableColumns] = colDate;
        
        var col_inhalt = this.createColumn('', 'resources/images/Note-15.png', 'works', me.selectedWorkID);
        tableColumns = tableColumns + 1;
        objs[tableColumns] = col_inhalt;
        
        if (column_2) {
            var col_inhalt_1 = this.createColumn('', 'resources/images/Note-15.png', 'work_2', me.selectedWorkID);
            tableColumns = tableColumns + 1;
            objs[tableColumns] = col_inhalt_1;
        }
        
        if (typeof rthlrObject !== 'undefined' && rthlrObject.measure[0] !== '') {
        console.log(rthlrObject.measure);
            var colRthlr = Ext.create('Ext.grid.column.Column', {
                xtype: 'gridcolumn',
                header: GUI_NAMES.exp_table_measure,
                flex: 0.5,
                menuDisabled: true,
                dataIndex: 'measure'
            });
            tableColumns = tableColumns + 1;
            objs[tableColumns] = colRthlr;
        }
        
        /* if (typeof ggrObject !== 'undefined' && ggrObject.ggr[0] !== '') {
        var colGgr = Ext.create('Ext.grid.column.Column', {
        xtype: 'gridcolumn',
        header: 'Gute Groschen',
        flex: 0.15,
        menuDisabled: true,
        dataIndex: 'ggr'
        });
        tableColumns = tableColumns + 1;
        objs[tableColumns] = colGgr;
        }
        
        if (typeof dObject !== 'undefined' && dObject.d[0] !== '') {
        var colD = Ext.create('Ext.grid.column.Column', {
        xtype: 'gridcolumn',
        header: 'Pfennig',
        flex: 0.15,
        menuDisabled: true,
        dataIndex: 'd'
        });
        tableColumns = tableColumns + 1;
        objs[tableColumns] = colD;
        }*/
        
        me.columns = objs;
        
        me.callParent();
    },
    
    
    createColumn: function (headerName, path, dataind, selectedWorkID) {
        var me = this;
        
        getWorkContent = function (workId, workName) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            var historyButton = Ext.getCmp('historyButton');
            var workIcon = 'resources/images/Books1-17.png';
            /*var workIcon = '';
            if (extWorkKeys.indexOf(workId) > -1) {
                workIcon = 'resources/images/BookBlau-16.png';
            } else {
                workIcon = 'resources/images/Books1-17.png';
            }*/
            
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
                    dbkey: personId, icon: 'resources/images/Mask-19.png'
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
            //header: headerName,
            flex: 1,
            menuDisabled: true,
            dataIndex: dataind,
            //align: 'center',
            renderer: function (val, metadata, record) {
                //var me =this;
                var presentationText = '';
                
                var workObject = null;
                if (dataind === 'works') {
                    workObject = record.data.works;
                } else if (typeof record.data.work_2 !== 'undefined') {
                    workObject = record.data.work_2;
                }
                if (workObject === null) {
                    return presentationText;
                }
                
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
                            
                            if (selectedWorkID === workId) {
                                
                                me.setWorkToFocus(record);
                            }
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
                            if (selectedWorkID === personId) {
                                
                                me.setWorkToFocus(record);
                            }
                            
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
    
    getWorkToFocus: function () {
        return this.workToFocus;
    },
    
    setWorkToFocus: function (workToFocus) {
        this.workToFocus = workToFocus;
    },
    
    
    setTablePanel: function (tablePanel) {
        this.tablePanel = tablePanel;
    }
});