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
	
	/*constructor: function(config) {
        config = Ext.apply({
            plugins: {
                ptype: "subtable",
                association: 'persons',
                headerWidth: 24,
                columns: [{
                    text: 'Order Id',
                    //dataIndex: 'id',
                    width: 100
                },{
                    xtype: 'datecolumn',
                    format: 'Y-m-d',
                    width: 120,
                    text: 'Date'
                    //dataIndex: 'date'
                }]
            }
        }, config);
        this.callParent([config]);
    },*/

	
	initComponent: function () {
	
	   var me = this;
	
	me.store = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.Theaterakte',
    data:[]
});

if(me.lineList != 'undefined'){
//console.log(me.lineList);

var columnNumber = 0;
var isDateColumn = false;
             var isWorkColumn = false;
             var isPersonColumn = false;
for(i = 0; i < me.lineList.rows.length; i++){
            var one_row = me.lineList.rows[i]; 
            
            if(columnNumber < one_row.cells.length){
                columnNumber = one_row.cells.length;
            }
            
            var workName = '';
             var workKey = '';
             var workDetails_1 = '';
             var detailsColumnNumber = 1;
             var workDetails_2 = '';
             var workDetails_3 = '';
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
                    isWorkColumn = true;
                    if(typeof workArray[2] !== 'undefined'){
                    //console.log(workArray[2]);
                        isContent = true;
                    }
                }
                else if(typeof oneColumn.workpersons !== 'undefined' && oneColumn.workpersons.length > 0){
                    personObject = oneColumn;
                    isPersonColumn = true;
                    //console.log(personObject);
                }
                else if(typeof dateObject !== 'undefined'){
                    workDate = dateObject[0];
                    isDateColumn = true;
                }
                else{  
                //console.log(oneColumn);
                    if(detailsColumnNumber === 1){
                        workDetails_1  = oneColumn; 
                        detailsColumnNumber = 2;
                    } 
                    else if(detailsColumnNumber === 2){
                        workDetails_2  = oneColumn; 
                        detailsColumnNumber = 3;
                    }  
                     else if(detailsColumnNumber === 3){
                        workDetails_3  = oneColumn; 
                        detailsColumnNumber = 1;
                    }  
            }
               
            }
         
            
            
            
             var one_line = Ext.create('TheaterTool.model.Theaterakte', {
    			      name : workName,
    			      workKey: workKey,
    			      details1 : workDetails_1, 
    			      details2 : workDetails_2,
    			      details3 : workDetails_3,
    			      date: workDate,
    			      createContent: isContent,
    			      persons: personObject
    			      //anmerkung: one_row[2] 
			             });
			         me.store.add(one_line);
            
            
            
            
			
			}
			   
            if(isDateColumn){
                columnNumber--;
            }
            if(isPersonColumn){
                columnNumber--;
            }
            if(isWorkColumn){
                columnNumber--;
            }
	}
	
	
	var objs = new Array();
	
		
		var tableColumns = -1;
		
		if(isDateColumn){
		    var col_date = Ext.create('Ext.grid.column.Column', {			
			xtype: 'gridcolumn',
			header: 'Datum',
			flex: 1,			
			menuDisabled: true,
			dataIndex: 'date'			
			//align: 'center'
			
			
		  });
		  tableColumns = tableColumns+1;
		  objs[tableColumns] = col_date;
		}
		
		if(isWorkColumn){
		    me.detailsColumn = this.createColumn('Werkdetails', 'resources/images/Door-24.png', 'name');
		    tableColumns = tableColumns+1;
		    objs[tableColumns] = me.detailsColumn;
		
		var col_work = Ext.create('Ext.grid.column.Column', {			
			xtype: 'gridcolumn',
		    header: 'Werk',
			flex: 2,			
			menuDisabled: true,
			dataIndex: 'name'			
			//align: 'center'
			
			
		});
		tableColumns = tableColumns+1;
		objs[tableColumns] = col_work;
		    
		}
		
		
		console.log(columnNumber);
		for(i = 1; i <= columnNumber; i++){
		    var col = Ext.create('Ext.grid.column.Column', {			
			xtype: 'gridcolumn',
			//header: headerName,
			flex: 1,			
			menuDisabled: true,
			dataIndex: 'details'+i
		});
		tableColumns = tableColumns+1;
		objs[tableColumns] = col;		
		}
		
		
		if(isPersonColumn){
		var id_index = 0;
		var col_person = Ext.create('Ext.grid.column.Column', {			
			xtype: 'gridcolumn',
			header: 'Personen',
			flex: 2,			
			menuDisabled: true,
			dataIndex: 'persons',
            renderer: 	function(value) {
            //console.log(value);
            if(value != ''){
                var retValue = ''           
            for(i = 0; i < value.workpersons.length; i++){
                var onePersData = value.workpersons[i];
                if(onePersData[1] !== ''){
                    retValue += '<p class="personhtml" id="'+onePersData[1]+'test'+id_index+'"><img src="resources/images/Door-24.png" style="left;width:18px;height:16px;">'+ onePersData[0]+'</p>';
                    id_index++;
                }
                else{
                    retValue += '<p class="personhtml">'+ onePersData[0]+'</p>';
                    
                }
                
            }
            return retValue;
            }
            
            },
            listeners: {
            //handler: function(grid, rowIndex, colIndex) {
                            click: function (grid, rowIndex, colIndex) {
                           // if(colIndex === 5){
                            var rec = grid.getStore().getAt(colIndex);
                                //console.log(rec);
                                //console.log(grid);
                                console.log(rowIndex);
                               // console.log(colIndex);
                                //this.getSelectionModel().selectRow(Store1.find("Name", value))
                               var elements = rowIndex.getElementsByClassName('personhtml');
                                //console.log(elements);
                                for (var i = 0; i < elements.length; i++) {
					               var element = elements[i];
					               var elId_tmp = element.id;
					               //console.log(elId_tmp);
					               if(elId_tmp !== ''){
					                   var idSplitArray = elId_tmp.split('test');
					             var elId = idSplitArray[0];
					              
					
					              
						          $("#" + elId_tmp).on('click', function (e) {
						          
						          
						         // console.log(e.currentTarget );
						          //var dbkey = e.currentTarget;
						          var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+elId+'</font>',
						icon: 'resources/images/Mask-19.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({dbkey: elId});
					personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">'+elId+'</font>');
					repertoireTab.add(personDetails);

					var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
					navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);	
					
						  });
					                   
					               }
					               
					             
					
				}
                        
                             
                            }
                        }
            
			//align: 'center'
			
			
		});
		
		tableColumns = tableColumns+1;
		objs[tableColumns] = col_person;
		}
		
		var col_inhalt = Ext.create('Ext.grid.column.Column', {			
			xtype: 'gridcolumn',
		    header: 'Inhaltdetails',
			flex: 1,			
			menuDisabled: true,
			dataIndex: 'createContent'			
		});
		tableColumns = tableColumns+1;
		objs[tableColumns] = col_inhalt;
		
		me.columns = objs;
		
		me.callParent();
	},
	
	createTextColumn: function (headerName, path, dataind) {
	
        var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'gridcolumn',
		    header: 'Personen',
			flex: 1,			
			menuDisabled: true,
			dataIndex: 'persons',
			
			
			renderer: function(val, metadata, record) {
            
            //console.log(metadata);
            var objs = new Array();
            if(headerName === 'Personen'){
               console.log('renderer');
               if(record.data.persons !== ''){
                   for(i = 0; i < record.data.persons.workpersons.length; i++){
			             var onePersData = record.data.persons.workpersons[i];
			              /*this.items[0].icon = path;
					       return '<div style="float: right; font-size: 11px; line-height: 1em;">'
                            + onePersData[0]+'</div>';*/
			             
			             
			             //this.items[i].icon = 'resources/images/Door-24.png';
			            //console.log(onePersData[0]);
			            objs[i] = {
                        //image: 'resources/images/Door-24.png',
	                   text : '<div style="float:right; font-size: 13px; line-height: 1em;">'+ onePersData[0] + '</div>',
	                  /* renderer: function(val, metadata, record) {
	                       console.log('In renderer');
	                   },*/
	                   handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    alert("Edit " + rec.get('firstname'));
                }
	                   };
			        
		         }
		          
		         this.items = objs;
		             
		          return objs;
                   
               }
               else{
               //this.items[0].icon = '';
					   return '';
               //this.items[0].icon = '';
               //this.items[0].tooltip = '';
                  /*objs[0] = {
                    icon: '',
	                  tooltip : ''
	               };
	 
		            this.items = objs;	*/	             
		          //  return ''; 
                   
               }
                
		            
		          		
			} 
				   
				   
		      else {	
				  
			      return val;
			
				}
				
      
      
      
      
      
      
                    }
			
					
                    /*handler: function(grid, rowIndex, colIndex) {
			console.log(grid);
			console.log(rowIndex);
			console.log(colIndex);
			var rec1 = grid.getStore().getAt(rowIndex);
			console.log(rec1);
			
			}*/
			
			
			
	
	
            
		});
        return eColumn;
        },
	
	createColumn: function (headerName, path, dataind) {		
		var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			header: headerName,
			flex: 1,			
			menuDisabled: true,
			//dataIndex: dataind,			
			align: 'center',
			renderer: function (val, metadata, record) {
			     if(headerName === 'Werkdetails'){
			         if(record.data.workKey !== ''){
					   this.items[0].icon = path;
					   /*return '<div style="float: right; font-size: 11px; line-height: 1em;">'
                            + record.data.name+'</div>';*/
				    }				
				    else {					
					   this.items[0].icon = '';
					   /*return '<font style="right; font-size: 11px; line-height: 1em;">'
                + record.data.name 
            + '</font>';*/
				    }
			     
					
				}
				
				metadata.style = 'cursor: pointer;';			
				return val;
			
			
			
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
			console.log(grid);
			console.log(rowIndex);
			console.log(colIndex);
			var rec1 = grid.getStore().getAt(rowIndex);
			console.log(rec1);
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


