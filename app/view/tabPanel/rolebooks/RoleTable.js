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
	sortableColumns: false,
	
	border:false,
	store: null,
	rowLines: true,
    columnLines: true,
    tablePanel: null,
   
	detailsColumn: null,
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
for(i = 0; i < me.lineList.rows.length; i++){
            var one_row = me.lineList.rows[i]; 
            
            if(columnNumber < one_row.cells.length){
                columnNumber = one_row.cells.length;
            }
            
            var workName = '';
             var workKey = '';
             var workDetails_1 = '';
             var workDetails_2 = '';
             var workDate = '';
             var isContent = false;
             var personObject = '';
             
            for(j = 0; j < one_row.cells.length; j++){
                var oneColumn = one_row.cells[j];
                //console.log(typeof oneColumn);
                var workArray = oneColumn.work;
                var dateObject = oneColumn.date;
                
                if(typeof workArray !== 'undefined'){
                    workName = workArray[0];
                    workKey = workArray[1];
                    
                    if(typeof workArray[2] !== 'undefined'){
                    //console.log(workArray[2]);
                        isContent = true;
                    }
                }
                else if(typeof oneColumn.workpersons !== 'undefined' && oneColumn.workpersons.length > 0){
                    personObject = oneColumn;
                    //console.log(personObject);
                }
                else if(typeof dateObject !== 'undefined'){
                    workDate = dateObject[0];
                }
                else{   
                    if(workDetails_1 === ''){
                        workDetails_1  = oneColumn;  
                    } 
                    else{
                        workDetails_2  = oneColumn; 
                    }          
            }
               
            }
            
            
            
             var one_line = Ext.create('TheaterTool.model.Theaterakte', {
    			      name : workName,
    			      workKey: workKey,
    			      details1 : workDetails_1, 
    			      details2 : workDetails_2,
    			      date: workDate,
    			      createContent: isContent,
    			      persons: personObject
    			      //anmerkung: one_row[2] 
			             });
			         me.store.add(one_line);
            
            
            
            
			
			}
	}
	
	
	var objs = new Array();
	
		me.detailsColumn = this.createColumn('Werk', 'resources/images/Door-24.png', 'name');
		
		//var extendColumn = this.createColumn('Tiefenerschliessung', '');
		
		var col_date = Ext.create('Ext.grid.column.Column', {			
			xtype: 'gridcolumn',
			header: 'Datum',
			flex: 1,			
			menuDisabled: true,
			dataIndex: 'date'			
			//align: 'center'
			
			
		});
		objs[0] = col_date;
		
		/*var col_work = Ext.create('Ext.grid.column.Column', {			
			xtype: 'gridcolumn',
		    header: 'Werk',
			flex: 2,			
			menuDisabled: true,
			dataIndex: 'name'			
			//align: 'center'
			
			
		});
		objs[1] = col_work;*/
		
		objs[1] = me.detailsColumn;
		
		var index = 1;
		//console.log(columnNumber);
		for(i = 1; i < columnNumber; i++){
		    var col = Ext.create('Ext.grid.column.Column', {			
			xtype: 'gridcolumn',
			//header: headerName,
			flex: 1,			
			menuDisabled: true,
			dataIndex: 'details'+i
		});
		index = i+1;
		objs[index] = col;
		
		}
		
		var col_person = this.createColumn('Personen', 'resources/images/Door-24.png', 'persons');
		/*var col_person = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
		    header: 'Personen',
			flex: 1,			
			menuDisabled: true,
			dataIndex: 'persons',
            renderer: function(val, metadata, record) {
            console.log(metadata);
            if(this.header === 'Personen'){
			         if(typeof record.data.persons.workpersons !== 'undefined'){
					   this.items[0].icon = 'resources/images/Door-24.png';
					   return '<div style="float: right; clear: left; font-size: 11px; line-height: 1em;">'
                            + record.data.persons.workpersons[0]+'</div>';
				    }				
				    else {					
					   this.items[0].icon = '';
					   return '<font style="right; font-size: 11px; line-height: 1em;">'
                + record.data.persons.workpersons[0] 
            + '</font>';
				    }
			     
					
				}
				else{
				
				    return val;
				}
            
            
      
                    }			
		});*/
		objs[index+1] = col_person;
		var col_inhalt = Ext.create('Ext.grid.column.Column', {			
			xtype: 'gridcolumn',
		    header: 'Inhaltdetails',
			flex: 1,			
			menuDisabled: true,
			dataIndex: 'createContent'			
		});
		objs[index+2] = col_inhalt;
		
		me.columns = objs;
		
		me.callParent();
	},
	
	createColumn: function (headerName, path, dataind) {		
		var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			header: headerName,
			flex: 2.5,			
			menuDisabled: true,
			dataIndex: dataind,			
			//align: 'center',
			renderer: function (val, metadata, record) {
			     if(headerName === 'Werk'){
			         if(record.data.workKey !== ''){
					   this.items[0].icon = path;
					   return '<div style="float: right; font-size: 11px; line-height: 1em;">'
                            + record.data.name+'</div>';
				    }				
				    else {					
					   this.items[0].icon = '';
					   return '<font style="right; font-size: 11px; line-height: 1em;">'
                + record.data.name 
            + '</font>';
				    }
			     
					
				}
				else if(headerName === 'Personen'){
				console.log(record.data.persons);
			         if(record.data.persons !== ''){
			             if(record.data.persons.workpersons.lenght > 2){
			                 
			             }
			             
			             
			            /* items: [{
                icon: 'resources/images/Door-24.png',  // Use a URL in the icon config
                tooltip: 'Edit',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    alert("Edit " + rec.get('firstname'));
                }
            },{
                icon: 'resources/images/Door-24.png',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    alert("Terminate " + rec.get('firstname'));
                }                
            }]*/
			         
			         
					   this.items[0].icon = 'resources/images/Door-24.png';
					   return '<div style="float: right; font-size: 11px; line-height: 1em;">'
                            + record.data.persons.workpersons[0]+'</div>'+'<div style="float: right; font-size: 11px; line-height: 1em;">'
                            + record.data.persons.workpersons[0]+'</div>';
				    }				
				    else {					
					   this.items[0].icon = '';
					   /*return '<font style="right; font-size: 11px; line-height: 1em;">'
                + record.data.persons.workpersons
            + '</font>';*/
				    }
			     
					
				}
				
				else{
				
				    return val;
				}
			
			
			
				/*if(headerName == 'Werkdetails'){
					if(record.data.workKey !== ''){
					this.items[0].icon = path;					
				}				
				else {					
					this.items[0].icon = '';
				}
				}*/
				
				/*metadata.style = 'cursor: pointer;';			
				return val;*/
			},
			
			handler: function(grid, rowIndex, colIndex) {
			
			 if(colIndex === 1){
			     var rec = grid.getStore().getAt(rowIndex);
					var dbkey = rec.data.workKey;
					if(dbkey != ''){
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
                    
                }
		});
		return eColumn;
	},
	
	
	setTablePanel: function(tablePanel){
	this.tablePanel=tablePanel;
}


});


