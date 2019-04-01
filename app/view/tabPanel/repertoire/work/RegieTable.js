Ext.define('TheaterTool.view.tabPanel.repertoire.work.RegieTable', {
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
    title: '<b style="color:gray; font-size: 12px;">Regiebücher</b>',
    icon: 'resources/images/Crown-17.png',
    margin: '0 0 10 0',
    store: null,
    
    detailsColumn: null,
    regieList: null,
    
    dbkey: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.RefData',
            data:[]
        });
        var nameForCount = '';
        var selectionCount = 0;
        for (i = 0; i < me.regieList.length; i++) {
            var nameForLoad = me.regieList[i].split(':');
            var roleName = nameForLoad[0];
            if (nameForCount === roleName) {
                selectionCount = selectionCount + 1;
            } else {
                nameForCount = roleName;
                selectionCount = 0;
            }
            
            var role = Ext.create('TheaterTool.model.RefData', {
                name: me.regieList[i],
                countFoSelection: selectionCount
            });
            me.store.add(role);
        }
        
        this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png', me);
        
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
    
    createColumn: function (headerName, path, me) {
        
        getRegieContent = function (regieName, countFoSelection) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            var nameForLoad = regieName.split(':');
            var roleName = nameForLoad[0];
            var countNumber = parseInt(countFoSelection) + 1;
            var roleNameToHistory = regieName + ' (' + countNumber + ')';
            
            var historyButton = Ext.getCmp('historyButton');
            // var isHistoryItemExist = toolBarGlobal.foundHistoryitem(historyButton.menu.items, '<font style="color:gray;">' + rec.data.name + '</font>');
            // if(!isHistoryItemExist){
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + roleNameToHistory + '</font>', icon: 'resources/images/Crown-17.png'
            });
            //, selection: 3
            
            // }
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">' + roleNameToHistory + '</font>', menuItem.id);
            if (! isFoundItem) {
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + roleNameToHistory + '</font>',
                    icon: 'resources/images/Crown-17.png'
                });
                var personDetails = new TheaterTool.view.tabPanel.regiebooks.RegiePanelInTab({
                    regieName: roleName, count: countFoSelection, dbkey: me.dbkey
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
                    var countNumber = parseInt(record.data.countFoSelection) + 1;
                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"><a href="javascript:getRegieContent(\'' + record.data.name + '\',\'' + record.data.countFoSelection + '\');">' + record.data.name + '(' + countNumber + ')' + '</a></small>';
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