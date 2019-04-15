Ext.define('TheaterTool.view.tabPanel.repertoire.PersonTable', {
    extend: 'Ext.grid.Panel',
    
    requires:[
    'Ext.grid.column.Action',
    'TheaterTool.model.Person'],
    
    xmlColumn: null,
    
    detailsColumn: null,
    
    initComponent: function () {
        
        this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
        
        
        this.columns =[ {
            text: 'Name',
            flex: 2,
            sortable: true,
            dataIndex: 'name'
        },
        this.detailsColumn];
        
        this.callParent();
    },
    
    createColumn: function (headerName, path) {
        
        var eColumn = Ext.create('Ext.grid.column.Action', {
            xtype: 'actioncolumn',
            header: headerName,
            flex: 1,
            align: 'center',
            menuDisabled: true,
            renderer: function (val, metadata, record) {
                
                if (headerName == 'Details') {
                    if (record.data.details === true) {
                        this.items[0].icon = path;
                    } else {
                        this.items[0].icon = '';
                    }
                }
                
                metadata.style = 'cursor: pointer;';
                return val;
            },
            handler: function (grid, rowIndex, colIndex) {
                var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                var existItems = navTreeGlobal.items;
                var rec = grid.getStore().getAt(rowIndex);
                var dbkey = rec.data.dbkey;
                var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, dbkey);
                if (! isFoundItem) {
                    var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                        title: '<font style="color:gray;">' + rec.data.name + '</font>',
                        icon: 'resources/images/Mask-19.png'
                    });
                    var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({
                        dbkey: dbkey,
                        title: '<font size="2" face="Arial" style="color:#A87678;">Person: ' + rec.data.name + '</font>', icon: 'resources/images/Mask-19.png'
                    });
                    repertoireTab.add(personDetails);
                    
                    navTreeGlobal.add(repertoireTab);
                    navTreeGlobal.setActiveTab(repertoireTab);
                    navTreeGlobal.fireEvent('render', navTreeGlobal);
                }
            }
        });
        return eColumn;
    }
});