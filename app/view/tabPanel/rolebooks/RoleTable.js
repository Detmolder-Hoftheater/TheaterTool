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

var columnNumber = 0;
for(i = 0; i < me.lineList.length; i++){
            var one_row = me.lineList[i]; 
            
            if(columnNumber < one_row.length){
                columnNumber = one_row.length;
            }
            
            var workName = '';
             var workKey = '';
             var workDetails = '';
             console.log(one_row);
            for(j = 0; j < one_row.length; j++){
                var oneColumn = one_row[j];
                          
             for(k = 0; k < oneColumn.length; k++){
                    var nameResult = oneColumn[k];
                    
                    if(nameResult.length > 1){
                      workName = nameResult[0];
                      workKey = nameResult[1];
                      workDetails = nameResult[3];
                    }
                    else{
                        workDetails = nameResult[0];
                    }
                   } 
                      
            }
             var one_line = Ext.create('TheaterTool.model.Theaterakte', {
    			      name : workName,
    			      workKey: workKey,
    			      details : workDetails 
    			      //anmerkung: one_row[2] 
			             });
			         me.store.add(one_line);
            
            
            
            
			
			}
	}
	
	
	var objs = new Array();
	
		me.detailsColumn = this.createColumn('Werkdetails', 'resources/images/Door-24.png');
		
		//var extendColumn = this.createColumn('Tiefenerschliessung', '');
		
		var col_date = Ext.create('Ext.grid.column.Column', {			
			xtype: 'gridcolumn',
			header: 'Datum',
			flex: 0.7,			
			menuDisabled: true,
			dataIndex: 'date'			
			//align: 'center'
			
			
		});
		objs[0] = col_date;
		
		var col_work = Ext.create('Ext.grid.column.Column', {			
			xtype: 'gridcolumn',
		    header: 'Werk',
			flex: 2,			
			menuDisabled: true,
			dataIndex: 'name'			
			//align: 'center'
			
			
		});
		objs[1] = col_work;
		//me.headerCt.insert(me.columns.length, col_work);
		//me.columns.add(col_work);
		//me.headerCt.insert(me.columns.length, me.detailsColumn);
		objs[2] = me.detailsColumn;
		//me.columns.add(me.detailsColumn);
		
		for(i = 0; i < columnNumber-1; i++){
		    var col = Ext.create('Ext.grid.column.Column', {			
			xtype: 'gridcolumn',
			//header: headerName,
			flex: 0.7,			
			menuDisabled: true,
			dataIndex: 'details'			
			//align: 'center'
			
			
		});
		objs[i+3] = col;
		//me.headerCt.insert(me.columns.length, col);
		//me.columns.add(col);
		}
		
		me.columns = objs;
		
		/*me.columns =[ 
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
		this.detailsColumn,
		{
			text: 'Inhaltdetails',
			flex: 0.7,
			//width    : 75,
			menuDisabled: true
			//dataIndex: 'anmerkung'
			
		}

		];*/
		
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


