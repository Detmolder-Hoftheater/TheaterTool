Ext.define('TheaterTool.view.tabPanel.WorksTable', {
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
    title: '<b style="color:gray; font-size: 12px;">Werke</b>',
    icon: 'resources/images/BooksVert-17.png',
    store: null,
    columnLines: true,
    detailsColumn: null,
    margin: '0 0 10 0',
    worksList: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.RefData',
            data:[]
            
        });
        
        if (me.worksList != 'undefined') {
            for (i = 0; i < me.worksList.length; i++) {
                var work = me.worksList[i];
                var iconPath = '';
                var workId = work[1];
                if (extWorkKeys.indexOf(workId) > -1) {
                    iconPath = 'resources/images/BookBlau-16.png';
                } else {
                    iconPath = 'resources/images/Books1-17.png';
                }
                
                var workRow = Ext.create('TheaterTool.model.RefData', {
                    name: work[0],
                    iconExtend: iconPath,
                    id: work[1]
                });
                me.store.add(workRow);
            }
        }
        this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png', 'name');
        
        var extendColumn = this.createExtendColumn();
        
        this.columns =[
        extendColumn,
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
    
    createExtendColumn: function () {
        
        var eColumn = Ext.create('Ext.grid.column.Action', {
            xtype: 'actioncolumn',
            
            align: 'center',
            menuDisabled: true,
            renderer: function (val, metadata, record) {
                this.items[0].icon = record.data.iconExtend;
                metadata.style = 'cursor: pointer;';
            }
        });
        return eColumn;
    },
    
    createColumn: function (headerName, path, dataind) {
        
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
                    icon: workIcon,
                    id: 'werk_' + workId
                });
                
                var personDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                    selection: workId, isSelected: true, workName: workName, workIcon: workIcon
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
            header: headerName,
            flex: 1,
            dataIndex: dataind,
            menuDisabled: true,
            renderer: function (val, metadata, record) {
            console.log(record.data.name);
                var presentationText = '';
                
                if (record.data.id !== '') {
                var nameWork = record.data.name;
                var nameWorkNorm = nameWork.replace("'", "\\'");
                     presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"><a href="javascript:getWorkContent(\'' + record.data.id + '\'' + ', \'' + nameWorkNorm + '\');">' + record.data.name + '</a></small>';
                } else {
                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"> ' + nameWorkNorm + ' </small>';
                }
                return presentationText;
            }
        });
        return eColumn;
    }
});