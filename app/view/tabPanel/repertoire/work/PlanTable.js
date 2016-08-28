Ext.define('TheaterTool.view.tabPanel.repertoire.work.PlanTable', {
	extend: 'Ext.grid.Panel',
	
	requires:[
	 'Ext.grid.column.Action',
	'TheaterTool.model.Plan'
	],
	
	layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	flex:1,
	
	title: '<b style="color:gray;">Spielpläne</b>',
	
	//xtype: 'array-grid',
	//rootVisible: false,
	//store: store ,
	xmlColumn: null,
	columnLines: true,
	
	detailsColumn: null,
	//bodyPadding: 10,
	margin: '0 7 10 120',
	
            
           // bodyStyle:{"grid-row-cell-background-color":"#ffc"},
    
	
	
	initComponent: function () {
	
	//this.xmlColumn = this.createColumn('', 'resources/images/Download.png');
		
		this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
		
		
		this.columns =[ 
		Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			//header: 'Details',
			flex:0.3,
			align: 'center',
			menuDisabled: true,
			renderer: function (val, metadata, record) {
			    this.items[0].icon = 'resources/images/Calendar-17.png';
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


