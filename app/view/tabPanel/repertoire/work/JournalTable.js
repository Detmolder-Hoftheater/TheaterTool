Ext.define('TheaterTool.view.tabPanel.repertoire.work.JournalTable', {
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
	sortableColumns: false,
	title: '<b style="color:gray;">Theaterjournal</b>',
	icon: 'resources/images/Presse-16.png',
	//xtype: 'array-grid',
	//rootVisible: false,
	//store: store ,
	xmlColumn: null,
	columnLines: true,
	
	detailsColumn: null,
	//bodyPadding: 10,
	margin: '0 10 10 120',
            
           // bodyStyle:{"grid-row-cell-background-color":"#ffc"},
    
	
	
	initComponent: function () {
	
	//this.xmlColumn = this.createColumn('XML', 'resources/images/Download.png');
		
		this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
		
		// TODO
		this.columns =[ 
		
		{
			//xtype: 'treecolumn',
			text: 'Jahr',
			flex: 2,
			menuDisabled: true,
			dataIndex: 'jahr'
			
		},
		/*{
			text: 'Monat',
			flex: 2,
			sortable: true,
			dataIndex: 'monat'
		},*/
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


