Ext.define('TheaterTool.view.tabPanel.rolebooks.RoleTable', {
	extend: 'Ext.grid.Panel',	
	requires:[
	 'Ext.grid.column.Action',
	'TheaterTool.model.Theaterakte',
	'Ext.ux.grid.SubTable'
	],	
	layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	style: {
				borderRight: '5px solid #f4f4f4'
			},
	flex:1.7,
	sortableColumns: false,
	
	border:false,
	store: null,
	rowLines: true,
    columnLines: true,
    tablePanel: null,
   
	detailsColumn: null,
	lineList: null,
	workDetailsColumn: null,
	inhaltColumn: null,
	
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
    },

	*/
	initComponent: function () {
	
	   var me = this;
	
	me.store = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.Theaterakte',
    data:[]
});

if(me.lineList != 'undefined'){
console.log(me.lineList);

var columnNumber = 0;
var isDateColumn = false;
             var isWorkColumn = false;
             var isPersonColumn = false;
             var personsNumber = 0;
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
             var personObject = new Array();
             var columnText = new Array();
             
             
            for(j = 0; j < one_row.cells.length; j++){
                var oneColumn = one_row.cells[j];
                //console.log(oneColumn);
                var workArray = oneColumn[1].work;
                var dateObject = oneColumn[3].date;
                var personWorkObject = oneColumn[2].workpersons;
                
                if(workArray.length > 0){
                    workName = workArray[0];
                    workKey = workArray[1];
                    isWorkColumn = true;
                    if(typeof workArray[2] !== 'undefined'){
                    //console.log(workArray[2]);
                        isContent = true;
                    }
                }
                if(personWorkObject.length > 0){
                    if( personObject.length == 0){
                        personObject[0] = personWorkObject;
                    }
                    else{
                        var arrIndex = personObject.length+1;
                        personObject[arrIndex] = personWorkObject;
                    }
                    if(personWorkObject.length > personsNumber){
                        personsNumber = personWorkObject.length;
                    }                   
                    isPersonColumn = true;
                    //console.log(personWorkObject);
                   
                }
                if(dateObject.length > 0){
                    workDate = dateObject[0];
                    isDateColumn = true;
                }
                
                columnText[j] = oneColumn[0];
                /*else{  
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
            }*/
               
            }
          
             var one_line = Ext.create('TheaterTool.model.Theaterakte', {
    			      name : workName,
    			      workKey: workKey,
    			      details1 :columnText[0], 
    			      details2 : columnText[1],
    			      details3 : columnText[2],
    			      date: workDate,
    			      createContent: isContent,
    			      persons: personObject
    			      //anmerkung: one_row[2] 
			             });
			         me.store.add(one_line);
            
            
            
            
			
			}
			   
           /* if(isDateColumn){
                columnNumber--;
            }
            if(isPersonColumn){
                columnNumber--;
            }
            if(isWorkColumn){
                columnNumber--;
            }*/
	}
	
	
	var objs = new Array();
	
		
		var tableColumns = -1;
		
		for(i = 1; i <= columnNumber; i++){
		    var col = Ext.create('Ext.grid.column.Column', {			
			xtype: 'gridcolumn',
			//header: headerName,
			flex: 2,			
			menuDisabled: true,
			dataIndex: 'details'+i
		});
		tableColumns = tableColumns+1;
		objs[tableColumns] = col;		
		}
		
		if(isWorkColumn){
		    me.detailsColumn = this.createColumn('Werkdetails', 'resources/images/Door-24.png', 'name');
		    tableColumns = tableColumns+1;
		    objs[tableColumns] = me.detailsColumn;
		     me.workDetailsColumn = tableColumns;
		    
		}
		
		if(isPersonColumn){
		var personArray = new Array();
		for(var i = 0; i < personsNumber; i++){
		    var pers = {
            text: 'Persondetails',
            width: 100,
            dataIndex: 'persons',
             defaultRenderer: 	function(value, meta, record, rowIdx, colIdx, store, view) {
                if(value.length > 0){
                    for(k = 0; k < value.length; k++){
                                var onePerson = value[k];
                            if(onePerson !== undefined){
                                var m = Math.abs((tableColumns-1)-colIdx);
                                var persName = onePerson[m];
                                if(persName!== undefined){
                                 if(persName[1] !== ''){
                                     return '<div class="personhtml" style="font-size: 11px;" id="'+persName[1]+'_'+persName[0]+'"><img src="resources/images/Door-24.png" style="width:17px;height:16px;">'+ persName[0]+'</div>';
                                
                                 }
                                return '<div style="font-size: 11px;">'+ persName[0]+'</div>';
                                
                                }
                            }
                           
                }
                }
               
             },
              listeners: { 
               click: function(item, e, eOpts) {
			        var prsonElement = e.getElementsByClassName('personhtml');
			        console.log(prsonElement);
			        if(prsonElement[0] !== undefined){
			        var personData = prsonElement[0].id;
			        var personDataArray = personData.split('_')
			        var personId = personDataArray[0];
			        var personName = personDataArray[1];
			        		       
                           var toolBarGlobal = Ext.getCmp('toolbar');
                           var historyButton = Ext.getCmp('historyButton'); 
                          // var isHistoryItemExist = toolBarGlobal.foundHistoryitemWithId(historyButton.menu.items, personId);
                            //if(!isHistoryItemExist){
                                var menuItem = historyButton.menu.add({text: '<font style="color:gray;">'+personName+'</font>', icon: 'resources/images/Mask-19.png', dbkey: personId});  

                            //}
			        			        
			        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
			        var existItems = navTreeGlobal.items;
			        var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, personId, menuItem.id);
                     if (! isFoundItem) { 
			        
			        var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+personName+'</font>',
						icon: 'resources/images/Mask-19.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({dbkey: personId, icon: 'resources/images/Mask-19.png'});
					personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">'+personName+'</font>');
					repertoireTab.add(personDetails);

					repertoireTab.setActiveMenuItemId(menuItem.id);
                    repertoireTab.setMenuAdded(true);
                    
					navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);	
					navTreeGlobal.fireEvent('render', navTreeGlobal);

			      } 
			      }
			 }
			 }
           
        };
        
        personArray[i]=pers
		}		
		    var testColumn = Ext.create('Ext.grid.column.Column', {
   header: 'Personen',
    columns: personArray
    
		});
		
		    tableColumns = tableColumns+1;
		    objs[tableColumns] = testColumn;
		}     
		
		
		var col_inhalt = this.createColumn('Inhaltdetails', 'resources/images/Note-15.png', 'createContent');	
		tableColumns = tableColumns+1;
		me.inhaltColumn = tableColumns;
		objs[tableColumns] = col_inhalt;
		
		me.columns = objs;
		
		me.callParent();
	},
	
	
	createColumn: function (headerName, path, dataind) {	
        var me = this;	
		var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			header: headerName,
			flex: 0.9,			
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
				else if(headerName === 'Inhaltdetails'){
				    if(record.data.createContent){
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
			var rec = grid.getStore().getAt(rowIndex);
			console.log(rec);
			console.log(me.workDetailsColumn);
			 if(colIndex === me.inhaltColumn && rec.data.createContent){
			     
			 }
			 if(colIndex === me.workDetailsColumn && rec.data.workKey != ''){
					var dbkey = rec.data.workKey;
					if(dbkey != ''){
					var workIcon = 'resources/images/Books1-17.png';
					/*var workIcon = '';
					if(extWorkKeys.indexOf('dbkey') > -1){
					    workIcon = 'resources/images/BookBlau-16.png';
					}
					else{
					    workIcon = 'resources/images/Books1-17.png';
					}*/
					
					
					var toolBarGlobal = Ext.getCmp('toolbar');
                           var historyButton = Ext.getCmp('historyButton'); 
                          // var isHistoryItemExist = toolBarGlobal.foundHistoryitemWithId(historyButton.menu.items, dbkey);
                          //  if(!isHistoryItemExist){
                                var menuItem = historyButton.menu.add({text: '<font style="color:gray;">'+rec.data.name+'</font>', icon: workIcon, dbkey: dbkey});  

                          //  }
					
					var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
					var existItems = navTreeGlobal.items;
					var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, dbkey, menuItem.id);
                     if (! isFoundItem) { 
					
					
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+rec.data.name+'</font>',
						icon: workIcon
					});
					//var personDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({selection: dbkey, isSelected: true});
					var personDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                                        selection: dbkey, isSelected: true, workName: rec.data.name, workIcon: workIcon
                                    });					
					repertoireTab.add(personDetails);

					repertoireTab.setActiveMenuItemId(menuItem.id);
                    repertoireTab.setMenuAdded(true);
                    
					navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);	
					navTreeGlobal.fireEvent('render', Ext.getCmp('tabpanel'));
					
					}
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


