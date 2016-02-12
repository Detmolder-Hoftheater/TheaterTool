var store = Ext.create('Ext.data.Store', {
    model: 'TheaterTool.model.Plan',
    data: [
        { jahr: '1825', monat: 'Februar', xml: true, details: true },
        { jahr: '1826', monat: 'Oktober', xml: true, details: true }
       
    ]
});


Ext.define('TheaterTool.view.tabPanel.repertoire.work.PlanTable', {
	extend: 'Ext.grid.Panel',
	
	requires:[
	 'Ext.grid.column.Action',
	'TheaterTool.model.Plan'
	],
	
	//xtype: 'array-grid',
	//rootVisible: false,
	store: store ,
	xmlColumn: null,
	
	detailsColumn: null,
	
            
           // bodyStyle:{"grid-row-cell-background-color":"#ffc"},
    
	
	
	initComponent: function () {
	
	this.xmlColumn = this.createColumn('XML', 'resources/images/Load.png');
		
		this.detailsColumn = this.createColumn('Details', 'resources/images/Folder.png');
		
		
		this.columns =[ {
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
		this.detailsColumn,
		this.xmlColumn
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
			
			if(headerName == 'XML'){
				if(record.data.xml === true){
					this.items[0].icon = path;					
				}
				else {					
					this.items[0].icon = '';
				}				
			}
				else if(headerName == 'Details'){
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


