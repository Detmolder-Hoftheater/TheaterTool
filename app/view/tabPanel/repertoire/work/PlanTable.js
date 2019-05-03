Ext.define('TheaterTool.view.tabPanel.repertoire.work.PlanTable', {
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
    collapsible: true,
    collapsed: true,
    title: '<b style="color:gray; font-size: 12px;">Spielpläne (Generiert aus Einnahmen, Ausgaben und Rollen- und Kostümbüchern)</b>',
    icon: 'resources/images/Calendar-17.png',
    margin: '0 0 10 0',
    hideHeaders: true,
    store: null,
    detailsColumn: null,
    columnLines: true,
    scheduleList: null,
    
    selectedWorkID: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.RefData',
            data:[],
            sorters:[ {
                sorterFn: function (o1, o2) {
                    var getRank = function (o) {
                        var name = o. get ('jahr');
                        var numberJahr = parseInt(name);
                        return numberJahr;
                    },
                    rank1 = getRank(o1),
                    rank2 = getRank(o2);
                    
                    if (rank1 === rank2) {
                        return 0;
                    }
                    
                    return rank1 < rank2 ? -1: 1;
                }
            }]
        });
        var nameForCount = '';
        var selectionCount = 0;
        for (i = 0; i < me.scheduleList.length; i++) {
            var dailyArray = me.scheduleList[i];
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
        getPlanContent = function (jahr, countFoSelection, selectedJahr) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            
            var nameForLoad = jahr.split(':');
            var roleName = nameForLoad[0];
            var countNumber = parseInt(countFoSelection) + 1;
            var roleNameToHistory = jahr + ' (' + countNumber + ')';
            
            var historyButton = Ext.getCmp('historyButton');
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + roleNameToHistory + '</font>', icon: 'resources/images/Calendar-17.png'
            });
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            
            var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">' + roleNameToHistory + '</font>', menuItem.id);
            if (! isFoundItem) {
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + roleNameToHistory + '</font>',
                    icon: 'resources/images/Calendar-17.png',
                    id: 'spielplaene_' + selectedJahr + me.selectedWorkID+countFoSelection
                });
                console.log(selectedJahr);
                var personDetails = new TheaterTool.view.tabPanel.playSchedules.SchedulePanelInTab({
                    year: selectedJahr, monat: selectedJahr, selectedWorkID: me.selectedWorkID, count: countFoSelection, selectedReport: roleName
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
            dataIndex: 'monat',
            renderer: function (val, metadata, record) {
                var presentationText = '';
                if (record.data.dbkey !== '') {
                    var countNumber = parseInt(record.data.countFoSelection) + 1;
                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"><a href="javascript:getPlanContent(\'' + record.data.jahr + '\'' + ', \'' + record.data.countFoSelection + '\',\'' + record.data.selectedJahr + '\');">' + record.data.jahr + '(' + countNumber + ')' + '</a></small>';
                } else {
                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"> ' + record.data.monat + ' </small>';
                }
                return presentationText;
            }
        });
        return eColumn;
    }
});