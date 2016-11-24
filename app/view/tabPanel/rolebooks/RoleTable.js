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
	style: {
				borderRight: '5px solid #f4f4f4'
			},
	flex:1,
	//xtype: 'grouped-header-grid',
	sortableColumns: false,
	
	border:false,
    //useArrows: true,
    //rootVisible: false,
    //flex:1,
	
	
	//title: '<b style="color:gray;">Suchergebnisse: Werke</b>',
	//icon: 'resources/images/BooksVert-17.png',
	store: null,
	rowLines: true,
    columnLines: true,
    tablePanel: null,
   // reserveScrollbar: true,
	
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
//console.log(me.lineList);


for(i = 0; i < me.lineList.length; i++){
            var one_row = me.lineList[i]; 
            var arrayTmp = one_row[0];
           
                for(j = 0; j < arrayTmp.length; j++){
                    var nameResult = arrayTmp[j];
                
                      var one_line = Ext.create('TheaterTool.model.Theaterakte', {
    			      name : nameResult[0],
    			      workKey: nameResult[1],
    			      details : one_row[1],
    			      anmerkung: one_row[2] 
			     });
			    me.store.add(one_line);
                 }
            
			
			}
	}
		me.detailsColumn = this.createColumn('Werkdetails', 'resources/images/Door-24.png');
		
		//var extendColumn = this.createColumn('Tiefenerschliessung', '');
		
		me.columns =[ 
		//extendColumn,
		//me.detailsColumn,
		{
		
			//text: 'Werk',
			flex: 2,
			menuDisabled: true,
			dataIndex: 'name'
			
		},
		{
			//text: 'Seite',
			flex: 1,
			//width    : 75,
			menuDisabled: true,
			dataIndex: 'details'
			
		},
		/*{
			//text: 'Sprache',
			flex: 2,
			//width    : 80,
			menuDisabled: true,
			dataIndex: 'anmerkung'
			
		},*/
		this.detailsColumn,
		{
			text: 'Inhaltdetails',
			flex: 0.7,
			//width    : 75,
			menuDisabled: true
			//dataIndex: 'anmerkung'
			
		}

		];
		
		me.callParent();
	},
	
	createColumn: function (headerName, path) {		
		var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			header: headerName,
			flex: 0.7,			
			menuDisabled: true,
			//dataIndex: 'name',			
			align: 'center',
			renderer: function (val, metadata, record) {
				if(headerName == 'Werkdetails'){
					if(record.data.workKey !== ''){
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
			
			 if(colIndex === 2){
			     var rec = grid.getStore().getAt(rowIndex);
					var dbkey = rec.data.workKey;
					var workIcon = '';
					if(extWorkKeys.indexOf('dbkey') > -1){
					    workIcon = 'resources/images/BookBlau-16.png';
					}
					else{
					    workIcon = 'resources/images/Books1-17.png';
					}
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+rec.data.name+'</font>',
						icon: workIcon
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
	},
	
	
	setTablePanel: function(tablePanel){
	this.tablePanel=tablePanel;
}


});


