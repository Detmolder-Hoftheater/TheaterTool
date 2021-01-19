Ext.define('TheaterTool.view.tabPanel.SourcesTable', {
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
    title: '<b style="color:gray; font-size: 12px;">Quellen</b>',
    icon: 'resources/images/BooksVert-17.png',
    store: null,
    columnLines: true,
    detailsColumn: null,
    margin: '0 0 10 0',
    sourcesList: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.RefData',
            data:[]
            
        });
        
        if (me.sourcesList != 'undefined') {
            for (i = 0; i < me.sourcesList.length; i++) {
                var source = me.sourcesList[i];
                var sourceRow = Ext.create('TheaterTool.model.RefData', {
                    name: source[0],
                    id: source[1],
                    refId: source[2],
                    refName: source[3],
                    selLocation: source[4]
                    //iconExtend: workIcon
                });
                me.store.add(sourceRow);
            }
        }
        
        this.detailsColumn = this.createColumn();
        var iconColumn = this.createIconColumn();
        this.columns =[
        iconColumn,
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
    
    createIconColumn: function () {
        var eColumn = Ext.create('Ext.grid.column.Action', {
            xtype: 'actioncolumn',
            flex: 0.1,
            align: 'center',
            menuDisabled: true,
            renderer: function (val, metadata, record) {
                var workIcon = '';
                if (extWorkKeys.indexOf(record.data.refId) > -1) {
                    workIcon = 'resources/images/BookBlau-16.png';
                   
                } else {
                    workIcon = 'resources/images/Books1-17.png'
                    
                }
                this.items[0].icon = workIcon;
                metadata.style = 'cursor: pointer;';
            }
        });
        return eColumn;
    },
    
    createColumn: function () {
        
        getSourceContent = function (sourceId, /*sourceName,*/ workId, refName, selLocation) {
            
            var toolBarGlobal = Ext.getCmp('toolbar');
            var historyButton = Ext.getCmp('historyButton');
            
            var workIcon = '';
            if (extWorkKeys.indexOf(workId) > -1) {
                workIcon = 'resources/images/SourceBlue.png';
            } else {
                workIcon = 'resources/images/SourceRed.png';
            }
            
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + refName + /*' (Werk: ' + sourceName + ')' +*/ '</font>', icon: workIcon, dbkey: workId
            });
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, workId, menuItem.id);
            if (! isFoundItem) {
                
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + refName + /*' (Werk: ' + sourceName + ')' +*/ '</font>',
                    icon: workIcon,
                    id: 'quelle_' + sourceId
                });
               
                var personDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                    selection: workId, isSelected: true, workName: ''/*sourceName*/, workIcon: workIcon, sourceId: sourceId, sourceTitle: refName, selLocation: selLocation
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
            dataIndex: 'name',
            menuDisabled: true,
            renderer: function (val, metadata, record) {
                var presentationText = '';
                if (record.data.id !== '') {
                    /*presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"><a href="javascript:getSourceContent(\'' + record.data.id + '\'' + ', \'' + record.data.name + '\'' + ', \'' + record.data.refId + '\'' + ', \'' + record.data.refName + '\'' + ', \'' + record.data.selLocation + '\');">' + record.data.refName + ' (Werk: ' + record.data.name + ')' +'</a></small>';
                    */presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"><a href="javascript:getSourceContent(\'' + record.data.id + '\'' /*+ ', \'' + record.data.name + '\''*/ + ', \'' + record.data.refId + '\'' + ', \'' + record.data.refName + '\'' + ', \'' + record.data.selLocation + '\');">' + record.data.refName /*+ ' (Werk: ' + record.data.name + ')'*/ +'</a></small>';
                
                } else {
                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"> ' + record.data.refName +/* ' (Werk: ' + record.data.name + ')' +*/ ' </small>';
                }
                return presentationText;
            }
           
        });
        return eColumn;
    }
});