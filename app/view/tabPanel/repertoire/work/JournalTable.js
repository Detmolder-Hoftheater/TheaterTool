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
    data:[]
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
			}
			//handler: this.changeElementDialog
		});
		return eColumn;
	}


});


