Ext.define('TheaterTool.view.tabPanel.repertoire.work.RevenueTable', {
	extend: 'Ext.grid.Panel',
	
	requires:[
	 'Ext.grid.column.Action',
	 // TODO
	'TheaterTool.model.Plan'
	],
	
	layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	flex:1,
	
	title: '<b style="color:gray;">Einnahmen</b>',
	
	margin: '0 7 0 120',
	
	//xtype: 'array-grid',
	//rootVisible: false,
	//store: store ,
	xmlColumn: null,
	
	detailsColumn: null,
	
            
           // bodyStyle:{"grid-row-cell-background-color":"#ffc"},
    
	
	
	initComponent: function () {
	
	//this.xmlColumn = this.createColumn('XML', 'resources/images/Download.png');
		
		this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
		
		// TODO
		this.columns =[ 
		Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			//header: 'Details',
			flex:0.3,
			align: 'center',
			menuDisabled: true,
			renderer: function (val, metadata, record) {
			    this.items[0].icon = 'resources/images/MoneyBox-17.png';
				metadata.style = 'cursor: pointer;';
				return val;
			}
		}),
		{
			//xtype: 'treecolumn',
			text: 'Jahr',
			flex: 2,
			sortable: true,
			dataIndex: 'jahr'
			
		},
		{
			text: 'Monat',
			flex: 2,
			sortable: true,
			dataIndex: 'monat'
		},
		this.detailsColumn
		//this.xmlColumn
		];
		
		
		/*this.viewConfig = {
        getRowClass: function(record, index) {
            var c = record.get('change');
            if (c < 0) {
                return 'price-fall';
                console.log(index);
            } else if (c > 0) {
                return 'price-rise';
            }
        }
    }*/
	
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
			
			console.log(record.data);
			
			if(headerName == 'Details'){
					if(record.data.details === true){
					this.items[0].icon = path;					
				}				
				else {					
					this.items[0].icon = '';
				}
				}
				
				metadata.style = 'cursor: pointer;';
				return val;
			}
			//handler: this.changeElementDialog
		});
		return eColumn;
	}


});


