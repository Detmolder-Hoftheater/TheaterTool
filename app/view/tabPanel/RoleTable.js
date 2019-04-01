Ext.define('TheaterTool.view.tabPanel.RoleTable', {
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
    columnLines: true,
    collapsible: true,
    collapsed: true,
    title: '<b style="color:gray; font-size: 12px;">Rollen</b>',
    icon: 'resources/images/theatreB.png',
    margin: '0 0 10 0',
    store: null,
    
    detailsColumn: null,
    rollenList: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.RefData',
            data:[]
        });
        
        for (i = 0; i < me.rollenList.length; i++) {
            var source = me.rollenList[i];
            var role = Ext.create('TheaterTool.model.RefData', {
                name: source[0],
                id: source[1]
            });
            me.store.add(role);
        }
        
        this.detailsColumn = this.createColumn('Details', 'resources/images/theatreB.png');
        
        this.columns =[
        
        
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
    
    createColumn: function (headerName, path) {
        
        getRegieContent = function (regieName, dbid) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            var historyButton = Ext.getCmp('historyButton');
            // var isHistoryItemExist = toolBarGlobal.foundHistoryitem(historyButton.menu.items, '<font style="color:gray;">' + rec.data.name + '</font>');
            // if(!isHistoryItemExist){
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + regieName + '</font>', icon: 'resources/images/theatreB.png'
            });
            //, selection: 3
            
            // }
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">' + regieName + '</font>', menuItem.id);
            if (! isFoundItem) {
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + regieName + '</font>',
                    icon: 'resources/images/theatreB.png'
                });
                var personDetails = new TheaterTool.view.tabPanel.roles.RolePanelInTab({
                    dbkey: dbid, icon: 'resources/images/theatreB.png', title: '<font size="2" face="Arial" style="color:#A87678;">Role: ' + regieName + '</font>'
                });
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
            //align: 'center',
            menuDisabled: true,
            dataIndex: 'name',
            renderer: function (val, metadata, record) {
                
                var presentationText = '';
                if (record.data.dbkey !== '') {
                    // this.items[0].icon = 'resources/images/Door-24.png';
                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"><a href="javascript:getRegieContent(\'' + record.data.name + '\'' + ', \'' + record.data.id + '\');">' + record.data.name + '</a></small>';
                } else {
                    //this.items[0].icon = '';
                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"> ' + record.data.name + ' </small>';
                }
                // metadata.style = 'cursor: pointer;';
                return presentationText;
            }
        });
        return eColumn;
    }
});