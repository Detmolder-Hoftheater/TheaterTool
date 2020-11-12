Ext.define('TheaterTool.view.tabPanel.BestandTable', {
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
    title: '<b style="color:gray; font-size: 12px;">Bestandsverzeichnisse</b>',
    icon: 'resources/images/openBox1.png',
    margin: '0 0 10 0',
    store: null,
    
    detailsColumn: null,
    taxList: null,
    dbkey: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.RefData',
            data:[]
        });
        
        var nameForCount = '';
        var selectionCount = 0;
        for (var i = 0; i < me.taxList.length; i++) {
            var nameForLoad = me.taxList[i].split(':');
            var roleName = nameForLoad[0];
            if (nameForCount === roleName) {
                selectionCount = selectionCount + 1;
            } else {
                nameForCount = roleName;
                selectionCount = 0;
            }
            
            var role = Ext.create('TheaterTool.model.RefData', {
                name: me.taxList[i],
                countFoSelection: selectionCount
            });
            me.store.add(role);
        }
        
        this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png', me);
        
        this.columns =[
        
        
        this.detailsColumn];
        
        this.listeners = { afterrender: function (panel) {
                panel.header.el.on('click', function () {
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
        
        getBestandContent = function (regieName, countFoSelection) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            var nameForLoad = regieName.split(':');
            var roleName = nameForLoad[0];
            var countNumber = parseInt(countFoSelection) + 1;
            var roleNameToHistory = regieName + ' (' + countNumber + ')';
            
            var historyButton = Ext.getCmp('historyButton');
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + roleNameToHistory + '</font>', icon: 'resources/images/openBox1.png'
            });
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">' + roleNameToHistory + '</font>', menuItem.id);
            if (! isFoundItem) {
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + roleNameToHistory + '</font>',
                    icon: 'resources/images/openBox1.png',
                    id: 'taxation_' + roleName.replace(/\s/g, '').replace(/[()]/g, '') + me.dbkey+countFoSelection
                });
                
                var selectedRow = me.getSelectionModel().getSelection()[0];
                var count = me.store.indexOf(selectedRow);
                
                var personDetails = new TheaterTool.view.tabPanel.bestand.BestandPanelInTab({
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
            flex: 1,
            menuDisabled: true,
            dataIndex: 'name',
            renderer: function (val, metadata, record) {
                
                var presentationText = '';
                if (record.data.dbkey !== '') {
                    var countNumber = parseInt(record.data.countFoSelection) + 1;
                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"><a href="javascript:getBestandContent(\'' + record.data.name + '\',\'' + record.data.countFoSelection + '\');">' + record.data.name + '(' + countNumber + ')' + '</a></small>';
                } else {
                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"> ' + record.data.name + ' </small>';
                }
               
                return presentationText;
            }
        });
        return eColumn;
    }
});