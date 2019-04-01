Ext.define('TheaterTool.view.tabPanel.GagenTable', {
    extend: 'Ext.grid.Panel',
    requires:[
    'Ext.grid.column.Action',
    'TheaterTool.model.RefData'],
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    flex: 1,
    sortableColumns: false,
    hideHeaders: true,
    collapsible: true,
    collapsed: true,
    title: '<b style="color:gray; font-size: 12px;">Gagenbücher</b>',
    icon: 'resources/images/Gift-17.png',
    store: null,
    columnLines: true,
    detailsColumn: null,
    margin: '0 0 10 0',
    gagenList: null,
    
    dbkey: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.RefData',
            data:[]
        });
        var nameForCount = '';
        var selectionCount = 0;
        for (i = 0; i < me.gagenList.length; i++) {
            var nameForLoad = me.gagenList[i].split(':');
            var roleName = nameForLoad[0];
            if (nameForCount === roleName) {
                selectionCount = selectionCount + 1;
            } else {
                nameForCount = roleName;
                selectionCount = 0;
            }
            
            var role = Ext.create('TheaterTool.model.RefData', {
                name: me.gagenList[i],
                countFoSelection: selectionCount
            });
            me.store.add(role);
        }
        
        this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png', me);
        
        this.columns =[
        
        /*{
        text: 'Name',
        flex: 2,
        menuDisabled: true,
        dataIndex: 'name'
        
        },*/
        this.detailsColumn];
        
        this.listeners = { afterrender: function (panel) {
                    //console.log(panel.header.el);
                    panel.header.el.on('click', function () {
                        // panel.header.el.on('click', function () {
                        if (panel.collapsed) {
                            panel.expand();
                        } else {
                            panel.collapse();
                        }
                    });
                }
            };
        
        this.callParent();
    },
    
    createColumn: function (headerName, path, me) {
        
        getGagenContent = function (gagenName, countFoSelection) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            
            var nameForLoad = gagenName.split(':');
            var roleName = nameForLoad[0];
            var countNumber = parseInt(countFoSelection) + 1;
            var roleNameToHistory = gagenName + ' (' + countNumber + ')';
            
            var historyButton = Ext.getCmp('historyButton');
            //var isHistoryItemExist = toolBarGlobal.foundHistoryitem(historyButton.menu.items, '<font style="color:gray;">' + rec.data.name + '</font>');
            //if(!isHistoryItemExist){
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + roleNameToHistory + '</font>', icon: 'resources/images/carnival.png'
            });
            //, selection: 3
            
            // }
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">' + roleNameToHistory + '</font>');
            
            
            if (! isFoundItem) {
                
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + roleNameToHistory + '</font>',
                    icon: 'resources/images/Gift-17.png'
                });
                var personDetails = new TheaterTool.view.tabPanel.gagebooks.GageBookPanelInTab({
                    regieName: roleName, count: countFoSelection, dbkey: me.dbkey
                });
                repertoireTab.add(personDetails);
                
                
                navTreeGlobal.add(repertoireTab);
                navTreeGlobal.setActiveTab(repertoireTab);
                navTreeGlobal.fireEvent('render', navTreeGlobal);
            }
        };
        
        var eColumn = Ext.create('Ext.grid.column.Action', {
            xtype: 'actioncolumn',
            header: headerName,
            flex: 1,
            //align: 'center',
            dataIndex: 'name',
            menuDisabled: true,
            renderer: function (val, metadata, record) {
                var presentationText = '';
                var countNumber = parseInt(record.data.countFoSelection) + 1;
                var presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"><a href="javascript:getGagenContent(\'' + record.data.name + '\',\'' + record.data.countFoSelection + '\');">' + record.data.name + '(' + countNumber + ')' + '</a></small>';
                
                return presentationText;
            }
            /*,
            handler: function(grid, rowIndex, colIndex) {
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var rec = grid.getStore().getAt(rowIndex);
            var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">'+rec.data.name+'</font>');
            if (! isFoundItem) {
            var dbkey = rec.data.name;
            var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
            title: '<font style="color:gray;">'+rec.data.name+'</font>',
            icon: 'resources/images/Gift-17.png'
            });
            var personDetails = new TheaterTool.view.tabPanel.gagebooks.GageBookPanelInTab({regieName: dbkey});
            repertoireTab.add(personDetails);
            
            
            navTreeGlobal.add(repertoireTab);
            navTreeGlobal.setActiveTab(repertoireTab);
            navTreeGlobal.fireEvent('render', navTreeGlobal);
            }
            }*/
        });
        return eColumn;
    }
});