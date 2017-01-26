Ext.define('TheaterTool.view.tabPanel.GagenTable', {
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
	title: '<b style="color:gray;">Gagenbücher</b>',
	icon: 'resources/images/Gift-17.png',
	store: null,
	columnLines: true,	
	detailsColumn: null,
	margin: '0 10 10 120',
	gagenList: null,
   
	initComponent: function () {
	
	   var me = this;
	
	me.store = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.RefData',
    data:[]
});

for(i = 0; i < me.gagenList.length; i++){
            var role = Ext.create('TheaterTool.model.RefData', {
    			name : me.gagenList[i]
			});
			me.store.add(role);
			}
	
		this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
		
		this.columns =[ 
		
		{
			text: 'Name',
			flex: 2,
			menuDisabled: true,
			dataIndex: 'name'
			
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
					var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">'+rec.data.name+'</font>');
                    if (! isFoundItem) {
					var dbkey = rec.data.name;
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+rec.data.name+'</font>',
						icon: 'resources/images/Gift-17.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.gagebooks.GageBookPanelInTab({regieName: dbkey});
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


