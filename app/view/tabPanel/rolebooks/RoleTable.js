Ext.define('TheaterTool.view.tabPanel.rolebooks.RoleTable', {
	extend: 'Ext.grid.Panel',	
	requires:[
	 'Ext.grid.column.Action',
	'TheaterTool.model.Theaterakte'
	],
	
	layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	flex:1,
	sortableColumns: false,
	border: false,
	bodyBorder: false,
	hideHeaders: true,
	//title: '<b style="color:gray;">Suchergebnisse: Werke</b>',
	//icon: 'resources/images/BooksVert-17.png',
	store: null,
	columnLines: true,	
	detailsColumn: null,
	//margin: '0 10 10 120',
	lineList: null,
   
	initComponent: function () {
	
	   var me = this;
	
	me.store = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.Theaterakte',
    data:[]
});

if(me.lineList != 'undefined'){
console.log(me.lineList);
for(i = 0; i < me.lineList.length; i++){
            var one_row = me.lineList[i];
            
			var one_line = Ext.create('TheaterTool.model.Theaterakte', {
    			name : one_row[0],
    			anmerkung: one_row[2],
    			details : one_row[1]
			});
			me.store.add(one_line);
			}
	}
		//this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
		
		//var extendColumn = this.createColumn('Tiefenerschliessung', '');
		
		me.columns =[ 
		//extendColumn,
		
		{
			//text: 'Titel',
			flex: 1.5,
			menuDisabled: true,
			dataIndex: 'name'
			
		},
		{
			//text: 'Titel Type',
			flex: 0.7,
			menuDisabled: true,
			dataIndex: 'details'
			
		},
		{
			//text: 'Sprache',
			flex: 3,
			menuDisabled: true,
			dataIndex: 'anmerkung'
			
		}
		//this.detailsColumn
		];
		
		me.callParent();
	},
	
	createColumn: function (headerName, path) {
		
		var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			header: headerName,
			flex:0.5,
			align: 'center',
			menuDisabled: true,
			renderer: function (val, metadata, record) {
			
			if(headerName == 'Details'){
					this.items[0].icon = path;	
				}
								
				if(headerName == 'Tiefenerschliessung'){
				  
					this.items[0].icon = record.data.iconExtend;					
				}
				
				metadata.style = 'cursor: pointer;';
				
				/*if(headerName == 'Details'){
					return '<div style="float:right; font-size: 13px; line-height: 1em;">'
                + 'Hey!' 
            + '</div>';
				}
				else{*/
				    return val;
			//	}
				
			},
			
			handler: function(grid, rowIndex, colIndex) {
			 if(colIndex === 6){
			     var rec = grid.getStore().getAt(rowIndex);
					var dbkey = rec.data.workid;
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+rec.data.name+'</font>',
						icon: 'resources/images/BookBlau-16.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({selection: dbkey, isSelected: true});
					repertoireTab.add(personDetails);

					var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
					navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);	
					navTreeGlobal.fireEvent('render', Ext.getCmp('tabpanel'));		     
			 }
                    
                }
		});
		return eColumn;
	}


});


