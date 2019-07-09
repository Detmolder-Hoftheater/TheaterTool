Ext.define('TheaterTool.view.tabPanel.search.PersonResultTable', {
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
    icon: 'resources/images/Mask-19.png',
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
            keys: ['title'],
            threshold: 0.3         
        };
        var fuse = new Fuse(me.personList, options);

        var resPers = fuse.search(me.searchValue);
        
            for (i = 0; i < resPers.length; i++) {
                var work = resPers[i];
                
                var nameTypeLong = '';
                var nameTypeShort = work.type;
                if (nameTypeShort === 'uniform') {
                    nameTypeLong = 'Einheitstitel';
                } else if (nameTypeShort === 'alt') {
                    nameTypeLong = 'Alternativtitel';
                } else if (nameTypeShort === 'sub') {
                    nameTypeLong = 'Untertitel';
                }
                
                var workRow = Ext.create('TheaterTool.model.Person', {
                    name: work.title,
                    dbkey: work.dbkey,
                    type: work.type
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
        }, {
            text: 'Name Type',
            flex: 0.7,
            menuDisabled: true,
            dataIndex: 'type'
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
                if (colIndex === 3) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var dbkey = rec.data.dbkey;
                    
                    var historyButton = Ext.getCmp('historyButton');
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + rec.data.name + '</font>', icon: 'resources/images/Mask-19.png', dbkey: dbkey
                    });
                    
                    var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                    var existItems = navTreeGlobal.items;
                    var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, dbkey, menuItem.id);
                    if (! isFoundItem) {
                        
                        var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + rec.data.name + '</font>',
                            icon: 'resources/images/Mask-19.png',
                            id: 'person_' + dbkey
                        });
                        var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({
                            dbkey: dbkey, title: '<font size="2" face="Tahoma" style="color:#909090;">Person: ' + rec.data.name + '</font>',
                            icon: 'resources/images/Mask-19.png'
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