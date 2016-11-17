Ext.define('TheaterTool.view.tabPanel.repertoire.PersonTable', {
	extend: 'Ext.grid.Panel',
	
	requires:[
	 'Ext.grid.column.Action',
	'TheaterTool.model.Person'
	],
	
	//xtype: 'array-grid',
	//rootVisible: false,
	//store: store ,
	xmlColumn: null,
	
	detailsColumn: null,
	
            
           // bodyStyle:{"grid-row-cell-background-color":"#ffc"},
    
	
	
	initComponent: function () {
	
		this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
		
		
		this.columns =[ {
			text: 'Name',
			flex: 2,
			sortable: true,
			dataIndex: 'name'
			
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
			},
			handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
					console.log(rec);
					var dbkey = rec.data.dbkey;
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+rec.data.name+'</font>',
						icon: 'resources/images/Mask-19.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({dbkey: dbkey});
					repertoireTab.add(personDetails);

					var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
					navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);
					navTreeGlobal.fireEvent('render', navTreeGlobal);

                }
		});
		return eColumn;
	}


});


