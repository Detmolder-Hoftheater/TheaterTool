Ext.define('TheaterTool.view.tabPanel.repertoire.work.JournalTable', {
	extend: 'Ext.grid.Panel',	
	requires:[
	 'Ext.grid.column.Action',
	'TheaterTool.model.RefData'
	],
	
	layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	flex:1,
	sortableColumns: false,
	title: '<b style="color:gray;">Theaterjournal</b>',
	icon: 'resources/images/Presse-16.png',
	store: null,
	columnLines: true,	
	detailsColumn: null,
	margin: '0 10 10 120',
	journalList: null,
   
	initComponent: function () {
	
	   var me = this;
	
	me.store = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.RefData',
    data:[],
    sorters: [{
        sorterFn: function(o1, o2){
            var getRank = function(o){
                var name = o.get('jahr');
                var numberJahr = parseInt(name);               
                return numberJahr;
            },
            rank1 = getRank(o1),
            rank2 = getRank(o2);

            if (rank1 === rank2) {
                return 0;
            }

            return rank1 < rank2 ? -1 : 1;
        }
    }]
});

for(i = 0; i < me.journalList.length; i++){
            var datum = me.journalList[i];
			var role = Ext.create('TheaterTool.model.RefData', {
    			jahr : datum
			});
			me.store.add(role);
			}
	
		this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
		
		this.columns =[ 
		
		{
			text: 'Jahr',
			flex: 2,
			menuDisabled: true,
			dataIndex: 'jahr'
			
		},
		this.detailsColumn
		];
		
		this.callParent();
	},
	
	createColumn: function (headerName, path) {
		
		var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			header: headerName,
			flex:1,
			align: 'center',
			menuDisabled: true,
			renderer: function (val, metadata, record) {
			
			if(headerName == 'Details'){
					this.items[0].icon = path;					
				}
				
				metadata.style = 'cursor: pointer;';
				return val;
			},
			handler: function(grid, rowIndex, colIndex) {
			        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
			        var existItems = navTreeGlobal.items;
                    var rec = grid.getStore().getAt(rowIndex);
                    var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">'+rec.data.jahr+'</font>');
                    if (! isFoundItem) {
					var dbkey = rec.data.jahr;
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+rec.data.jahr+'</font>',
						icon: 'resources/images/Presse-16.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.journal.JournalPanelInTab({regieName: dbkey});
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


