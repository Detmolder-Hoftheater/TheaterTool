Ext.define('TheaterTool.view.tabPanel.repertoire.work.IssueTable', {
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
    title: '<b style="color:gray; font-size: 12px;">Ausgaben</b>',
    icon: 'resources/images/MoneyTransfer-17.png',
    margin: '0 0 10 0',
    store: null,
    
    detailsColumn: null,
    issueList: null,
    
    selectedWorkID: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.RefData',
            data:[]
        });
        var nameForCount = '';
        var selectionCount = 0;
        for (i = 0; i < me.issueList.length; i++) {
            var dailyArray = me.issueList[i];
            var dailyName = dailyArray[0];
            var selectedJahr = dailyArray[1];
            
            var nameForLoad = dailyName.split(':');
            var roleName = nameForLoad[0];
            if (nameForCount === roleName) {
                selectionCount = selectionCount + 1;
            } else {
                nameForCount = roleName;
                selectionCount = 0;
            }
            
            var data = me.issueList[i];
            var role = Ext.create('TheaterTool.model.RefData', {
                jahr: dailyName,
                countFoSelection: selectionCount,
                selectedJahr: selectedJahr
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
        var me = this;
        getIssueContent = function (jahr, countFoSelection, selectedJahr) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            
            var nameForLoad = jahr.split(':');
            var roleName = nameForLoad[0];
            var countNumber = parseInt(countFoSelection) + 1;
            var roleNameToHistory = jahr + ' (' + countNumber + ')';
            
            var historyButton = Ext.getCmp('historyButton');
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + roleNameToHistory + '</font>', icon: 'resources/images/MoneyTransfer-17.png'
            });
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">' + roleNameToHistory + '</font>', menuItem.id);
            if (! isFoundItem) {
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + roleNameToHistory + '</font>',
                    icon: 'resources/images/MoneyTransfer-17.png',
                    id: 'ausgaben_' + selectedJahr + me.selectedWorkID
                });
                var cutJahr = jahr.split('-');
                var jahrSplitted = cutJahr[0];
                var personDetails = new TheaterTool.view.tabPanel.issue.IssuePanelInTab({
                    issueName: jahr, year: selectedJahr, selectedWorkID: me.selectedWorkID, count: countFoSelection, selectedReport: roleName
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
                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"><a href="javascript:getIssueContent(\'' + record.data.jahr + '\'' + ', \'' + record.data.countFoSelection + '\',\'' + record.data.selectedJahr + '\');">' + record.data.jahr + '(' + countNumber + ')' + '</a></small>';
                } else {
                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"> ' + record.data.name + ' </small>';
                }
                return presentationText;
            }
        });
        return eColumn;
    }
});