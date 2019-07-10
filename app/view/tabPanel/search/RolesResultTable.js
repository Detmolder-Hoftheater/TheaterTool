Ext.define('TheaterTool.view.tabPanel.search.RolesResultTable', {
    extend: 'Ext.grid.Panel',
    requires:[
    'Ext.grid.column.Action',
    'TheaterTool.model.Person'],
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    flex: 1,
    sortableColumns: false,
    border: false,
    icon: 'resources/images/theatreB.png',
    store: null,
    columnLines: true,
    detailsColumn: null,
    personList: null,
    searchValue: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.Person',
            data:[]
        });
        
        if (me.personList != 'undefined') {
            
            var options = {
                keys:[ 'title'],
                threshold: 0.5
            };
            var fuse = new Fuse(me.personList, options);
            
            var resPers = fuse.search(me.searchValue);
            //console.log(resPers);
            if (me.searchValue === '') {
                resPers = me.personList;
            }
            for (i = 0; i < resPers.length; i++) {
                var work = resPers[i];
                
                
                var workRow = Ext.create('TheaterTool.model.Person', {
                    name: work.title,
                    dbkey: work.dbkey
                });
                me.store.add(workRow);
            }
        }
        this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
        
        
        this.columns =[ {
            xtype: 'rownumberer',
            text: 'Nr.',
            flex: 0.2,
            align: 'center'
        }, {
            text: 'Name',
            flex: 2,
            menuDisabled: true,
            dataIndex: 'name'
        }, 
        this.detailsColumn];
        
        this.callParent();
    },
    
    createColumn: function (headerName, path) {
        
        var eColumn = Ext.create('Ext.grid.column.Action', {
            xtype: 'actioncolumn',
            header: headerName,
            flex: 0.5,
            align: 'center',
            menuDisabled: true,
            renderer: function (val, metadata, record) {
                
                if (headerName == 'Details') {
                    this.items[0].icon = path;
                }
                
                if (headerName == 'Tiefenerschliessung') {
                    
                    this.items[0].icon = record.data.iconExtend;
                }
                
                metadata.style = 'cursor: pointer;';
                
                return val;
            },
            
            handler: function (grid, rowIndex, colIndex) {
                if (colIndex === 2) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var dbkey = rec.data.dbkey;
                    
                    var historyButton = Ext.getCmp('historyButton');
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + rec.data.name + '</font>', icon: 'resources/images/theatreB.png', dbkey: dbkey
                    });
                    
                    var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                    var existItems = navTreeGlobal.items;
                    var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, dbkey, menuItem.id);
                    if (! isFoundItem) {
                        
                        var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + rec.data.name + '</font>',
                            icon: 'resources/images/theatreB.png',
                            id: 'role_' + dbkey
                        });
                        
                        
                        var personDetails = new TheaterTool.view.tabPanel.roles.RolePanelInTab({
                    dbkey: dbkey, icon: 'resources/images/theatreB.png', title: '<font size="2" face="Tahoma" style="color:#909090;">Rolle: ' + rec.data.name + '</font>'
                });
                        
                        repertoireTab.add(personDetails);
                        
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                        
                        navTreeGlobal.add(repertoireTab);
                        navTreeGlobal.setActiveTab(repertoireTab);
                        navTreeGlobal.fireEvent('render', Ext.getCmp('HoftheaterDetmold'));
                    }
                }
            }
        });
        return eColumn;
    }
});