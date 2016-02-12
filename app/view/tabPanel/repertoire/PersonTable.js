var store = Ext.create('Ext.data.Store', {
    model: 'TheaterTool.model.Person',
    data: [
        { name: 'Isouard', vorname: 'Nicolas', xml: true, details: true },
        { name: 'Herklots', vorname: 'Karl Alexander', xml: true, details: true }
       
    ]
});


Ext.define('TheaterTool.view.tabPanel.repertoire.PersonTree', {
	extend: 'Ext.grid.Panel',
	
	requires:[
	 'Ext.grid.column.Action',
	'TheaterTool.model.Person'
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
			text: 'Name',
			flex: 2,
			sortable: true,
			dataIndex: 'name'
			
		},
		{
			text: 'Vorname',
			flex: 2,
			sortable: true,
			dataIndex: 'vorname'
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


