Ext.define('TheaterTool.view.tabPanel.search.WorkResultTable', {
    extend: 'Ext.grid.Panel',
    requires:[
    'Ext.grid.column.Action',
    'TheaterTool.model.SearchWork'],
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    
    flex: 1,
    sortableColumns: false,
    border: false,
    bodyBorder: false,
    icon: 'resources/images/BooksVert-17.png',
    store: null,
    columnLines: true,
    detailsColumn: null,
    worksList: null,
    searchValue: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
            model: 'TheaterTool.model.SearchWork',
            data:[]
        });
        
        if (me.worksList != 'undefined') {
            
            var options = {
                keys:[ 'title'],
                threshold: 0.3
            };
            var fuse = new Fuse(me.worksList, options);
            
            var resWorks = fuse.search(me.searchValue);
            
            if(me.searchValue === ''){
                resPers = me.worksList;
            }
            
            for (i = 0; i < resWorks.length; i++) {
                var work = resWorks[i];
                
                var iconExtend = '';
                if (work.dbkey === 'H020149' || work.dbkey === 'H020048' || work.dbkey === 'H020263') {
                    iconExtend = 'resources/images/BookBlau-17.png';
                } else {
                    iconExtend = 'resources/images/Books1-17.png';
                }
                
                var nameTypeLong = '';
                var nameTypeShort = work.type;
                if (nameTypeShort === 'uniform') {
                    nameTypeLong = 'Einheitstitel';
                } else if (nameTypeShort === 'alt') {
                    nameTypeLong = 'Alternativtitel';
                }
                
                
                var workRow = Ext.create('TheaterTool.model.SearchWork', {
                    name: work.title,
                    iconExtend: iconExtend,
                    personen: work.authors,
                    workid: work.dbkey,
                    language: work.lang,
                    nametype: nameTypeLong
                });
                me.store.add(workRow);
            }
        }
        me.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
        
        var extendColumn = this.createColumn('Tiefenerschliessung', '');
        
        me.columns =[ {
            xtype: 'rownumberer',
            text: 'Nr.',
            flex: 0.2,
            align: 'center'
        },
        extendColumn, {
            text: 'Titel',
            flex: 2,
            menuDisabled: true,
            dataIndex: 'name'
        }, {
            text: 'Titel Type',
            flex: 0.7,
            menuDisabled: true,
            dataIndex: 'nametype'
        }, {
            text: 'Sprache',
            flex: 0.7,
            menuDisabled: true,
            dataIndex: 'language'
        }, {
            text: 'Personen',
            flex: 2,
            menuDisabled: true,
            dataIndex: 'personen'
        },
        me.detailsColumn];
        
        
        /*var books = [{
        'ISBN': 'A',
        'title': "Oldisch Man's War",
        'author': 'John Scalzi drüben'
        }, {
        'ISBN': 'B',
        'title': 'The Lock Artist',
        'author': 'Steve Hamilton'
        }];*/
        
        
        
        me.callParent();
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
                if (colIndex === 6) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var dbkey = rec.data.workid;
                    
                    var workIcon = '';
                    if (extWorkKeys.indexOf(dbkey) > -1) {
                        workIcon = 'resources/images/BookBlau-16.png';
                    } else {
                        workIcon = 'resources/images/Books1-17.png';
                    }
                    
                    var historyButton = Ext.getCmp('historyButton');
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + rec.data.name + '</font>', icon: workIcon, dbkey: dbkey
                    });
                    
                    var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                    var existItems = navTreeGlobal.items;
                    var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, dbkey, menuItem.id);
                    if (! isFoundItem) {
                        
                        var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + rec.data.name + '</font>',
                            icon: workIcon,
                            id: 'werk_' + dbkey
                        });
                        var personDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                            selection: dbkey, isSelected: true, workName: rec.data.name, workIcon: workIcon
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