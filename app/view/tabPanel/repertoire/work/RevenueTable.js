Ext.define('TheaterTool.view.tabPanel.repertoire.work.RevenueTable', {
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
	title: '<b style="color:gray;">Einnahmen</b>',
	icon: 'resources/images/MoneyBox-17.png',
	margin: '0 10 10 120',
	store: null,
	columnLines: true,
	detailsColumn: null,
	revenueList: null,
     
	initComponent: function () {
	
	   var me = this;
	
	   me.store = Ext.create('Ext.data.Store', {
	       model: 'TheaterTool.model.RefData',
         data:[]
        });

        for(i = 0; i < me.revenueList.length; i++){
            var datum = me.revenueList[i];
            var split_array = datum.split(' ');
			var role = Ext.create('TheaterTool.model.RefData', {
    			jahr : split_array[1],
    			monat: split_array[0]
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
		{
			text: 'Monat',
			flex: 2,
			menuDisabled: true,
			dataIndex: 'monat'
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


